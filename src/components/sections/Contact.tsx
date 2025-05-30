import React from 'react';
import { PortfolioData } from '@/types/portfolio';

interface ContactProps {
  portfolioData: PortfolioData;
}

export const Contact: React.FC<ContactProps> = ({ portfolioData }) => {
  return (
    <section id="contact" className="section-padding bg-neutral-50 dark:bg-neutral-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Contact</h2>
        {/* Contact content will go here */}
      </div>
    </section>
  );
};