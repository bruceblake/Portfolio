import React from 'react';
import { motion } from 'framer-motion';

const QuickStats = () => {
  const stats = [
    { label: 'Users Impacted', value: '2.5M+', detail: 'Through Google internships' },
    { label: 'Revenue Generated', value: '$15K+', detail: 'From entrepreneurial ventures' },
    { label: 'GPA', value: '3.85', detail: 'Virginia Tech Computer Science' },
    { label: 'Experience', value: '4+ Years', detail: 'Full-stack development' }
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