const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const patientSchema = new mongoose.Schema({
    
    name: String,
    age: Number,
    gender: String,
    address: String,
    contactNumber: String,
    email: String,
   password:String,

    image: String,
   
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });
patientSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
patientSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
module.exports = mongoose.model('user', patientSchema);