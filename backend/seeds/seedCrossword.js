const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Crossword = require("../models/Crossword.js");

//const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/Nyaydeep';
const MONGO_URI = process.env.MONGO_URL;

dotenv.config(); 

async function insertSample() {
  try {
    console.log("🌱 Loading environment variables...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear old crossword data
    await Crossword.deleteMany({});
    console.log("🧹 Cleared existing crossword data");

    // Insert sample crossword
    await Crossword.create({
      title: "Indian Constitution Crossword",
      difficulty: "Medium",
      grid: [
        ["", "", "", "", "", "", "", "", "F", "", "", "", "", "", "", "", ""],
        ["", "", "", "D", "E", "M", "O", "C", "R", "A", "C", "Y", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "A", "", "", "", "", "", "", "", ""],
        ["F", "U", "N", "D", "A", "M", "E", "N", "T", "A", "L", "D", "U", "T", "I", "E", "S"],
        ["", "", "", "", "", "", "", "", "E", "", "", "", "", "", "", "", ""],
        ["", "", "", "S", "", "R", "", "", "R", "I", "G", "H", "T", "S", "", "", ""],
        ["S", "O", "V", "E", "R", "E", "I", "G", "N", "", "", "", "", "", "", "", ""],
        ["", "", "", "C", "", "P", "", "", "I", "", "", "", "", "", "", "", ""],
        ["", "", "", "U", "", "U", "", "", "T", "", "", "", "", "", "", "", ""],
        ["", "", "", "L", "", "B", "", "", "Y", "", "", "", "", "", "", "", ""],
        ["", "", "", "A", "", "L", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "R", "", "I", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "C", "", "", "", "", "", "", "", "", "", "", ""],
      ],
      clues: {
        across: [
          { number: 2, text: "A system of government where citizens can vote for their leaders (9)" },
          { number: 4, text: "Moral obligations of all citizens of India as outlined in the Constitution (17)" },
          { number: 6, text: "A basic entitlement or freedom that all citizens are guaranteed by the Constitution (5)" },
          { number: 7, text: "The term that means India is independent and not controlled by any foreign power (9)" },
        ],
        down: [
          { number: 4, text: "The sense of common brotherhood among all Indians (10)" },
          { number: 6, text: "This term means India has no official state religion (7)" },
          { number: 9, text: "A form of government where the head of state is elected, not a monarch (8)" },
        ],
      },
      solution: [
        ["", "", "", "", "", "", "", "", "F", "", "", "", "", "", "", "", ""],
        ["", "", "", "D", "E", "M", "O", "C", "R", "A", "C", "Y", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "A", "", "", "", "", "", "", "", ""],
        ["F", "U", "N", "D", "A", "M", "E", "N", "T", "A", "L", "D", "U", "T", "I", "E", "S"],
        ["", "", "", "", "", "", "", "", "E", "", "", "", "", "", "", "", ""],
        ["", "", "", "S", "", "R", "", "", "R", "I", "G", "H", "T", "S", "", "", ""],
        ["S", "O", "V", "E", "R", "E", "I", "G", "N", "", "", "", "", "", "", "", ""],
        ["", "", "", "C", "", "P", "", "", "I", "", "", "", "", "", "", "", ""],
        ["", "", "", "U", "", "U", "", "", "T", "", "", "", "", "", "", "", ""],
        ["", "", "", "L", "", "B", "", "", "Y", "", "", "", "", "", "", "", ""],
        ["", "", "", "A", "", "L", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "R", "", "I", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "C", "", "", "", "", "", "", "", "", "", "", ""],
      ],
    });

    console.log("✅ Sample crossword inserted successfully!");
  } catch (error) {
    console.error("❌ Error inserting crossword:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

insertSample();