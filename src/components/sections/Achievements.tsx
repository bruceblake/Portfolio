import React from 'react';
import { PortfolioData } from '@/types/portfolio';

interface AchievementsProps {
  portfolioData: PortfolioData;
}

export const Achievements: React.FC<AchievementsProps> = ({ portfolioData }) => {
  return (
    <section id="achievements" className="section-padding bg-neutral-50 dark:bg-neutral-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Achievements</h2>
        {/* Achievements content will go here */}
      </div>
    </section>
  );
};