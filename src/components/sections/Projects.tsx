import { useState } from "react"
import { Github, ExternalLink, ChevronDown, Code, Zap } from 'lucide-react'
import SectionHeader from "../ui/SectionHeader"
import { PortfolioData } from '@/types/portfolio'
import { motion, AnimatePresence } from 'framer-motion'

interface ProjectsProps {
  data: PortfolioData
}

export default function Projects({ data }: ProjectsProps) {
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState("All")

  const projects = data?.technicalProjects || []
  
  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category || "Other").filter(Boolean)))]

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter((project) => project.category === activeFilter)

  const toggleExpanded = (id: string) => {
    setExpandedProject(expandedProject === id ? null : id)
  }

  return (
    <section id="projects" className="py-20 lg:py-32 bg-neutral-50/50 dark:bg-neutral-950/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Projects" subtitle="Things I've built" />

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === category
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                  : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 border border-neutral-200 dark:border-neutral-700"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((project, index) => {
            const isExpanded = expandedProject === (project.id || index.toString())
            
            return (
              <motion.div
                key={project.id || index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                layout
                className="group"
              >
                <div className={`
                  bg-white dark:bg-neutral-800 rounded-xl overflow-hidden
                  border border-neutral-200/50 dark:border-neutral-700/50 
                  hover:border-purple-500/50 transition-all duration-300
                  ${isExpanded ? 'shadow-xl' : 'shadow-md hover:shadow-lg'}
                `}>
                  {/* Compact Project Card - Always Visible */}
                  <div 
                    className="p-4 md:p-5 cursor-pointer"
                    onClick={() => toggleExpanded(project.id || index.toString())}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Code className="w-5 h-5 text-purple-500" />
                          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {project.name}
                          </h3>
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                      
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-3 mt-1"
                      >
                        <ChevronDown className="w-5 h-5 text-neutral-400" />
                      </motion.div>
                    </div>

                    {/* Quick Info - Always Visible */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {project.status && (
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            project.status === "In Progress" 
                              ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                              : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                          }`}>
                            {project.status}
                          </span>
                        )}
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                          {project.category || "Project"}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        {project.links?.github && (
                          <motion.a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Github className="w-4 h-4" />
                          </motion.a>
                        )}
                        {project.links?.live && (
                          <motion.a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-neutral-200 dark:border-neutral-700">
                          {/* Full Description */}
                          <div className="pt-4">
                            <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                              About
                            </h4>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                              {project.description}
                            </p>
                          </div>

                          {/* Technologies */}
                          {project.technologies && (
                            <div className="mb-4">
                              <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2 flex items-center gap-1">
                                <Zap className="w-3.5 h-3.5" />
                                Tech Stack
                              </h4>
                              <div className="flex flex-wrap gap-1.5">
                                {project.technologies.map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-md"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Project Links */}
                          {(project.links?.github || project.links?.live) && (
                            <div className="flex gap-3 pt-2">
                              {project.links.github && (
                                <a
                                  href={project.links.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-700 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 transition-colors"
                                >
                                  <Github className="w-4 h-4" />
                                  View Code
                                </a>
                              )}
                              {project.links.live && (
                                <a
                                  href={project.links.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  Live Demo
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}