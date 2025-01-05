const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // For password hashing
const validator = require('validator');  // For email & phone validation

const Ipdnurse = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'realuser' },
    name: {
        type: String,
        
    },
    specialization: {
        type: String,

    },
    task: {
        type: String,
    },
    status: {
        type:String,
    },
    actvity: {
        type: String,
    },
    notes: {
        type: String,
    },
    phone: {
        type: String,

    },
    tasksAssigned: [
        {
            patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
            task: String,
            priority: String,
            scheduled_time: Date,
            status: { type: String, default: 'Pending' }
        }
    ],
   
    shifts: [
        {
            start_time: { type: Date, required: true },
            end_time: { type: Date, required: true },
            assigned_patients: [
                { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }
            ]
        }
    ],
    //day,noon,morning
    activityLogs: [
        {
            patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
            activity: String,
            timestamp: { type: Date, default: Date.now },
            notes: String
        }
    ],
    /*treatment_summary_disc_patient: {
        type: String,

    },
    medications_for_disch_patient: [{
        patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
        name: {
            type: String,

        },
        dose: {
            type: String,

        },
        frequency: {
            type: String,

        },
        duration: {
            type: String,
            required: true
        }
    }],*/

    discharge_records: [{
        treatment_summary_disc_patient: { type: String },
        medications_for_disch_patient: [{
            patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
            patient_name: { type: String },
            name: { type: String },
            dose: { type: String },
            frequency: { type: String },
            duration: { type: String, required: true }
        }],
        timestamp: { type: Date, default: Date.now }  // Record when it was added
    }],

    email: {
        type: String,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);  // Validate email
            },
            message: 'Invalid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    recentlyRegistered: {
        type: Boolean,
        default: true  // Set to true by default when a doctor is registered
    },
    registrationTime: {
        type: Date,
        default: Date.now  // Store the registration time
    },
    timestamp: { type: Date, default: Date.now },
    experience: { type: Number, },
});

// Hash the password before saving it to the database
Ipdnurse.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare entered password with the hashed one in the DB
Ipdnurse.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Ipdnurse', Ipdnurse);

