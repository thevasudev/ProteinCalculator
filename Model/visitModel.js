const mongoose = require('mongoose');

// Schema for Visit Count
const visitSchema = new mongoose.Schema({
    count: {
        type: Number,
        default: 0,
        required: true,
    },
});

// Export the model
module.exports = mongoose.model('Visit', visitSchema);
