const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Fact = require("../models/Fact.js");

dotenv.config({ path: "../.env" }); // ✅ important — go up one level

async function seed() {
  try {
    console.log("Loaded MONGODB_URI:", process.env.MONGODB_URI); // ✅ debug
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    await Fact.deleteMany({});
    await Fact.insertMany([
      { fact_text: "India has the longest written constitution in the world." },
      { fact_text: "The Indian Constitution came into effect on 26th January 1950." }
    ]);

    console.log("✅ Facts inserted successfully!");
  } catch (err) {
    console.error("❌ Error seeding facts:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

seed();
