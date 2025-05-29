import { useState, useEffect, useRef } from 'react';
import './Timeline.css';

const Timeline = ({ portfolioData }) => {
  const [filter, setFilter] = useState('all');
  const [visibleItems, setVisibleItems] = useState(new Set());
  const timelineRef = useRef(null);
  const itemRefs = useRef([]);
  
  const primarySkills = ['TypeScript', 'React', 'Angular', 'Java', 'Python'];
  
  // Helper function to check if item involves primary skills
  const involvesPrimarySkills = (technologies) => {
    if (!technologies || !Array.isArray(technologies)) return false;
    const techLower = technologies.map(t => t.toString().toLowerCase());
    return primarySkills.some(skill => 
      techLower.some(tech => 
        tech.includes(skill.toLowerCase()) || 
        (skill === 'TypeScript' && tech.includes('typescript')) ||
        (skill === 'React' && (tech.includes('react') || tech.includes('next'))) ||
        (skill === 'Angular' && tech.includes('angular')) ||
        (skill === 'Java' && tech.includes('java')) ||
        (skill === 'Python' && tech.includes('python'))
      )
    );
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
          subtitle: exp.company,
          location: exp.location,
          description: exp.description,
          details: exp.responsibilities || exp.keyAchievements || exp.anticipatedResponsibilities || [],
          technologies: exp.technologies || [],
          icon: '💼'
        });
      });
    }

    // Add education
    if (portfolioData.education) {
      portfolioData.education.forEach(edu => {
        const startDate = new Date('2022-08-01'); // Default start date for education
        const endDate = new Date('2026-05-01'); // Parse from graduationDate
        items.push({
          id: `edu-${edu.institution}`,
          type: 'education',
          date: startDate,
          endDate: endDate,
          title: edu.degree,
          subtitle: edu.institution,
          location: edu.location,
          description: `${edu.minor ? 'Minor: ' + edu.minor + ' | ' : ''}${edu.gpaDetails || ''}`,
          details: edu.relevantCoursework || [],
          icon: '🎓'
        });
      });
    }

    // Add projects with estimated dates
    if (portfolioData.technicalProjects) {
      portfolioData.technicalProjects.forEach((proj, index) => {
        // Estimate project dates based on context or use placeholder
        let projectDate = new Date();
        if (proj.name.includes('3D Physics Engine')) {
          projectDate = new Date('2023-09-01');
        } else if (proj.name.includes('Portfolio')) {
          projectDate = new Date('2024-10-01');
        } else {
          projectDate = new Date(2024 - index, 0, 1);
        }

        items.push({
          id: `proj-${proj.name}`,
          type: 'project',
          date: projectDate,
          endDate: proj.status?.includes('Active') ? new Date() : projectDate,
          title: proj.name,
          subtitle: proj.category || 'Personal Project',
          description: proj.description,
          details: proj.technicalHighlights || [],
          technologies: proj.technologies || [],
          links: proj.links || {},
          icon: '🚀'
        });
      });
    }

    // Removed teams and accomplishments to clean up timeline UI

    // Sort by date (most recent first)
    return items.sort((a, b) => b.date - a.date);
  };

  const timelineItems = getTimelineItems();

  // Filter items based on selected category
  const filteredItems = filter === 'all' 
    ? timelineItems 
    : filter === 'featured'
    ? timelineItems.filter(item => involvesPrimarySkills(item.technologies))
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
      project: '#8b5cf6'
    };
    return colors[type] || '#6b7280';
  };

  return (
    <section id="timeline" className="timeline-section">
      <div className="container">
        <h2 className="section-title">Journey Timeline</h2>
        
        {/* Filter Buttons */}
        <div className="timeline-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
            <span className="filter-count">{timelineItems.length}</span>
          </button>
          <button 
            className={`filter-btn ${filter === 'experience' ? 'active' : ''}`}
            onClick={() => setFilter('experience')}
          >
            💼 Experience
            <span className="filter-count">{timelineItems.filter(item => item.type === 'experience').length}</span>
          </button>
          <button 
            className={`filter-btn ${filter === 'education' ? 'active' : ''}`}
            onClick={() => setFilter('education')}
          >
            🎓 Education
            <span className="filter-count">{timelineItems.filter(item => item.type === 'education').length}</span>
          </button>
          <button 
            className={`filter-btn ${filter === 'project' ? 'active' : ''}`}
            onClick={() => setFilter('project')}
          >
            🚀 Projects
            <span className="filter-count">{timelineItems.filter(item => item.type === 'project').length}</span>
          </button>
          <button 
            className={`filter-btn featured-btn ${filter === 'featured' ? 'active' : ''}`}
            onClick={() => setFilter('featured')}
          >
            ⭐ Featured Tech
            <span className="filter-count">{timelineItems.filter(item => involvesPrimarySkills(item.technologies)).length}</span>
          </button>
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
              } ${involvesPrimarySkills(item.technologies) ? 'primary-tech' : ''}`}
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
                  <h3 className="timeline-title">{item.title}</h3>
                  <h4 className="timeline-subtitle">{item.subtitle}</h4>
                  {item.location && <p className="timeline-location">📍 {item.location}</p>}
                  
                  <p className="timeline-description">{item.description}</p>
                  
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="timeline-technologies">
                      {item.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  )}
                  
                  {item.details && item.details.length > 0 && (
                    <ul className="timeline-details">
                      {item.details.slice(0, 3).map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  )}
                  
                  {item.impact && (
                    <div className="timeline-impact">
                      <strong>Impact:</strong> {item.impact}
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