/*const mongoose = require('mongoose');
const Pharmacy = {
     // Unique identifier for the pharmacy
    namee: String,  // Name of the pharmacy
    location: String,  // Physical location of the pharmacy
    inventory: [{
          // Unique identifier for the medication
        name: String,  // Name of the medication
        quantity: Number,  // Quantity available in the pharmacy
        expirationDate: String  // Expiration date of the medication
    }],
    workingHours: {
        open: String,  // Opening time
        close: String,  // Closing time
        days: [String]  // Days of operation
    },
    contactInfo: {
        phone: String,  // Contact phone number
        email: String  // Contact email address
    }
}; module.exports = mongoose.model('Pharmacy', Pharmacy);
*/

const mongoose = require('mongoose');
const Pharmacy = {
  
    name: { type: String, required: true }, 
    inventory: [{


        _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
        name: { type: String  },  // Name of the medication
        quantity: { type: Number  },  // Quantity available
        expirationDate: { type: String  }  // Expiration date
    }],
    
}; module.exports = mongoose.model('Pharmacy', Pharmacy);
