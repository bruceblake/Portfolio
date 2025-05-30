import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, ChevronDown } from 'lucide-react';
import { TypewriterText } from '../ui/TypewriterText';
import { MagneticButton } from '../ui/MagneticButton';
import { PortfolioData } from '@/types/portfolio';

interface HeroProps {
  portfolioData: PortfolioData;
}

export const Hero: React.FC<HeroProps> = ({ portfolioData }) => {
  const { personal } = portfolioData;
  const scrollRef = useRef<HTMLDivElement>(null);

  const primarySkills = ['Python', 'Java', 'TypeScript', 'React', 'Angular', 'FastAPI', 'Docker'];

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-50 via-blue-50 to-indigo-100 dark:from-neutral-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-purple/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-white mb-6">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-brand-500 to-accent-purple bg-clip-text text-transparent">
              {personal.name}
            </span>
          </h1>

          <div className="text-xl sm:text-2xl lg:text-3xl text-neutral-600 dark:text-neutral-300 mb-8 h-12 flex items-center justify-center">
            <TypewriterText
              texts={['Software Engineer', 'Full-Stack Developer', 'AI Enthusiast', 'Problem Solver']}
            />
          </div>

          {/* Skill Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {primarySkills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-4 py-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 rounded-full text-sm font-medium text-neutral-700 dark:text-neutral-300 shadow-lg hover:shadow-xl transition-all duration-300 cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-lg text-neutral-600 dark:text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {personal.currentFocus}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <MagneticButton href="#experience">
              <div className="group relative px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-brand-500/25">
                <span className="relative z-10 flex items-center">
                  View My Journey
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </div>
            </MagneticButton>

            <MagneticButton href="#contact">
              <div className="group px-8 py-4 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 text-neutral-700 dark:text-neutral-300 font-medium rounded-xl hover:bg-white dark:hover:bg-neutral-800 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <span className="flex items-center">
                  Get In Touch
                  <Mail className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform duration-200" />
                </span>
              </div>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          ref={scrollRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToAbout}
        >
          <div className="w-6 h-10 border-2 border-neutral-400 dark:border-neutral-600 rounded-full flex justify-center hover:border-brand-500 transition-colors duration-300">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-neutral-400 dark:bg-neutral-600 rounded-full mt-2"
            />
          </div>
          <ChevronDown className="w-5 h-5 text-neutral-400 dark:text-neutral-600 mt-2 mx-auto animate-bounce" />
        </motion.div>
      </div>

      {/* Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
            className="absolute w-1 h-1 bg-brand-500/20 dark:bg-brand-400/20 rounded-full"
          />
        ))}
      </div>
    </section>
  );
};