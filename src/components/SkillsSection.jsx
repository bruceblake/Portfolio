import React from 'react';
import './SkillsSection.css';

const SkillsSection = () => {
  const skillCategories = [
    {
      category: 'Languages',
      skills: [
        { name: 'Python', level: 90 },
        { name: 'Java', level: 85 },
        { name: 'JavaScript/TypeScript', level: 85 },
        { name: 'C++', level: 80 },
        { name: 'SQL', level: 75 }
      ]
    },
    {
      category: 'Technologies',
      skills: [
        { name: 'React/Angular', level: 85 },
        { name: 'Node.js/Express', level: 80 },
        { name: 'Docker/Kubernetes', level: 75 },
        { name: 'MySQL/PostgreSQL', level: 80 },
        { name: 'Git/GitHub', level: 90 }
      ]
    },
    {
      category: 'Specialties',
      skills: [
        { name: 'Full-Stack Development', level: 90 },
        { name: 'System Architecture', level: 85 },
        { name: 'Machine Learning', level: 70 },
        { name: 'Game Development', level: 75 },
        { name: 'API Design', level: 85 }
      ]
    }
  ];

  return (
    <section className="resume-section">
      <h2 className="section-title">Technical Skills</h2>
      
      <div className="skills-content">
        {skillCategories.map((category, idx) => (
          <div key={idx} className="skill-category">
            <h3 className="category-title">{category.category}</h3>
            
            <div className="skills-list">
              {category.skills.map((skill, skillIdx) => (
                <div key={skillIdx} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;