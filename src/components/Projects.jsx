import React, { useState, useRef, useEffect } from 'react';
import { Code, ExternalLink, Github, Folder, Star } from 'lucide-react';
import './Projects.css';

const Projects = ({ portfolioData }) => {
  const [expandedProjects, setExpandedProjects] = useState(new Set());
  const [visibleProjects, setVisibleProjects] = useState(new Set());
  const projectRefs = useRef([]);
  
  const projects = portfolioData?.technicalProjects || [];
  
  // Add placeholder projects for future additions
  const placeholderProjects = [
    {
      name: "AI Chat Application",
      category: "Full-Stack Development",
      status: "In Progress",
      description: "Advanced chat application with RAG implementation and vector search",
      technicalHighlights: [
        "Implemented semantic search using OpenAI embeddings",
        "Built real-time chat with WebSocket connections",
        "Integrated PostgreSQL with pgvector for similarity search"
      ],
      technologies: ["Python", "FastAPI", "React", "PostgreSQL", "OpenAI API", "WebSocket"],
      links: {
        github: "https://github.com/bruceblake/ai-chat-app",
        live: "https://ai-chat-demo.vercel.app"
      }
    },
    {
      name: "Cloud Infrastructure Automation",
      category: "DevOps & Cloud",
      status: "Completed",
      description: "Terraform-based infrastructure automation for AWS deployments",
      technicalHighlights: [
        "Automated deployment of microservices architecture",
        "Implemented CI/CD pipelines with GitHub Actions",
        "Set up monitoring with CloudWatch and Grafana"
      ],
      technologies: ["Terraform", "AWS", "Docker", "Kubernetes", "GitHub Actions"],
      links: {
        github: "https://github.com/bruceblake/cloud-automation"
      }
    },
    {
      name: "Mobile Task Manager",
      category: "Mobile Development",
      status: "Completed",
      description: "Cross-platform task management app with real-time sync",
      technicalHighlights: [
        "Built with React Native for iOS and Android",
        "Implemented offline-first architecture with Redux",
        "Real-time synchronization using Firebase"
      ],
      technologies: ["React Native", "Redux", "Firebase", "TypeScript"],
      links: {
        github: "https://github.com/bruceblake/task-manager-mobile"
      }
    }
  ];
  
  // Combine real and placeholder projects
  const allProjects = [...projects, ...placeholderProjects];
  
  // Update GitHub links for existing projects if they don't have them
  const projectsWithLinks = allProjects.map(project => ({
    ...project,
    links: {
      github: project.links?.github || `https://github.com/bruceblake/${project.name.toLowerCase().replace(/\s+/g, '-')}`,
      ...project.links
    }
  }));
  
  const keyTechnologies = [
    'Python', 'Java', 'TypeScript', 'JavaScript', 'C++', 'Swift',
    'FastAPI', 'React', 'Angular', 'SwiftUI', 'Node.js', 'Express',
    'PostgreSQL', 'Redis', 'Firebase', 'Docker', 'OpenAI API', 'AWS'
  ];
  
  const isKeyTechnology = (tech) => {
    return keyTechnologies.some(key => tech.toLowerCase().includes(key.toLowerCase()));
  };
  
  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleProjects(prev => new Set([...prev, entry.target.dataset.projectId]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    projectRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [projectsWithLinks]);
  
  const toggleProject = (projectId) => {
    setExpandedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };
  
  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title">
          <Folder className="section-icon" />
          Featured Projects
        </h2>
        
        <div className="projects-grid">
          {projectsWithLinks.map((project, index) => (
            <div
              key={index}
              ref={el => projectRefs.current[index] = el}
              data-project-id={index}
              className={`project-card ${visibleProjects.has(String(index)) ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project-header">
                <div className="project-title-row">
                  <h3 className="project-title">{project.name}</h3>
                  {project.status && (
                    <span className={`project-status ${project.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {project.status}
                    </span>
                  )}
                </div>
                <p className="project-category">{project.category}</p>
              </div>
              
              <p className="project-description">{project.description}</p>
              
              <div className="project-tech-stack">
                <h4 className="tech-stack-title">Tech Stack:</h4>
                <div className="project-technologies">
                  {(expandedProjects.has(index) ? project.technologies : project.technologies.slice(0, 6)).map((tech, idx) => (
                    <span 
                      key={idx} 
                      className={`tech-tag ${isKeyTechnology(tech) ? 'key-tech' : ''}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {!expandedProjects.has(index) && project.technicalHighlights && project.technicalHighlights.length > 0 && (
                <div className="project-highlights">
                  <h4 className="highlights-title">Key Features:</h4>
                  <ul className="project-details">
                    {project.technicalHighlights.slice(0, 2).map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {expandedProjects.has(index) && project.technicalHighlights && (
                <div className="project-highlights expanded">
                  <h4 className="highlights-title">All Features:</h4>
                  <ul className="project-details">
                    {project.technicalHighlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="project-footer">
                <div className="project-links">
                  {project.links?.github && (
                    <a 
                      href={project.links.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <Github size={18} />
                      <span>View Code</span>
                    </a>
                  )}
                  {project.links?.live && (
                    <a 
                      href={project.links.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link live"
                    >
                      <ExternalLink size={18} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
                
                {(project.technicalHighlights?.length > 2 || project.technologies?.length > 6) && (
                  <button 
                    className={`expand-btn ${expandedProjects.has(index) ? 'expanded' : ''}`}
                    onClick={() => toggleProject(index)}
                  >
                    <span className="expand-text">
                      {expandedProjects.has(index) ? 'Show Less' : 'View More'}
                    </span>
                    <span className="expand-icon">
                      {expandedProjects.has(index) ? '−' : '+'}
                    </span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="more-projects-note">
          <Star className="note-icon" />
          <p>More exciting projects coming soon! Currently working on ML/AI applications and cloud-native solutions.</p>
        </div>
      </div>
    </section>
  );
};

export default Projects;