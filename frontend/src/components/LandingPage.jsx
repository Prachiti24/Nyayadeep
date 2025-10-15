import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBook, FaGamepad, FaTrophy, FaUsers, FaMicrophone, FaVideo, FaNewspaper, FaPodcast, FaChevronDown, FaStar, FaTimes, FaArrowRight } from "react-icons/fa";
import Dashboard from './Dashboard';
import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';
import GoogleTranslate from './Language';
import indiaSvg from "../assets/india.svg";
import book1 from "../assets/book1.png";
import book2 from "../assets/book2.png";
import book3 from "../assets/book3.png";
import cs1 from "../assets/cs1.png";
import cs2 from "../assets/cs2.png";
import cs3 from "../assets/cs3.png";
import pod1 from "../assets/pod1.png";
import pod2 from "../assets/pod2.png";
import pod3 from "../assets/pod3.png";
import game1 from "../assets/game1.png";
import game2 from "../assets/game2.png";
import game3 from "../assets/game3.png";
import game4 from "../assets/game4.png";

export default function LandingPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const caseStudiesRef = useRef(null);
  const podcastsRef = useRef(null);
  const gamesRef = useRef(null);
  const communityRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    { name: "Rajesh Kumar", role: "Law Student", text: "NyayaDeep made understanding the Constitution so much easier!" },
    { name: "Priya Sharma", role: "Teacher", text: "Great resource for teaching constitutional law to students." },
    { name: "Amit Singh", role: "Citizen", text: "Finally understand my rights and duties as an Indian citizen." }
  ];

  const features = [
    { icon: <FaBook />, title: "Interactive Learning", desc: "Learn the Constitution through engaging modules", section: caseStudiesRef },
    { icon: <FaGamepad />, title: "Fun Games", desc: "Test your knowledge with interactive games", section: gamesRef },
    { icon: <FaTrophy />, title: "Progress Tracking", desc: "Monitor your learning journey", section: null },
    { icon: <FaUsers />, title: "Community", desc: "Connect with fellow learners", section: communityRef }
  ];

  const caseStudies = [
    {
      img: cs1,
      title: "Kesavananda Bharati Case",
      desc: "The landmark case that established the basic structure doctrine",
      fullDesc: "In 1973, the Supreme Court of India ruled that the basic structure of the Constitution is inviolable and cannot be amended by Parliament. This case laid the foundation for judicial review of constitutional amendments and protected the core principles of democracy, secularism, and fundamental rights."
    },
    {
      img: cs2,
      title: "Minerva Mills Case",
      desc: "Reaffirmed the basic structure of the Constitution",
      fullDesc: "The 1980 judgment struck down amendments that attempted to limit judicial review. The court emphasized that the power of judicial review is part of the basic structure and cannot be curtailed, ensuring the balance of power between the legislature and judiciary."
    },
    {
      img: cs3,
      title: "Golaknath Case",
      desc: "Fundamental rights cannot be amended",
      fullDesc: "In 1967, the Supreme Court held that fundamental rights are not amendable under Article 368. This decision protected citizens' basic rights from being altered by parliamentary amendments, strengthening the protection of individual liberties."
    }
  ];

  const podcasts = [
    {
      img: pod1,
      title: "Constitutional Conversations",
      desc: "Weekly discussions on constitutional matters",
      fullDesc: "Join our experts as they delve deep into constitutional law, discussing landmark cases, amendments, and their impact on modern India. Each episode features guest speakers from the legal fraternity."
    },
    {
      img: pod2,
      title: "Rights & Duties",
      desc: "Understanding your fundamental rights",
      fullDesc: "Explore the fundamental rights guaranteed by the Constitution of India. Learn about their historical context, judicial interpretations, and practical implications in everyday life."
    },
    {
      img: pod3,
      title: "Judicial Review",
      desc: "The power of courts to review legislation",
      fullDesc: "Understand the concept of judicial review and its role in maintaining constitutional supremacy. Discover how courts balance legislative power with constitutional principles."
    }
  ];

  const games = [
    {
      img: game1,
      title: "Constitution Quiz",
      desc: "Test your knowledge",
      fullDesc: "Challenge yourself with our comprehensive quiz covering all aspects of the Indian Constitution. From preamble to amendments, test your understanding with multiple difficulty levels."
    },
    {
      img: game2,
      title: "Article Hunt",
      desc: "Find the right articles",
      fullDesc: "A treasure hunt through the Constitution! Search for specific articles and understand their context and application in real-world scenarios."
    },
    {
      img: game3,
      title: "Rights Match",
      desc: "Match rights with descriptions",
      fullDesc: "Match fundamental rights with their descriptions and learn about the protections they provide. Perfect for visual learners and quick revision."
    },
    {
      img: game4,
      title: "Amendment Timeline",
      desc: "Chronological amendments",
      fullDesc: "Journey through the history of constitutional amendments. Understand how the Constitution has evolved and adapted to changing times."
    }
  ];

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openModal = (item, type) => {
    setSelectedItem({ ...item, type });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob dark:bg-blue-500 dark:opacity-20"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 dark:bg-purple-500 dark:opacity-20"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000 dark:bg-pink-500 dark:opacity-20"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src={indiaSvg} alt="India Flag" className="w-32 h-32 mx-auto mb-8 filter drop-shadow-lg" />
            <h1 className="text-6xl md:text-8xl font-bold text-gray-800 dark:text-white mb-6">
              Nyaya<span className="text-yellow-500 dark:text-yellow-400">Deep</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Your comprehensive guide to understanding the Constitution of India,
              fundamental rights, and civic responsibilities
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => feature.section && scrollToSection(feature.section)}
                  className="bg-white/70 dark:bg-white/10 backdrop-blur-sm rounded-lg p-4 text-gray-800 dark:text-white hover:bg-white/90 dark:hover:bg-white/20 transition-all cursor-pointer border border-gray-200 dark:border-white/20"
                >
                  <div className="text-3xl mb-2 text-blue-600 dark:text-yellow-400">{feature.icon}</div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            {!isLoggedIn ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/signin")}
                className="bg-yellow-500 text-black px-8 py-4 rounded-full text-xl font-bold hover:bg-yellow-400 transition-colors shadow-lg"
              >
                Start Your Journey
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/dashboard")}
                className="bg-green-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-green-400 transition-colors shadow-lg"
              >
                Go to Dashboard
              </motion.button>
            )}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-600 dark:text-white"
        >
          <FaChevronDown className="text-2xl" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100 dark:bg-black/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-gray-800 dark:text-white"
            >
              <h3 className="text-4xl font-bold text-yellow-500 dark:text-yellow-400 mb-2">448</h3>
              <p className="text-gray-600 dark:text-gray-300">Articles</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-gray-800 dark:text-white"
            >
              <h3 className="text-4xl font-bold text-yellow-500 dark:text-yellow-400 mb-2">25</h3>
              <p className="text-gray-600 dark:text-gray-300">Parts</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-gray-800 dark:text-white"
            >
              <h3 className="text-4xl font-bold text-yellow-500 dark:text-yellow-400 mb-2">12</h3>
              <p className="text-gray-600 dark:text-gray-300">Schedules</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-gray-800 dark:text-white"
            >
              <h3 className="text-4xl font-bold text-yellow-500 dark:text-yellow-400 mb-2">104</h3>
              <p className="text-gray-600 dark:text-gray-300">Amendments</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section ref={caseStudiesRef} className="py-16 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12"
          >
            Landmark <span className="text-yellow-500 dark:text-yellow-400">Case Studies</span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => openModal(study, 'case-study')}
                className="bg-white dark:bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-gray-50 dark:hover:bg-white/20 transition-all cursor-pointer group border border-gray-200 dark:border-white/20"
              >
                <img src={study.img} alt={study.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{study.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{study.desc}</p>
                  <div className="flex items-center text-yellow-500 dark:text-yellow-400 font-semibold">
                    <span>Read More</span>
                    <FaArrowRight className="ml-2 text-sm" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Podcasts Section */}
      <section className="py-16 bg-gradient-to-r from-white to-gray-50 dark:from-black dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12"
          >
            <FaPodcast className="inline mr-2 text-blue-600 dark:text-yellow-400" /> Podcasts & <span className="text-yellow-500 dark:text-yellow-400">Audio Content</span>
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {podcasts.map((podcast, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-gray-50 dark:hover:bg-white/20 transition-all border border-gray-200 dark:border-white/20"
              >
                <img src={podcast.img} alt={podcast.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{podcast.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{podcast.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12"
          >
            <FaGamepad className="inline mr-2 text-blue-600 dark:text-yellow-400" /> Interactive <span className="text-yellow-500 dark:text-yellow-400">Games</span>
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {games.map((game, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-gray-50 dark:hover:bg-white/20 transition-all cursor-pointer border border-gray-200 dark:border-white/20"
              >
                <img src={game.img} alt={game.title} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{game.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{game.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100 dark:bg-black/50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12"
          >
            What Our <span className="text-yellow-500 dark:text-yellow-400">Users Say</span>
          </motion.h2>
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-500 dark:text-yellow-400 text-xl" />
              ))}
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 italic">
              "{testimonials[currentTestimonial].text}"
            </p>
            <div className="text-gray-800 dark:text-white">
              <p className="font-bold">{testimonials[currentTestimonial].name}</p>
              <p className="text-gray-500 dark:text-gray-400">{testimonials[currentTestimonial].role}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Section - Show when logged in */}
      {isLoggedIn && (
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <Dashboard />
          </div>
        </section>
      )}

      {/* Footer */}
      <Footer />

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                >
                  <FaTimes />
                </button>
                <img src={selectedItem.img} alt={selectedItem.title} className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{selectedItem.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{selectedItem.fullDesc}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
