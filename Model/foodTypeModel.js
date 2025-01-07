// models/foodTypeModel.js

const mongoose = require('mongoose');

const FoodTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  proteinPer100g: { type: Number, required: true },
});

module.exports = mongoose.model('FoodType', FoodTypeSchema);
