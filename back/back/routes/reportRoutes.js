/*const express = require('express');
const Report = require('../models/Report');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const report = await Report.findOne();

        if (!report) {
            return res.status(404).json({ message: 'No report data found' });
        }

        const totalActions = report.totalDoctorsRegistered;
        const percentageAdded = (report.totalDoctorsAdded / totalActions) * 100;
        const percentageUpdated = (report.totalDoctorsUpdated / totalActions) * 100;
        const percentageDeleted = (report.totalDoctorsDeleted / totalActions) * 100;

        return res.status(200).json({
            totalDoctorsRegistered: report.totalDoctorsRegistered,
            totalDoctorsAdded: report.totalDoctorsAdded,
            totalDoctorsUpdated: report.totalDoctorsUpdated,
            totalDoctorsDeleted: report.totalDoctorsDeleted,
            percentageAdded: percentageAdded.toFixed(2) + '%',
            percentageUpdated: percentageUpdated.toFixed(2) + '%',
            percentageDeleted: percentageDeleted.toFixed(2) + '%'
        });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
*/
/*const express = require('express');
const Report = require('../models/Report');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const report = await Report.findOne();

        if (!report) {
            return res.status(404).json({ message: 'No report data found' });
        }
        
        const totalAppointments = report.totalAppointmentsCreated;
        const totalActions = report.totalDoctorsRegistered;
          // Total number of appointments created
        const totalPatientActions = report.totalPatientsRegistered;
        const percentageAdded = (report.totalDoctorsAdded / totalActions) * 100;
        const percentageUpdated = (report.totalDoctorsUpdated / totalActions) * 100;
        const percentageDeleted = (report.totalDoctorsDeleted / totalActions) * 100;
        const patientPercentageAdded = (report.totalPatientsAdded / totalPatientActions) * 100;
        const patientPercentageUpdated = (report.totalPatientsUpdated / totalPatientActions) * 100;
        const patientPercentageDeleted = (report.totalPatientsDeleted / totalPatientActions) * 100;
        *//*const AppointAdded = (report.totalAppointmentsCreated / totalAppointments) * 100;
        const AppointUpdated = (report.totalAppointmentsUpdated / totalAppointments) * 100; 
        const AppointDeleted = (report.totalAppointmentsDeleted / totalAppointments) * 100;*//*
        return res.status(200).json({
            totalDoctorsRegistered: report.totalDoctorsRegistered,
            totalDoctorsAdded: report.totalDoctorsAdded,
            totalDoctorsUpdated: report.totalDoctorsUpdated,
            totalDoctorsDeleted: report.totalDoctorsDeleted,
           
            percentageAdded: percentageAdded.toFixed(2) + '%',
            percentageUpdated: percentageUpdated.toFixed(2) + '%',
            percentageDeleted: percentageDeleted.toFixed(2) + '%',

           
            totalAppointmentsCreated: totalAppointments,
            
            totalAppointUpdated: report.totalDoctorsUpdated,
            totalAppointDeleted: report.totalDoctorsDeleted,

            totalPatientsRegistered: report.totalPatientsRegistered,
            totalPatientsAdded: report.totalPatientsAdded,
            totalPatientsUpdated: report.totalPatientsUpdated,
            totalPatientsDeleted: report.totalPatientsDeleted,
            patientPercentageAdded: patientPercentageAdded.toFixed(2) + '%',
            patientPercentageUpdated: patientPercentageUpdated.toFixed(2) + '%',
            patientPercentageDeleted: patientPercentageDeleted.toFixed(2) + '%',
        });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;*/
const express = require('express');
const Report = require('../models/Report');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const report = await Report.findOne();

        if (!report) {
            return res.status(404).json({ message: 'No report data found' });
        }
        const totalAppointments = report.totalAppointmentsCreated;
        // Ensure values exist to prevent NaN and undefined
        const totalDoctorsRegistered = report.totalDoctorsRegistered || 0;
        const totalDoctorsAdded = report.totalDoctorsAdded || 0;
        const totalDoctorsUpdated = report.totalDoctorsUpdated || 0;
        const totalDoctorsDeleted = report.totalDoctorsDeleted || 0;

        const totalPatientsRegistered = report.totalPatientsRegistered || 0;
        const totalPatientsAdded = report.totalPatientsAdded || 0;
        const totalPatientsUpdated = report.totalPatientsUpdated || 0;
        const totalPatientsDeleted = report.totalPatientsDeleted || 0;

        const totalActions = totalDoctorsRegistered || 1;  // Avoid division by zero

        // Percentages (Doctor)
        const doctorPercentageAdded = (totalDoctorsAdded / totalActions) * 100;
        const doctorPercentageUpdated = (totalDoctorsUpdated / totalActions) * 100;
        const doctorPercentageDeleted = (totalDoctorsDeleted / totalActions) * 100;

        // Percentages (Patient) - similar logic
        const patientPercentageAdded = (totalPatientsAdded / totalPatientsRegistered || 1) * 100;
        const patientPercentageUpdated = (totalPatientsUpdated / totalPatientsRegistered || 1) * 100;
        const patientPercentageDeleted = (totalPatientsDeleted / totalPatientsRegistered || 1) * 100;

        return res.status(200).json({
            // Doctor Stats
            totalDoctorsRegistered,
            totalDoctorsAdded,
            totalDoctorsUpdated,
            totalDoctorsDeleted,
            doctorPercentageAdded: doctorPercentageAdded.toFixed(2) + '%',
            doctorPercentageUpdated: doctorPercentageUpdated.toFixed(2) + '%',
            doctorPercentageDeleted: doctorPercentageDeleted.toFixed(2) + '%',
            totalAppointmentsCreated: totalAppointments,
            // Patient Stats
            totalPatientsRegistered,
            totalPatientsAdded,
            totalPatientsUpdated,
            totalPatientsDeleted,
            patientPercentageAdded: patientPercentageAdded.toFixed(2) + '%',
            patientPercentageUpdated: patientPercentageUpdated.toFixed(2) + '%',
            patientPercentageDeleted: patientPercentageDeleted.toFixed(2) + '%'
        });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
