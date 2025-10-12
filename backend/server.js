const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const factRoutes = require('./routes/dailyFacts'); 
const crosswordRoutes = require('./routes/crosswordroute');

const { sendDailyFact } = require("./telegramBot"); // Telegram bot functions
require("./jobs/dailyFactCron"); // start scheduler

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/facts', factRoutes); 
app.use("/api/crosswords", crosswordRoutes);

// Manual endpoint to trigger facts (optional)
app.post("/api/admin/send-fact-now", async (req, res) => {
  try {
    const result = await sendDailyFact({ delayMs: 150 });
    return res.status(200).json({ success: true, result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
