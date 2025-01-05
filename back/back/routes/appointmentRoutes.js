const express = require('express');
const Appointment = require('../models/Appointment');
const jwt = require('jsonwebtoken');
// Import Appointment model
const Doctor = require('../models/Doctor'); // Import Doctor model
const Patient = require('../models/Patient'); // Assuming you have a Patient model
const authMiddleware2 = require('../middlewares/authMiddleware2');
const Report = require('../models/Report'); // Import Report model
const router = express.Router();
const { protect } = require('../middlewares/protected');
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '200d',
    });
};

const isTimeSlotOverlapping = (newTimeFrom, newTimeTo, existingTimeFrom, existingTimeTo) => {
    // Convert times to Date objects for easier comparison
    const newStart = new Date(`1970-01-01T${convertTo24HourFormat(newTimeFrom)}`).getTime();
    const newEnd = new Date(`1970-01-01T${convertTo24HourFormat(newTimeTo)}`).getTime();
    const existingStart = new Date(`1970-01-01T${convertTo24HourFormat(existingTimeFrom)}`).getTime();
    const existingEnd = new Date(`1970-01-01T${convertTo24HourFormat(existingTimeTo)}`).getTime();

    // Check if the time ranges overlap
    return newStart < existingEnd && newEnd > existingStart;
};

// Helper function to convert 12-hour format to 24-hour format

const isTimeInOffTimeRange = (timefrom, timeto) => {
    const startTime = new Date(`1970-01-01T${convertTo24HourFormat(timefrom)}`).getTime();
    const endTime = new Date(`1970-01-01T${convertTo24HourFormat(timeto)}`).getTime();

    // Convert off-time periods to 24-hour format for comparison
    const offTime1Start = new Date("1970-01-01T01:00").getTime();  // 1:00am
    const offTime1End = new Date("1970-01-01T07:00").getTime();    // 7:00am
    const offTime2Start = new Date("1970-01-01T14:00").getTime();  // 2:00pm
    const offTime2End = new Date("1970-01-01T16:00").getTime();    // 4:00pm

    // Check if the time falls within the off-time ranges
    const isInFirstOffTime = startTime < offTime1End && endTime > offTime1Start;
    const isInSecondOffTime = startTime < offTime2End && endTime > offTime2Start;

    return isInFirstOffTime || isInSecondOffTime;
};



const convertTo24HourFormat = (time) => {
    const [timeStr, modifier] = time.toLowerCase().split(/(am|pm)/);
    let [hours, minutes] = timeStr.trim().split(":").map(Number);

    // Handle PM times
    if (modifier === "pm" && hours < 12) hours += 12;
    // Handle midnight cases
    if (modifier === "am" && hours === 12) hours = 0;

    // Ensure the conversion is correct
    const convertedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    console.log(`Converted ${time} to 24-hour format: ${convertedTime}`);
    return convertedTime;
};

// Helper function to increment report data
const incrementReportField = async (field) => {
    let report = await Report.findOne();
    if (!report) {
        report = new Report();
    }
    report[field] += 1;
    await report.save();
};


//midd2
router.get('/time',  async (req, res) => {
    try {
        const allAppointments = await Appointment.find()
            .populate('patient doctor', 'name email');  // Populate patient and doctor details

        return res.status(200).json(allAppointments);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});
//useless api below no need
router.post('/ti', async (req, res) => {
    const { patientId, doctorId, date, reason, timefrom, timeto } = req.body;

    try {
        // Ensure the doctor exists
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Ensure the patient exists
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Create the appointment with the new time slots
        let appointment = await Appointment.create({
            patient: patientId,
            doctor: doctorId,
            date,
            reason,
            timefrom,  // Include timefrom field
            timeto     // Include timeto field
        });

        // Generate token after the appointment is created
        appointment.token = generateToken(appointment._id);

        // Save the updated appointment with the token
        await appointment.save();

        await incrementReportField('totalAppointmentsCreated');  // Increment appointments count

        return res.status(201).json(appointment);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});
router.post('/booking',  async (req, res) => {
    const { date, reason, timefrom, timeto } = req.body;

    // Extract patientId and doctorId from the token using authMiddleware2
    const patientId = req.patientId;
    const doctorId = req.doctorId;

    try {
        // Check if the requested time is within off-time
        if (isTimeInOffTimeRange(timefrom, timeto)) {
            return res.status(400).json({ message: 'Off time' });
        }

        // Check for overlapping appointments on the same date
        const existingAppointments = await Appointment.find({
            doctor: doctorId,
            date: date  // Ensure it's the same date
        });

        // Loop through existing appointments and check for overlap
        for (let existingAppointment of existingAppointments) {
            if (isTimeSlotOverlapping(timefrom, timeto, existingAppointment.timefrom, existingAppointment.timeto)) {
                return res.status(400).json({ message: 'This slot has been booked' });
            }
        }

        // Create the appointment if no overlap is found
        let appointment = await Appointment.create({
            patient: patientId,  // From token
            doctor: doctorId,    // From token
            date,
            reason,
            timefrom,  // Include timefrom field
            timeto     // Include timeto field
        });

        // Generate token after the appointment is created
        appointment.token = generateToken(appointment._id);

        // Save the updated appointment with the token
        await appointment.save();

        await incrementReportField('totalAppointmentsCreated');  // Increment appointments count

        return res.status(201).json(appointment);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

function convertTimeToMinutes(time) {
    const [_, hours, minutes, modifier] = time.match(/(\d{1,2}):(\d{2})(am|pm)/i);
    let h = parseInt(hours, 10);
    const m = parseInt(minutes, 10);

    if (modifier.toLowerCase() === 'pm' && h !== 12) h += 12;
    if (modifier.toLowerCase() === 'am' && h === 12) h = 0;

    return h * 60 + m;
}

// Convert minutes since midnight to "hh:mm am/pm" format
function convertMinutesTo12HourFormat(minutes) {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    mins = mins < 10 ? '0' + mins : mins;
    return `${hours}:${mins}${ampm}`;
}
//no off time system just time slot
router.post('/book', async (req, res) => {
    const { doctorId, patientId, date, timefrom, timeto, reason } = req.body;

    try {
        const newStartTime = convertTimeToMinutes(timefrom);
        const newEndTime = convertTimeToMinutes(timeto);

        const existingAppointments = await Appointment.find({
            doctor: doctorId,
            date: new Date(date)
        });

        for (let appointment of existingAppointments) {
            const existingStartTime = convertTimeToMinutes(appointment.timefrom);
            const existingEndTime = convertTimeToMinutes(appointment.timeto);

            if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
                return res.status(400).json({
                    message: `Doctor is already booked from ${appointment.timefrom} to ${appointment.timeto}. Please choose a different time slot.`
                });
            }
        }

        const newAppointment = new Appointment({
            patient: patientId,
            doctor: doctorId,
            date: new Date(date),
            timefrom,
            timeto,
            reason
        });

        await newAppointment.save();

        // JSON response with proper 12-hour format
        res.status(201).json({
            message: 'Appointment booked successfully!',
            appointment: {
                doctorId,
                patientId,
                date: new Date(date).toDateString(), // Format the date as string
                timefrom: convertMinutesTo12HourFormat(newStartTime),
                timeto: convertMinutesTo12HourFormat(newEndTime),
                reason
            }
        });

    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

//normal api for post no use
// Create a new appointment
router.post('/',  async (req, res) => {
    const { patientId, doctorId, date, reason } = req.body;
    try {
        // Ensure the doctor exists
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Ensure the patient exists
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Create the appointment
        let appointment = await Appointment.create({
            patient: patientId,
            doctor: doctorId,
            date,
            reason,
        });

        // Generate token after the appointment is created
        appointment.token = generateToken(appointment._id);

        // Save the updated appointment with the token
        await appointment.save();

        await incrementReportField('totalAppointmentsCreated');  // Increment appointments count

        return res.status(201).json(appointment);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
   
});
//midd
// Update an appointment
router.put('/:id',  async (req, res) => {
    const { id } = req.params;
    const { date, reason } = req.body;

    try {
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Update appointment details
        appointment.date = date || appointment.date;
        appointment.reason = reason || appointment.reason;
        await appointment.save();

        await incrementReportField('totalAppointmentsUpdated');  // Increment updated appointments count

        return res.status(200).json(appointment);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});
//mi
// Delete an appointment
router.delete('/:id',  async (req, res) => {
    const { id } = req.params;

    try {
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        await appointment.deleteOne();
        await incrementReportField('totalAppointmentsDeleted');  // Increment deleted appointments count

        return res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});
router.get('/', protect, async (req, res) => {
    if (req.user.role !== 'staff') {
        return res.status(403).json({ message: 'Access denied: Nurse only.' });
    }
    const allapp = await Appointment.find();
    return res.status(200).json(allapp);
});

router.get('/doctor/:doctorId',protect, async (req, res) => {
    const { doctorId } = req.params;

    try {
        const appointments = await Appointment.find({ doctor: doctorId })
            .populate('patient doctor');

        if (!appointments.length) {
            return res.status(404).json({ message: 'No appointments found for this doctor' });
        }

        return res.status(200).json(appointments);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});
// Fetch only doctors with appointments


// Function to check if the requested time falls within the doctor's off-time
const isDoctorOffTime = (doctorId, timefrom, timeto) => {
    const startTime = new Date(`1970-01-01T${convertTo24HourFormat(timefrom)}`).getTime();
    const endTime = new Date(`1970-01-01T${convertTo24HourFormat(timeto)}`).getTime();

    // Define the off-time ranges for each doctor
    const doctorOffTimes = {
        '66defb4fc7b138d406717834': [{ start: '11:30', end: '01:00' }],
        '66db0cae983d341ecfc9a25b': [{ start: '21:30', end: '23:00' }],
        '66dc9f19c2f6f515c3aed8ea': [{ start: '21:30', end: '23:00' }],
        '66dc56df56f94d91a5ed2d03': [
            { start: '17:30', end: '19:00' },
            { start: '22:30', end: '00:00' }
        ],
        '66dc56ac56f94d91a5ed2cfd': [{ start: '23:50', end: '01:00' }],
    };

    // Check if the doctor's off-time periods overlap with the requested time
    const offTimes = doctorOffTimes[doctorId];
    if (!offTimes) return false;

    return offTimes.some(offTime => {
        const offStart = new Date(`1970-01-01T${offTime.start}`).getTime();
        const offEnd = new Date(`1970-01-01T${offTime.end}`).getTime();
        return startTime < offEnd && endTime > offStart;
    });
};
//useless api below no time slot just off time
// POST route to create an appointment with doctor-specific off-time checks
router.post('/app',  async (req, res) => {
    const { patientId, doctorId, date, reason, timefrom, timeto } = req.body;

    try {
        // Ensure the doctor exists
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Ensure the patient exists
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Check if the requested time falls within the doctor's off-time
        if (isDoctorOffTime(doctorId, timefrom, timeto)) {
            return res.status(400).json({ message: 'The requested time falls within the doctor\'s off-time' });
        }

        // Create the appointment if the time is valid
        const appointment = await Appointment.create({
            patient: patientId,
            doctor: doctorId,
            date,
            reason,
            timefrom,
            timeto
        });

        // Generate token for the appointment
        appointment.token = generateToken(appointment._id);
        await appointment.save();

        // Return the created appointment
        return res.status(201).json(appointment);

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
