// models/customerQueryModel.js

const mongoose = require('mongoose');

const customerQuerySchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    foodType: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model('CustomerQuery', customerQuerySchema);
