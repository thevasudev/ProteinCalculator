// controllers/foodController.js

const Food = require('../Model/foodModel');
const FoodType = require('../Model/foodTypeModel');

// Helper function to calculate calories to burn for protein
const calculateCaloriesToBurn = (protein) => {
  return (protein * 1.5).toFixed(2); // Using 1.5 calories per gram of protein
};

// Create a single food entry
exports.createFood = async (req, res) => {
  try {
    const { foodType, grams } = req.body;

    // Validate request body
    if (!foodType || !grams) {
      return res.status(400).json({ error: 'foodType and grams are required.' });
    }

    // Find food type in database
    const foodData = await FoodType.findOne({ name: foodType.toLowerCase() });

    if (!foodData) {
      return res.status(400).json({ error: `Unknown food type: ${foodType}` });
    }

    // Calculate protein and calories to burn
    const calculatedProtein = ((foodData.proteinPer100g * grams) / 100).toFixed(2);
    const caloriesToBurn = calculateCaloriesToBurn(calculatedProtein);

    // Create and save new food entry
    const newFood = new Food({
      foodType: foodData.name,
      grams: Number(grams),
      protein: Number(calculatedProtein),
      caloriesToBurn: Number(caloriesToBurn),
    });

    await newFood.save();

    return res.status(201).json({
      message: 'Food created successfully',
      food: newFood,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Create multiple food entries// Create multiple food entries
exports.createMultipleFoods = async (req, res) => {
    try {
      const { foods } = req.body;
  
      // Validate request body
      if (!foods || !Array.isArray(foods) || foods.length === 0) {
        return res.status(400).json({ error: 'Please provide an array of foods.' });
      }
  
      const processedFoods = [];
      let totalProtein = 0;
      let totalCaloriesToBurn = 0;
  
      // Process each food item
      for (const item of foods) {
        const { foodType, grams } = item;
  
        if (!foodType || !grams) {
          return res.status(400).json({ error: 'Each food must have foodType and grams.' });
        }
  
        const foodData = await FoodType.findOne({ name: foodType.toLowerCase() });
  
        if (!foodData) {
          return res.status(400).json({ error: `Unknown food type: ${foodType}` });
        }
  
        const calculatedProtein = ((foodData.proteinPer100g * grams) / 100).toFixed(2);
        const caloriesToBurn = calculateCaloriesToBurn(calculatedProtein);
  
        processedFoods.push({
          foodType: foodData.name,
          grams: Number(grams),
          protein: Number(calculatedProtein),
          caloriesToBurn: Number(caloriesToBurn),
        });
  
        totalProtein += Number(calculatedProtein);
        totalCaloriesToBurn += Number(caloriesToBurn);
      }
  
      // Create and save document with multiple food entries
      const newFoodDocument = new Food({
        foods: processedFoods,
        totalProtein: totalProtein.toFixed(2),
        totalCaloriesToBurn: totalCaloriesToBurn.toFixed(2), // Ensure this is saved
      });
  
      await newFoodDocument.save();
  
      return res.status(201).json({
        message: 'Multiple foods created successfully',
        document: {
          foods: processedFoods,
          totalProtein: totalProtein.toFixed(2),
          totalCaloriesToBurn: totalCaloriesToBurn.toFixed(2), // Include this in the response
          _id: newFoodDocument._id,
          createdAt: newFoodDocument.createdAt,
          updatedAt: newFoodDocument.updatedAt,
          __v: newFoodDocument.__v,
        },
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  