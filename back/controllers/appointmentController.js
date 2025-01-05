const Appointment = require('../models/Appointment');

exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('patient doctor');
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createAppointment = async (req, res) => {
    const { patient, doctor, date, reason } = req.body;
    const newAppointment = new Appointment({ patient, doctor, date, reason });

    try {
        await newAppointment.save();
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// More CRUD operations can be added here
