// routes/foodTypeRoutes.js

const express = require('express');
const router = express.Router();
const foodTypeController = require('../Controller/foodTypeController');

// Route to add a new food type
router.post('/addfood', foodTypeController.addFoodType);

// Route to get all food types
router.get('/allfood', foodTypeController.getAllFoodTypes);

router.delete('/deletefood/:id', foodTypeController.deleteFoodType);

module.exports = router;
