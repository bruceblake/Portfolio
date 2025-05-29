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
    if (!technologies) return false;
    const techLower = technologies.map(t => t.toLowerCase());
    return primarySkills.some(skill => 
      techLower.some(tech => tech.includes(skill.toLowerCase()))
    );
  };

  // Combine all timeline items from different sources
  const getTimelineItems = () => {
    const items = [];

    // Add experiences
    if (portfolioData.experience_professional) {
      portfolioData.experience_professional.forEach(exp => {
        const startDate = new Date(exp.duration.start);
        items.push({
          id: `exp-${exp.company_name}-${startDate.getTime()}`,
          type: 'experience',
          date: startDate,
          endDate: exp.duration.end === 'Present' ? new Date() : new Date(exp.duration.end),
          title: exp.position_title,
          subtitle: exp.company_name,
          location: exp.location,
          description: exp.description_brief,
          details: exp.key_achievements_quantified,
          technologies: exp.technologies_used,
          icon: '💼'
        });
      });
    }

    // Add education
    if (portfolioData.education_details) {
      portfolioData.education_details.forEach(edu => {
        const startDate = new Date(edu.startDate || '2022-08-01');
        items.push({
          id: `edu-${edu.institution_name}`,
          type: 'education',
          date: startDate,
          endDate: new Date(edu.endDate || edu.graduation_date_actual_or_expected),
          title: edu.degree_obtained,
          subtitle: edu.institution_name,
          location: edu.location_city_state,
          description: `${edu.minor_subject ? 'Minor: ' + edu.minor_subject + ' | ' : ''}GPA: ${edu.gpa_in_major}`,
          details: edu.relevant_coursework_detailed,
          icon: '🎓'
        });
      });
    }

    // Add projects with estimated dates
    if (portfolioData.projects_significant) {
      portfolioData.projects_significant.forEach((proj, index) => {
        // Estimate project dates based on context or use placeholder
        let projectDate = new Date();
        if (proj.project_name.includes('RedBarSushiAI')) {
          projectDate = new Date('2024-06-01');
        } else if (proj.project_name.includes('Vocode')) {
          projectDate = new Date('2024-08-01');
        } else if (proj.project_name.includes('Game Engine')) {
          projectDate = new Date('2023-09-01');
        } else {
          projectDate = new Date(2024 - index, 0, 1);
        }

        items.push({
          id: `proj-${proj.project_name}`,
          type: 'project',
          date: projectDate,
          endDate: proj.status?.includes('Active') ? new Date() : projectDate,
          title: proj.project_name,
          subtitle: proj.project_category || 'Personal Project',
          description: proj.brief_description,
          details: proj.detailed_accomplishments,
          technologies: proj.technologies_used,
          links: proj.links,
          impact: proj.quantified_impact,
          icon: '🚀'
        });
      });
    }

    // Add teams and accomplishments
    if (portfolioData.teams_and_accomplishments) {
      portfolioData.teams_and_accomplishments.forEach(item => {
        const itemDate = item.date ? new Date(item.date) : new Date(item.duration?.start || '2023-01-01');
        items.push({
          id: `team-${item.team_or_event_name}`,
          type: 'accomplishment',
          date: itemDate,
          endDate: item.duration?.end ? new Date(item.duration.end) : itemDate,
          title: item.team_or_event_name,
          subtitle: item.role || 'Achievement',
          description: item.achievement_or_contribution,
          details: item.details || [],
          icon: '🏆'
        });
      });
    }

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
      accomplishment: '#f59e0b'
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
          </button>
          <button 
            className={`filter-btn ${filter === 'experience' ? 'active' : ''}`}
            onClick={() => setFilter('experience')}
          >
            💼 Experience
          </button>
          <button 
            className={`filter-btn ${filter === 'education' ? 'active' : ''}`}
            onClick={() => setFilter('education')}
          >
            🎓 Education
          </button>
          <button 
            className={`filter-btn ${filter === 'project' ? 'active' : ''}`}
            onClick={() => setFilter('project')}
          >
            🚀 Projects
          </button>
          <button 
            className={`filter-btn ${filter === 'accomplishment' ? 'active' : ''}`}
            onClick={() => setFilter('accomplishment')}
          >
            🏆 Achievements
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