const mongoose = require('mongoose');
  
const appointmentSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    date: { type: Date },  
    reason: { type: String },  
    timefrom: {
        type: String,
        
    },
    timeto: {
        type: String,
       
    }
});

module.exports = mongoose.model('Book', appointmentSchema);