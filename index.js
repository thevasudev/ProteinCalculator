const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
// Connect to MongoDB
// Replace the connection string with your own
mongoose
    .connect(
       process.env.mongoDBUrl
    )
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));


const foodRoutes = require('./Route/foodRoute');
const foodTypeRoutes = require('./Route/foodTypeRoute');
const adminRoutes = require('./Route/adminRoute');
const visitRoutes = require('./Route/visitRoute');


app.use('/api/admin', adminRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/foodTypes', foodTypeRoutes);
app.use('/api/visit', visitRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
