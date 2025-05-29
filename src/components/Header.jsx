import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="resume-header">
      <div className="header-content">
        <h1 className="header-name">Bruce Blake</h1>
        <h2 className="header-title">Software Engineer</h2>
        
        <div className="header-contact">
          <a href="mailto:bruceblake@vt.edu" className="contact-item">
            <i className="fas fa-envelope"></i>
            bruceblake@vt.edu
          </a>
          <span className="contact-separator">•</span>
          <a href="https://github.com/bruceblake" className="contact-item" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
            github.com/bruceblake
          </a>
          <span className="contact-separator">•</span>
          <a href="https://linkedin.com/in/bruceblake" className="contact-item" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
            linkedin.com/in/bruceblake
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;