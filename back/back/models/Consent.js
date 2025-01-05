const mongoose = require('mongoose');

const consentSchema = new mongoose.Schema({
    consent_id: { type: String, required: true, unique: true }, // Unique consent ID
    admission_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Admission', required: true }, // Reference to Admission
    documents: [{
        type: { type: String, required: true }, // Document type (e.g., "Insurance", "Consent Form")
        url: { type: String, required: true } // Document storage URL
    }],
    consent: {
        signed_by: { type: String, required: true },
        relationship_to_patient: { type: String, required: true },
        date_signed: { type: Date, required: true }
    }
});

const Consent = mongoose.model('Consent', consentSchema);

module.exports = Consent;
