const express = require('express');
const Pharmacy = require('../models/Pharmacy');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authMiddleware5 = require('../middlewares/authMiddleware5');
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '200d',
    });
}; router.get('/:namee', async (req, res) => {
    const { namee } = req.params;
    const allmedicine = await Pharmacy.findOne({namee});
    return res.status(200).json(allmedicine);
});
router.get('/', async (req, res) => {
    try {
        const pharmacy = await Pharmacy.findOne(); // Adjust query as needed
        if (!pharmacy) return res.status(404).json({ message: "Pharmacy not found." });
        return res.status(200).json(pharmacy.inventory);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
});


router.post('/medi', async (req, res) => {

    try {
        const record = new Pharmacy(req.body);
        await record.save();
        res.status(201).send({ record, token: generateToken(record._id) });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

/*router.get('/pharmacy/:id', async (req, res) => {
    try {
        const pharmacyId = req.params.id;

        // Fetch the pharmacy by _id
        const pharmacy = await Pharmacy.findById(pharmacyId);

        if (!pharmacy) {
            return res.status(404).json({ message: 'Pharmacy not found' });
        }

        // Respond with the pharmacy data
        res.status(200).json(pharmacy);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});*/

router.get('/pharmacy/:id', async (req, res) => {
    try {
        const pharmacy = await Pharmacy.findById(req.params.id);

        if (!pharmacy) {
            return res.status(404).json({ message: 'Pharmacy not found' });
        }

        res.status(200).json({ inventory: pharmacy.inventory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


//real below
/*router.post('/buy/:namee', async (req, res) => {
    const { namee } = req.params;  // Pharmacy name
    const { items } = req.body;  // Array of medications and their quantities

    try {
        // Find the pharmacy by namee
        const pharmacy = await Pharmacy.findOne({ namee: namee });

        if (!pharmacy) {
            return res.status(404).json({ message: "Pharmacy not found." });
        }

        let response = [];
        let hasErrors = false;

        // Loop through each item in the order request
        for (const item of items) {
            const { medicationName, quantity } = item;

            // Find the medication in the pharmacy's inventory
            const medication = pharmacy.inventory.find(med => med.name === medicationName);

            if (!medication) {
                // Medication not found in inventory
                response.push({
                    medicationName,
                    message: `${medicationName} is not available in the inventory.`
                });
                hasErrors = true;
            } else if (medication.quantity >= quantity) {
                // If enough stock is available, deduct the quantity
                medication.quantity -= quantity;

                // Add success message to response
                response.push({
                    medicationName,
                    message: `You successfully bought ${quantity} of ${medicationName}.`,
                    remainingQuantity: medication.quantity
                });
            } else {
                // Not enough stock available
                response.push({
                    medicationName,
                    message: `We have less than ${quantity} of ${medicationName}. We have just ${medication.quantity} items available.`,
                    availableQuantity: medication.quantity
                });
                hasErrors = true;
            }
        }

        // Save the updated pharmacy document (if any deductions happened)
        await pharmacy.save();

        // Return the response array with success and error messages
        return res.status(hasErrors ? 400 : 200).json({
            message: hasErrors ? "Some items could not be processed." : "All items successfully processed.",
            items: response
        });

    } catch (error) {
        console.error('Error purchasing medications:', error);
        return res.status(500).json({ message: "Internal server error." });
    }
});*/




/*router.post('/buy', async (req, res) => {
    const { items } = req.body; // Array of medications and their quantities

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Invalid or empty items array." });
    }

    try {
        // Retrieve pharmacy document (update to fetch by a specific identifier if needed)
        const pharmacy = await Pharmacy.findOne();

        if (!pharmacy) {
            return res.status(404).json({ message: "Pharmacy not found." });
        }

        let response = [];
        let hasErrors = false;

        // Loop through each item in the order request
        for (const item of items) {
            const { medicationName, quantity } = item;

            // Validate item fields
            if (!medicationName || typeof quantity !== 'number' || quantity <= 0) {
                response.push({
                    medicationName: medicationName || "Unknown",
                    message: "Invalid item data."
                });
                hasErrors = true;
                continue;
            }

            // Find the medication in the pharmacy's inventory
            const medication = pharmacy.inventory.find(med => med.name === medicationName);

            if (!medication) {
                // Medication not found in inventory
                response.push({
                    medicationName,
                    message: `${medicationName} is not available in the inventory.`
                });
                hasErrors = true;
            } else if (medication.quantity >= quantity) {
                // If enough stock is available, deduct the quantity
                medication.quantity -= quantity;

                // Add success message to response
                response.push({
                    medicationName,
                    
                    remainingQuantity: medication.quantity
                });
            } else {
                // Not enough stock available
                response.push({
                    medicationName,
                    message: `We have less than ${quantity} of ${medicationName}. We have just ${medication.quantity} items available.`,
                    availableQuantity: medication.quantity
                });
                hasErrors = true;
            }
        }

        // Save the updated pharmacy document (if any deductions happened)
        await pharmacy.save();

        // Return the response array with success and error messages
        return res.status(hasErrors ? 400 : 200).json({
            message: hasErrors ? "Some items could not be processed." : "All items successfully processed.",
            items: response
        });

    } catch (error) {
        console.error('Error purchasing medications:', error);
        return res.status(500).json({ message: "Internal server error." });
    }
});
*/

router.post('/buy', async (req, res) => {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
        return res.status(400).json({ message: "Invalid items array." });
    }

    try {
        const pharmacy = await Pharmacy.findOne();
        if (!pharmacy) {
            return res.status(404).json({ message: "Pharmacy not found." });
        }

        let hasErrors = false;
        const response = items.map(({ name, purchaseQuantity }) => {
            const med = pharmacy.inventory.find((m) => m.name === name);
            if (!med) {
                hasErrors = true;
                return { name, error: "Medicine not found." };
            }
            if (med.quantity < purchaseQuantity) {
                hasErrors = true;
                return { name, error: "Insufficient stock.", available: med.quantity };
            }

            // Deduct quantity
            med.quantity -= purchaseQuantity;
            return { name, message: "Purchased successfully.", remaining: med.quantity };
        });

        // Save updated inventory
        await pharmacy.save();

        return res.status(hasErrors ? 400 : 200).json({
            message: hasErrors ? "Some items could not be purchased." : "Purchase completed successfully.",
            items: response,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
});
//router.post('/buy' er kaj holo din seshe ki poriman medicine sell hoise oita total quantity theke minus kore kototuku baki ase
//seta dekhano ar router.put('/medireco/...) er kaj stock e new quantity ashle seta increase kora and also medicine add kora jodi notun ashe both
router.put('/medireco/history/update',  async (req, res) => {
    

    const { updates } = req.body; // Array of update instructions
    if (!updates || !Array.isArray(updates)) {
        return res.status(400).json({ message: 'Invalid request: updates should be an array.' });
    }

    try {
        const results = [];
        for (const update of updates) {
            const { medicationId, newname, newdosage} = update;

            if (!medicationId) {
                results.push({ error: 'Medication ID is required for each update.' });
                continue;
            }

            const updateFields = {};
            if (newname) updateFields["inventory.$.name"] = newname;
            if (newdosage) updateFields["inventory.$.quantity"] = newdosage;
           

            const record = await Pharmacy.findOneAndUpdate(
                { "inventory._id": medicationId },
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


module.exports = router;


/*router.post('/buy/:namee', async (req, res) => {
    const { namee } = req.params;  // Pharmacy name
    const { medicationName, quantity } = req.body;  // User requested medication and quantity

    try {
        // Find the pharmacy by namee (correct field)
        const pharmacy = await Pharmacy.findOne({ namee: namee });

        if (!pharmacy) {
            return res.status(404).json({ message: "Pharmacy not found." });
        }

        // Find the medication in the pharmacy's inventory
        const medication = pharmacy.inventory.find(item => item.name === medicationName);

        if (!medication) {
            return res.status(404).json({ message: `${medicationName} is not available in the inventory.` });
        }

        // Check if the requested quantity is available
        if (medication.quantity >= quantity) {
            // Deduct the quantity
            medication.quantity -= quantity;

            // Save the updated pharmacy document
            await pharmacy.save();

            // Respond with a success message and the purchased medication details
            return res.status(200).json({
                message: `You successfully bought ${quantity} of ${medicationName}.`,
                purchasedItem: medication
            });
        } else {
            // Not enough quantity in the inventory
            return res.status(400).json({
                message: `We have less than ${quantity} items you wanted. We have just ${medication.quantity} ${medicationName} items available.`
            });
        }
    } catch (error) {
        console.error('Error purchasing medication:', error);
        return res.status(500).json({ message: "Internal server error." });
    }
});*/
module.exports = router;


/*router.post('/buy/:namee', async (req, res) => {
    const { namee } = req.params;
    const {  medicationName, quantity } = req.body;

    try {
        // Find the pharmacy by ID
        const pharmacy = await Pharmacy.findOne({ namee });

        if (!pharmacy) {
            return res.status(404).json({ message: 'Pharmacy not found' });
        }

        // Check if the medication exists in the inventory
        const medication = pharmacy.inventory.find(item => item.name === medicationName);

        if (!medication) {
            return res.status(404).json({ message: `The medication '${medicationName}' is not available in the inventory` });
        }

        // Check if the requested quantity is greater than the available quantity
        if (quantity > medication.quantity) {
            const shortage = quantity - medication.quantity;
            return res.status(400).json({
                message: `We have less than ${shortage} items you wanted. We have just ${medication.quantity} items in stock.`,
            });
        }

        // If the quantity is sufficient, proceed with the purchase
        medication.quantity -= quantity; // Reduce the available quantity

        // Save the updated pharmacy
        await pharmacy.save();

        // Respond with success and the bought item details
        res.json({
            message: `You bought ${quantity} of '${medicationName}' successfully.`,
            item: {
                name: medication.name,
                quantity: medication.quantity,
                expirationDate: medication.expirationDate,
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});*/