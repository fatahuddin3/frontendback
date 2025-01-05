const mongoose = require('mongoose');
const prescriptionSchema = new mongoose.Schema({
    
    patientId: { type: mongoose.Schema.Types.ObjectId,ref:'Patient' },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    medications: [{
        _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
        name: String,
        dosage: String,
        frequency: String,
        duration: String,
    }],
    issueDate: { type: String,  },
    status: { type: String, }
}); module.exports = mongoose.model('Prescription', prescriptionSchema);

/*const mongoose = require('mongoose');
const prescriptionSchema = new mongoose.Schema({

    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    medications: [{


        name: String,
        dosage: String,
        frequency: String,
        duration: String,
    }],
    issueDate: { type: String, },
    status: { type: String, }
}); module.exports = mongoose.model('Prescription', prescriptionSchema);
*/
/*const mongoose = require('mongoose');
const prescriptionSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    medications: [{
        name: { type: String, required: true },
        dosage: { type: String, required: true },
        frequency: { type: String, required: true },
        duration: { type: String, required: true },
    }],
    issueDate: { type: Date, required: true },
    status: { type: String, default: 'active' },
}, { timestamps: true });
module.exports = mongoose.model('Prescription', prescriptionSchema);*/