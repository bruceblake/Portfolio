import React from 'react';
import { ExternalLink, Github, Folder, Star } from 'lucide-react';
import './Projects.css';

const Projects = ({ portfolioData }) => {
  const projects = portfolioData?.technicalProjects || [];
  
  // Consider projects with more technical highlights as featured
  const featuredProjects = projects.filter(p => p.technicalHighlights?.length > 2);
  const otherProjects = projects.filter(p => p.technicalHighlights?.length <= 2);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        
        {featuredProjects.length > 0 && (
          <>
            <h3 className="subsection-title">Featured Projects</h3>
            <div className="featured-projects">
              {featuredProjects.map((project, index) => (
                <div key={index} className="featured-project">
                  <div className="project-content">
                    <div className="project-header">
                      <Folder className="project-icon" />
                      <div className="project-links">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="GitHub">
                            <Github size={20} />
                          </a>
                        )}
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="Demo">
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="project-title">{project.name}</h3>
                    <p className="project-description">{project.description}</p>
                    
                    <div className="project-tech">
                      {project.technologies?.map((tech, idx) => (
                        <span key={idx} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        
        {otherProjects.length > 0 && (
          <>
            <h3 className="subsection-title">Other Projects</h3>
            <div className="other-projects">
              {otherProjects.map((project, index) => (
                <div key={index} className="other-project">
                  <div className="project-header">
                    <Folder className="project-icon" size={20} />
                    <div className="project-links">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="GitHub">
                          <Github size={18} />
                        </a>
                      )}
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="Demo">
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <h4 className="project-title">{project.name}</h4>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-tech">
                    {project.technologies?.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="tech-tag small">{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;