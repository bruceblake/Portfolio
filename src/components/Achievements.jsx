import React, { useState, useRef, useEffect } from 'react';
import { Trophy, Award, Users, Calendar, Star } from 'lucide-react';
import './Achievements.css';

const Achievements = ({ portfolioData }) => {
  const [visibleAchievements, setVisibleAchievements] = useState(new Set());
  const achievementRefs = useRef([]);
  
  const achievements = portfolioData?.teamsAndAccomplishments || [];
  
  // Add education section as an achievement
  const educationAchievements = portfolioData?.education ? [{
    title: "Computer Engineering Excellence",
    event: "Virginia Tech",
    date: "2022 - Present",
    distinction: `In-Major GPA: 3.85/4.0 | Minor in Computer Science | Dean's List Multiple Semesters`,
    description: "Pursuing Bachelor of Science in Computer Engineering with outstanding academic performance",
    keyContributions: [
      "Completed advanced coursework in Data Structures, Algorithms, Operating Systems, and Machine Learning",
      "Active member of The Diggeridoos - Virginia Tech Tunnel Boring Team",
      "Consistently maintained Dean's List status"
    ],
    icon: '🎓',
    type: 'education'
  }] : [];
  
  const allAchievements = [...achievements, ...educationAchievements];
  
  const keyTechnologies = [
    'Python', 'Java', 'TypeScript', 'JavaScript', 'C++', 'Swift',
    'FastAPI', 'React', 'Angular', 'SwiftUI', 'Node.js', 'Express',
    'PostgreSQL', 'Redis', 'Firebase', 'Docker', 'OpenAI API', 'AWS'
  ];
  
  const isKeyTechnology = (tech) => {
    return keyTechnologies.some(key => tech.toLowerCase().includes(key.toLowerCase()));
  };
  
  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleAchievements(prev => new Set([...prev, entry.target.dataset.achievementId]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    achievementRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [allAchievements]);
  
  const getIcon = (achievement) => {
    if (achievement.icon) return achievement.icon;
    if (achievement.type === 'education') return '🎓';
    if (achievement.title.includes('Hackathon')) return '💻';
    if (achievement.title.includes('Winner')) return '🏆';
    return '🌟';
  };
  
  const getTypeClass = (achievement) => {
    if (achievement.type === 'education') return 'education';
    if (achievement.title.includes('Hackathon')) return 'hackathon';
    if (achievement.title.includes('Team')) return 'team';
    return 'achievement';
  };
  
  return (
    <section id="achievements" className="achievements-section">
      <div className="container">
        <h2 className="section-title">
          <Trophy className="section-icon" />
          Achievements & Recognition
        </h2>
        
        <div className="achievements-grid">
          {allAchievements.map((achievement, index) => (
            <div
              key={index}
              ref={el => achievementRefs.current[index] = el}
              data-achievement-id={index}
              className={`achievement-card ${getTypeClass(achievement)} ${visibleAchievements.has(String(index)) ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="achievement-header">
                <div className="achievement-icon-wrapper">
                  <span className="achievement-icon">{getIcon(achievement)}</span>
                </div>
                <div className="achievement-title-section">
                  <h3 className="achievement-title">{achievement.title}</h3>
                  {achievement.event && (
                    <p className="achievement-event">{achievement.event}</p>
                  )}
                  {achievement.competition && (
                    <p className="achievement-event">{achievement.competition}</p>
                  )}
                </div>
              </div>
              
              {achievement.distinction && (
                <div className="achievement-distinction">
                  <Star size={16} />
                  <span>{achievement.distinction}</span>
                </div>
              )}
              
              <p className="achievement-description">{achievement.description}</p>
              
              {achievement.keyContributions && achievement.keyContributions.length > 0 && (
                <div className="achievement-contributions">
                  <h4 className="contributions-title">Key Contributions:</h4>
                  <ul className="contributions-list">
                    {achievement.keyContributions.map((contribution, idx) => (
                      <li key={idx}>{contribution}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {achievement.technologies && achievement.technologies.length > 0 && (
                <div className="achievement-technologies">
                  <h4 className="tech-title">Technologies Used:</h4>
                  <div className="tech-tags">
                    {achievement.technologies.map((tech, idx) => (
                      <span 
                        key={idx} 
                        className={`tech-tag ${isKeyTechnology(tech) ? 'key-tech' : ''}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {(achievement.date || achievement.duration) && (
                <div className="achievement-date">
                  <Calendar size={14} />
                  <span>{achievement.date || achievement.duration}</span>
                </div>
              )}
              
              {achievement.role && (
                <div className="achievement-role">
                  <Users size={14} />
                  <span>{achievement.role}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;