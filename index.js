

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const foodRoutes = require('./Route/foodRoute');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
// Replace the connection string with your own
mongoose
  .connect(
    'mongodb+srv://vasudev082002:Vasudev123@cluster0.fd4fi.mongodb.net/'
  )
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


// Routes

app.use('/api/foods', foodRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
