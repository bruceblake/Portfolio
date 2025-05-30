export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  website?: string;
  location: string;
  timezone: string;
  languages: string[];
  interests: string[];
  currentFocus: string;
}

export interface Links {
  linkedin?: string;
  github?: string;
  portfolio?: string;
  twitter?: string;
}

export interface Summary {
  brief: string;
  detailed: string;
  uniqueValue: string;
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  minor?: string;
  graduationDate: string;
  gpaDetails?: string;
  relevantCoursework: string[];
  honorsAndAwards: string[];
  activitiesAndSocieties: string[];
}

export interface Experience {
  id?: string;
  title: string;
  company: string;
  team?: string;
  location: string;
  duration: {
    start: string;
    end: string;
  };
  status?: string;
  description: string;
  responsibilities?: string[];
  achievements?: string[];
  anticipatedResponsibilities?: string[];
  technologies: string[];
  impact?: string;
}

export interface Project {
  id?: string;
  name: string;
  category: string;
  status?: string;
  description: string;
  technicalHighlights: string[];
  technologies: string[];
  links?: {
    github?: string;
    live?: string;
    video?: string;
  };
  image?: string;
  featured?: boolean;
}

export interface TeamAccomplishment {
  title: string;
  event?: string;
  competition?: string;
  role?: string;
  date?: string;
  duration?: string;
  distinction?: string;
  description: string;
  keyContributions: string[];
  technologies?: string[];
}

export interface Skill {
  name: string;
  proficiency?: number;
  icon?: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface ProgrammingLanguage {
  language: string;
  proficiency: string;
  areas: string[];
}

export interface Framework {
  name: string;
  type: string;
  expertise: string;
}

export interface Database {
  name: string;
  type: string;
  expertise: string;
}

export interface Tool {
  name: string;
  category: string;
  expertise: string;
}

export interface Skills {
  programmingLanguages: ProgrammingLanguage[];
  frameworksAndLibraries: Framework[];
  databasesAndStorage: Database[];
  toolsAndPlatforms: Tool[];
  methodologies: string[];
}

export interface PortfolioData {
  personal: PersonalInfo;
  links: Links;
  summary: Summary;
  education: Education[];
  experience: Experience[];
  teamsAndAccomplishments: TeamAccomplishment[];
  technicalProjects: Project[];
  skills: Skills;
}