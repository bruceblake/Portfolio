import React from 'react';
import { PortfolioData } from '@/types/portfolio';

interface SkillsProps {
  portfolioData: PortfolioData;
}

export const Skills: React.FC<SkillsProps> = ({ portfolioData }) => {
  return (
    <section id="skills" className="section-padding bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Skills</h2>
        {/* Skills content will go here */}
      </div>
    </section>
  );
};