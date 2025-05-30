import React from 'react';
import { PortfolioData } from '@/types/portfolio';

interface AboutProps {
  portfolioData: PortfolioData;
}

export const About: React.FC<AboutProps> = ({ portfolioData }) => {
  return (
    <section id="about" className="section-padding bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">About Me</h2>
        {/* About content will go here */}
      </div>
    </section>
  );
};