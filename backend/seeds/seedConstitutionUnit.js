require('dotenv').config();
const mongoose = require('mongoose');
const ConstitutionUnit = require('../models/ConstitutionUnit');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nyayadeep';

const seedConstitutionUnits = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear old data (optional)
    await ConstitutionUnit.deleteMany({});
    console.log('🧹 Cleared existing ConstitutionUnit data');

    // Insert seed data
    const units = [
      { type: 'part', ref_id: 'fundamental_duties' },
      { type: 'part', ref_id: 'fundamental_rights' },
      { type: 'part', ref_id: 'directive_principles' },
      { type: 'part', ref_id: 'amendment' },
      { type: 'part', ref_id: 'schedules' },
    ];

    await ConstitutionUnit.insertMany(units);
    console.log('🌱 Seeded ConstitutionUnit collection successfully!');

    // Display inserted records
    const allUnits = await ConstitutionUnit.find();
    console.table(allUnits.map(u => ({
      id: u._id.toString(),
      type: u.type,
      ref_id: u.ref_id
    })));

    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding ConstitutionUnit:', err);
    process.exit(1);
  }
};

seedConstitutionUnits();
