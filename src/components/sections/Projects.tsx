import { Github, ExternalLink, Folder } from 'lucide-react'
import SectionHeader from "../ui/SectionHeader"
import { PortfolioData } from '@/types/portfolio'

interface ProjectsProps {
  data: PortfolioData
}

export default function Projects({ data }: ProjectsProps) {
  const projects = data?.technicalProjects || []
  
  // Feature React/TypeScript projects
  const reactTsProjects = projects.filter(p => 
    p.technologies?.some(tech => 
      tech.toLowerCase().includes('react') || 
      tech.toLowerCase().includes('typescript') ||
      tech.toLowerCase().includes('angular')
    )
  )
  const otherProjects = projects.filter(p => 
    !p.technologies?.some(tech => 
      tech.toLowerCase().includes('react') || 
      tech.toLowerCase().includes('typescript') ||
      tech.toLowerCase().includes('angular')
    )
  )

  return (
    <section id="projects" className="py-16 lg:py-24 bg-neutral-50/50 dark:bg-neutral-950/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Projects" subtitle="Things I've built" />
        
        {/* React/TypeScript Projects - Featured */}
        {reactTsProjects.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-6">
              React & TypeScript Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reactTsProjects.map((project, index) => (
                <div
                  key={project.id || index}
                  className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700 hover:border-purple-500/50 transition-colors h-full flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Folder className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                    <div className="flex gap-3">
                      {project.links?.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                          aria-label="GitHub"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.links?.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                          aria-label="Live Demo"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                      {project.links?.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                          aria-label="Demo"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                    {project.name}
                  </h3>
                  
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4 text-sm">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies?.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-6">
              Other Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <div
                  key={project.id || index}
                  className="bg-white dark:bg-neutral-800 rounded-lg p-5 border border-neutral-200 dark:border-neutral-700 hover:border-purple-500/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <Folder className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    <div className="flex gap-2">
                      {project.links?.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                          aria-label="GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.links?.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                          aria-label="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                    {project.name}
                  </h4>
                  
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies?.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies && project.technologies.length > 3 && (
                      <span className="px-2.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full text-xs font-medium">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}