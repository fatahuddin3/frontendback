/*const mongoose = require('mongoose');
const appointmentSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    date: { type: String },
    reason: { type: String },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
*/
const mongoose = require('mongoose');
const timeFormatRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9](am|pm)$/;  // Regex to validate time format

const appointmentSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    date: { type: Date },  // Date as a string (e.g., '2024-09-09')
    reason: { type: String },  // Reason for the appointment
    timefrom: {
        type: String,
        validate: {
            validator: function (value) {
                return timeFormatRegex.test(value);  // Ensure the time matches the 12-hour format
            },
            message: 'Invalid time format for timefrom. Use "11:30am" or "4:08pm" format.'
        }
    },
    timeto: {
        type: String,
        validate: {
            validator: function (value) {
                return timeFormatRegex.test(value);  // Ensure the time matches the 12-hour format
            },
            message: 'Invalid time format for timeto. Use "11:30am" or "4:08pm" format.'
        }
    },
    /*status: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'],
        default: 'Pending'
    }*/
});

module.exports = mongoose.model('Appointment', appointmentSchema);
