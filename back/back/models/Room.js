const mongoose = require('mongoose');
const roomSchema = new mongoose.Schema({
    allocation_id: { type: String  }, // Unique allocation ID
    admission_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Admission'}, // Reference to Admission
    ward_type: { type: String, },
    preferences: {
        private_room: { type: Boolean },
        floor_preference: { type: Number }
    },
    room_number: { type: String,  },
    bed_number: { type: String, }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
