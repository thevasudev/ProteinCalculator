// backend/routes/foodRoutes.js

const express = require('express');
const router = express.Router();
const {
  createFood,
  getFoodById,
  getAllFoods,
  createMultipleFoods,
} = require('../Controller/foodController');

// POST /api/foods - Create a single food
router.post('/createfood', createFood);

// GET /api/foods/:id - Get a food by ID
router.get('/getfood/:id', getFoodById);

// POST multiple foods
router.post('/createmultiple', createMultipleFoods); // <- Add this route

// GET /api/foods - Get all foods
router.get('/getAllFoods', getAllFoods);

module.exports = router;
