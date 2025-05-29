import React, { useState, useEffect } from 'react';
import ProfessionalHeader from './components/ProfessionalHeader';
import QuickStats from './components/QuickStats';
import ChatInterface from './components/ChatInterface';
import Timeline from './components/Timeline';
import LandingPage from './components/LandingPage';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [mode, setMode] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleSelectMode = (selectedMode) => {
    setMode(selectedMode);
  };

  const handleBackToLanding = () => {
    setMode(null);
  };

  const handleSwitchMode = () => {
    setMode(mode === 'chat' ? 'timeline' : 'chat');
  };

  if (!mode) {
    return <LandingPage onSelectMode={handleSelectMode} />;
  }

  return (
    <div className="app">
      <ProfessionalHeader 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onBackToLanding={handleBackToLanding}
        onSwitchMode={handleSwitchMode}
        currentMode={mode}
      />
      
      <main className="main-container">
        <div className="content-wrapper">
          <QuickStats />
          {mode === 'chat' ? <ChatInterface /> : <Timeline />}
        </div>
      </main>
    </div>
  );
}

export default App;