import { useState } from 'react'
import { MapPin, Calendar, Building, ChevronDown, ChevronUp } from 'lucide-react'
import SectionHeader from "../ui/SectionHeader"
import { PortfolioData } from '@/types/portfolio'
import { motion, AnimatePresence } from 'framer-motion'

interface ExperienceProps {
  data: PortfolioData
}

export default function Experience({ data }: ExperienceProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const experiences = data?.experience || []

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  return (
    <section id="experience" className="py-16 lg:py-24 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Experience" subtitle="My professional journey" />

        <div className="max-w-6xl mx-auto">
          {/* Timeline container */}
          <div className="relative">
            {/* Vertical timeline line - centered on desktop */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5">
              <div className="w-full h-full bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600 dark:from-purple-600 dark:via-purple-700 dark:to-purple-800 opacity-40"></div>
            </div>
            
            {/* Mobile timeline line */}
            <div className="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600 dark:from-purple-600 dark:via-purple-700 dark:to-purple-800 opacity-40"></div>
            
            {experiences.map((experience, index) => {
              const isEven = index % 2 === 0
              const isUpcoming = experience.isUpcoming || experience.status === 'Upcoming'
              
              return (
                <motion.div
                  key={experience.id || index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center mb-12 md:mb-16 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot - centered */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-20">
                    <motion.div 
                      className="relative"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200, delay: index * 0.1 + 0.2 }}
                    >
                      <div className={`w-6 h-6 rounded-full ring-4 ring-white dark:ring-neutral-900 shadow-xl ${
                        isUpcoming 
                          ? 'bg-gradient-to-br from-green-400 to-emerald-600 shadow-green-500/30'
                          : 'bg-gradient-to-br from-purple-400 to-purple-600 shadow-purple-500/30'
                      }`}></div>
                      {isUpcoming && (
                        <div className="absolute inset-0 w-6 h-6 bg-green-500 rounded-full animate-ping opacity-30"></div>
                      )}
                    </motion.div>
                  </div>
                  
                  {/* Content wrapper */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                    {/* Date badge - positioned differently for alternating layout */}
                    <motion.div 
                      className={`hidden md:flex items-center gap-2 mb-3 ${
                        isEven ? 'justify-end' : 'justify-start'
                      }`}
                      initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        {typeof experience.duration === 'string' 
                          ? experience.duration 
                          : `${experience.duration.start} - ${experience.duration.end}`}
                      </span>
                    </motion.div>
                    
                    {/* Content card */}
                    <motion.div 
                      className="ml-12 md:ml-0"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div 
                        className={`
                          bg-white dark:bg-neutral-800 rounded-xl p-5 md:p-6 
                          border border-neutral-200/50 dark:border-neutral-700/50 
                          hover:border-purple-500/50 transition-all duration-300
                          shadow-lg hover:shadow-xl relative
                          ${isUpcoming ? 'ring-2 ring-green-500/20' : ''}
                        `}
                      >
                        {/* Arrow pointing to timeline - only on desktop */}
                        <div className={`hidden md:block absolute top-6 ${
                          isEven 
                            ? 'right-0 translate-x-full -mr-2' 
                            : 'left-0 -translate-x-full -ml-2'
                        }`}>
                          <div className={`w-4 h-4 bg-white dark:bg-neutral-800 border-t-2 border-r-2 border-neutral-200/50 dark:border-neutral-700/50 transform rotate-45 ${
                            isEven ? '-rotate-45' : 'rotate-[135deg]'
                          }`}></div>
                        </div>

                        {/* Compact Header - Always Visible */}
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                              {experience.position || experience.role || experience.title}
                            </h3>
                            {(experience.isUpcoming || experience.status === 'Upcoming') && (
                              <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full animate-pulse">
                                Upcoming
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-purple-600 dark:text-purple-400 font-medium">
                              {experience.company}
                            </span>
                            <span className="text-neutral-400">•</span>
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">
                              {experience.location}
                            </span>
                          </div>
                          
                          {/* Mobile date display */}
                          <div className="md:hidden flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                            <Calendar className="w-3.5 h-3.5" />
                            {typeof experience.duration === 'string' 
                              ? experience.duration 
                              : `${experience.duration.start} - ${experience.duration.end}`}
                          </div>
                        </div>

                      {/* Description */}
                      {experience.description && (
                        <div className="mt-3">
                          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                            {experience.description}
                          </p>
                        </div>
                      )}

                      {/* Show More Button */}
                      {(experience.highlights?.length || experience.technologies?.length) && (
                        <button
                          onClick={() => toggleExpanded(experience.id || index.toString())}
                          className="mt-3 flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium transition-colors"
                        >
                          {expandedItems.has(experience.id || index.toString()) ? (
                            <>
                              Show less <ChevronUp className="w-4 h-4" />
                            </>
                          ) : (
                            <>
                              Show more <ChevronDown className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      )}

                      {/* Expanded Content */}
                      <AnimatePresence>
                        {expandedItems.has(experience.id || index.toString()) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 space-y-4">
                              {/* Highlights */}
                              {experience.highlights && experience.highlights.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                                    Key Achievements:
                                  </h4>
                                  <ul className="space-y-1">
                                    {experience.highlights.map((highlight, idx) => (
                                      <li key={idx} className="text-sm text-neutral-600 dark:text-neutral-400 flex items-start">
                                        <span className="text-purple-500 mr-2">•</span>
                                        <span>{highlight}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Technologies */}
                              {experience.technologies && experience.technologies.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                                    Technologies:
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {experience.technologies.map((tech, idx) => (
                                      <span
                                        key={idx}
                                        className="px-2.5 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-xs font-medium"
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-1/2"></div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}