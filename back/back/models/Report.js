const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    totalDoctorsRegistered: {
        type: Number,
        default: 0
    },
    totalDoctorsUpdated: {
        type: Number,
        default: 0
    },
    totalDoctorsDeleted: {
        type: Number,
        default: 0
    },
    totalDoctorsAdded: {
        type: Number,
        default: 0
    }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
