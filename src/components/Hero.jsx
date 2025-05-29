import React from 'react';
import { Mail, Github, Linkedin, ChevronDown } from 'lucide-react';
import './Hero.css';

const Hero = ({ portfolioData }) => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I'm <span className="hero-name">{portfolioData?.personal?.name || 'Bruce Blake'}</span>
          </h1>
          <h2 className="hero-subtitle">{portfolioData?.personal?.title || 'Software Engineer'}</h2>
          <p className="hero-description">
            {portfolioData?.summary?.brief?.split('.')[0] || 'Passionate about building innovative solutions'}
          </p>
          
          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary">Get In Touch</a>
            <a href="#projects" className="btn btn-secondary">View Projects</a>
          </div>
          
          <div className="hero-links">
            <a href={`mailto:${portfolioData?.personal?.email || 'bruceblake@vt.edu'}`} className="hero-link" aria-label="Email">
              <Mail size={20} />
            </a>
            <a href={portfolioData?.links?.github || 'https://github.com/bruceblake'} target="_blank" rel="noopener noreferrer" className="hero-link" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href={portfolioData?.links?.linkedin || 'https://linkedin.com/in/bruceblake'} target="_blank" rel="noopener noreferrer" className="hero-link" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        
        <button className="scroll-indicator" onClick={scrollToAbout} aria-label="Scroll to about section">
          <ChevronDown size={24} />
        </button>
      </div>
    </section>
  );
};

export default Hero;