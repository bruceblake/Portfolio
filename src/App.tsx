import { useState, useEffect } from 'react'
import Navigation from '@components/ui/Navigation'
import Hero from '@components/sections/Hero'
import Experience from '@components/sections/Experience'
import Projects from '@components/sections/Projects'
import Skills from '@components/sections/Skills'
import Contact from '@components/sections/Contact'
import Footer from '@components/layout/Footer'
import LoadingScreen from '@components/ui/LoadingScreen'
import ScrollProgress from '@components/ui/ScrollProgress'
import ParticleBackground from '@components/ui/ParticleBackground'
import { PortfolioData } from '@/types/portfolio'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('./bruce-blake-data.json')
        const data = await response.json()
        setPortfolioData(data)
      } catch (error) {
        console.error('Error loading portfolio data:', error)
      } finally {
        setTimeout(() => setIsLoading(false), 1500)
      }
    }
    loadData()
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-600 dark:text-neutral-400">Failed to load portfolio data</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 relative overflow-x-hidden">
      <ParticleBackground />
      <div className="relative z-10">
        <ScrollProgress />
        <Navigation data={portfolioData} />
        <main>
          <Hero data={portfolioData} />
          <Experience data={portfolioData} />
          <Projects data={portfolioData} />
          <Skills data={portfolioData} />
          <Contact data={portfolioData} />
        </main>
        <Footer data={portfolioData} />
      </div>
    </div>
  )
}