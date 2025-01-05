const express = require("express");
const router = express.Router();


const {
    getPatients,
    getPatientById,
    savePatient,
    updatePatient,
    deletePatient,
  
} = require('../controllers/PatientController')



router.get('/patients', getPatients);
router.get('/patients/:id', getPatientById);
router.post('/patients', savePatient);
router.patch('/patients/:id', updatePatient);
router.delete('/patients/:id', deletePatient);



module.exports = router