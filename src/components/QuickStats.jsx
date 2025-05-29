import React from 'react';
import { motion } from 'framer-motion';

const QuickStats = () => {
  const stats = [
    { label: 'GitHub Repos', value: '20+', detail: 'Active open source projects' },
    { label: 'Companies', value: '3', detail: 'Google (2x) + Red Bar Sushi' },
    { label: 'Projects Built', value: '5+', detail: 'Game engines, iOS apps, AI tools' },
    { label: 'Tech Skills', value: '35+', detail: '10 languages, 25+ frameworks/tools' }
  ];

  return (
    <div className="quick-stats">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
          <div className="stat-detail">{stat.detail}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default QuickStats;