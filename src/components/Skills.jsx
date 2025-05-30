import React, { useEffect, useRef } from 'react';
import { Code, Database, Cloud, Wrench, Layers, Brain, Globe, Zap } from 'lucide-react';
import './Skills.css';

const Skills = ({ portfolioData }) => {
  const skillsRef = useRef(null);
  const skills = portfolioData?.skills || {};
  
  const keyTechnologies = [
    'Python', 'Java', 'TypeScript', 'JavaScript', 'C++', 'Swift',
    'FastAPI', 'React', 'Angular', 'SwiftUI', 'Node.js', 'Express',
    'PostgreSQL', 'Redis', 'Firebase', 'Docker', 'OpenAI API', 'AWS'
  ];
  
  const isKeyTechnology = (tech) => {
    return keyTechnologies.some(key => tech.toLowerCase().includes(key.toLowerCase()));
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const skillElements = skillsRef.current?.querySelectorAll('.skill-category, .skill-tag');
    skillElements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  
  const skillCategories = [
    {
      title: 'Languages',
      icon: <Code />,
      items: skills.programmingLanguages?.map(lang => 
        typeof lang === 'string' ? lang : lang.language
      ) || [],
      color: 'gradient-1'
    },
    {
      title: 'Frontend',
      icon: <Globe />,
      items: skills.frameworksAndLibraries?.filter(fw => 
        ['Frontend', 'Mobile'].some(type => fw.type?.includes(type))
      ).map(fw => fw.name) || [],
      color: 'gradient-2'
    },
    {
      title: 'Backend',
      icon: <Layers />,
      items: skills.frameworksAndLibraries?.filter(fw => 
        fw.type?.includes('Backend')
      ).map(fw => fw.name) || [],
      color: 'gradient-3'
    },
    {
      title: 'Databases',
      icon: <Database />,
      items: skills.databasesAndStorage?.map(db => 
        typeof db === 'string' ? db : db.name
      ) || [],
      color: 'gradient-4'
    },
    {
      title: 'AI/ML & APIs',
      icon: <Brain />,
      items: [
        ...(skills.toolsAndPlatforms?.filter(tool => 
          tool.category?.includes('AI')
        ).map(tool => tool.name) || []),
        ...(skills.toolsAndPlatforms?.filter(tool => 
          tool.category?.includes('Communications')
        ).map(tool => tool.name) || [])
      ],
      color: 'gradient-5'
    },
    {
      title: 'DevOps & Cloud',
      icon: <Zap />,
      items: skills.toolsAndPlatforms?.filter(tool => 
        ['Containerization', 'CI/CD', 'Version Control', 'Cloud', 'Deployment'].some(cat => tool.category?.includes(cat))
      ).map(tool => tool.name) || [],
      color: 'gradient-6'
    }
  ];

  return (
    <section id="skills" className="skills" ref={skillsRef}>
      <div className="container">
        <h2 className="section-title">
          <span className="title-text">Technical Arsenal</span>
          <span className="title-bg">SKILLS</span>
        </h2>
        
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className={`skill-category ${category.color}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="category-header">
                <div className="category-icon-wrapper">
                  <div className="icon-bg"></div>
                  {category.icon}
                </div>
                <h3 className="category-title">{category.title}</h3>
              </div>
              
              <div className="skill-tags">
                {category.items.slice(0, 10).map((skill, idx) => (
                  <span 
                    key={idx} 
                    className={`skill-tag ${isKeyTechnology(skill) ? 'key-skill' : ''}`}
                    style={{ animationDelay: `${(index * 0.1) + (idx * 0.05)}s` }}
                  >
                    {skill}
                  </span>
                ))}
                {category.items.length > 10 && (
                  <span className="skill-tag more-skills">+{category.items.length - 10} more</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Floating background elements */}
        <div className="skills-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
    </section>
  );
};

export default Skills;