// controllers/foodController.js

const Food = require('../Model/foodModel');
const FoodType = require('../Model/foodTypeModel');

// Helper function to calculate calories to burn for protein
// (You can adjust this logic as needed)
const calculateCaloriesToBurn = (protein) => {
  // Using 1.5 calories per gram of protein
  return (protein * 1.5).toFixed(2);
};

// Create a single food entry
exports.createFood = async (req, res) => {
  try {
    const { foodType, grams } = req.body;

    // Validate request body
    if (!foodType || !grams) {
      return res.status(400).json({ error: 'foodType and grams are required.' });
    }

    // Find the matching food type in the database
    const foodData = await FoodType.findOne({ name: foodType.toLowerCase() });
    if (!foodData) {
      return res.status(400).json({ error: `Unknown food type: ${foodType}` });
    }

    // Calculate nutritional values
    const calculatedProtein = ((foodData.proteinPer100g * grams) / 100).toFixed(2);
    const calculatedEnergy = ((foodData.energyPer100g * grams) / 100).toFixed(2);
    const calculatedCarbs = ((foodData.carbsPer100g * grams) / 100).toFixed(2);
    const calculatedFiber = ((foodData.fiberPer100g * grams) / 100).toFixed(2);
    const caloriesToBurn = calculateCaloriesToBurn(calculatedProtein);

    // Create and save new food entry.
    // Since our schema expects an array of "foods", we create a document
    // containing an array with just one item.
    const newFood = new Food({
      foods: [
        {
          foodType: foodData.name,
          grams: Number(grams),
          protein: Number(calculatedProtein),
          energy: Number(calculatedEnergy),
          carbs: Number(calculatedCarbs),
          fiber: Number(calculatedFiber),
          caloriesToBurn: Number(caloriesToBurn),
        },
      ],
      totalProtein: Number(calculatedProtein),
      totalEnergy: Number(calculatedEnergy),
      totalCarbs: Number(calculatedCarbs),
      totalFiber: Number(calculatedFiber),
      totalCaloriesToBurn: Number(caloriesToBurn),
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

// Create multiple food entries
exports.createMultipleFoods = async (req, res) => {
  try {
    const { foods } = req.body;

    // Validate request body
    if (!foods || !Array.isArray(foods) || foods.length === 0) {
      return res
        .status(400)
        .json({ error: 'Please provide an array of foods.' });
    }

    const processedFoods = [];
    let totalProtein = 0;
    let totalEnergy = 0;
    let totalCarbs = 0;
    let totalFiber = 0;
    let totalCaloriesToBurn = 0;

    // Process each food item
    for (const item of foods) {
      const { foodType, grams } = item;

      if (!foodType || !grams) {
        return res
          .status(400)
          .json({ error: 'Each food must have foodType and grams.' });
      }

      const foodData = await FoodType.findOne({ name: foodType.toLowerCase() });
      if (!foodData) {
        return res
          .status(400)
          .json({ error: `Unknown food type: ${foodType}` });
      }

      const calculatedProtein = ((foodData.proteinPer100g * grams) / 100).toFixed(2);
      const calculatedEnergy = ((foodData.energyPer100g * grams) / 100).toFixed(2);
      const calculatedCarbs = ((foodData.carbsPer100g * grams) / 100).toFixed(2);
      const calculatedFiber = ((foodData.fiberPer100g * grams) / 100).toFixed(2);
      const caloriesToBurn = calculateCaloriesToBurn(calculatedProtein);

      processedFoods.push({
        foodType: foodData.name,
        grams: Number(grams),
        protein: Number(calculatedProtein),
        energy: Number(calculatedEnergy),
        carbs: Number(calculatedCarbs),
        fiber: Number(calculatedFiber),
        caloriesToBurn: Number(caloriesToBurn),
      });

      totalProtein += Number(calculatedProtein);
      totalEnergy += Number(calculatedEnergy);
      totalCarbs += Number(calculatedCarbs);
      totalFiber += Number(calculatedFiber);
      totalCaloriesToBurn += Number(caloriesToBurn);
    }

    // Create and save document with multiple food entries
    const newFoodDocument = new Food({
      foods: processedFoods,
      totalProtein: Number(totalProtein.toFixed(2)),
      totalEnergy: Number(totalEnergy.toFixed(2)),
      totalCarbs: Number(totalCarbs.toFixed(2)),
      totalFiber: Number(totalFiber.toFixed(2)),
      totalCaloriesToBurn: Number(totalCaloriesToBurn.toFixed(2)),
    });

    await newFoodDocument.save();

    return res.status(201).json({
      message: 'Multiple foods created successfully',
      document: {
        foods: processedFoods,
        totalProtein: totalProtein.toFixed(2),
        totalEnergy: totalEnergy.toFixed(2),
        totalCarbs: totalCarbs.toFixed(2),
        totalFiber: totalFiber.toFixed(2),
        totalCaloriesToBurn: totalCaloriesToBurn.toFixed(2),
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
