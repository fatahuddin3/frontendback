const express = require('express');
const router = express.Router();
const { createPatient, getPatients } = require('../controllers/patientController');

// POST request to add a new patient
router.post('/', createPatient);

// GET request to retrieve all patients
router.get('/', getPatients);

module.exports = router;

/*
const express = require('express');
const router = express.Router();
const { createPatient, getPatients } = require('../controllers/patientController');
router.post('/', createPatient);
router.get('/', getPatients);
module.exports = router;*/