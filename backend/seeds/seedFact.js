const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Fact = require("../models/Fact.js");
require('dotenv').config();
//dotenv.config({ path: "../.env" }); // ✅ important — go up one level
//const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/Nyaydeep';
const MONGO_URI = process.env.MONGO_URL;
const ConstitutionUnit = require("../models/ConstitutionUnit.js")

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
    { fact_text: "It originally contained 395 Articles, 22 Parts, and 8 Schedules.", related_unit_id: unit._id },
    { fact_text: "The Constitution of India came into effect on 26 January 1950, celebrated as Republic Day.", related_unit_id: unit._id },
    { fact_text: "Dr. B. R. Ambedkar is known as the Chief Architect of the Indian Constitution.", related_unit_id: unit._id },
    { fact_text: "The Constituent Assembly took 2 years, 11 months, and 18 days to draft the Constitution.", related_unit_id: unit._id },
    { fact_text: "The Preamble declares India to be a Sovereign, Socialist, Secular, Democratic Republic.", related_unit_id: unit._id },
    { fact_text: "The concept of Fundamental Rights was borrowed from the U.S. Constitution.", related_unit_id: unit._id },
    { fact_text: "The idea of Directive Principles of State Policy was borrowed from the Irish Constitution.", related_unit_id: unit._id },
    { fact_text: "The concept of a Parliamentary system was adopted from the British Constitution.", related_unit_id: unit._id },
    { fact_text: "The Indian Constitution provides for a federal system with a unitary bias.", related_unit_id: unit._id },
    { fact_text: "Article 14 guarantees equality before the law and equal protection of the laws.", related_unit_id: unit._id },
    { fact_text: "The Fundamental Rights are covered from Articles 12 to 35.", related_unit_id: unit._id },
    { fact_text: "Directive Principles of State Policy are mentioned in Part IV of the Constitution.", related_unit_id: unit._id },
    { fact_text: "Fundamental Duties were added by the 42nd Amendment in 1976.", related_unit_id: unit._id },
    { fact_text: "The right to property was removed as a Fundamental Right by the 44th Amendment Act, 1978.", related_unit_id: unit._id },
    { fact_text: "The 73rd Amendment Act, 1992 introduced Panchayati Raj institutions.", related_unit_id: unit._id },
    { fact_text: "The 74th Amendment Act, 1992 introduced Municipalities in urban areas.", related_unit_id: unit._id },
    { fact_text: "The President of India is the constitutional head of the state.", related_unit_id: unit._id },
    { fact_text: "The Prime Minister is the real executive authority in India.", related_unit_id: unit._id },
    { fact_text: "The Parliament consists of the President, Lok Sabha, and Rajya Sabha.", related_unit_id: unit._id },
    { fact_text: "The Supreme Court is the guardian of the Constitution.", related_unit_id: unit._id },
    { fact_text: "Judicial review power is vested in the Supreme Court and High Courts.", related_unit_id: unit._id },
    { fact_text: "Article 370 granted special status to Jammu and Kashmir, later revoked in 2019.", related_unit_id: unit._id },
    { fact_text: "The Fundamental Duties are listed in Article 51A.", related_unit_id: unit._id },
    { fact_text: "The Right to Education was made a Fundamental Right by the 86th Amendment Act, 2002.", related_unit_id: unit._id },
    { fact_text: "The word 'Secular' was added to the Preamble by the 42nd Amendment Act, 1976.", related_unit_id: unit._id },
    { fact_text: "The Constitution provides for a single citizenship for all Indians.", related_unit_id: unit._id },
    { fact_text: "Emergency provisions are contained in Part XVIII (Articles 352 to 360).", related_unit_id: unit._id },
    { fact_text: "There are three types of emergencies: National, State, and Financial.", related_unit_id: unit._id },
    { fact_text: "The Election Commission of India conducts free and fair elections.", related_unit_id: unit._id },
    { fact_text: "The Finance Commission recommends the distribution of revenues between the Centre and States.", related_unit_id: unit._id },
    { fact_text: "India follows a system of separation of powers among Legislature, Executive, and Judiciary.", related_unit_id: unit._id },
    { fact_text: "The 42nd Amendment Act, 1976 is known as the ‘Mini Constitution’ of India.", related_unit_id: unit._id },
    { fact_text: "The 44th Amendment Act, 1978 restored many rights curtailed during the Emergency.", related_unit_id: unit._id },
    { fact_text: "The basic structure doctrine was established by the Kesavananda Bharati case (1973).", related_unit_id: unit._id },
    { fact_text: "The Preamble begins with the words 'We, the People of India...'", related_unit_id: unit._id },
    { fact_text: "The 52nd Amendment Act, 1985 introduced the anti-defection law.", related_unit_id: unit._id },
    { fact_text: "The 61st Amendment Act, 1989 lowered the voting age from 21 to 18 years.", related_unit_id: unit._id },
    { fact_text: "The 101st Amendment Act, 2016 introduced the Goods and Services Tax (GST).", related_unit_id: unit._id },
    { fact_text: "The 73rd and 74th Amendments gave constitutional status to local self-government.", related_unit_id: unit._id },
    { fact_text: "The Ninth Schedule was added by the First Amendment in 1951 to protect certain laws from judicial review.", related_unit_id: unit._id },
    { fact_text: "The National Emergency has been declared three times in India – in 1962, 1971, and 1975.", related_unit_id: unit._id },
    { fact_text: "The Constitution provides for an independent Election Commission under Article 324.", related_unit_id: unit._id },
    { fact_text: "The Indian Constitution borrowed features from the constitutions of the USA, UK, Ireland, Canada, and others.", related_unit_id: unit._id },
    { fact_text: "The First Law Minister of Independent India was Dr. B. R. Ambedkar.", related_unit_id: unit._id },
    { fact_text: "The Indian Constitution allows both written and unwritten conventions.", related_unit_id: unit._id },
    { fact_text: "Article 368 provides the procedure for the amendment of the Constitution.", related_unit_id: unit._id },
    { fact_text: "Article 21 guarantees the right to life and personal liberty.", related_unit_id: unit._id },
    { fact_text: "The Constituent Assembly had 299 members at the time of adoption.", related_unit_id: unit._id },
    { fact_text: "The original handwritten Constitution was calligraphed by Prem Behari Narain Raizada.", related_unit_id: unit._id },
    { fact_text: "The original copies of the Constitution are preserved in helium-filled cases in the Parliament Library.", related_unit_id: unit._id }
  ];


  // Optional: clear facts collection
  await Fact.deleteMany({});
  await Fact.insertMany(facts);

  console.log("✅ Seeded facts:", facts.length);

  await mongoose.disconnect();
  console.log("✅ Disconnected");
}

seed();
