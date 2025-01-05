const mongoose = require('mongoose');

const nurseActivityLogSchema = new mongoose.Schema({
    nurse: { type: mongoose.Schema.Types.ObjectId, ref: 'Ipdnurse', required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    activity: { type: String, required: true },  // Activity performed
    timestamp: { type: Date, default: Date.now }, // Activity time
    notes: { type: String } // Optional additional details
}, { timestamps: true });

module.exports = mongoose.model('NurseActivityLog', nurseActivityLogSchema);
