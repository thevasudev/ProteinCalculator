// controllers/customerQueryController.js

const CustomerQuery = require('../Model/queryModel');

// Create a new customer query
exports.createCustomerQuery = async (req, res) => {
  try {
    const { customerName, foodType } = req.body;

    // Validate fields
    if (!customerName || !foodType) {
      return res
        .status(400)
        .json({ error: 'customerName and foodType are required.' });
    }

    // Create a new CustomerQuery document
    const newQuery = new CustomerQuery({ customerName, foodType });
    await newQuery.save();

    return res.status(201).json({
      message: 'Customer query created successfully.',
      query: newQuery,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all customer queries
exports.getAllCustomerQueries = async (req, res) => {
  try {
    const queries = await CustomerQuery.find(); // You can add filtering, sorting, etc.
    return res.status(200).json(queries);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get a single customer query by ID
exports.getCustomerQueryById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = await CustomerQuery.findById(id);

    if (!query) {
      return res.status(404).json({ error: 'Customer query not found.' });
    }

    return res.status(200).json(query);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update an existing customer query
exports.updateCustomerQuery = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerName, foodType } = req.body;

    // Find and update
    const updatedQuery = await CustomerQuery.findByIdAndUpdate(
      id,
      { customerName, foodType },
      { new: true, runValidators: true }
    );

    if (!updatedQuery) {
      return res.status(404).json({ error: 'Customer query not found.' });
    }

    return res.status(200).json({
      message: 'Customer query updated successfully.',
      query: updatedQuery,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a customer query
exports.deleteCustomerQuery = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuery = await CustomerQuery.findByIdAndDelete(id);

    if (!deletedQuery) {
      return res.status(404).json({ error: 'Customer query not found.' });
    }

    return res.status(200).json({
      message: 'Customer query deleted successfully.',
      query: deletedQuery,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
