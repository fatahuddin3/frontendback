const Prescription = require('../models/Prescription');
const { protect } = require('../middlewares/protected');
const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '200d',
    });
};

router.post('/pre', async (req, res) => {

    try {
        const record = new Prescription(req.body);
        await record.save();
        res.status(201).send({ record, token: generateToken(record._id) });
    } catch (err) {
        res.status(400).send(err.message);
    }
});
router.get('/presc/:patientId',protect, async (req, res) => {
    if (req.user.role !== 'doctor') {
        return res.status(403).json({ message: 'Access denied: doctor only.' });
    }
    const { patientId } = req.params;
    try {
        const records = await Prescription.find({ patientId });
        if (!records.length) {
            return res.status(404).json({ message: "No records found for this patient." });
        }
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: "Error fetching medical records" });
    }
});

router.get('/prescrip/medicat', async (req, res) => {
    const { name,dosage,frequency,duration } = req.query;
    try {
        const records = await Prescription.find({
            "medications.name": name,
            "medications.dosage": dosage,
            "medications.frequency": frequency,
            "medications.duration": duration,
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
router.get('/medica/history/search', async (req, res) => {
    const { name, dosage, frequency, duration } = req.query; // Fetch from query params

    try {
        // Build query object dynamically based on provided params
        const query = {
            "medications.name": name,
        };

        if (dosage) {
            query["medications.dosage"] = dosage; // Convert date string to Date object
        }

        if (frequency) {
            query["medications.frequency"] = frequency;
        }
        if (duration) {
            query["medications.duration"] = duration;
        }
        // Find records where any of the medicalHistory fields match the query
        const records = await Prescription.find(query);

        if (!records.length) {
            return res.status(404).send('No records found for the specified search criteria.');
        }

        res.status(200).send(records);
    } catch (err) {
        res.status(500).send(`Error fetching records: ${err.message}`);
    }
});//real code below
/*router.put('/medireco/history/update',protect, async (req, res) => {
    if (req.user.role !== 'doctor') {
        return res.status(403).json({ message: 'Access denied: doctor only.' });
    }
    const { name, dosage, frequency, duration } = req.body; // Fetch current data to locate the subdocument
    const { newname, newdosage, newfrequency, newduration } = req.body; // New values to update

    try {
        
        if (!name) {
            return res.status(400).send('Name is required to update a medical history record.');
        }
        // Build query object dynamically based on provided parameters
        const query = {
            "medications.name": name,
        };
        if (dosage) {
            query["medications.dosage"] = dosage; // Convert date string to Date object
        }

        if (frequency) {
            query["medications.frequency"] = frequency;
        }
        if (duration) {
            query["medications.duration"] = duration
        }
        // Build the update object using $set with array positional operator ($[<identifier>])
        const update = {};
        if (newname) update["medications.$[elem].name"] = newname;
        if (newdosage) update["medications.$[elem].dosage"] = newdosage;
        if (newfrequency) update["medications.$[elem].frequency"] = newfrequency;
        if (newduration) update["medications.$[elem].duration"] = newduration;
        // Update medical history record in the array with arrayFilters to match the condition
        const record = await Prescription.findOneAndUpdate(
            { "medications.name": name }, // Query to match the document
            { $set: update }, // Set the new values
            {
                new: true, // Return the updated document
                arrayFilters: [{ "elem.name": name }] // Match the specific element in the medicalHistory array
            }
        );

        if (!record) {
            return res.status(404).send('No record found to update.');
        }

        res.status(200).send(record);
    } catch (err) {
        res.status(500).send(`Error updating records: ${err.message}`);
    }
});*/




//for updating all arrays with one time then remove the id from medication model
/*router.put('/medireco/history/update', protect, async (req, res) => {
    if (req.user.role !== 'doctor') {
        return res.status(403).json({ message: 'Access denied: doctor only.' });
    }

    const { updates } = req.body; // Array of update instructions
    if (!updates || !Array.isArray(updates)) {
        return res.status(400).json({ message: 'Invalid request: updates should be an array.' });
    }

    try {
        const results = [];
        for (const update of updates) {
            const { name, dosage, frequency, duration, newname, newdosage, newfrequency, newduration } = update;

            if (!name) {
                results.push({ error: 'Name is required for each update.' });
                continue;
            }

            const query = { "medications.name": name };
            if (dosage) query["medications.dosage"] = dosage;
            if (frequency) query["medications.frequency"] = frequency;
            if (duration) query["medications.duration"] = duration;

            const updateFields = {};
            if (newname) updateFields["medications.$[elem].name"] = newname;
            if (newdosage) updateFields["medications.$[elem].dosage"] = newdosage;
            if (newfrequency) updateFields["medications.$[elem].frequency"] = newfrequency;
            if (newduration) updateFields["medications.$[elem].duration"] = newduration;

            const record = await Prescription.findOneAndUpdate(
                query,
                { $set: updateFields },
                {
                    new: true,
                    arrayFilters: [{ "elem.name": name }]
                }
            );

            if (record) {
                results.push({ success: true, record });
            } else {
                results.push({ error: `No record found for ${name}.` });
            }
        }

        res.status(200).json(results);
    } catch (err) {
        res.status(500).send(`Error updating records: ${err.message}`);
    }
});*/

router.put('/medireco/history/update', protect, async (req, res) => {
    if (req.user.role !== 'doctor') {
        return res.status(403).json({ message: 'Access denied: doctor only.' });
    }

    const { updates } = req.body; // Array of update instructions
    if (!updates || !Array.isArray(updates)) {
        return res.status(400).json({ message: 'Invalid request: updates should be an array.' });
    }

    try {
        const results = [];
        for (const update of updates) {
            const { medicationId, newname, newdosage, newfrequency, newduration } = update;

            if (!medicationId) {
                results.push({ error: 'Medication ID is required for each update.' });
                continue;
            }

            const updateFields = {};
            if (newname) updateFields["medications.$.name"] = newname;
            if (newdosage) updateFields["medications.$.dosage"] = newdosage;
            if (newfrequency) updateFields["medications.$.frequency"] = newfrequency;
            if (newduration) updateFields["medications.$.duration"] = newduration;

            const record = await Prescription.findOneAndUpdate(
                { "medications._id": medicationId },
                { $set: updateFields },
                { new: true }
            );

            if (record) {
                results.push({ success: true, record });
            } else {
                results.push({ error: `No medication found for ID ${medicationId}.` });
            }
        }

        res.status(200).json(results);
    } catch (err) {
        res.status(500).send(`Error updating records: ${err.message}`);
    }
});




router.put('/prescrippp/medicat/:issueDate', async (req, res) => {
    const { issueDate } = req.params;
    const { oldMedications, newMedications } = req.body;

    if (!Array.isArray(oldMedications) || !Array.isArray(newMedications)) {
        return res.status(400).send("oldMedications and newMedications should be arrays.");
    }

    try {
        // Find the prescription by issueDate
        const prescription = await Prescription.findOne({ issueDate });

        if (!prescription) {
            return res.status(404).send('No prescription found for the provided issueDate.');
        }

        // Loop through the oldMedications array and update corresponding medications
        oldMedications.forEach((oldMed, index) => {
            const medicationIndex = prescription.medications.findIndex(med =>
                med.name === oldMed.name &&
                med.dosage === oldMed.dosage &&
                med.frequency === oldMed.frequency &&
                med.duration === oldMed.duration
            );

            // If matching medication is found, update it with the newMedication data
            if (medicationIndex !== -1) {
                // Replace the old medication with the new one
                prescription.medications[medicationIndex] = newMedications[index];
            }
        });

        // Save the updated prescription
        const updatedPrescription = await prescription.save();

        res.status(200).send({
            message: 'Medications updated successfully',
            updatedPrescription,
        });
    } catch (err) {
        res.status(500).send(`Error updating prescription: ${err.message}`);
    }
});
//above code is also right just 2 approach 
router.put('/prescripp/medicat/:issueDate', async (req, res) => {
    const { issueDate } = req.params;
    const { newMedications } = req.body;

    // Ensure newMedications is an array
    if (!Array.isArray(newMedications)) {
        return res.status(400).json({ error: "newMedications should be an array." });
    }

    try {
        // Find the prescription by issueDate
        const prescription = await Prescription.findOne({ issueDate });

        if (!prescription) {
            return res.status(404).json({ error: 'Prescription not found for the given issue date.' });
        }

        // Loop through newMedications and update each based on its unique _id
        newMedications.forEach(newMed => {
            const medIndex = prescription.medications.findIndex(med => med._id.toString() === newMed._id);

            if (medIndex !== -1) {
                // Update the found medication with new values
                prescription.medications[medIndex] = {
                    ...prescription.medications[medIndex],  // Keep other fields unchanged
                    name: newMed.name || prescription.medications[medIndex].name,
                    dosage: newMed.dosage || prescription.medications[medIndex].dosage,
                    frequency: newMed.frequency || prescription.medications[medIndex].frequency,
                    duration: newMed.duration || prescription.medications[medIndex].duration,
                };
            }
        });

        // Save the updated prescription
        const updatedPrescription = await prescription.save();

        return res.status(200).json({
            message: 'Prescription updated successfully',
            updatedPrescription,
        });
    } catch (err) {
        return res.status(500).json({ error: `Error updating prescription: ${err.message}` });
    }
});


// PUT route to update multiple medications in the medications array


// PUT route to update multiple medications in the medications array
/*router.put('/prescripp/medicat', async (req, res) => {
    const { patientId, oldMedications, newMedications } = req.body;

    if (!Array.isArray(oldMedications) || !Array.isArray(newMedications)) {
        return res.status(400).send("oldMedications and newMedications should be arrays.");
    }

    try {
        // Convert patientId to ObjectId for querying the database
        const validPatientId = mongoose.Types.ObjectId.isValid(patientId) ? new mongoose.Types.ObjectId(patientId) : null;

        if (!validPatientId) {
            return res.status(400).send("Invalid patientId.");
        }

        // Use findOne to get the prescription by patientId
        const prescription = await Prescription.findOne({ patientId: validPatientId });

        if (!prescription) {
            return res.status(404).send('No prescription found for the provided patientId.');
        }

        // Ensure that the medications array exists before proceeding
        if (!Array.isArray(prescription.medications)) {
            return res.status(400).send('No medications array found in the prescription.');
        }

        // Loop through the oldMedications array and update corresponding medications
        oldMedications.forEach((oldMed, index) => {
            const medicationIndex = prescription.medications.findIndex(med =>
                med.name === oldMed.name &&
                med.dosage === oldMed.dosage &&
                med.frequency === oldMed.frequency &&
                med.duration === oldMed.duration
            );

            // If matching medication is found, update it with the newMedication data
            if (medicationIndex !== -1) {
                // Replace the old medication with the new one
                prescription.medications[medicationIndex] = newMedications[index];
            }
        });

        // Save the updated prescription
        const updatedPrescription = await prescription.save();

        res.status(200).send({
            message: 'Medications updated successfully',
            updatedPrescription,
        });
    } catch (err) {
        res.status(500).send(`Error updating prescription: ${err.message}`);
    }
});
*/




module.exports = router;

/*router.put('/medireco/history/update/:recordId/:medicationId', protect, async (req, res) => {
    try {
        // Ensure only doctors can access this route
        if (req.user.role !== 'doctor') {
            return res.status(403).json({ message: 'Access denied: doctor only.' });
        }

        // Extract updated fields from the request body
        const { name, dosage, frequency, duration } = req.body;

        // Validate that at least one field is provided for the update
        if (!name && !dosage && !frequency && !duration) {
            return res.status(400).json({ message: 'Invalid request: Provide at least one field to update.' });
        }

        // Find and update the specific medication
        const updatedPrescription = await Prescription.findOneAndUpdate(
            {
                _id: req.params.recordId, // Match the prescription record
                "medications._id": req.params.medicationId, // Target the specific medication by its ID
            },
            {
                $set: {
                    "medications.$.name": name, // Update name if provided
                    "medications.$.dosage": dosage, // Update dosage if provided
                    "medications.$.frequency": frequency, // Update frequency if provided
                    "medications.$.duration": duration, // Update duration if provided
                },
            },
            { new: true } // Return the updated document
        );

        // If no record or medication is found, send a 404 response
        if (!updatedPrescription) {
            return res.status(404).json({ message: 'Prescription or medication not found.' });
        }

        // Extract the updated medication for clarity in response
        const updatedMedication = updatedPrescription.medications.find(
            (med) => med._id.toString() === req.params.medicationId
        );

        // Send back a success response with the updated medication
        res.status(200).json({
            success: true,
            updatedMedication,
        });
    } catch (error) {
        // Handle unexpected errors
        res.status(500).json({ message: `Error updating record: ${error.message}` });
    }
});*/