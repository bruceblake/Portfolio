import { useState, useEffect } from 'react';
import ProfessionalHeader from './components/ProfessionalHeader';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import './App.css';

function App() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('./bruce-blake-data.json')
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
    return <LoadingScreen />;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!portfolioData) {
    return <div className="error">No portfolio data available</div>;
  }

  return (
    <div className="App">
      <ScrollProgress />
      <ProfessionalHeader portfolioData={portfolioData} />
      <main className="main-content">
        <Hero portfolioData={portfolioData} />
        <Timeline portfolioData={portfolioData} />
        <About portfolioData={portfolioData} />
        <Skills portfolioData={portfolioData} />
        <Contact portfolioData={portfolioData} />
      </main>
    </div>
  );
}

export default App;