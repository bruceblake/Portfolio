import React, { useState } from 'react';
import { Download, Moon, Sun, MessageSquare, X } from 'lucide-react';
import ChatModal from './ChatModal';
import './ContactBar.css';

const ContactBar = ({ theme, toggleTheme }) => {
  const [showChat, setShowChat] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="contact-bar no-print">
        <div className="contact-bar-content">
          <div className="bar-left">
            <button className="bar-button" onClick={handlePrint}>
              <Download size={18} />
              <span>Download PDF</span>
            </button>
            
            <button 
              className="bar-button bar-button--chat"
              onClick={() => setShowChat(true)}
            >
              <MessageSquare size={18} />
              <span>Ask my LLM Assistant</span>
            </button>
          </div>
          
          <div className="bar-right">
            <button 
              className="bar-button bar-button--icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </div>
      </div>

      {showChat && (
        <ChatModal onClose={() => setShowChat(false)} />
      )}
    </>
  );
};

export default ContactBar;