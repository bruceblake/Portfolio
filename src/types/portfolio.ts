export interface PersonalInfo {
  name: string
  title: string
  location: string
  email: string
  phone: string
  linkedIn: string
  github: string
  objective: string
  currentFocus?: string
}

export interface Experience {
  id?: string
  position?: string
  role?: string
  title?: string
  company: string
  team?: string
  location: string
  duration: string | { start: string; end: string }
  description: string
  highlights?: string[]
  responsibilities?: string[]
  anticipatedResponsibilities?: string[]
  technologies?: string[]
  isUpcoming?: boolean
  status?: string
}

export interface Project {
  id?: string
  name: string
  description: string
  category?: string
  status?: string
  technologies: string[]
  links?: {
    github?: string
    live?: string
  }
}

export interface Framework {
  name: string
  type: string
  expertise: string
}

export interface Tool {
  name: string
  category: string
  expertise: string
}

export interface ProgrammingLanguage {
  language: string
  proficiency: string
  areas: string[]
}

export interface Database {
  name: string
  type: string
  expertise: string
}

export interface Skills {
  programmingLanguages: ProgrammingLanguage[]
  frameworksAndLibraries: Framework[]
  databasesAndStorage: Database[]
  toolsAndPlatforms: Tool[]
}

export interface Education {
  institution: string
  degree: string
  minor?: string
  location: string
  graduationDate: string
  gpaDetails: string
  coursework?: string[]
  honors?: string[]
}

export interface Achievement {
  name?: string
  title?: string
  event?: string
  competition?: string
  date?: string
  duration?: string
  role?: string
  distinction?: string
  description: string
  highlights?: string[]
  keyContributions?: string[]
  technologies?: string[]
  links?: {
    winning_post?: string
    website?: string
  }
}

export interface PortfolioData {
  personal: PersonalInfo
  experience: Experience[]
  technicalProjects: Project[]
  skills: Skills
  education?: Education[]
  teamsAndAccomplishments?: Achievement[]
}