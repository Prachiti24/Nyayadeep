const mongoose = require("mongoose");

const TelegramUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  telegramId: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model("TelegramUser", TelegramUserSchema);
