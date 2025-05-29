import { useState, useEffect } from 'react';
import ProfessionalHeader from './components/ProfessionalHeader';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Accomplishments from './components/Accomplishments';
import Contact from './components/Contact';
import ChatInterface from './components/ChatInterface';
import './App.css';

function App() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    fetch('/bruce-blake-data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load portfolio data');
        }
        return response.json();
      })
      .then(data => {
        setPortfolioData(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error loading portfolio data:', err);
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    // Smooth scrolling for navigation links
    const handleClick = (e) => {
      if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  if (isLoading) {
    return <div className="loading">Loading portfolio data...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!portfolioData) {
    return <div className="error">No portfolio data available</div>;
  }

  return (
    <div className="App">
      <ProfessionalHeader portfolioData={portfolioData} />
      <main className="main-content">
        <Hero portfolioData={portfolioData} />
        <About portfolioData={portfolioData} />
        <Experience portfolioData={portfolioData} />
        <Projects portfolioData={portfolioData} />
        <Skills portfolioData={portfolioData} />
        <Education portfolioData={portfolioData} />
        <Accomplishments portfolioData={portfolioData} />
        <Contact portfolioData={portfolioData} />
      </main>
      
      {/* Chat Toggle Button */}
      <button 
        className="chat-toggle-button"
        onClick={() => setShowChat(!showChat)}
        aria-label={showChat ? 'Close chat' : 'Open chat'}
      >
        {showChat ? '✕' : '💬'}
      </button>
      
      {/* Chat Interface */}
      {showChat && (
        <div className="chat-container">
          <ChatInterface portfolioData={portfolioData} />
        </div>
      )}
    </div>
  );
}

export default App;