const express = require('express');
const router = express.Router();
const Dischargee = require('../models/Discharge'); // Import your Mongoose model
router.post('/discharge', async (req, res) => {
    try {
        // Create a new discharge document from the request body
        const newDischarge = new Dischargee({
            dischargeId: req.body.dischargeId,
            dischargedate: req.body.dischargedate,
            discharge_summary: {
                treatment_summary: req.body.discharge_summary.treatment_summary,
                medications_to_continue: req.body.discharge_summary.medications_to_continue,
                follow_up_date: req.body.discharge_summary.follow_up_date
            }
        });

        // Save the new discharge record to the database
        const savedDischarge = await newDischarge.save();

        // Return the saved discharge record as a response
        res.status(201).json(savedDischarge);
    } catch (error) {
        // Handle any errors during saving
        res.status(500).json({ message: 'Failed to create discharge record', error });
    }
});
// GET route to fetch medications_to_continue.name, dose, and treatment_summary by dischargedate
router.get('/discharge/:dischargedate', async (req, res) => {
    try {
        const { dischargedate } = req.params;

        // Find the discharge document by the dischargedate
        const discharge = await Dischargee.findOne({ dischargedate });

        // Check if discharge record exists
        if (!discharge) {
            return res.status(404).json({ message: 'Discharge record not found' });
        }

        // Extract necessary information from discharge_summary
        const medications_to_continue = discharge.discharge_summary.medications_to_continue.map(medication => ({
            name: medication.name,
            dose: medication.dose
        }));
        const treatment_summary = discharge.discharge_summary.treatment_summary;

        // Send the extracted data as response
        res.json({
            treatment_summary,
            medications_to_continue
        });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'Server error', error });
    }
});//after attaching above router.get(...) it will show like below in postman
/*{
    "treatment_summary": "Appendectomy performed on 2023-09-29. No postoperative complications.",
        "medications": [
            {
                "name": "Amoxicillin",
                "dose": "500mg"
            }
        ]
}*/

router.get('/dischargee/:dischargedate', async (req, res) => {
    try {
        const { dischargedate } = req.params;

        // Find the discharge document by the dischargedate
        const discharge = await Dischargee.findOne({ dischargedate });

        // Check if discharge record exists
        if (!discharge) {
            return res.status(404).json({ message: 'Discharge record not found' });
        }

        // Extract necessary information from discharge_summary
        const medications_to_continue = discharge.discharge_summary.medications_to_continue;
        const treatment_summary = discharge.discharge_summary.treatment_summary;

        // Send the extracted data as response
        res.json({
            treatment_summary,
            medications_to_continue
        });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'Server error', error });
    }
});


// PUT route to update medications and treatment summary by dischargedate
router.put('/discharg/:dischargedate', async (req, res) => {
    try {
        const { dischargedate } = req.params;
        const { treatment_summary, medications_to_continue } = req.body;

        // Find discharge record by dischargedate and update medications + treatment summary
        const discharge = await Dischargee.findOneAndUpdate(
            { dischargedate: dischargedate },
            {
                $set: {
                    'discharge_summary.treatment_summary': treatment_summary,
                    'discharge_summary.medications_to_continue': medications_to_continue
                }
            },
            { new: true } // Returns the updated document
        );

        if (!discharge) {
            return res.status(404).json({ message: 'Discharge record not found' });
        }

        res.json(discharge);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE route to remove medications name, dose, and treatment summary by dischargedate
router.delete('/dischar/:dischargedate', async (req, res) => {
    try {
        const { dischargedate } = req.params;

        // Find the discharge record by dischargedate and unset the specific fields
        const discharge = await Dischargee.findOneAndUpdate(
            { dischargedate: dischargedate },
            {
                $unset: {
                    'discharge_summary.treatment_summary': "",
                    'discharge_summary.medications_to_continue': ""
                }
            },
            { new: true } // Returns the updated document
        );

        if (!discharge) {
            return res.status(404).json({ message: 'Discharge record not found' });
        }

        res.json({ message: 'Fields successfully deleted', discharge });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


// DELETE route to remove name and dose from medications in discharge_summary by dischargedate
router.delete('/dischargess/:dischargedate', async (req, res) => {
    try {
        const { dischargedate } = req.params;

        // Find the discharge record by dischargedate
        const discharge = await Dischargee.findOne({ dischargedate: dischargedate });

        if (!discharge) {
            return res.status(404).json({ message: 'Discharge record not found' });
        }

        // Loop through the medications_to_continue array and unset 'name' and 'dose'
        discharge.discharge_summary.medications_to_continue.forEach(med => {
            med.name = undefined;
            med.dose = undefined;
        });

        // Save the updated discharge document
        await discharge.save();

        res.json({ message: 'Name and dose successfully deleted from medications', discharge });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;



