import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, Code, Award, ChevronDown, ChevronUp } from 'lucide-react';
import './Timeline.css';

const Timeline = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}bruce-blake-data.json`)
      .then(res => res.json())
      .then(data => setPortfolioData(data))
      .catch(err => console.error('Error loading portfolio data:', err));
  }, []);

  const toggleExpanded = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (!portfolioData) {
    return <div className="loading">Loading timeline...</div>;
  }

  // Combine and sort experiences and projects by date
  const timelineItems = [
    ...portfolioData.experience.map(exp => ({
      ...exp,
      type: 'experience',
      date: exp.duration ? `${exp.duration.start} - ${exp.duration.end}` : 'Present',
      displayDate: exp.duration?.start || 'Present',
      position: exp.title,
      icon: <Briefcase size={20} />
    })),
    ...portfolioData.projects.map(proj => ({
      ...proj,
      type: 'project',
      date: proj.duration || 'Recent',
      displayDate: '2024',
      technologies: proj.technologies || [],
      icon: <Code size={20} />
    }))
  ].sort((a, b) => {
    // Extract years for sorting
    const yearA = parseInt(a.displayDate?.match(/\d{4}/)?.[0] || '0');
    const yearB = parseInt(b.displayDate?.match(/\d{4}/)?.[0] || '0');
    return yearB - yearA;
  });

  return (
    <div className="timeline-container">
      <motion.h1 
        className="timeline-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Professional Journey
      </motion.h1>

      <div className="timeline">
        {timelineItems.map((item, index) => (
          <motion.div
            key={`${item.type}-${index}`}
            className={`timeline-item ${item.type}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <div className="timeline-marker">
              <motion.div 
                className="timeline-icon"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {item.icon}
              </motion.div>
            </div>

            <motion.div 
              className="timeline-content"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="timeline-header">
                <h3>{item.type === 'experience' ? item.position : item.name}</h3>
                <span className="timeline-date">
                  <Calendar size={16} />
                  {item.date}
                </span>
              </div>

              <h4>{item.type === 'experience' ? item.company : `Technologies: ${item.technologies.join(', ')}`}</h4>
              
              <p className="timeline-description">
                {item.type === 'experience' ? item.description : item.description}
              </p>

              {item.type === 'experience' && item.achievements && (
                <div className="timeline-achievements">
                  <button 
                    className="expand-button"
                    onClick={() => toggleExpanded(`${item.type}-${index}`)}
                  >
                    <Award size={16} />
                    Key Achievements
                    {expandedItems[`${item.type}-${index}`] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  
                  <motion.div 
                    className="achievements-list"
                    initial={false}
                    animate={{ 
                      height: expandedItems[`${item.type}-${index}`] ? 'auto' : 0,
                      opacity: expandedItems[`${item.type}-${index}`] ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ul>
                      {item.achievements.map((achievement, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              )}

              {item.type === 'project' && item.features && (
                <div className="project-highlights">
                  {item.features.slice(0, 3).map((feature, i) => (
                    <span key={i} className="highlight-tag">
                      {feature}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="timeline-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h3>Core Skills</h3>
        <div className="skills-cloud">
          {[...portfolioData.skills.languages.expert, 
            ...portfolioData.skills.languages.proficient,
            ...portfolioData.skills.frameworks.frontend,
            ...portfolioData.skills.frameworks.backend
          ].map((skill, index) => (
            <motion.span
              key={skill}
              className="skill-tag"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.05 }}
              whileHover={{ scale: 1.1 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Timeline;