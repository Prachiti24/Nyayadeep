const express = require('express');
const cors = require('cors');
require('dotenv').config();
require("./jobs/dailyFactCron"); // this starts the cron automatically


const connectDB = require('./db'); // Import DB connection
const authRoutes = require('./routes/auth');
const factRoutes = require('./routes/dailyFacts'); // ✅ add fact routes

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/facts', factRoutes); // ✅ mount fact routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
