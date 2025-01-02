const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema(
  {
    foods: [
      {
        foodType: { type: String, required: true },
        grams: { type: Number, required: true },
        protein: { type: Number, required: true },
      },
    ],
    totalProtein: { type: Number, required: true }, // Total protein for all foods in this document
  },
  {
    timestamps: true, // Optional for tracking creation and update times
  }
);

module.exports = mongoose.model('Food', FoodSchema);
