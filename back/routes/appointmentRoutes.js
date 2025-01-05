const express = require('express');
const { getAllAppointments, createAppointment } = require('../controllers/appointmentController');
const router = express.Router();

router.get('/', getAllAppointments);
router.post('/', createAppointment);

module.exports = router;
