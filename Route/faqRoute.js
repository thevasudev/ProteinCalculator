// routes/faqRoute.js

const express = require('express');
const router = express.Router();

const {
  createFaq,
  getFaqs,
  getFaqById,
  updateFaq,
  deleteFaq,
} = require('../Controller/faqController');

// Create a new FAQ
router.post('/createfaq', createFaq);

// Get all FAQs
router.get('/getfaq', getFaqs);

// Get a single FAQ by ID
router.get('/getfaqbyid/:id', getFaqById);

// Update an FAQ by ID
router.put('/updatefaq/:id', updateFaq);

// Delete an FAQ by ID
router.delete('/deletefaq/:id', deleteFaq);

module.exports = router;
