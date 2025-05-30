import { useState } from "react"
import { ChevronDown, ChevronRight, MapPin, Calendar, Building } from 'lucide-react'
import SectionHeader from "../ui/SectionHeader"
import { PortfolioData } from '@/types/portfolio'
import { motion, AnimatePresence } from 'framer-motion'

interface ExperienceProps {
  data: PortfolioData
}

export default function Experience({ data }: ExperienceProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const toggleExpanded = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id)
  }

  const experiences = data?.experience || []

  return (
    <section id="experience" className="py-20 lg:py-32 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Experience" subtitle="My professional journey" />

        <div className="max-w-4xl mx-auto">
          {/* Timeline container */}
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-purple-300 dark:bg-purple-700"></div>
            
            {experiences.map((experience, index) => {
              const isExpanded = expandedItem === (experience.id || index.toString())
              const items = experience.highlights || experience.responsibilities || experience.anticipatedResponsibilities || []
              
              return (
                <motion.div
                  key={experience.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-start mb-8"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-8 w-4 h-4 bg-purple-500 rounded-full -translate-x-1/2 z-10 ring-4 ring-white dark:ring-neutral-900"></div>
                  
                  {/* Content card */}
                  <div className="ml-8 md:ml-20 flex-1">
                    <div 
                      className={`
                        bg-white dark:bg-neutral-800 rounded-xl p-4 md:p-6 
                        border border-neutral-200/50 dark:border-neutral-700/50 
                        hover:border-purple-500/50 transition-all duration-300
                        ${isExpanded ? 'shadow-lg' : 'shadow-md hover:shadow-lg'}
                      `}
                    >
                      {/* Compact Header - Always Visible */}
                      <div 
                        className="flex items-start justify-between cursor-pointer"
                        onClick={() => toggleExpanded(experience.id || index.toString())}
                      >
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                              {experience.position || experience.role || experience.title}
                            </h3>
                            <span className="text-purple-600 dark:text-purple-400 font-medium">
                              @ {experience.company}
                            </span>
                            {(experience.isUpcoming || experience.status === 'Upcoming') && (
                              <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                                Upcoming
                              </span>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {typeof experience.duration === 'string' 
                                ? experience.duration 
                                : `${experience.duration.start} - ${experience.duration.end}`}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {experience.location}
                            </span>
                            {experience.team && (
                              <span className="flex items-center gap-1">
                                <Building className="w-3.5 h-3.5" />
                                {experience.team}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-4 mt-1"
                        >
                          <ChevronDown className="w-5 h-5 text-neutral-400" />
                        </motion.div>
                      </div>

                      {/* Compact Description - Always Visible */}
                      {experience.description && (
                        <div className="mt-3">
                          <p className={`text-neutral-600 dark:text-neutral-400 text-sm ${!isExpanded ? 'line-clamp-2' : ''}`}>
                            {experience.description}
                          </p>
                        </div>
                      )}

                      {/* Expandable Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700 mt-4">
                              {/* Technologies */}
                              {experience.technologies && (
                                <div className="mb-4">
                                  <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                                    Technologies
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {experience.technologies.map((tech) => (
                                      <span
                                        key={tech}
                                        className="px-2.5 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-lg"
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Highlights/Responsibilities */}
                              {items.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                                    {experience.highlights ? 'Key Achievements' : 'Responsibilities'}
                                  </h4>
                                  <ul className="space-y-2">
                                    {items.map((item, idx) => (
                                      <li key={idx} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        <ChevronRight className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}