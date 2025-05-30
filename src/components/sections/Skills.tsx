import { useState } from "react"
import { Code, Database, Cloud, Smartphone, Brain, Zap } from 'lucide-react'
import SectionHeader from "../ui/SectionHeader"
import { PortfolioData } from '@/types/portfolio'
import { motion } from 'framer-motion'

interface SkillsProps {
  data: PortfolioData
}

// Important skills to highlight
const HIGHLIGHT_SKILLS = [
  'Python', 'React', 'TypeScript', 'FastAPI', 'Angular', 'Java', 
  'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'OpenAI API',
  'Kubernetes', 'TensorFlow', 'PyTorch', 'Flutter', 'SwiftUI'
]

export default function Skills({ data }: SkillsProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const skillCategories = [
    {
      name: "Languages",
      icon: Code,
      skills: data?.skills?.programmingLanguages?.map((lang) => lang.language) || [],
    },
    {
      name: "Frontend & Mobile",
      icon: Smartphone,
      skills:
        data?.skills?.frameworksAndLibraries
          ?.filter((fw) => fw.type.includes("Frontend") || fw.type.includes("Mobile"))
          .map((fw) => fw.name) || [],
    },
    {
      name: "Backend & APIs",
      icon: Zap,
      skills:
        data?.skills?.frameworksAndLibraries
          ?.filter((fw) => fw.type.includes("Backend") || fw.type.includes("API"))
          .map((fw) => fw.name) || [],
    },
    {
      name: "Data & AI/ML",
      icon: Brain,
      skills: [
        ...(data?.skills?.databasesAndStorage?.map((db) => db.name) || []),
        ...(data?.skills?.toolsAndPlatforms
          ?.filter(
            (tool) =>
              tool.category === "AI/ML" ||
              tool.name.toLowerCase().includes("ai") ||
              tool.name.toLowerCase().includes("ml") ||
              tool.name.toLowerCase().includes("openai")
          )
          .map((tool) => tool.name) || [])
      ],
    },
    {
      name: "DevOps & Tools",
      icon: Cloud,
      skills:
        data?.skills?.toolsAndPlatforms
          ?.filter(
            (tool) =>
              !tool.category?.includes("AI/ML") &&
              !tool.name.toLowerCase().includes("ai") &&
              !tool.name.toLowerCase().includes("ml") &&
              !tool.name.toLowerCase().includes("openai")
          )
          .map((tool) => tool.name) || [],
    },
  ].filter((category) => category.skills.length > 0)

  // Only show highlighted skills
  const allSkills = skillCategories.flatMap(cat => 
    cat.skills
      .filter(skill => HIGHLIGHT_SKILLS.includes(skill))
      .map(skill => ({ name: skill, category: cat.name }))
  )

  return (
    <section id="skills" className="py-20 lg:py-32 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Tech Stack" subtitle="Skills that power my work" />

        {/* Compact skill cloud */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {allSkills.map((skill, index) => {
              const isHighlighted = HIGHLIGHT_SKILLS.includes(skill.name)
              return (
                <motion.span
                  key={`${skill.category}-${skill.name}-${index}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: index * 0.02,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  whileHover={{ 
                    scale: 1.2,
                    rotate: [0, -5, 5, -5, 0],
                    transition: { duration: 0.3 }
                  }}
                  onHoverStart={() => setHoveredSkill(skill.name)}
                  onHoverEnd={() => setHoveredSkill(null)}
                  className={`
                    px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer
                    transition-all duration-300 relative
                    ${isHighlighted 
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30' 
                      : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                    }
                    ${hoveredSkill === skill.name ? 'z-20' : 'z-10'}
                  `}
                  style={{
                    animation: isHighlighted ? 'glow 3s ease-in-out infinite' : undefined
                  }}
                >
                  {skill.name}
                  {isHighlighted && (
                    <motion.span
                      className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  )}
                </motion.span>
              )
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
          }
          50% {
            box-shadow: 0 0 30px rgba(147, 51, 234, 0.8);
          }
        }
      `}</style>
    </section>
  )
}