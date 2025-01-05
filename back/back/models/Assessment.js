const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
    assessment_id: { type: String }, 
    admission_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Admission' },
    vitals: {
        temperature: { type: Number },
        blood_pressure: { type: String },
        pulse: { type: Number },
        respiration_rate: { type: Number }
    },
    notes: { type: String },
    nurse_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ipdnurse' },
    assessment_date: { type: Date, default: Date.now }
});

const Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = Assessment;



