const express = require('express');
const router = express.Router();
const Book = require('../models/Book');  // Assuming the model file is named book.js
const Doctor = require('../models/Doctor');  // Assuming the doctor model file is named doctor.js

// Doctor off-time schedules
const offTimes = [
    {
        doctorId: '66db0936acd352df7cf26bfd',
        timeSlots: [
            { timefrom: '11:30pm', timeto: '11:50pm' }
        ]
    },
    {
        doctorId: '66db18c3e462239037572423',
        timeSlots: [
            { timefrom: '8:30pm', timeto: '8:50pm' }
        ]
    },
    {
        doctorId: '66dc9f19c2f6f515c3aed8ea',
        timeSlots: [
            { timefrom: '8:30pm', timeto: '8:50pm' }
        ]
    },
    {
        doctorId: '66dc56df56f94d91a5ed2d03',
        timeSlots: [
            { timefrom: '10:30pm', timeto: '11:00pm' },
            { timefrom: '5:30pm', timeto: '7:00pm' }
        ]
    }
];

// Helper function to check if the appointment time conflicts with the doctor's off-time
const isOffTime = (doctorId, timefrom, timeto) => {
    const doctorOffTime = offTimes.find(offTime => offTime.doctorId === doctorId);
    if (doctorOffTime) {
        return doctorOffTime.timeSlots.some(slot => slot.timefrom === timefrom && slot.timeto === timeto);
    }
    return false;
};

// POST route to book an appointment
router.post('/bo', async (req, res) => {
    const { patientId, doctorId, date, reason, timefrom, timeto } = req.body;

    try {
        // Fetch doctor from the database to ensure it's a valid doctor ID
        const foundDoctor = await Doctor.findById(doctorId);
        if (!foundDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Check if the appointment time conflicts with the doctor's off-time
        if (isOffTime(doctorId, timefrom, timeto)) {
            return res.status(400).json({ message: 'Doctor is off during the selected time.' });
        }

        // Create a new appointment if all checks pass
        const appointment = new Book({
            patient:patientId,
            doctor:doctorId,
            date,
            reason,
            timefrom,
            timeto
        });

        await appointment.save();
        res.status(201).json({ message: 'Appointment booked successfully.', appointment });
    } catch (err) {
        res.status(500).json({ message: 'Failed to book appointment.', error: err.message });
    }
});

module.exports = router;

