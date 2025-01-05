const express = require('express');
const router = express.Router();
const Discharge = require('../models/Dischargenok'); // Assuming Discharge model is in models folder


// POST request to add discharge data
router.post('/discharge', async (req, res) => {
    try {
        const dischargeData = req.body;

        // Create a new discharge entry
        const newDischarge = new Discharge(dischargeData);

        // Save the new discharge entry to the database
        await newDischarge.save();

        // Respond with success
        res.status(201).json({ message: 'Discharge data added successfully', discharge: newDischarge });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});




router.get('/discharge/:dischargedate', async (req, res) => {
    try {
        const { dischargedate } = req.params;
        const { fieldsToGet } = req.body; // Expect an array of objects with medicationIndex and fields

        if (!fieldsToGet || !Array.isArray(fieldsToGet)) {
            return res.status(400).json({ message: 'Invalid or missing fieldsToGet in request body' });
        }

        // Fetch the entire medications_to_continue array
        const dischargeData = await Discharge.findOne({ dischargedate: dischargedate }, {
            'discharge_summary.medications_to_continue': 1
        });

        if (!dischargeData) {
            return res.status(404).json({ message: 'No discharge data found for the given dischargedate.' });
        }

        const medications = dischargeData.discharge_summary.medications_to_continue;

        // Create a filtered response based on the fieldsToGet array
        const filteredMedications = fieldsToGet.map(fieldObj => {
            const { medicationIndex, fields } = fieldObj;

            // Ensure the medication index exists in the array
            if (medicationIndex >= medications.length) {
                return null; // Ignore if medicationIndex is out of bounds
            }

            const selectedMedication = medications[medicationIndex];
            const filteredData = {};

            // Dynamically pick fields from the selected medication
            fields.forEach(field => {
                if (field === 'brand_name' && selectedMedication.name) {
                    filteredData.brand_name = selectedMedication.name.brand_name;
                }
                if (field === 'manufacturer' && selectedMedication.name) {
                    filteredData.manufacturer = selectedMedication.name.manufacturer;
                }
                if (field === 'times_per_day' && selectedMedication.frequency) {
                    filteredData.times_per_day = selectedMedication.frequency.times_per_day;
                }
                if (field === 'interval' && selectedMedication.frequency) {
                    filteredData.interval = selectedMedication.frequency.interval;
                }
            });

            return filteredData;
        }).filter(Boolean); // Remove null entries (out of bounds medications)

        // Respond with the filtered medication data
        res.json(filteredMedications);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


router.put('/discharge/:dischargedate', async (req, res) => {
    try {
        const { dischargedate } = req.params;
        const { medications } = req.body; // Expect an array of medications with details to update

        // Find the discharge document by dischargedate
        const discharge = await Discharge.findOne({ dischargedate: dischargedate });

        if (!discharge) {
            return res.status(404).json({ message: 'No discharge data found for the given dischargedate.' });
        }

        // Iterate through the medications array in the request body and update corresponding medications in the database
        medications.forEach((med, index) => {
            if (discharge.discharge_summary.medications_to_continue[index]) {
                // Update brand_name, manufacturer, times_per_day, and interval for each medication
                if (med.name) {
                    discharge.discharge_summary.medications_to_continue[index].name.brand_name = med.name.brand_name || discharge.discharge_summary.medications_to_continue[index].name.brand_name;
                    discharge.discharge_summary.medications_to_continue[index].name.manufacturer = med.name.manufacturer || discharge.discharge_summary.medications_to_continue[index].name.manufacturer;
                }
                if (med.frequency) {
                    discharge.discharge_summary.medications_to_continue[index].frequency.times_per_day = med.frequency.times_per_day || discharge.discharge_summary.medications_to_continue[index].frequency.times_per_day;
                    discharge.discharge_summary.medications_to_continue[index].frequency.interval = med.frequency.interval || discharge.discharge_summary.medications_to_continue[index].frequency.interval;
                }
            }
        });

        // Save the updated discharge document
        await discharge.save();

        // Respond with the updated discharge data
        res.json({ message: 'Discharge data updated successfully', discharge });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});
router.delete('/dischargee/:dischargedate', async (req, res) => {
    try {
        const { dischargedate } = req.params;
        const { medications } = req.body; // Expect an array of objects {medicationIndex, fieldsToRemove}

        // Initialize an empty object for the $unset operator
        const unsetFields = {};

        // Iterate through each medication provided in the request body
        medications.forEach(med => {
            const { medicationIndex, fieldsToRemove } = med;

            // Map the fieldsToRemove to the correct path for the given medicationIndex
            fieldsToRemove.forEach(field => {
                if (field === 'brand_name') {
                    unsetFields[`discharge_summary.medications_to_continue.${medicationIndex}.name.brand_name`] = 1;
                } else if (field === 'manufacturer') {
                    unsetFields[`discharge_summary.medications_to_continue.${medicationIndex}.name.manufacturer`] = 1;
                } else if (field === 'times_per_day') {
                    unsetFields[`discharge_summary.medications_to_continue.${medicationIndex}.frequency.times_per_day`] = 1;
                } else if (field === 'interval') {
                    unsetFields[`discharge_summary.medications_to_continue.${medicationIndex}.frequency.interval`] = 1;
                }
            });
        });

        // Perform the update using the constructed $unset object
        const updatedDischarge = await Discharge.findOneAndUpdate(
            { dischargedate: dischargedate },
            { $unset: unsetFields },
            { new: true } // Return the updated document
        );

        if (!updatedDischarge) {
            return res.status(404).json({ message: 'No discharge data found for the given dischargedate.' });
        }

        // Respond with the updated discharge data
        res.json({ message: 'Specified fields deleted successfully', discharge: updatedDischarge });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});



module.exports = router;
/*
This below codes are without loop system just to get,update,delete 1 or 2 by manually but above codes are using loop to get,update,delete all
router.get('/discharge/:dischargedate', async (req, res) => {
    try {
        const { dischargedate } = req.params;

        // Fetch the discharge document by dischargedate
        const dischargeData = await Discharge.findOne({ dischargedate: dischargedate }, {
            'discharge_summary.medications_to_continue.name.brand_name': 1,
            'discharge_summary.medications_to_continue.name.manufacturer': 1,
            'discharge_summary.medications_to_continue.frequency.times_per_day': 1,
            'discharge_summary.medications_to_continue.frequency.interval': 1
        });

        if (!dischargeData) {
            return res.status(404).json({ message: 'No discharge data found for the given dischargedate.' });
        }

        // Respond with the discharge medications data
        res.json(dischargeData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/discharge/:dischargedate', async (req, res) => {
    try {
        const { dischargedate } = req.params;
        const { brand_name, manufacturer, times_per_day, interval } = req.body;

        // Find the discharge document by dischargedate and update the specified fields
        const updatedDischarge = await Discharge.findOneAndUpdate(
            { dischargedate: dischargedate },
            {
                $set: {
                    'discharge_summary.medications_to_continue.0.name.brand_name': brand_name,
                    'discharge_summary.medications_to_continue.1.name.brand_name': brand_name,
                    'discharge_summary.medications_to_continue.0.name.manufacturer': manufacturer,
                    'discharge_summary.medications_to_continue.0.frequency.times_per_day': times_per_day,
                    'discharge_summary.medications_to_continue.0.frequency.interval': interval
                }
            },
            { new: true } // This option returns the updated document
        );

        if (!updatedDischarge) {
            return res.status(404).json({ message: 'No discharge data found for the given dischargedate.' });
        }

        // Respond with the updated discharge data
        res.json({ message: 'Discharge data updated successfully', discharge: updatedDischarge });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});
router.delete('/discharge/:dischargedate', async (req, res) => {
    try {
        const { dischargedate } = req.params;
        const { medicationIndex, fieldsToRemove } = req.body; // Expect medicationIndex to specify which medication and fieldsToRemove as an array of fields to delete

        // Construct the update object to unset specific fields dynamically
        const unsetFields = {};

        // Iterate over fieldsToRemove and map to the correct path for the given medicationIndex
        fieldsToRemove.forEach(field => {
            if (field === 'brand_name') {
                unsetFields[`discharge_summary.medications_to_continue.${medicationIndex}.name.brand_name`] = 1;
            } else if (field === 'manufacturer') {
                unsetFields[`discharge_summary.medications_to_continue.${medicationIndex}.name.manufacturer`] = 1;
            } else if (field === 'times_per_day') {
                unsetFields[`discharge_summary.medications_to_continue.${medicationIndex}.frequency.times_per_day`] = 1;
            } else if (field === 'interval') {
                unsetFields[`discharge_summary.medications_to_continue.${medicationIndex}.frequency.interval`] = 1;
            }
        });

        // Update the document with $unset to remove the specified fields
        const updatedDischarge = await Discharge.findOneAndUpdate(
            { dischargedate: dischargedate },
            { $unset: unsetFields },
            { new: true } // Return the updated document
        );

        if (!updatedDischarge) {
            return res.status(404).json({ message: 'No discharge data found for the given dischargedate.' });
        }

        // Respond with the updated discharge data
        res.json({ message: 'Specified fields deleted successfully', discharge: updatedDischarge });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

*/