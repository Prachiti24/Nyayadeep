require("dotenv").config();
const mongoose = require("mongoose");
const Fact = require("../models/Fact");
const ConstitutionUnit = require("../models/ConstitutionUnit");

const MONGO_URI = process.env.MONGODB_URI;

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("✅ Connected to MongoDB Atlas");

  // Create a dummy ConstitutionUnit (optional)
  const unit = await ConstitutionUnit.create({
    type: "part",
    ref_id: new mongoose.Types.ObjectId(),
  });

  // Facts array
  const facts = [
    { fact_text: "The Indian Constitution is the longest written constitution in the world.", related_unit_id: unit._id },
    { fact_text: "The Preamble declares India to be a sovereign, socialist, secular, democratic republic.", related_unit_id: unit._id },
    { fact_text: "The Constitution was adopted on 26 November 1949 and came into effect on 26 January 1950.", related_unit_id: unit._id },
  ];

  // Optional: clear facts collection
  await Fact.deleteMany({});
  await Fact.insertMany(facts);

  console.log("✅ Seeded facts:", facts.length);

  await mongoose.disconnect();
  console.log("✅ Disconnected");
}

seed().catch(console.error);
