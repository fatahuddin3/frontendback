/*const mongoose = require('mongoose');

const MedicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dose: {
        type: String,
        required: true
    },
    frequency: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    }
});

const DischargeSummarySchema = new mongoose.Schema({
    treatment_summary: {
        type: String,
        required: true
    },
    medications_to_continue: {
        type: [MedicationSchema], // Embedded array of Medication objects
        required: true
    },
    follow_up_date: {
        type: String,
        required: true
    }
});

const DischargeSchema = new mongoose.Schema({
    dischargeId: {
        type: String,
        required: true,
       
    },
    dischargedate: {
        type: String,
        
    },
    discharge_summary: {
        type: DischargeSummarySchema, // Embedded object for discharge summary
        
    }
});

const Dischargee = mongoose.model('Discharge', DischargeSchema );

module.exports = Dischargee;*/

const mongoose = require('mongoose');

// Define the unified schema
const DischargeSchema = new mongoose.Schema({
    dischargeId: {
        type: String,
        required: true,
    },
    dischargedate: {
        type: String,
    },
    discharge_summary: {
        treatment_summary: {
            type: String,
            
        },
        medications_to_continue: [{
            name: {
                type: String,
                
            },
            dose: {
                type: String,
               
            },
            frequency: {
                type: String,
               
            },
            duration: {
                type: String,
                required: true
            }
        }],
        follow_up_date: {
            type: String,
            required: true
        }
    }
});

// Model creation
const Discharge = mongoose.model('Discharge', DischargeSchema);

module.exports = Discharge;
