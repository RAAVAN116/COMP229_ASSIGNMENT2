// index.js or app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection string (replace with your actual MongoDB Atlas connection string)
const dbURI = 'mongodb+srv://pkunj1832:admin@cluster0.uoawjds.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB', err));

// Routes
const productRoutes = require('./routes/productRoutes'); // Import product routes
app.use('/api/products', productRoutes);

// Welcome message route
app.get('/', (req, res) => {
  res.send('Welcome to the Online Marketplace API');
});

module.exports = app;