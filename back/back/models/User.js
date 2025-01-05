/*const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');  // Corrected import

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please provide email'],
        
    },
    username: {
        type: String,
        required: [true, 'Please provide username'],
       
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
    },
    activated: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        token: { type: String },
        expires: { type: Date }
    },
    firstName: {
        type: String,
        required: [true, 'Please provide first name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please provide last name'],
    },
    userType: {
        type: String,
        required: true,
        enum: ['Admin', 'Patient', 'Doctor'],
    }
}, {
    timestamps: true
});

// Use mongoose-unique-validator plugin
UserSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

// Hashing password
UserSchema.pre('save', function (next) {
    const user = this;

    bcrypt.hash(user.password, 10, (error, hash) => {
        if (error) return next(error);
        user.password = hash;
        next();
    });
});

UserSchema.pre('updateOne', function (next) {
    const password = this.getUpdate().$set.password;
    if (!password) {
        return next();
    }
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return next(err);
        this.getUpdate().$set.password = hash;
        next();
    });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
*/

// models/User.js
//main
/*const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
       
    },
    email: {
        type: String,
        
       
    },
    password: {
        type: String,
        
    },
    role: {
        type: String,
        enum: ['admin', 'doctor', 'patient'],
       
    },
}, { timestamps: true   });

// Password hashing middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Password validation
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('realuser', userSchema);
*/

// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true,  },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'doctor', 'patient','staff','nurse'], required: true }
}, { timestamps: true });

// Password hashing middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Password validation
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('realuser', userSchema);
