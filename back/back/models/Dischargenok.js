const mongoose = require('mongoose');
const DischargeSchema = new mongoose.Schema({
    dischargeId: {
        type: String,
        required: true,
    },
    dischargedate: {
        type: String,
    },
    discharge_summary: {
        treatment_summary: {
            type: String,
        },
        medications_to_continue: [{
            name: {
                brand_name: {
                    type: String,  // e.g., Tylenol
                    required: true
                },
                generic_name: {
                    type: String,  // e.g., Acetaminophen
                    required: true
                },
                manufacturer: {
                    type: String,  // e.g., Pfizer, GSK
                }
            },
            dose: {
                amount: {
                    type: Number,  // e.g., 500
                    required: true
                },
                unit: {
                    type: String,  // e.g., mg, ml
                    required: true
                },
                form: {
                    type: String,  // e.g., tablet, capsule, injection
                    required: true
                },
                instructions: {
                    type: String,  // e.g., before meals, with water
                }
            },
            frequency: {
                times_per_day: {
                    type: Number,  // e.g., 2
                    required: true
                },
                interval: {
                    type: String,  // e.g., every 8 hours, once daily
                    required: true
                },
                timing: {
                    type: String,  // e.g., morning, evening, before bedtime
                }
            },
            duration: {
                length: {
                    type: Number,  // e.g., 7
                    required: true
                },
                unit: {
                    type: String,  // e.g., days, weeks, months
                    required: true
                },
                special_instructions: {
                    type: String,  // e.g., continue until symptoms subside
                }
            }
        }],
        follow_up_date: {
            type: String,
            required: true
        }
    }
});

// Model creation
const Discharge = mongoose.model('Disch', DischargeSchema);

module.exports = Discharge;
