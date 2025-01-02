// backend/controllers/foodController.js

const Food = require('../Model/foodModel');

// Reference DB with known foods (protein per 100g)
const foodDB = {
  banana: { proteinPer100g: 1.1 },
  rice: { proteinPer100g: 2.7 },
  chicken: { proteinPer100g: 31 },
  // ... add more if needed
};

exports.createFood = async (req, res) => {
  try {
    const { foodType, grams } = req.body;

    if (!foodType || !grams) {
      return res.status(400).json({ error: 'foodType and grams are required.' });
    }

    const lowerCaseType = foodType.toLowerCase();

    if (!foodDB[lowerCaseType]) {
      return res.status(400).json({ error: `Unknown food type: ${foodType}` });
    }

    // Calculate protein: (proteinPer100g * grams) / 100
    const { proteinPer100g } = foodDB[lowerCaseType];
    const calculatedProtein = ((proteinPer100g * grams) / 100).toFixed(2);

    // Create and save the food entry
    const newFood = new Food({
      foodType: lowerCaseType,
      grams: Number(grams),
      protein: Number(calculatedProtein),
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

exports.createMultipleFoods = async (req, res) => {
    try {
      const { foods } = req.body;
  
      if (!foods || !Array.isArray(foods) || foods.length === 0) {
        return res.status(400).json({ error: 'Please provide an array of foods.' });
      }
  
      const processedFoods = [];
      let totalProtein = 0;
  
      // Process each food item
      for (const item of foods) {
        const { foodType, grams } = item;
  
        if (!foodType || !grams) {
          return res.status(400).json({ error: 'Each food must have foodType and grams.' });
        }
  
        const lowerCaseType = foodType.toLowerCase();
  
        if (!foodDB[lowerCaseType]) {
          return res.status(400).json({ error: `Unknown food type: ${foodType}` });
        }
  
        const proteinPer100g = foodDB[lowerCaseType].proteinPer100g;
        const calculatedProtein = ((proteinPer100g * grams) / 100).toFixed(2);
  
        // Add processed food item to array
        processedFoods.push({
          foodType: lowerCaseType,
          grams: Number(grams),
          protein: Number(calculatedProtein),
        });
  
        // Add to total protein
        totalProtein += Number(calculatedProtein);
      }
  
      // Create a single document with all foods and the total protein
      const newFoodDocument = new Food({
        foods: processedFoods,
        totalProtein: totalProtein.toFixed(2),
      });
  
      await newFoodDocument.save();
  
      return res.status(201).json({
        message: 'Multiple foods created successfully in a single document',
        document: newFoodDocument,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  
/**
 * GET /api/foods/:id
 * Get a food entry by ID and return its protein
 * Params: id (food entry ID)
 */
exports.getFoodById = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await Food.findById(id);

    if (!food) {
      return res.status(404).json({ error: 'Food not found.' });
    }

    return res.json({
      food,
      totalProtein: food.protein,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * GET /api/foods
 * Get all food entries
 */
exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find(); // Fetch all food entries
    return res.json(foods);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
