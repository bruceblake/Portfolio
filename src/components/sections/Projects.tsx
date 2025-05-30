import React from 'react';
import { PortfolioData } from '@/types/portfolio';

interface ProjectsProps {
  portfolioData: PortfolioData;
}

export const Projects: React.FC<ProjectsProps> = ({ portfolioData }) => {
  return (
    <section id="projects" className="section-padding bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
        {/* Projects content will go here */}
      </div>
    </section>
  );
};