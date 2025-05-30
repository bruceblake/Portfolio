import { useState, useEffect, useRef } from 'react';
import './Timeline.css';

const Timeline = ({ portfolioData }) => {
  const [filter, setFilter] = useState('all');
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [expandedItems, setExpandedItems] = useState(new Set());
  const timelineRef = useRef(null);
  const itemRefs = useRef([]);
  
  // Key technologies to highlight - based on actual skills in data
  const keyTechnologies = [
    'Python', 'Java', 'TypeScript', 'JavaScript', 'C++', 'Swift',
    'FastAPI', 'React', 'Angular', 'SwiftUI', 'Node.js', 'Express',
    'PostgreSQL', 'Redis', 'Firebase', 'Docker', 'OpenAI API', 'Twilio API',
    'AWS', 'Google Cloud', 'OpenGL', 'Celery'
  ];
  
  const isKeyTechnology = (tech) => {
    return keyTechnologies.some(key => tech.toLowerCase().includes(key.toLowerCase()));
  };

  // Combine all timeline items from different sources
  const getTimelineItems = () => {
    const items = [];

    // Add experiences
    if (portfolioData.experience) {
      portfolioData.experience.forEach(exp => {
        const startDate = new Date(exp.duration.start);
        items.push({
          id: `exp-${exp.company}-${startDate.getTime()}`,
          type: 'experience',
          date: startDate,
          endDate: exp.duration.end === 'Present' ? new Date() : new Date(exp.duration.end),
          title: exp.title,
          subtitle: exp.company + (exp.team ? ` - ${exp.team}` : ''),
          location: exp.location,
          description: exp.description,
          details: [...(exp.achievements || []), ...(exp.responsibilities || exp.anticipatedResponsibilities || [])],
          technologies: exp.technologies || [],
          icon: '💼',
          status: exp.status
        });
      });
    }

    // Timeline now only shows work experience
    // Projects and achievements moved to separate sections

    // Sort by date (most recent first)
    return items.sort((a, b) => b.date - a.date);
  };

  const timelineItems = getTimelineItems();

  // Filter items based on selected category
  const filteredItems = filter === 'all' 
    ? timelineItems 
    : timelineItems.filter(item => item.type === filter);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, entry.target.dataset.itemId]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    itemRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [filteredItems]);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const getTypeColor = (type) => {
    const colors = {
      experience: '#3b82f6',
      education: '#10b981',
      project: '#8b5cf6',
      achievement: '#f59e0b'
    };
    return colors[type] || '#6b7280';
  };

  return (
    <section id="timeline" className="timeline-section">
      <div className="container">
        <h2 className="section-title">Work Experience</h2>
        
        {/* Filter Buttons */}
        <div className="timeline-filters">
          {/* Removed filter buttons since we only show experience */}
        </div>

        {/* Timeline */}
        <div className="timeline" ref={timelineRef}>
          <div className="timeline-line"></div>
          
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              ref={el => itemRefs.current[index] = el}
              data-item-id={item.id}
              className={`timeline-item ${item.type} ${index % 2 === 0 ? 'left' : 'right'} ${
                visibleItems.has(item.id) ? 'visible' : ''
              }`}
            >
              <div className="timeline-marker" style={{ backgroundColor: getTypeColor(item.type) }}>
                <span className="timeline-icon">{item.icon}</span>
              </div>
              
              <div className="timeline-content">
                <div className="timeline-date">
                  {formatDate(item.date)}
                  {item.endDate && item.endDate.getTime() !== item.date.getTime() && 
                    ` - ${item.endDate > new Date() ? 'Present' : formatDate(item.endDate)}`
                  }
                </div>
                
                <div className="timeline-card">
                  <h3 className="timeline-title">
                    {item.title}
                    {item.status && <span className="status-badge">{item.status}</span>}
                  </h3>
                  <h4 className="timeline-subtitle">{item.subtitle}</h4>
                  {item.location && <p className="timeline-location">📍 {item.location}</p>}
                  
                  {item.description && (
                    <p className="timeline-description">
                      {item.description}
                    </p>
                  )}
                  
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="timeline-technologies">
                      {(expandedItems.has(item.id) ? item.technologies : item.technologies.slice(0, 5)).map((tech, idx) => (
                        <span 
                          key={idx} 
                          className={`tech-tag ${isKeyTechnology(tech) ? 'key-tech' : ''}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {!expandedItems.has(item.id) && item.details && item.details.length > 0 && (
                    <div className="timeline-overview">
                      <h5 className="overview-title">Key Highlights:</h5>
                      <ul className="timeline-details">
                        {item.details.slice(0, 2).map((detail, idx) => (
                          <li key={idx}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {expandedItems.has(item.id) && item.details && item.details.length > 0 && (
                    <ul className="timeline-details expanded">
                      {item.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  )}
                  
                  {item.impact && (
                    <div className="timeline-impact">
                      <strong>Impact:</strong> {item.impact}
                    </div>
                  )}
                  
                  {item.distinction && (
                    <div className="timeline-distinction">
                      🌟 {item.distinction}
                    </div>
                  )}
                  
                  {item.links && Object.entries(item.links).length > 0 && (
                    <div className="timeline-links">
                      {Object.entries(item.links).map(([key, url]) => (
                        <a 
                          key={key} 
                          href={url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="timeline-link"
                        >
                          {key === 'github' ? '🔗 GitHub' : 
                           key === 'live' ? '🌐 Live Demo' : 
                           key === 'video' ? '🎥 Video' : key}
                        </a>
                      ))}
                    </div>
                  )}
                  
                  {(item.details?.length > 2 || item.technologies?.length > 5) && (
                    <button 
                      className={`expand-btn ${expandedItems.has(item.id) ? 'expanded' : ''}`}
                      onClick={() => {
                        setExpandedItems(prev => {
                          const newSet = new Set(prev);
                          if (newSet.has(item.id)) {
                            newSet.delete(item.id);
                          } else {
                            newSet.add(item.id);
                          }
                          return newSet;
                        });
                      }}
                    >
                      <span className="expand-text">
                        {expandedItems.has(item.id) ? 'Show Less' : 'View Details'}
                      </span>
                      <span className="expand-icon">
                        {expandedItems.has(item.id) ? '−' : '+'}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;