const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const { protect } = require('../middlewares/protected');
//if you give const  protect  = require('../middlewares/protected'); it will show requires a callback function
// Convert "11:30am" format to minutes since midnight
function convertTimeToMinutes(time) {
    const [_, hours, minutes, modifier] = time.match(/(\d{1,2}):(\d{2})(am|pm)/i);
    let h = parseInt(hours, 10);
    const m = parseInt(minutes, 10);

    if (modifier.toLowerCase() === 'pm' && h !== 12) h += 12;
    if (modifier.toLowerCase() === 'am' && h === 12) h = 0;

    return h * 60 + m;
}
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
router.get('/bo',  async (req, res) => {
    const allapp = await Appointment.find();
    return res.status(200).json(allapp);
});
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


//ata main booking appointment er ta na
router.post('/book',protect, async (req, res) => {
    if (req.user.role !== 'staff') {
        return res.status(403).json({ message: 'Access denied: Nurse only.' });
    }
    const { doctorId, patientId, date, timefrom, timeto, reason } = req.body;

    try {
        if (isTimeInOffTimeRange(timefrom, timeto)) {
            return res.status(400).json({ message: 'Off time' });
        }
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



module.exports = router;
