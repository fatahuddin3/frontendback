/*const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
       
    },
    age: {
        type: Number,
        
    },
    gender: {
        type: String,
        
    },
    address: {
        type: String,
        
    },
    contactNumber: {
        type: String,
        required: true,
    },
    medicalHistory: {
        type: String,
       
    },
    

});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;*/
/*const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    },
    address: {
        type: String,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    medicalHistory: {
        type: String,
    },
    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true // Add this to include `createdAt` and `updatedAt`
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;*/
//real code below
/*const mongoose = require('mongoose');
// Define schema for storing patient info
const patientSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    },
    address: {
        type: String,
    },
    contactNumber: {
        type: String,
        
    },
    medicalHistory: {
        type: String,
    },
    image: {
        type: String, // URL to the uploaded image
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Includes `createdAt` and `updatedAt`
});

// Model for Patient
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
*/

// models/Patient.js
/*const mongoose = require('mongoose');
const User = require('./user');

const patientSchema = new mongoose.Schema({
    age: Number,
    gender: String,
    address: String,
    contactNumber: String,
    medicalHistory: String,
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    image: String,

}, { timestamps: true });

const Patient = User.discriminator('Patie', patientSchema);

module.exports =  Patient;*/

// models/patient.js
//real apatoto
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'realuser' },
    name:String,
    age: Number,
    gender: String,
    address: String,
    contactNumber: String,
    medicalHistory: String,
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },//ref: 'realsusers' hobe
    nurse: { type: mongoose.Schema.Types.ObjectId, ref: 'Ipdnurse' },
    
    image: String,
    assignedTasks: [
        {
            task: String,
            nurse: { type: mongoose.Schema.Types.ObjectId, ref: 'Ipdnurse' },
            priority: String,
            scheduled_time: Date,
            status: { type: String, default: 'Pending' },
            completed_time: { type: Date } 
        }
    ],
    insurance_details: {
        provider: { type: String },
        policy_number: { type: String }
    },
    admission_history: [
        {
            admission_id: { type: String,  }, // Reference to admission
            ward_type: { type: String }, // e.g., "General Ward"
            room_details: {
                room_number: { type: String },
                bed_number: { type: String }
            },
            admitted_on: { type: Date },
            discharged_on: { type: Date }
        }
    ],
    assigned_staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Nurse' },//ref:'Staff' chilo age
    uhid: { type: String,  },
    dischargedate: {
        type: Date,
       
    },
    emergency_contact: {
        name: { type: String },
        phone: { type: String}
    },

    discharge_records: [{
        treatment_summary: { type: String },
        medications_to_continue: [{
            nurse: { type: mongoose.Schema.Types.ObjectId, ref: 'Ipdnurse' },
            name: { type: String },
            dose: { type: String },
            frequency: { type: String },
            duration: { type: String, }
        }],
        timestamp: { type: Date, default: Date.now }  // Record when it was added
    }],
    
    dischargeStatus: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },

    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);


// models/patient.js  User.discriminator('Patient', patientSchema); problem solved
/*const mongoose = require('mongoose');
const User = require('./user');

let Patient; // Declare Patient variable
try {
    Patient = mongoose.model('Patient'); // Try to retrieve existing model
} catch (error) {
    if (error.name === 'MissingSchemaError') {
        const patientSchema = new mongoose.Schema({
            age: Number,
            gender: String,
            address: String,
            contactNumber: String,
            medicalHistory: String,
            doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
            *//*image: String,*//*
        }, { timestamps: true });
        Patient = User.discriminator('Patient', patientSchema); // Define discriminator if it doesn't exist
    } else {
        throw error; // Throw error if it's not a schema error
    }
}

module.exports = Patient;
*/