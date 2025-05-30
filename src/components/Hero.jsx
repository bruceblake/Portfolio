import React from 'react';
import { Mail, Github, Linkedin, ChevronDown } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import './Hero.css';

const Hero = ({ portfolioData }) => {
  const scrollToTimeline = () => {
    document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
  };

  const primarySkills = ['Python', 'Java', 'TypeScript', 'React', 'Angular', 'FastAPI', 'Docker'];

  return (
    <section id="hero" className="hero">
      <ParticleBackground />
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I'm <span className="hero-name">{portfolioData?.personal?.name || 'Bruce Blake'}</span>
          </h1>
          <h2 className="hero-subtitle">{portfolioData?.personal?.title || 'Software Engineer'}</h2>
          
          <div className="hero-skills">
            {primarySkills.map((skill, index) => (
              <span key={index} className="hero-skill-badge">
                {skill}
              </span>
            ))}
          </div>
          
          <p className="hero-description">
            {portfolioData?.personal?.currentFocus || 'Full-stack engineer specializing in scalable web applications and AI integration'}
          </p>
          
          <div className="hero-cta">
            <a href="#timeline" className="btn btn-primary">View My Journey</a>
            <a href="#contact" className="btn btn-secondary">Get In Touch</a>
          </div>
          
          <div className="hero-links">
            <a href={`mailto:${portfolioData?.personal?.email || 'bruceiiiblake@gmail.com'}`} className="hero-link" aria-label="Email">
              <Mail size={20} />
            </a>
            <a href={portfolioData?.links?.github || 'https://github.com/yourusername'} target="_blank" rel="noopener noreferrer" className="hero-link" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href={portfolioData?.links?.linkedin || 'https://linkedin.com/in/yourprofile'} target="_blank" rel="noopener noreferrer" className="hero-link" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        
        <button className="scroll-indicator" onClick={scrollToTimeline} aria-label="Scroll to timeline section">
          <ChevronDown size={24} />
        </button>
      </div>
    </section>
  );
};

export default Hero;