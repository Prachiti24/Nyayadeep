import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const StickyChatbotButton = () => {
  const navigate = useNavigate();
  const [scrollUpVisible, setScrollUpVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollUpVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed bottom-6 z-50"
      style={{
        right: scrollUpVisible ? '6rem' : '1.5rem', // Move left when scroll up button is visible
      }}
      animate={{
        right: scrollUpVisible ? '6rem' : '1.5rem',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <button
        onClick={() => navigate('/chatbot')}
        className="flex items-center justify-center w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200 hover:scale-110"
        title="Chat with AI"
      >
        🤖
      </button>
    </motion.div>
  );
};

export default StickyChatbotButton;
