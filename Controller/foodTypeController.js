// controllers/foodTypeController.js

const FoodType = require('../Model/foodTypeModel');

// Add a new food type
exports.addFoodType = async (req, res) => {
  try {
    const {
      name,
      proteinPer100g,
      energyPer100g,
      carbsPer100g,
      fiberPer100g
    } = req.body;

    // Validate request body
    if (
      !name ||
      proteinPer100g == null ||
      energyPer100g == null ||
      carbsPer100g == null ||
      fiberPer100g == null
    ) {
      return res.status(400).json({ 
        error: 'name, proteinPer100g, energyPer100g, carbsPer100g, and fiberPer100g are required.'
      });
    }

    // Create and save new food type
    const newFoodType = new FoodType({
      name: name.toLowerCase(),
      proteinPer100g,
      energyPer100g,
      carbsPer100g,
      fiberPer100g,
    });

    await newFoodType.save();

    return res.status(201).json({
      message: 'Food type added successfully',
      foodType: newFoodType,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all food types
exports.getAllFoodTypes = async (req, res) => {
  try {
    const foodTypes = await FoodType.find();
    return res.json(foodTypes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a food type by ID
exports.deleteFoodType = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID is provided
    if (!id) {
      return res.status(400).json({ error: 'Food type ID is required.' });
    }

    // Find and delete the food type by ID
    const deletedFoodType = await FoodType.findByIdAndDelete(id);

    if (!deletedFoodType) {
      return res.status(404).json({ error: 'Food type not found.' });
    }

    return res.json({
      message: 'Food type deleted successfully',
      foodType: deletedFoodType,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
