import React from 'react'
import { motion } from 'framer-motion';

import { SectionWrapper } from '../hoc';

import { styles } from '../styles'
import { ComputersCanvas } from './canvas';
import { linkedIn, github } from '../assets';

import resumePDF from './resume.pdf'
import resumePNG from './resume.png'

const Hero = () => {
  return (
      <div>

    
        
          <div>
            <h1 className={`${styles.heroHeadText} text-white`}
            >Hi, I'm <span className="text-[#915eff]">Bruce</span></h1>
            <p className={`${styles.heroSubText} mt-2 text-white-100`}>
              I Develop Full-Stack Mobile and Web Applications
            </p>
          </div>

     

       </div>

  )
}
export default SectionWrapper(Hero, "hero")