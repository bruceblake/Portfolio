import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navigation } from './components/ui/Navigation';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Achievements } from './components/sections/Achievements';
import { Skills } from './components/sections/Skills';
import { Contact } from './components/sections/Contact';
import { setTheme, getTheme } from './utils/theme';
import { PortfolioData } from './types/portfolio';

const queryClient = new QueryClient();

function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize theme
    const theme = getTheme();
    setTheme(theme);

    // Load portfolio data
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-900">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4">
            <svg className="animate-spin h-16 w-16 text-brand-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
          <p className="text-neutral-600 dark:text-neutral-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">No Data</h1>
          <p className="text-neutral-600 dark:text-neutral-400">No portfolio data available</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300">
        <Navigation portfolioData={portfolioData} />
        <main>
          <Hero portfolioData={portfolioData} />
          <About portfolioData={portfolioData} />
          <Experience portfolioData={portfolioData} />
          <Projects portfolioData={portfolioData} />
          <Achievements portfolioData={portfolioData} />
          <Skills portfolioData={portfolioData} />
          <Contact portfolioData={portfolioData} />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;