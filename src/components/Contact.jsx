import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Globe, Send } from 'lucide-react';
import './Contact.css';

const Contact = ({ portfolioData }) => {
  const contact = portfolioData?.contact || {};

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="contact-content">
          <div className="contact-info">
            <p className="contact-intro">
              I'm always interested in hearing about new opportunities and exciting projects. 
              Feel free to reach out if you'd like to connect!
            </p>
            
            <div className="contact-methods">
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="contact-method">
                  <Mail className="contact-icon" />
                  <span>{contact.email}</span>
                </a>
              )}
              
              {contact.phone && (
                <a href={`tel:${contact.phone}`} className="contact-method">
                  <Phone className="contact-icon" />
                  <span>{contact.phone}</span>
                </a>
              )}
              
              {contact.location && (
                <div className="contact-method">
                  <MapPin className="contact-icon" />
                  <span>{contact.location}</span>
                </div>
              )}
            </div>
            
            <div className="social-links">
              {contact.github && (
                <a 
                  href={contact.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                  aria-label="GitHub"
                >
                  <Github />
                </a>
              )}
              
              {contact.linkedin && (
                <a 
                  href={contact.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                  aria-label="LinkedIn"
                >
                  <Linkedin />
                </a>
              )}
              
              {contact.website && (
                <a 
                  href={contact.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                  aria-label="Website"
                >
                  <Globe />
                </a>
              )}
            </div>
          </div>
          
          <div className="contact-cta">
            <h3>Let's Build Something Together</h3>
            <p>Whether you have a project in mind or just want to chat, I'm always open to discussing new opportunities.</p>
            <a href={`mailto:${contact.email || 'bruceblake@vt.edu'}`} className="cta-button">
              <Send size={18} />
              Send Message
            </a>
          </div>
        </div>
        
        <div className="contact-footer">
          <p className="footer-text">© 2024 Bruce Blake. All rights reserved.</p>
          <div className="footer-links">
            <a href="/privacy" className="footer-link">Privacy Policy</a>
            <a href="/terms" className="footer-link">Terms of Service</a>
            <a href="#hero" className="footer-link">Back to Top ↑</a>
          </div>
          <p className="footer-text">Built with React, TypeScript, and ❤️</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;