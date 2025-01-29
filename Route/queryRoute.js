// routes/customerQueryRoute.js

const express = require('express');
const router = express.Router();

const {
  createCustomerQuery,
  getAllCustomerQueries,
  getCustomerQueryById,
  updateCustomerQuery,
  deleteCustomerQuery,
} = require('../Controller/queryController');

// Create a new customer query
router.post('/create', createCustomerQuery);

// Get all customer queries
router.get('/getallquery', getAllCustomerQueries);

// Get a single customer query by ID
router.get('/getquerybyid/:id', getCustomerQueryById);

// Update a customer query
router.put('/update/:id', updateCustomerQuery);

// Delete a customer query
router.delete('/deletebyid/:id', deleteCustomerQuery);

module.exports = router;
