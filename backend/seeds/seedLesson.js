// seedLesson.js
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
require('dotenv').config(); // To load MONGO_URI from .env

//const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/Nyaydeep';
const MONGO_URI = process.env.MONGO_URL;

const seedLessons = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // // Clear old data
    // await Lesson.deleteMany({});
    console.log('🧹 Cleared existing lessons');

    // Seed data
    const lessons = [
      {
        lesson_number: 1,
        lesson_title: "Introduction to the Constitution",
        description: "An overview of the Indian Constitution and its purpose.",
        articles: [
          {
            title: "What is a Constitution?",
            content: "A constitution defines the framework for the government and guarantees citizens’ rights.",
            quiz: [
              {
                question: "What does the Constitution define?",
                options: ["The framework for government", "A historical document", "A law book"],
                answer: "The framework for government"
              }
            ]
          }
        ]
      },
      {
        lesson_number: 2,
        lesson_title: "The Preamble Explained",
        description: "Understanding the key ideals and philosophy behind the Preamble.",
        articles: [
          {
            title: "Meaning of the Preamble",
            content: "The Preamble embodies the fundamental values and guiding principles of the Constitution.",
            quiz: [
              {
                question: "What does the Preamble express?",
                options: ["Fundamental duties", "Guiding principles", "Government policies"],
                answer: "Guiding principles"
              }
            ]
          }
        ]
      },
      {
        lesson_number: 3,
        lesson_title: "Fundamental Rights",
        description: "Understanding citizens’ essential rights and freedoms.",
        articles: [
          {
            title: "Fundamental Rights Overview",
            content: "Fundamental Rights ensure equality, freedom, and dignity for all citizens in India.",
            quiz: [
              {
                question: "Which right ensures equality in India?",
                options: ["Right to Freedom", "Right to Equality", "Right to Education"],
                answer: "Right to Equality"
              },
              {
                question: "Fundamental Rights are guaranteed by which part of the Constitution?",
                options: ["Part I", "Part III", "Part IV"],
                answer: "Part III"
              }
            ]
          }
        ]
      },
      {
        lesson_number: 4,
        lesson_title: "Fundamental Duties",
        description: "Learn about the responsibilities that come with our rights.",
        articles: [
          {
            title: "Duties of Citizens",
            content: "Fundamental Duties remind citizens to uphold national integrity, respect the Constitution, and promote harmony.",
            quiz: [
              {
                question: "Fundamental Duties were added by which amendment?",
                options: ["42nd Amendment", "44th Amendment", "52nd Amendment"],
                answer: "42nd Amendment"
              }
            ]
          }
        ]
      }
    ];

    await Lesson.insertMany(lessons);
    console.log('🌱 Seed data inserted successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding lessons:', error);
    process.exit(1);
  }
};

seedLessons();