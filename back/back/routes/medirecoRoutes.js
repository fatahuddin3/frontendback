const DigitalMedicalRecord = require('../models/DigitalMedicalRecord'); 
const express = require('express');
const router = express.Router();
const {protect } = require('../middlewares/protected');
const jwt = require('jsonwebtoken');
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '200d',
    });
};
router.post('/medireco',async (req, res) => {
    
    try {
        const record = new DigitalMedicalRecord(req.body);
        await record.save();
        res.status(201).send({ record,token:generateToken(record._id) });
    } catch (err) {
        res.status(400).send(err.message);
    }
});
router.get('/medirecords/:patientId', protect, async (req, res) => {
    if (req.user.role !== 'doctor') {
        return res.status(403).json({ message: 'Access denied: doctor only.' });
    }
    const { patientId } = req.params;
    try {
        const records = await DigitalMedicalRecord.find({ patientId });
        if (!records.length) {
            return res.status(404).json({ message: "No records found for this patient." });
        }
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: "Error fetching medical records" });
    }
});
/*router.get('/medireco/medicalHistory', async (req, res) => {
    const { condition,dateDiagnosed,stat } = req.query; // Fetch condition from query params

    try {
        // Find records where any condition in medicalHistory matches the provided condition
        const records = await DigitalMedicalRecord.find({
            "medicalHistory.condition": condition,
            "medicalHistory.dateDiagnosed": dateDiagnosed,
            "medicalHistory.status": stat
        });

        if (!records.length) {
            return res.status(404).send('No records found for the specified medical history condition.');
        }

        res.status(200).send(records);
    } catch (err) {
        res.status(500).send(`Error fetching records: ${err.message}`);
    }
});*/

router.get('/medireco/medicalHistory', protect, async (req, res) => {
    
    const { condition, dateDiagnosed, status } = req.query;
    try {
        const records = await DigitalMedicalRecord.find({
            "medicalHistory.condition": condition,
            "medicalHistory.dateDiagnosed": dateDiagnosed,
            "medicalHistory.status": status
        }).populate('patientId', 'name age gender');

        if (!records.length) {
            return res.status(404).send('No records found for the specified medical history.');
        }

        res.status(200).send(records);
    } catch (err) {
        res.status(500).send(`Error fetching records: ${err.message}`);
    }
});
// GET route to fetch medical records by medicalHistory condition, dateDiagnosed, and status


// GET route to fetch medical records by medicalHistory condition, dateDiagnosed, and status
router.get('/medireco/history/search', async (req, res) => {
    const { condition, dateDiagnosed, status } = req.query; // Fetch from query params

    try {
        // Build query object dynamically based on provided params
        const query = {
            "medicalHistory.condition": condition,
        };

        if (dateDiagnosed) {
            query["medicalHistory.dateDiagnosed"] = dateDiagnosed; // Convert date string to Date object
        }

        if (status) {
            query["medicalHistory.status"] = status;
        }

        // Find records where any of the medicalHistory fields match the query
        const records = await DigitalMedicalRecord.find(query);

        if (!records.length) {
            return res.status(404).send('No records found for the specified search criteria.');
        }

        res.status(200).send(records);
    } catch (err) {
        res.status(500).send(`Error fetching records: ${err.message}`);
    }
});




// PUT route to update medical records by condition, dateDiagnosed, and status
router.put('/medireco/history/update', protect, async (req, res) => {
    if (req.user.role !== 'doctor') {
        return res.status(403).json({ message: 'Access denied: doctor only.' });
    }
    const { condition, dateDiagnosed, status } = req.body; // Fetch current data to locate the subdocument
    const { newCondition, newDateDiagnosed, newStatus } = req.body; // New values to update

    try {
        // Ensure the query has at least condition to identify the record
        if (!condition) {
            return res.status(400).send('Condition is required to update a medical history record.');
        }

        // Build query object dynamically based on provided parameters
        const query = {
            "medicalHistory.condition": condition
        };

        if (dateDiagnosed) {
            query["medicalHistory.dateDiagnosed"] = dateDiagnosed; // Convert date string to Date object
        }

        if (status) {
            query["medicalHistory.status"] = status;
        }

        // Build the update object using $set with array positional operator ($[<identifier>])
        const update = {};
        if (newCondition) update["medicalHistory.$[elem].condition"] = newCondition;
        if (newDateDiagnosed) update["medicalHistory.$[elem].dateDiagnosed"] = newDateDiagnosed;
        if (newStatus) update["medicalHistory.$[elem].status"] = newStatus;

        // Update medical history record in the array with arrayFilters to match the condition
        const record = await DigitalMedicalRecord.findOneAndUpdate(
            { "medicalHistory.condition": condition }, // Query to match the document
            { $set: update }, // Set the new values
            {
                new: true, // Return the updated document
                arrayFilters: [{ "elem.condition": condition }] // Match the specific element in the medicalHistory array
            }
        );

        if (!record) {
            return res.status(404).send('No record found to update.');
        }

        res.status(200).send(record);
    } catch (err) {
        res.status(500).send(`Error updating records: ${err.message}`);
    }
});
router.get('/medical-record/:patientname', async (req, res) => {
    try {
        const { patientname } = req.params;

        // Query to find the patient's medical record by name and project specific fields
        const medicalRecord = await DigitalMedicalRecord.findOne(
            { patientname },
            {
                "visitNotes.note": 1,
                "labResults.result": 1,
                "medicalHistory": 1,
                "medications": 1,
                _id: 0
            }
        );

        if (!medicalRecord) {
            return res.status(404).json({ message: 'Medical record not found for this patient' });
        }

        // Return the specific details
        res.status(200).json(medicalRecord);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});



// Get all medical records for a specific patient by patientId
/*router.get('/:diagnosis', authMiddleware4, async (req, res) => {
    const { diagnosis } = req.params;

    try {
        const records = await DigitalMedicalRecord.findById({ diagnosis })
            *//*.populate('doctor', 'name specialization')  // Populate the doctor details
            .exec();*//*

        if (!records || records.length === 0) {
            return res.status(404).json({ message: 'No medical records found for this patient' });
        }

        return res.status(200).json(records);
    } catch (error) {
        console.error('Error fetching medical records:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
*/
router.get('/', async (req, res) => {
    const medi = await DigitalMedicalRecord.find();
    return res.status(200).json(medi);
});

module.exports = router;