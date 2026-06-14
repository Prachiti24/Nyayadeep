/*const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const progressRoutes = require('./routes/progress');
const lessonRoutes = require('./routes/lesson');
const questionRoutes = require('./routes/question');
const dailyFactsRoutes = require('./routes/dailyFacts');
const crosswordRoutes = require('./routes/crosswordroute');
const factRoutes = require('./routes/dailyFacts'); 

const { sendDailyFact } = require("./telegramBot"); // Telegram bot functions
require("./jobs/dailyFactCron"); // start scheduler


// i added this - tiya
// const crosswordRoutes = require("./routes/crosswordroutes");
// app.use("/api/crosswords", crosswordRoutes);

const quizProgressRoutes = require('./routes/quizProgress');


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
app.use('/api/facts', factRoutes); 
app.use('/api/crosswords', crosswordRoutes);

// Manual endpoint to trigger facts (optional)
app.post("/api/admin/send-fact-now", async (req, res) => {
  try {
    const result = await sendDailyFact({ delayMs: 150 });
    return res.status(200).json({ success: true, result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});
app.use('/api/dailyFacts', dailyFactsRoutes);
app.use('/api/quizProgress', quizProgressRoutes);
// app.use('/api/crosswords', crosswordRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));*/

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./db');

const authRoutes = require('./routes/auth');
const progressRoutes = require('./routes/progress');
const lessonRoutes = require('./routes/lesson');
const questionRoutes = require('./routes/question');
const crosswordRoutes = require('./routes/crosswordroute');
const quizProgressRoutes = require('./routes/quizProgress');
const dailyFactsRoutes = require('./routes/dailyFacts');

const app = express();

// DB connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/lesson', lessonRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/crosswords', crosswordRoutes);
app.use('/api/quizProgress', quizProgressRoutes);

// Daily facts (KEEP ONLY ONE)
app.use('/api/dailyFacts', dailyFactsRoutes);

// Optional manual trigger route (email system)
app.post("/api/admin/send-fact-now", async (req, res) => {
  try {
    const { sendEmail } = require("./utils/email");
    const User = require("./models/User");
    const Fact = require("./models/Fact");
    const { dailyFactEmail } = require("./helpers/EmailTemplate");

    const users = await User.find({ active: true });
    const facts = await Fact.find({ is_active: true });

    if (!users.length || !facts.length) {
      return res.status(404).json({ message: "No users or facts found" });
    }

    const fact = facts[Math.floor(Math.random() * facts.length)];

    let sent = 0;

    for (const user of users) {
      if (!user.email) continue;

      await sendEmail({
        email: user.email,
        subject: "📌 Your Daily Fact!",
        html: dailyFactEmail(user, fact),
      });

      sent++;
    }

    res.json({ success: true, sent });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
