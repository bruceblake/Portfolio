import React from 'react';
import { User, Code, Briefcase, Heart } from 'lucide-react';
import './About.css';

const About = ({ portfolioData }) => {
  const interests = portfolioData?.interests || [
    'Machine Learning',
    'Cloud Computing',
    'Open Source',
    'Web Development'
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        
        <div className="about-content">
          <div className="about-text">
            <p className="about-summary">
              {portfolioData?.summary || 'Passionate software engineer with experience in full-stack development and a strong foundation in computer science.'}
            </p>
            
            <div className="about-details">
              <div className="about-item">
                <User className="about-icon" />
                <div>
                  <h3>Background</h3>
                  <p>Computer Science student at Virginia Tech with a focus on software engineering and systems design.</p>
                </div>
              </div>
              
              <div className="about-item">
                <Code className="about-icon" />
                <div>
                  <h3>Technical Focus</h3>
                  <p>Specialized in full-stack development, cloud technologies, and building scalable applications.</p>
                </div>
              </div>
              
              <div className="about-item">
                <Briefcase className="about-icon" />
                <div>
                  <h3>Experience</h3>
                  <p>Multiple internships including 2x at Google, working on impactful projects with real-world applications.</p>
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