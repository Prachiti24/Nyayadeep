const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const progressRoutes = require('./routes/progress');
const lessonRoutes = require('./routes/lesson');
const questionRoutes = require('./routes/question');
const dailyFactsRoutes = require('./routes/dailyFacts');

// i added this - tiya
// const crosswordRoutes = require("./routes/crosswordroutes");
// app.use("/api/crosswords", crosswordRoutes);


const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/lesson', lessonRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/dailyFacts', dailyFactsRoutes);
// app.use('/api/crosswords', crosswordRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
