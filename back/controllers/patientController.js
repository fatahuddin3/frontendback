const Patient = require('../models/Patient');

exports.createPatient = async (req, res) => {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).json(patient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


/*
const Patient = require('../models/Patient');
exports.createPatient = async (req, res) => {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).json(patient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
exports.getPatients = async (req, res) => {
    try {
        const patient = await Patient.find();
        res.status(200).json(patient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};*/