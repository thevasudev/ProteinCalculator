// controllers/faqController.js

const FAQ = require('../Model/faqModel');

// Create a new FAQ
exports.createFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ error: 'Both question and answer are required.' });
    }

    const newFaq = new FAQ({ question, answer });
    await newFaq.save();

    return res.status(201).json({
      message: 'FAQ created successfully.',
      faq: newFaq,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all FAQs
exports.getFaqs = async (req, res) => {
  try {
    const faqs = await FAQ.find(); // You can add filters, sorting, etc.
    return res.status(200).json(faqs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get a single FAQ by ID
exports.getFaqById = async (req, res) => {
  try {
    const { id } = req.params;
    const faq = await FAQ.findById(id);

    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found.' });
    }

    return res.status(200).json(faq);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update an FAQ by ID
exports.updateFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;

    const updatedFaq = await FAQ.findByIdAndUpdate(
      id,
      { question, answer },
      { new: true, runValidators: true }
    );

    if (!updatedFaq) {
      return res.status(404).json({ error: 'FAQ not found.' });
    }

    return res.status(200).json({
      message: 'FAQ updated successfully.',
      faq: updatedFaq,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete an FAQ by ID
exports.deleteFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFaq = await FAQ.findByIdAndDelete(id);

    if (!deletedFaq) {
      return res.status(404).json({ error: 'FAQ not found.' });
    }

    return res.status(200).json({
      message: 'FAQ deleted successfully.',
      faq: deletedFaq,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
