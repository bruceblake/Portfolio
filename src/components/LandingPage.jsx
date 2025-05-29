import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Clock } from 'lucide-react';
import './LandingPage.css';

const LandingPage = ({ onSelectMode }) => {
  return (
    <div className="landing-page">
      <motion.div 
        className="landing-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="landing-title"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Welcome to Bruce Blake's Portfolio
        </motion.h1>
        
        <motion.p 
          className="landing-subtitle"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Full-Stack Developer | Google Alumni | Entrepreneur
        </motion.p>

        <motion.div 
          className="landing-options"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.div 
            className="option-card"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectMode('chat')}
          >
            <MessageSquare size={48} className="option-icon" />
            <h2>Interactive Chat</h2>
            <p>Have a conversation with an AI assistant about my experience and skills</p>
            <div className="option-features">
              <span>• Quick answers</span>
              <span>• Personalized insights</span>
              <span>• Ask anything</span>
            </div>
            <button className="option-button">Start Chatting</button>
          </motion.div>

          <motion.div 
            className="option-card"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectMode('timeline')}
          >
            <Clock size={48} className="option-icon" />
            <h2>Visual Timeline</h2>
            <p>Explore my journey through an interactive timeline of projects and experience</p>
            <div className="option-features">
              <span>• Visual overview</span>
              <span>• Detailed projects</span>
              <span>• Career progression</span>
            </div>
            <button className="option-button">View Timeline</button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;