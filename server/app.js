const express = require('express');
const cors = require('cors'); // Added CORS middleware
const exampleRoutes = require('./src/routes/exampleRoutes');
require('dotenv').config(); // Load environment variables
require("./conn/conn")

const app = express();


// Middleware
app.use(cors({
    origin: ['http://localhost:5173/'] ,
    credentials: true, // Allow cookies
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/examples', exampleRoutes);

// Default route for undefined endpoints
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;