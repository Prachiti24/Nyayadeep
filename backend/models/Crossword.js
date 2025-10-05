const mongoose = require("mongoose");

const crosswordSchema = new mongoose.Schema({
  title: { type: String, required: true },
  difficulty: String,
  grid: [[String]],
  clues: {
    across: [{ number: Number, text: String }],
    down: [{ number: Number, text: String }],
  },
  solution: [[String]],
});

module.exports = mongoose.model("Crossword", crosswordSchema);
