/*const mongoose = require('mongoose');

// Define the Medication schema
const medicationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dose: { type: String, required: true },
    administered_by: { type: String, required: true },
    time_administered: { type: Date, required: true }
});

// Define the Admission schema
const admissionSchema = new mongoose.Schema({
    admission_id: { type: String, required: true, unique: true },
    medication: [medicationSchema]
});

// Create the Mongoose model
const Admission = mongoose.model('Admission', admissionSchema);

module.exports = Admission;*/

const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
    patientId: { type: String, },
    medication: [{
        name: { type: String, },
        dose: { type: String,  },
        administeredby: { type: String,  },
        timeadministered: { type: String, }
    }]
});
const Admission = mongoose.model('Admission', admissionSchema);

module.exports = Admission;
