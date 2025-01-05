const mongoose = require('mongoose');


const IpdAdmissionSchema = new mongoose.Schema({
    patientId: {
        type: String,


    },
    name: {
        type: String,

    },
    age: {
        type: Number,

    },
    gender: {
        type: String,


    },
    admissiondate: {
        type: Date,

        default: Date.now
    },
    doctorId: {
        type: String,
        required: true
    },
    wardno: {
        type:Number,
        required: true
    },
    bedno: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true
    },

},);

// Create the model for IPD Admission
const IpdAdmission = mongoose.model('IpdAdmission', IpdAdmissionSchema);
module.exports = IpdAdmission;