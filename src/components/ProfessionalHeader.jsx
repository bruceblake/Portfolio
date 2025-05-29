import React from 'react';
import { Download, Moon, Sun, Mail, Github, Linkedin, Home, MessageSquare, Clock } from 'lucide-react';
import './ProfessionalHeader.css';

const ProfessionalHeader = ({ theme, toggleTheme, onBackToLanding, onSwitchMode, currentMode }) => {
  const handleDownload = () => {
    window.print();
  };

  return (
    <header className="professional-header">
      <div className="header-container">
        <div className="header-left">
          <h1 className="header-name">Bruce Blake</h1>
          <p className="header-tagline">Software Engineer • 2x Google Intern • Virginia Tech</p>
        </div>
        
        <div className="header-right">
          <div className="contact-links">
            <a href="mailto:bruceblake@vt.edu" className="contact-link" title="Email">
              <Mail size={18} />
            </a>
            <a href="https://github.com/bruceblake" className="contact-link" target="_blank" rel="noopener noreferrer" title="GitHub">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com/in/bruceblake" className="contact-link" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <Linkedin size={18} />
            </a>
          </div>
          
          <div className="header-actions">
            {onBackToLanding && (
              <>
                <button onClick={onBackToLanding} className="header-btn header-btn--nav" title="Home">
                  <Home size={16} />
                  <span>Home</span>
                </button>
                
                {currentMode && onSwitchMode && (
                  <button 
                    onClick={onSwitchMode} 
                    className="header-btn header-btn--nav header-btn--switch"
                    title={currentMode === 'chat' ? 'Switch to Timeline' : 'Switch to Chat'}
                  >
                    {currentMode === 'chat' ? <Clock size={16} /> : <MessageSquare size={16} />}
                    <span>{currentMode === 'chat' ? 'Timeline' : 'Chat'}</span>
                  </button>
                )}
              </>
            )}
            
            <button onClick={handleDownload} className="header-btn header-btn--download">
              <Download size={16} />
              <span>Resume</span>
            </button>
            
            <button onClick={toggleTheme} className="header-btn header-btn--theme" aria-label="Toggle theme">
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProfessionalHeader;