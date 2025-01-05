const express = require('express');
const router = express.Router();
const medi = require('../models/Medication');
const jwt = require('jsonwebtoken');
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '200d',
    });
};
router.post('/medi', async (req, res) => {

    try {
        const record = new medi(req.body);
        await record.save();
        res.status(201).send({ record, token: generateToken(record._id) });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.get('/medications/:patientId', async (req, res) => {
    try {
        const { patientId } = req.params;
        const admission = await medi.findOne({ patientId });

        if (!admission) {
            return res.status(404).json({ message: 'No admission found for this patient' });
        }

        // Send the medication information
        res.status(200).json(admission.medication);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
router.get('/medications/details/:patientId', async (req, res) => {
    try {
        const { patientId } = req.params;
        const admission = await medi.findOne(
            { patientId },
            { "medication.name": 1, "medication.dose": 1, _id: 0 } // Project only 'name' and 'dose' fields
        );

        if (!admission) {
            return res.status(404).json({ message: 'No admission found for this patient' });
        }

        // Send the medication details (name and dose)
        const medicationDetails = admission.medication.map(med => ({
            name: med.name,
            dose: med.dose
        }));
        res.status(200).json(medicationDetails);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


module.exports = router;