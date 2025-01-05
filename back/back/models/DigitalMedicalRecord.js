const mongoose = require('mongoose');

const digitalMedicalRecordSchema = new mongoose.Schema({

     patientId: { type: mongoose.Schema.Types.ObjectId,ref:'Patient' },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
   
    diagnosis: { type: String },
     medications: String,
     allergies: String,
     medicalHistory: [{
         condition: String,
         dateDiagnosed: String,
         status: String
     }],
     visitNotes: [{
         date: Date,
         note: String,
     }],
     labResults: [{
         testName: String,
         result: String,
         date: Date
     }],
     createdAt: { type: Date, default: Date.now },
     updatedAt: { type: Date, default: Date.now }
 
});
module.exports = mongoose.model('DigitalMedicalRecord', digitalMedicalRecordSchema);