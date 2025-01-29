// models/foodModel.js
const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema(
  {
    foods: [
      {
        foodType: { type: String, required: true },
        grams: { type: Number, required: true },
        protein: { type: Number, required: true },
        energy: { type: Number, required: true },      // energy in kcal
        carbs: { type: Number, required: true },       // carbohydrates in grams
        fiber: { type: Number, required: true },       // fiber in grams
        caloriesToBurn: { type: Number, required: true },
      },
    ],
    totalProtein: { type: Number, required: true },
    totalEnergy: { type: Number, required: true },       // sum of all kcal
    totalCarbs: { type: Number, required: true },        // sum of all carbs (grams)
    totalFiber: { type: Number, required: true },        // sum of all fiber (grams)
    totalCaloriesToBurn: { type: Number, required: true },
  },
  {
    timestamps: true, // Optional for tracking creation and update times
  }
);

module.exports = mongoose.model('Food', FoodSchema);
