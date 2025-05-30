import { GraduationCap, Award, Calendar, MapPin } from 'lucide-react'
import SectionHeader from "../ui/SectionHeader"
import { PortfolioData } from '@/types/portfolio'
import { motion } from 'framer-motion'

interface EducationProps {
  data: PortfolioData
}

export default function Education({ data }: EducationProps) {
  const education = data?.education?.[0] // Assuming single education entry for now
  
  if (!education) return null

  return (
    <section id="education" className="py-20 lg:py-32 bg-neutral-50/50 dark:bg-neutral-950/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Education" subtitle="Academic Background" />

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-neutral-800 rounded-xl p-6 md:p-8 border border-neutral-200/50 dark:border-neutral-700/50 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Main Education Info */}
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl">
                <GraduationCap className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                  {education.institution}
                </h3>
                
                <div className="space-y-2">
                  <p className="text-lg text-neutral-700 dark:text-neutral-300">
                    {education.degree}
                    {education.minor && (
                      <span className="text-purple-600 dark:text-purple-400"> • Minor in {education.minor}</span>
                    )}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {education.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {education.graduationDate}
                    </span>
                  </div>
                  
                  {/* GPA Badge */}
                  <div className="inline-flex items-center gap-2 mt-3">
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full text-sm font-semibold shadow-lg shadow-purple-500/25">
                      {education.gpaDetails}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}