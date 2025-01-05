/*const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
    admission_id: { type: String, }, // Unique admission ID
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', }, // Reference to Patient
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor',  }, // Reference to Doctor
    recommendation_details: {
        reason_for_admission: { type: String, required: true },
        preferred_ward: { type: String, required: true }
    },
    room_allocation: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Room'
    }, // Reference to Room allocation (if any)
    consent: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Consent'
    }, // Reference to Consent record
    assessments: [
        {
        type: mongoose.Schema.Types.ObjectId, ref: 'Assessment'
        }
    ], // References to multiple assessments
    admission_date: { type: Date, default: Date.now }
});

const Admission = mongoose.model('IpdaAdmission', admissionSchema);

module.exports = Admission;*/
//below code full real
const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
    admission_id: { type: String }, // No `unique` constraint here unless it's used intentionally
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    recommendation_details:[
    {
        reason_for_admission: { type: String, required: true },
        preferred_ward: { type: String, required: true }
        },
    ],

    room_allocation: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    consent: { type: mongoose.Schema.Types.ObjectId, ref: 'Consent' },
    assessments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assessment' }],
    admission_date: { type: Date, default: Date.now }
});

const Admission = mongoose.model('IpdaAdmission', admissionSchema);
module.exports = Admission;

//above code and below both are right but above accepts recommendation_details array and save array in mongodb where
//below don't accept array but accept object and save object in mongodb

/*const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
    admission_id: { type: String }, // No `unique` constraint here unless it's used intentionally
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    recommendation_details: 
        {
            reason_for_admission: { type: String, required: true },
            preferred_ward: { type: String, required: true }
        },
   
    room_allocation: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    consent: { type: mongoose.Schema.Types.ObjectId, ref: 'Consent' },
    assessments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assessment' }],
    admission_date: { type: Date, default: Date.now }
});

const Admission = mongoose.model('IpdaAdmission', admissionSchema);
module.exports = Admission;
*/


