const express = require('express');
const { getAllDoctors, createDoctor } = require('../controllers/doctorController');
const router = express.Router();

router.get('/', getAllDoctors);
router.post('/', createDoctor);

module.exports = router;
