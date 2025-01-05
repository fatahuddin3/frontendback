/*const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Doctor', doctorSchema);
*/
/*const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // For password hashing
const validator = require('validator');  // For email & phone validation

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        
        trim: true
    },
    specialization: {
        type: String,
        
    },
    phone: {
        type: String,
        
       
    },
    email: {
        type: String,
        
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);  // Validate email
            },
            message: 'Invalid email'
        }
    },
    password: {
        type: String,
       
        minlength: 6
    }
});

// Hash the password before saving it to the database
doctorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare entered password with the hashed one in the DB
doctorSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Doctor', doctorSchema);*/

//real code
/*const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // For password hashing
const validator = require('validator');  // For email & phone validation

const doctorSchema = new mongoose.Schema({
   
    name: {
        type: String,
        trim: true,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
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
    role: {
        type: String,
        enum: [ 'doctor', 'patient'],

    },
});

// Hash the password before saving it to the database
doctorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare entered password with the hashed one in the DB
doctorSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Doctor', doctorSchema);*/

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // For password hashing
const validator = require('validator');  // For email & phone validation

const doctorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'realuser' },
    name: {
        type: String,
        trim: true,
        required: true
    },
    specialization: {
        type: String,
       
    },
    //extra 2 below
    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }], // Patients under care
    schedule: [
        {
            day: { type: String }, // e.g., "Monday", "Tuesday"
            time_slots: [{ type: String }] // e.g., "9 AM - 11 AM"
        }
    ],

    phone: {
        type: String,
       
    },
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
    
});

// Hash the password before saving it to the database
doctorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare entered password with the hashed one in the DB
doctorSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Doctor', doctorSchema);

// models/Doctor.js
/*const mongoose = require('mongoose');
const User = require('./user');

const doctorSchema = new mongoose.Schema({
    specialization: {
        type: String,
        
    },
    phone: {
        type: String,
        
    },
    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }]
}, { timestamps: true });

const Doctor = User.discriminator('Doctor', doctorSchema);
module.exports = Doctor;*/
