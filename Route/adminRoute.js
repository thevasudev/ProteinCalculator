const express = require('express');
const { login, protect } = require('../Controller/adminController');

const foodTypeController = require('../Controller/foodTypeController');

const router = express.Router();

// Admin login
router.post('/login', login);

// Protected route for adding food type
router.post('/add-food', protect, foodTypeController.addFoodType);

module.exports = router;
