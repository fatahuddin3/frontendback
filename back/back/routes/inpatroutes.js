const express = require('express');
const router = express.Router();
const IpdAdmission = require('../models/Inpatient');
const Doctor = require('../models/Doctor'); // Import Doctor model
const Patient = require('../models/Patient'); 

router.post('/adm', async (req, res) => {
    try {
        const { patientId, name, age, gender, doctorId, wardno, bedno, reason } = req.body;
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Ensure the patient exists
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        // Validate wardno (must be between 1 and 5)
        if (wardno < 1 || wardno > 5) {
            return res.status(400).json({ error: 'Invalid ward number. Wardno must be between 1 and 5.' });
        }

        // Validate bedno (must be between 1 and 10)
        if (bedno < 1 || bedno > 10) {
            return res.status(400).json({ error: 'Invalid bed number. Bedno must be between 1 and 10.' });
        }

        // Check if the bed is already booked in the given ward
        const existingAdmission = await IpdAdmission.findOne({ wardno, bedno });

        if (existingAdmission) {
            return res.status(400).json({ error: `Bed number ${bedno} in ward ${wardno} is already booked.` });
        }

        // Create a new admission (bed is available)
        const newAdmission = new IpdAdmission({
            patientId,
            name,
            age,
            gender,
            doctorId,
            wardno,
            bedno,
            reason,
        });

        await newAdmission.save();
        res.status(201).json({ message: `Bed number ${bedno} in ward ${wardno} booked successfully.` });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing the admission.' });
    }
});
router.get('/:name', async (req, res) => {
    const { name } = req.params;

    const patient = await IpdAdmission.findOne({ name });
   
    if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
    }

    return res.status(200).json({
        _id: patient._id,
        wardno: patient.wardno,
        bedno:patient.bedno
    });
});

// DELETE route to remove a patient's admission by ward and bed number
router.delete('/dele', async (req, res) => {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
    }

    // Ensure the patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
    }
    try {
        const { wardno, bedno } = req.body;

        // Validate wardno (must be between 1 and 5)
        if (wardno < 1 || wardno > 5) {
            return res.status(400).json({ error: 'Invalid ward number. Wardno must be between 1 and 5.' });
        }

        // Validate bedno (must be between 1 and 10)
        if (bedno < 1 || bedno > 10) {
            return res.status(400).json({ error: 'Invalid bed number. Bedno must be between 1 and 10.' });
        }

        // Find the admission for the given ward and bed number
        const existingAdmission = await IpdAdmission.findOneAndDelete({ wardno, bedno });

        // If no admission found, return error
        if (!existingAdmission) {
            return res.status(404).json({ error: `No admission found for bed number ${bedno} in ward ${wardno}.` });
        }

        // Admission found and deleted successfully
        res.status(200).json({ message: `Admission for bed number ${bedno} in ward ${wardno} deleted successfully.` });

    } catch (error) {
        console.error('Error during deletion:', error);
        res.status(500).json({ error: 'An error occurred while deleting the admission.' });
    }
});

module.exports = router;
