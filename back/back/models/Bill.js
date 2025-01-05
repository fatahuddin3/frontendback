/*const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    patientName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['unpaid', 'paid'],
        default: 'unpaid'
    },
    issueDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Bill', billSchema);
*/

const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    patientName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    inventory: [{


        
        name: { type: String },  // Name of the medication
        quantity: { type: Number },  // Quantity available
        expirationDate: { type: String }  // Expiration date
    }],
    status: {
        type: String,
        enum: ['unpaid', 'paid'],
        default: 'unpaid'
    },
    issueDate: {
        type: String,
        
        
    }
});

module.exports = mongoose.model('Bill', billSchema);