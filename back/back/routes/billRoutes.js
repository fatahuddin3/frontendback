const express = require('express');
const Bill = require('../models/Bill');
const Doctor = require('../models/Doctor');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const jwt = require('jsonwebtoken');
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '200d',
    });
};
// Create a new bill
router.post('/create', async (req, res) => {
    const { doctorId, patientName, amount } = req.body;
    //bill ta create korar power sudhu pharmacist er
    try {
        // Check if the doctor exists
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Create a new bill
        const bill = await Bill.create({
            doctor: doctorId,
            patientName,
            amount,
        });

        return res.status(201).json(bill);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/bi', async (req, res) => {

    try {
        const record = new Bill(req.body);
        await record.save();
        res.status(201).send({ record, token: generateToken(record._id) });
    } catch (err) {
        res.status(400).send(err.message);
    }
});
// Get all bills
router.get('/', authMiddleware, async (req, res) => {
    try {
        const bills = await Bill.find().populate('doctor', 'name specialization');
        return res.status(200).json(bills);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a single bill by ID
router.get('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;

    try {
        const bill = await Bill.findById(id).populate('doctor', 'name specialization');
        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }
        return res.status(200).json(bill);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Update bill status
router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const bill = await Bill.findById(id);
        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }

        // Update bill status
        bill.status = status;
        await bill.save();

        return res.status(200).json(bill);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
router.put('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;  // Expecting new status in the body (e.g., 'paid')

        const bill = await Bill.findById(id);

        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }

        bill.status = status;  // Update the status
        await bill.save();  // Save changes to the database

        return res.status(200).json({ message: 'Bill status updated successfully', bill });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating bill status', error });
    }
});

// Delete a bill
router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;

    try {
        const bill = await Bill.findById(id);
        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }

        // Delete the bill
        await bill.deleteOne();
        return res.status(200).json({ message: 'Bill deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
// Get total revenue from paid bills
router.get('/total-revenue', authMiddleware, async (req, res) => {
    try {
        const totalRevenue = await Bill.aggregate([
            { $match: { status: 'paid' } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        return res.status(200).json({
            totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
