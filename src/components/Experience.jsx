import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import './Experience.css';

const Experience = ({ portfolioData }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  
  const experiences = portfolioData?.experience || [];

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2 className="section-title">Professional Experience</h2>
        
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-marker"></div>
              
              <div className="experience-card">
                <div className="experience-header" onClick={() => toggleExpanded(index)}>
                  <div className="experience-info">
                    <h3 className="experience-title">{exp.title}</h3>
                    <h4 className="experience-company">{exp.company}</h4>
                    
                    <div className="experience-meta">
                      <span className="meta-item">
                        <Calendar size={16} />
                        {exp.duration?.start} - {exp.duration?.end || exp.status}
                      </span>
                      {exp.location && (
                        <span className="meta-item">
                          <MapPin size={16} />
                          {exp.location}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button className="expand-button" aria-label="Toggle details">
                    {expandedIndex === index ? <ChevronUp /> : <ChevronDown />}
                  </button>
                </div>
                
                {expandedIndex === index && (
                  <div className="experience-details">
                    <p className="experience-description">{exp.description}</p>
                    
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="experience-highlights">
                        {exp.highlights.map((highlight, idx) => (
                          <li key={idx}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                    
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="experience-tech">
                        <h5>Technologies:</h5>
                        <div className="tech-tags">
                          {exp.technologies.map((tech, idx) => (
                            <span key={idx} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;