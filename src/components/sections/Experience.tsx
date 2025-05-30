import React from 'react';
import { PortfolioData } from '@/types/portfolio';

interface ExperienceProps {
  portfolioData: PortfolioData;
}

export const Experience: React.FC<ExperienceProps> = ({ portfolioData }) => {
  return (
    <section id="experience" className="section-padding bg-neutral-50 dark:bg-neutral-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Experience</h2>
        {/* Experience content will go here */}
      </div>
    </section>
  );
};