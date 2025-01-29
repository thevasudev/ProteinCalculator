// models/foodTypeModel.js
const mongoose = require('mongoose');

const FoodTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  proteinPer100g: { type: Number, required: true },
  energyPer100g: { type: Number, required: true },   // kcal per 100g
  carbsPer100g: { type: Number, required: true },    // carbs (grams) per 100g
  fiberPer100g: { type: Number, required: true },    // fiber (grams) per 100g
});

module.exports = mongoose.model('FoodType', FoodTypeSchema);
