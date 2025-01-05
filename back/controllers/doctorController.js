const Doctor = require('../models/Doctor');

exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createDoctor = async (req, res) => {
    const { name, specialization, phone, email } = req.body;
    const newDoctor = new Doctor({ name, specialization, phone, email });

    try {
        await newDoctor.save();
        res.status(201).json(newDoctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// More CRUD operations can be added here
