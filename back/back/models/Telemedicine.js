const mongoose = require('mongoose');
const timeFormatRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9](am|pm)$/; 
// Consultation Schema
const consultationSchema = new mongoose.Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    symptoms: { type: String, },
    diagnosis: { type: String },
    prescription: { type: String },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    appointment_time: { type: Date,  },
    duration: { type: Number,  }, // in minutes
    notes: { type: String },    
    start_time: {
        type: String,
        validate: {
            validator: function (value) {
                return timeFormatRegex.test(value);  // Ensure the time matches the 12-hour format
            },
            message: 'Invalid time format for timefrom. Use "11:30am" or "4:08pm" format.'
        } },
    end_time: {
        type: String,
        validate: {
            validator: function (value) {
                return timeFormatRegex.test(value);  // Ensure the time matches the 12-hour format
            },
            message: 'Invalid time format for timefrom. Use "11:30am" or "4:08pm" format.'
        } },
    link: { type: String, },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});


 module.exports = mongoose.model('Consultation', consultationSchema);
{/*input type model e jeta deya frontend eo tai thakte hobe like: start_from ekhane type text coz model e type string deya so ekhane type time dile okhaneo tai korte hobe time dite hobe*/ }



/*const mongoose = require('mongoose');

// Consultation Schema
const consultationSchema = new mongoose.Schema({
    patient_id: { type: String, required: true },
    doctor_id: { type: String, required: true },
    symptoms: { type: String, required: true },
    diagnosis: { type: String },
    prescription: { type: String },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

// Schedule Schema
const scheduleSchema = new mongoose.Schema({
    patient_id: { type: String, required: true },
    doctor_id: { type: String, required: true },
    appointment_time: { type: Date, required: true },
    duration: { type: Number, required: true }, // in minutes
    notes: { type: String }
});

// Video Call Schema
const videoCallSchema = new mongoose.Schema({
    call_id: { type: String, required: true },
    consultation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultation', required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date },
    link: { type: String, required: true }
});

// Models
const Consultation = mongoose.model('Consultation', consultationSchema);
const Schedule = mongoose.model('Schedule', scheduleSchema);
const VideoCall = mongoose.model('VideoCall', videoCallSchema);

module.exports = { Consultation, Schedule, VideoCall };
*/