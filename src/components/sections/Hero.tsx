import { useState, useEffect } from "react"
import { ArrowRight, Mail, Github, Linkedin } from 'lucide-react'
import MagneticButton from "../ui/MagneticButton"
import { PortfolioData } from '@/types/portfolio'
import { motion } from 'framer-motion'

interface HeroProps {
  data: PortfolioData
}

export default function Hero({ data }: HeroProps) {
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const texts = ["Software Engineer", "Google Intern", "Full-Stack Developer", "Hackathon Winner"]

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const current = texts[currentIndex]

        if (!isDeleting) {
          setCurrentText(current.substring(0, currentText.length + 1))

          if (currentText === current) {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          setCurrentText(current.substring(0, currentText.length - 1))

          if (currentText === "") {
            setIsDeleting(false)
            setCurrentIndex((prev) => (prev + 1) % texts.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [currentText, currentIndex, isDeleting, texts])

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-transparent"
    >
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-purple-200/50 dark:border-purple-700/50 shadow-2xl shadow-purple-500/10">
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {data?.personal?.name || "Bruce Blake"}
              </span>
            </motion.h1>

            <motion.div 
              className="text-xl sm:text-2xl text-neutral-600 dark:text-neutral-300 mb-6 h-8 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span>{currentText}</span>
              <motion.span 
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                |
              </motion.span>
            </motion.div>

            <motion.p 
              className="text-base text-neutral-600 dark:text-neutral-400 mb-8 max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Java, TypeScript & React/Angular Specialist
            </motion.p>

            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex flex-wrap items-center justify-center gap-4 py-4 border-t border-b border-neutral-200/50 dark:border-neutral-700/50">
                <a
                  href={`mailto:${data?.personal?.email || "bruceiiiblake@gmail.com"}`}
                  className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
                >
                  <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium">{data?.personal?.email || "bruceiiiblake@gmail.com"}</span>
                </a>
                <div className="hidden sm:block w-px h-5 bg-neutral-300 dark:bg-neutral-600"></div>
                <a
                  href="https://github.com/bruceblake"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
                >
                  <Github className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium">GitHub</span>
                </a>
                <div className="hidden sm:block w-px h-5 bg-neutral-300 dark:bg-neutral-600"></div>
                <a
                  href="https://linkedin.com/in/bruceblake"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
                >
                  <Linkedin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
              </div>
            </motion.div>

            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <MagneticButton
                href="#experience"
                className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25"
              >
                <span className="relative z-10 flex items-center text-sm">
                  Explore My Work
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}