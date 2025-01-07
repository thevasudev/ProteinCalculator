// backend/routes/foodRoutes.js

const express = require('express');
const router = express.Router();
const {
  createFood,
  createMultipleFoods,
} = require('../Controller/foodController');

// POST /api/foods - Create a single food
router.post('/createFood', createFood);


// POST multiple foods
router.post('/createMultipleFoods', createMultipleFoods); // <- Add this route


module.exports = router;
