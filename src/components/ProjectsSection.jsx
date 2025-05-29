import React from 'react';
import './ProjectsSection.css';

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: '3D Physics Engine & Multiplayer FPS Game',
      technologies: 'C++, OpenGL, SDL2, ENet',
      bullets: [
        'Built custom game engine from scratch with physics simulation using SAT/GJK collision algorithms',
        'Implemented low-latency multiplayer with client-side prediction and lag compensation',
        'Created cross-platform rendering pipeline supporting Windows, Linux, and macOS'
      ],
      link: 'github.com/bruceblake/3d-physics-engine'
    },
    {
      id: 2,
      title: 'BetterRepo2File - AI Context Extraction Tool',
      technologies: 'Python, AST Parsing, Git',
      bullets: [
        'Developed tool to intelligently extract repository context for LLM coding assistants',
        'Implemented smart file filtering and dependency analysis for optimal context generation',
        'Open-sourced project gaining traction in developer community'
      ],
      link: 'github.com/bruceblake/betterrepo2file'
    },
    {
      id: 3,
      title: 'AI Phone Ordering System',
      technologies: 'Python, MySQL, Docker, Twilio, OpenAI API',
      bullets: [
        'Architected complete phone ordering solution processing $15,000+ in revenue',
        'Achieved 98% order accuracy while handling concurrent calls',
        'Reduced restaurant staff workload by 70% through automation'
      ]
    }
  ];

  return (
    <section className="resume-section">
      <h2 className="section-title">Technical Projects</h2>
      
      <div className="projects-list">
        {projects.map((project) => (
          <div key={project.id} className="project-item">
            <div className="project-header">
              <h3 className="project-title">{project.title}</h3>
              {project.link && (
                <a href={`https://${project.link}`} className="project-link" target="_blank" rel="noopener noreferrer">
                  {project.link}
                </a>
              )}
            </div>
            
            <div className="project-tech">{project.technologies}</div>
            
            <ul className="project-bullets">
              {project.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;