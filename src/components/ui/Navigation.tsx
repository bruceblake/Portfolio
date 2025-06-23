import { useState, useEffect } from "react"
import { Download, Menu, X, Sun, Moon } from 'lucide-react'
import { PortfolioData } from '@/types/portfolio'

interface NavigationProps {
  data: PortfolioData
}

export default function Navigation({ data }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState("hero")
  const [isDark, setIsDark] = useState(false)

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "achievements", label: "Achievements" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      setScrollProgress(scrolled)
      
      const sections = navItems.map(item => document.getElementById(item.id))
      const currentSection = sections.findIndex(section => {
        if (!section) return false
        const rect = section.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom > 100
      })
      
      if (currentSection !== -1) {
        setActiveSection(navItems[currentSection].id)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setIsDark(prefersDark)
    if (prefersDark) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200/20 dark:border-neutral-800/20">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:max-w-7xl xl:mx-auto">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo and Name - Responsive sizing */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm sm:text-lg">BB</span>
            </div>
            <div className="hidden xs:block min-w-0">
              <h1 className="text-sm sm:text-base lg:text-lg font-semibold text-neutral-900 dark:text-white truncate">
                {data?.personal?.name || "Bruce Blake"}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 truncate hidden sm:block">
                {data?.personal?.title || "Software Engineer"}
              </p>
            </div>
          </div>

          {/* Desktop Navigation - Responsive spacing */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 2xl:gap-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-colors duration-200 group whitespace-nowrap ${
                  activeSection === item.id
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-neutral-700 dark:text-neutral-300 hover:text-purple-600 dark:hover:text-purple-400"
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-0 bottom-0 h-0.5 bg-purple-500 transition-transform duration-200 origin-left ${
                    activeSection === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></span>
              </a>
            ))}
          </nav>

          {/* Right side actions - Responsive */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            {/* Resume button - Better responsive behavior */}
            <a
              href="/Bruce_Blake_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-medium rounded-md lg:rounded-lg transition-colors duration-200 whitespace-nowrap"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden md:inline">Resume</span>
              <span className="md:hidden">CV</span>
            </a>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Responsive */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-neutral-200/20 dark:border-neutral-800/20">
          <nav className="px-4 sm:px-6 py-3 sm:py-4 space-y-1 sm:space-y-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 text-sm sm:text-base rounded-md transition-colors duration-200 ${
                  activeSection === item.id
                    ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20"
                    : "text-neutral-700 dark:text-neutral-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <a
                href="/Bruce_Blake_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 text-purple-600 dark:text-purple-400 font-medium rounded-md hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-200"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </a>
            </div>
          </nav>
        </div>
      )}

      <div
        className="absolute bottom-0 left-0 h-0.5 bg-purple-500 transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={scrollProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      ></div>
    </header>
  )
}