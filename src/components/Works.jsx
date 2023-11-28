import React from 'react'
import { motion } from 'framer-motion'
import {Tilt} from 'react-tilt'

import { styles } from '../styles'
import { github, external } from "../assets"
import { SectionWrapper } from '../hoc'
import { projects } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'


const ProjectCard = ({index, name, description, tags, image, source_code_link, externalLink}) => {
  return(
    <motion.div variants={fadeIn("up","spring", index * 0.5, 0.75)}>
      <Tilt 
        options={{
          max:45,
          scale: 1,
          speed: 450
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img src={image} alt={name} 
              className="w-full h-full object-cover 
              rounded-2xl"/>

              <div className="absolute inset-0 flex justify-end m-3 card-img_hover gap-1">
                <div 
                  onClick={() => window.open(externalLink, "_blank")}
                  className="black-gradient w-8 h-8 rounded-full flex
                   justify-center items-center cursor-pointer"
                >
                  <img src={external} alt={external}
                    className="w-1/2 h-1/2 object-contain"/>
                </div>

                <div 
                  onClick={() => window.open(source_code_link, "_blank")}
                  className="black-gradient w-8 h-8 rounded-full flex
                   justify-center items-center cursor-pointer"
                >
                  <img src={github} alt={github}
                    className="w-1/2 h-1/2 object-contain"/>
                </div>
              </div>

              
              
        </div>
        

        <div className="mt-5">
          <h2 className="text-white font-bold text-[24px]">{name}</h2>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag.name} className={`text-[14px] ${tag.color} 
            `}>
              <span className="relative left-[-8px]">{tag.name}</span>
            </li>
          ))}
        </div>
      </Tilt>
    </motion.div>
  )
}

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>
          My Work
        </p>
        <h2 className={styles.sectionHeadText}>
          Technical Projects.
        </h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("","",0.1,1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Here are some of the projects I've built. 
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} 
            index={index}
            {...project}
          />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(Works, "")