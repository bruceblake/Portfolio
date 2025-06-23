import { Trophy, Users, Calendar, ExternalLink } from 'lucide-react'
import SectionHeader from "../ui/SectionHeader"
import { PortfolioData } from '@/types/portfolio'
import { motion } from 'framer-motion'

interface AchievementsProps {
  data: PortfolioData
}

export default function Achievements({ data }: AchievementsProps) {
  const achievements = data?.teamsAndAccomplishments || []
  
  if (achievements.length === 0) return null

  return (
    <section id="achievements" className="py-16 lg:py-24 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Achievements & Awards" subtitle="Recognition and accomplishments" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden border border-neutral-200/50 dark:border-neutral-700/50 hover:shadow-xl transition-all duration-300 group"
            >
              {/* Award Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Trophy className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
                        {achievement.title}
                      </h3>
                      {achievement.event && (
                        <p className="text-purple-600 dark:text-purple-400 font-medium">
                          {achievement.event}
                        </p>
                      )}
                      {achievement.competition && (
                        <p className="text-purple-600 dark:text-purple-400 font-medium">
                          {achievement.competition}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Achievement Details */}
                <div className="space-y-3">
                  {achievement.distinction && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-amber-400 text-amber-900 rounded-full font-semibold shadow-lg shadow-yellow-400/25">
                        🏆 {achievement.distinction}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                    {achievement.date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {achievement.date}
                      </span>
                    )}
                    {achievement.duration && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {achievement.duration}
                      </span>
                    )}
                    {achievement.role && (
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {achievement.role}
                      </span>
                    )}
                  </div>

                  <p className="text-neutral-600 dark:text-neutral-400">
                    {achievement.description}
                  </p>

                  {/* Key Contributions */}
                  {achievement.keyContributions && achievement.keyContributions.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                        Key Contributions:
                      </h4>
                      <ul className="space-y-1">
                        {achievement.keyContributions.map((contribution, idx) => (
                          <li key={idx} className="text-sm text-neutral-600 dark:text-neutral-400 flex items-start">
                            <span className="text-purple-500 mr-2">•</span>
                            <span>{contribution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  {achievement.technologies && achievement.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {achievement.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Links */}
                  {achievement.links && (
                    <div className="flex gap-3 mt-4">
                      {achievement.links.winning_post && (
                        <a
                          href={achievement.links.winning_post}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Winning Post
                        </a>
                      )}
                      {achievement.links.website && (
                        <a
                          href={achievement.links.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Team Website
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}