import React from 'react';
import './ExperienceSection.css';

const ExperienceSection = () => {
  const experiences = [
    {
      id: 1,
      title: 'STEP Intern',
      company: 'Google',
      team: 'Platforms & Devices',
      location: 'Mountain View, CA',
      period: 'May 2025 - Aug 2025',
      upcoming: true,
      bullets: [
        'Incoming intern on Platforms & Devices team working with Java, Angular, TypeScript, and Protocol Buffers',
        'Will contribute to platform-level solutions used across Google products'
      ]
    },
    {
      id: 2,
      title: 'Freelance Software Engineer',
      company: 'Red Bar Sushi',
      location: 'Remote',
      period: 'Sep 2024 - Feb 2025',
      bullets: [
        'Built AI-powered phone ordering system that generated $15,000+ revenue in 3 months',
        'Reduced order processing time by 70% while serving 600+ customers with 98% accuracy',
        'Architected scalable microservices with Python, MySQL, Docker, and Twilio integration',
        'Implemented asynchronous SMS confirmations using Celery workers and Redis'
      ]
    },
    {
      id: 3,
      title: 'STEP Intern',
      company: 'Google',
      team: 'Geo Data Quality',
      location: 'Sunnyvale, CA',
      period: 'May 2024 - Aug 2024',
      bullets: [
        'Created ML-powered issue similarity recommender adopted by 2.5M+ monthly users',
        'Reduced manual triage time by 40% using OpenAI embeddings for semantic matching',
        'Built end-to-end feature with Java, TypeScript, and Angular within 12-week internship',
        'Received excellent performance review and invitation for second internship'
      ]
    }
  ];

  return (
    <section className="resume-section">
      <h2 className="section-title">Professional Experience</h2>
      
      <div className="experience-list">
        {experiences.map((exp) => (
          <div key={exp.id} className="experience-item">
            <div className="experience-header">
              <div className="experience-left">
                <h3 className="experience-title">{exp.title}</h3>
                <div className="experience-company">
                  {exp.company}{exp.team && ` • ${exp.team}`}
                </div>
              </div>
              <div className="experience-right">
                <div className="experience-period">{exp.period}</div>
                <div className="experience-location">{exp.location}</div>
              </div>
            </div>
            
            <ul className="experience-bullets">
              {exp.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;