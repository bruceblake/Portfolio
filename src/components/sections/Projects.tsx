import { useState } from "react"
import { Github, ExternalLink, Code } from 'lucide-react'
import SectionHeader from "../ui/SectionHeader"
import { PortfolioData } from '@/types/portfolio'
import { motion } from 'framer-motion'

interface ProjectsProps {
  data: PortfolioData
}

export default function Projects({ data }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState("All")

  const projects = data?.technicalProjects || []
  
  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category || "Other").filter(Boolean)))]

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter((project) => project.category === activeFilter)

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
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              layout
              className="group"
            >
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200/50 dark:border-neutral-700/50 hover:border-purple-500/50 transition-all duration-300 shadow-md hover:shadow-lg h-full flex flex-col">
                {/* Project Header */}
                <div className="flex items-center gap-2 mb-3">
                  <Code className="w-5 h-5 text-purple-500" />
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {project.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 flex-grow">
                  {project.description}
                </p>

                {/* Status and Category */}
                <div className="flex items-center gap-3 mb-4">
                  {project.status && (
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      project.status === "In Progress" || project.status === "Ongoing"
                        ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                        : project.status === "Hackathon Winner"
                        ? "bg-gradient-to-r from-yellow-400 to-amber-400 text-amber-900"
                        : project.status === "Production"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                        : project.status === "Internal Google" || project.status === "Startup" || project.status === "Competition"
                        ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                        : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    }`}>
                      {project.status}
                    </span>
                  )}
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    {project.category || "Project"}
                  </span>
                </div>

                {/* Technologies */}
                {project.technologies && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 5).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-lg text-xs font-medium">
                        +{project.technologies.length - 5} more
                      </span>
                    )}
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-3 mt-auto">
                  {project.links && !project.links.private ? (
                    <>
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          GitHub
                        </a>
                      )}
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Demo
                        </a>
                      )}
                      {project.links.website && (
                        <a
                          href={project.links.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Website
                        </a>
                      )}
                    </>
                  ) : project.links?.private ? (
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                      🔒 Private Repository
                    </span>
                  ) : null}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}