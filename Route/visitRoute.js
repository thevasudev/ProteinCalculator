const express = require('express');
const router = express.Router();
const visitController = require('../Controller/visitController');

// Route to increment visit count
router.post('/countVisit', visitController.incrementVisitCount);

// Route to get the current visit count
router.get('/getVisitCount', visitController.getVisitCount);
module.exports = router;
