
const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    // You can add more fields if needed, e.g.:
    // category: { type: String, default: 'General' },
    // isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('FAQ', faqSchema);
