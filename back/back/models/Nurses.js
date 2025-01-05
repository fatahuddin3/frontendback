/*const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const NurseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'realuser' },
    name: { type: String, },
    age: { type: Number, },
    specialization: { type: String, },
    shift: { type: String, }, // e.g., 'Morning', 'Evening', 'Night'
    phone: { type: String,  },
    password: { type: String,  },
    email: {
        type: String, validate: {
            validator: function (value) {
                return validator.isEmail(value);  // Validate email
            },
            message: 'Invalid email'
        },  },
   
    experience: { type: Number, }, // in years
});
NurseSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare entered password with the hashed one in the DB
NurseSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Nurse', NurseSchema);
*/

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
    department: { type: String }, // Optional: e.g., "Cardiology", "ICU"
    assigned_patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }], 

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
    shift: { type: String, },
    experience: { type: Number, }, 
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

module.exports = mongoose.model('Nurse', doctorSchema);