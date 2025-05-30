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

  const texts = ["Software Engineer", "Full-Stack Developer", "AI Enthusiast", "Problem Solver"]

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
            Building scalable solutions with modern tech • 2x Google Intern • AI/ML enthusiast
          </motion.p>

          <motion.div 
            className="flex flex-wrap gap-3 justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
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

            <div className="flex items-center gap-3 ml-4">
              <motion.a
                href={`mailto:${data?.personal?.email || "bruceiiiblake@gmail.com"}`}
                className="p-2.5 bg-white/10 dark:bg-neutral-800/50 backdrop-blur-sm rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-200 group"
                whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300" />
              </motion.a>
              <motion.a
                href="https://github.com/bruceblake"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/10 dark:bg-neutral-800/50 backdrop-blur-sm rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-200 group"
                whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Github className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/bruceblake"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/10 dark:bg-neutral-800/50 backdrop-blur-sm rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-200 group"
                whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Linkedin className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div 
            className="w-6 h-10 border-2 border-purple-400 dark:border-purple-600 rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="w-1 h-3 bg-purple-400 dark:bg-purple-600 rounded-full mt-2"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}