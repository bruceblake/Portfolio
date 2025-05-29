import React from 'react';
import { Code, Database, Cloud, Wrench, Layers } from 'lucide-react';
import './Skills.css';

const Skills = ({ portfolioData }) => {
  const skills = portfolioData?.skills || {};
  
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: <Code />,
      items: skills.programmingLanguages?.map(lang => ({
        name: lang.language,
        proficiency: lang.proficiency
      })) || [],
      color: 'primary'
    },
    {
      title: 'Frameworks & Libraries',
      icon: <Layers />,
      items: skills.frameworksAndLibraries?.map(fw => ({
        name: fw.name,
        proficiency: fw.expertise
      })) || [],
      color: 'accent'
    },
    {
      title: 'Databases & Storage',
      icon: <Database />,
      items: skills.databasesAndStorage?.map(db => ({
        name: db.name || db,
        proficiency: db.expertise || 'Proficient'
      })) || [],
      color: 'success'
    },
    {
      title: 'Tools & Platforms',
      icon: <Wrench />,
      items: skills.toolsAndPlatforms?.map(tool => ({
        name: tool,
        proficiency: 'Proficient'
      })) || [],
      color: 'info'
    },
    {
      title: 'Methodologies',
      icon: <Cloud />,
      items: skills.methodologies?.map(method => ({
        name: method,
        proficiency: 'Experienced'
      })) || [],
      color: 'warning'
    }
  ];

  const getProficiencyClass = (proficiency) => {
    const level = proficiency?.toLowerCase() || '';
    if (level.includes('expert')) return 'expert';
    if (level.includes('advanced')) return 'advanced';
    if (level.includes('proficient')) return 'intermediate';
    if (level.includes('intermediate')) return 'intermediate';
    return 'beginner';
  };

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className={`skill-category ${category.color}`}>
              <div className="category-header">
                <div className="category-icon">{category.icon}</div>
                <h3 className="category-title">{category.title}</h3>
              </div>
              
              <div className="skill-items">
                {category.items.map((skill, idx) => (
                  <div 
                    key={idx} 
                    className={`skill-item ${getProficiencyClass(skill.proficiency)}`}
                  >
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-level">
                      <div className="skill-level-bar"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="skills-legend">
          <span className="legend-item">
            <span className="legend-dot expert"></span>
            Expert
          </span>
          <span className="legend-item">
            <span className="legend-dot advanced"></span>
            Advanced
          </span>
          <span className="legend-item">
            <span className="legend-dot intermediate"></span>
            Intermediate
          </span>
          <span className="legend-item">
            <span className="legend-dot beginner"></span>
            Learning
          </span>
        </div>
      </div>
    </section>
  );
};

export default Skills;