import React from 'react';
import { User, Code, Briefcase, Heart } from 'lucide-react';
import './About.css';

const About = ({ portfolioData }) => {
  const interests = portfolioData?.personal?.interests || [
    'AI/ML Application Development',
    'Full-Stack Web Development',
    'Game Engine Development',
    'Cloud Architecture & Scalable Systems'
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        
        <div className="about-content">
          <div className="about-text">
            <p className="about-summary">
              {portfolioData?.summary?.brief || 
                'Passionate software engineer with experience in full-stack development and AI integration.'
              }
            </p>
            
            <div className="about-details">
              <div className="about-item">
                <User className="about-icon" />
                <div>
                  <h3>Background</h3>
                  <p><strong>Virginia Tech Computer Engineering</strong> • In-Major GPA: 3.85/4.0 • Expected May 2026</p>
                </div>
              </div>
              
              <div className="about-item">
                <Code className="about-icon" />
                <div>
                  <h3>Technical Focus</h3>
                  <p><strong>Full-Stack</strong> • <strong>AI/OpenAI APIs</strong> • <strong>Cloud (AWS/GCP)</strong> • <strong>Low-Level Systems</strong></p>
                </div>
              </div>
              
              <div className="about-item">
                <Briefcase className="about-icon" />
                <div>
                  <h3>Experience</h3>
                  <p><strong>2x Google SWE Intern</strong> • <strong>$15K+ Revenue AI System</strong> • <strong>Hackathon Winner</strong></p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-interests">
            <h3 className="interests-title">
              <Heart className="interests-icon" />
              Interests & Passions
            </h3>
            <div className="interests-grid">
              {interests.map((interest, index) => (
                <div key={index} className="interest-tag">
                  {interest}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;