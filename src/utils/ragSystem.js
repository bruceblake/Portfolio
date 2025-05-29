// Offline RAG System for Portfolio
// This implements a client-side RAG system that works entirely offline

import portfolioData from '../../public/bruce-blake-data.json' with { type: 'json' };

// Chunk the portfolio data into searchable segments
function createSearchableChunks(data) {
  const chunks = [];
  
  // Personal info chunk
  chunks.push({
    id: 'personal',
    category: 'personal',
    content: `${data.personal.name} is a ${data.personal.title} based in ${data.personal.location} (${data.personal.timezone}). Contact: ${data.personal.email}, ${data.personal.phone}. Interests include: ${data.personal.interests.join(', ')}. Current focus: ${data.personal.currentFocus}`,
    metadata: { type: 'personal' }
  });

  // Summary chunks
  chunks.push({
    id: 'summary-brief',
    category: 'summary',
    content: data.summary.brief,
    metadata: { type: 'summary', subtype: 'brief' }
  });

  chunks.push({
    id: 'summary-detailed',
    category: 'summary',
    content: data.summary.detailed,
    metadata: { type: 'summary', subtype: 'detailed' }
  });

  chunks.push({
    id: 'summary-unique',
    category: 'summary',
    content: data.summary.uniqueValue,
    metadata: { type: 'summary', subtype: 'uniqueValue' }
  });

  // Education chunks
  data.education.forEach((edu, idx) => {
    chunks.push({
      id: `education-${idx}`,
      category: 'education',
      content: `Education: ${edu.degree} with ${edu.minor} minor at ${edu.institution} in ${edu.location}. Expected graduation: ${edu.graduationDate}. GPA: ${edu.gpaDetails}. Relevant coursework: ${edu.relevantCoursework.join(', ')}. Honors: ${edu.honorsAndAwards.join(', ')}. Activities: ${edu.activitiesAndSocieties.join(', ')}.`,
      metadata: { type: 'education', institution: edu.institution }
    });
  });

  // Experience chunks
  data.experience.forEach((exp, idx) => {
    const duration = exp.status === 'Upcoming' 
      ? `Upcoming from ${exp.duration.start} to ${exp.duration.end}`
      : `From ${exp.duration.start} to ${exp.duration.end}`;
    
    const responsibilities = exp.responsibilities 
      ? `Responsibilities: ${exp.responsibilities.join(' ')}` 
      : exp.anticipatedResponsibilities 
      ? `Anticipated responsibilities: ${exp.anticipatedResponsibilities.join(' ')}`
      : '';
    
    const achievements = exp.achievements 
      ? `Achievements: ${exp.achievements.join(' ')}`
      : '';
    
    chunks.push({
      id: `experience-${idx}`,
      category: 'experience',
      content: `${exp.title} at ${exp.company}${exp.team ? ` (${exp.team})` : ''} in ${exp.location}. ${duration}. ${exp.description} ${responsibilities} ${achievements} Technologies used: ${exp.technologies.join(', ')}.`,
      metadata: { 
        type: 'experience', 
        company: exp.company,
        title: exp.title,
        technologies: exp.technologies
      }
    });
  });

  // Teams and accomplishments chunks
  data.teamsAndAccomplishments.forEach((accomplishment, idx) => {
    const techs = accomplishment.technologies ? `Technologies: ${accomplishment.technologies.join(', ')}.` : '';
    chunks.push({
      id: `accomplishment-${idx}`,
      category: 'accomplishment',
      content: `${accomplishment.title} at ${accomplishment.event}${accomplishment.date ? ` (${accomplishment.date})` : ''}. ${accomplishment.distinction} ${accomplishment.description} Key contributions: ${accomplishment.keyContributions.join(' ')} ${techs}`,
      metadata: { 
        type: 'accomplishment',
        event: accomplishment.event,
        technologies: accomplishment.technologies || []
      }
    });
  });

  // Technical projects chunks
  data.technicalProjects.forEach((project, idx) => {
    chunks.push({
      id: `project-${idx}`,
      category: 'project',
      content: `Project: ${project.name}. Category: ${project.category}. Status: ${project.status}. ${project.description} Technical highlights: ${project.technicalHighlights.join(' ')} Technologies: ${project.technologies.join(', ')}.`,
      metadata: {
        type: 'project',
        name: project.name,
        category: project.category,
        technologies: project.technologies
      }
    });
  });

  // Skills chunks
  // Programming languages
  const langChunk = data.skills.programmingLanguages.map(lang => 
    `${lang.language} (${lang.proficiency}): ${lang.areas.join(', ')}`
  ).join('. ');
  chunks.push({
    id: 'skills-languages',
    category: 'skills',
    content: `Programming languages: ${langChunk}`,
    metadata: { type: 'skills', subtype: 'languages' }
  });

  // Frameworks
  const frameworkChunk = data.skills.frameworksAndLibraries.map(fw => 
    `${fw.name} (${fw.type}, ${fw.expertise})`
  ).join(', ');
  chunks.push({
    id: 'skills-frameworks',
    category: 'skills',
    content: `Frameworks and libraries: ${frameworkChunk}`,
    metadata: { type: 'skills', subtype: 'frameworks' }
  });

  // Databases
  const dbChunk = data.skills.databasesAndStorage.map(db => 
    `${db.name} (${db.type}, ${db.expertise})`
  ).join(', ');
  chunks.push({
    id: 'skills-databases',
    category: 'skills',
    content: `Databases and storage: ${dbChunk}`,
    metadata: { type: 'skills', subtype: 'databases' }
  });

  // Tools and platforms
  const toolsChunk = data.skills.toolsAndPlatforms.map(tool => 
    `${tool.name} (${tool.category}, ${tool.expertise})`
  ).join(', ');
  chunks.push({
    id: 'skills-tools',
    category: 'skills',
    content: `Tools and platforms: ${toolsChunk}`,
    metadata: { type: 'skills', subtype: 'tools' }
  });

  // Methodologies
  chunks.push({
    id: 'skills-methodologies',
    category: 'skills',
    content: `Development methodologies: ${data.skills.methodologies.join(', ')}`,
    metadata: { type: 'skills', subtype: 'methodologies' }
  });

  return chunks;
}

// Simple keyword extraction for basic matching
function extractKeywords(text) {
  const stopWords = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
    'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
    'to', 'was', 'will', 'with', 'what', 'where', 'when', 'who', 'why',
    'how', 'can', 'could', 'should', 'would', 'does', 'did', 'about',
    'tell', 'me', 'please', 'bruce', 'blake', 'bruces', "bruce's"
  ]);

  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word));
}

// Calculate similarity between query and chunk
function calculateSimilarity(queryKeywords, chunkContent) {
  const chunkLower = chunkContent.toLowerCase();
  let score = 0;
  let matchedKeywords = 0;

  queryKeywords.forEach(keyword => {
    if (chunkLower.includes(keyword)) {
      score += 10;
      matchedKeywords++;
      
      // Bonus for exact word match
      const wordRegex = new RegExp(`\\b${keyword}\\b`, 'i');
      if (wordRegex.test(chunkContent)) {
        score += 5;
      }
      
      // Extra bonus for multiple occurrences
      const matches = (chunkLower.match(new RegExp(keyword, 'g')) || []).length;
      score += (matches - 1) * 2;
    }
  });

  // Bonus for matching multiple keywords
  if (matchedKeywords > 1) {
    score += matchedKeywords * 5;
  }

  // Length penalty to prefer concise chunks
  const lengthPenalty = Math.max(0, (chunkContent.length - 500) / 1000);
  score -= lengthPenalty;

  return score;
}

// Search through chunks and find most relevant
function searchChunks(query, chunks, topK = 5) {
  const queryKeywords = extractKeywords(query);
  
  // Special handling for common queries
  const lowerQuery = query.toLowerCase();
  
  // Calculate scores for all chunks
  const scoredChunks = chunks.map(chunk => {
    let score = calculateSimilarity(queryKeywords, chunk.content);
    
    // Boost scores based on query intent
    if (lowerQuery.includes('experience') && chunk.category === 'experience') score += 20;
    if (lowerQuery.includes('project') && chunk.category === 'project') score += 20;
    if (lowerQuery.includes('skill') && chunk.category === 'skills') score += 20;
    if (lowerQuery.includes('education') && chunk.category === 'education') score += 20;
    if (lowerQuery.includes('google') && chunk.content.toLowerCase().includes('google')) score += 30;
    if (lowerQuery.includes('contact') && chunk.category === 'personal') score += 50;
    
    return { ...chunk, score };
  });

  // Sort by score and return top K
  return scoredChunks
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .filter(chunk => chunk.score > 0);
}

// Generate a response based on retrieved chunks
function generateResponse(query, relevantChunks) {
  if (relevantChunks.length === 0) {
    return "I couldn't find specific information about that in Bruce's portfolio. Try asking about:\n\n• **Experience** at Google\n• **Projects** (3D Engine, iOS App)\n• **Technical skills**\n• **Education** at Virginia Tech\n• **Contact** information";
  }

  const lowerQuery = query.toLowerCase();
  
  // Contact information
  if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('reach') || lowerQuery.includes('phone')) {
    return `### Contact Information\n\n📧 **Email:** ${portfolioData.personal.email}\n📱 **Phone:** ${portfolioData.personal.phone}\n📍 **Location:** ${portfolioData.personal.location} (${portfolioData.personal.timezone})\n\n**Interests:** ${portfolioData.personal.interests.slice(0, 3).join(', ')}`;
  }

  // Summary/About
  if (lowerQuery.includes('summary') || lowerQuery.includes('about') || lowerQuery.includes('who is')) {
    return `### About Bruce Blake\n\n${portfolioData.summary.brief}\n\n**What makes Bruce unique:**\n${portfolioData.summary.uniqueValue}`;
  }

  // Google experience
  if (lowerQuery.includes('google') || lowerQuery.includes('step intern')) {
    const googleExps = portfolioData.experience.filter(exp => exp.company === 'Google, Inc.');
    if (googleExps.length > 0) {
      let response = "### Google Experience\n\n";
      googleExps.forEach(exp => {
        const duration = exp.status === 'Upcoming' ? `**${exp.status}** (${exp.duration.start})` : `${exp.duration.start} - ${exp.duration.end}`;
        response += `**${exp.title}** - ${exp.team}\n*${duration}*\n\n`;
        
        if (exp.responsibilities) {
          response += "**Key Achievements:**\n";
          exp.responsibilities.slice(0, 3).forEach(resp => {
            // Extract key metrics/highlights
            const highlighted = resp
              .replace(/(\d+\.?\d*[M+]? (?:million|users|monthly active users))/gi, '**$1**')
              .replace(/(ML-powered|AI-powered|full-stack)/gi, '**$1**')
              .replace(/(launched|created|developed|streamlined)/gi, '**$1**');
            response += `• ${highlighted}\n`;
          });
        } else if (exp.anticipatedResponsibilities) {
          response += "**Anticipated Responsibilities:**\n";
          exp.anticipatedResponsibilities.slice(0, 2).forEach(resp => {
            response += `• ${resp}\n`;
          });
        }
        
        response += `\n**Technologies:** ${exp.technologies.slice(0, 5).join(', ')}\n\n`;
      });
      return response.trim();
    }
  }

  // Skills
  if (lowerQuery.includes('skill') || lowerQuery.includes('language') || lowerQuery.includes('technology') || lowerQuery.includes('programming')) {
    let response = "### Technical Skills\n\n";
    
    // Programming languages
    response += "**Programming Languages:**\n";
    const expertLangs = portfolioData.skills.programmingLanguages
      .filter(l => l.proficiency === 'Expert')
      .slice(0, 4);
    expertLangs.forEach(lang => {
      response += `• **${lang.language}** - ${lang.areas.slice(0, 2).join(', ')}\n`;
    });
    
    // Key frameworks
    response += "\n**Key Frameworks:**\n";
    const topFrameworks = portfolioData.skills.frameworksAndLibraries
      .filter(f => f.expertise === 'Advanced' || f.expertise === 'Proficient')
      .slice(0, 4);
    topFrameworks.forEach(fw => {
      response += `• **${fw.name}** (${fw.type})\n`;
    });
    
    return response.trim();
  }

  // Education
  if (lowerQuery.includes('education') || lowerQuery.includes('school') || lowerQuery.includes('gpa') || lowerQuery.includes('virginia tech')) {
    const edu = portfolioData.education[0];
    return `### Education\n\n**${edu.institution}**\n*${edu.degree}*\n*Minor: ${edu.minor}*\n\n**GPA:** ${edu.gpaDetails}\n**Graduation:** ${edu.graduationDate}\n\n**Key Coursework:** ${edu.relevantCoursework.slice(0, 4).join(', ')}\n\n**Achievement:** ${edu.activitiesAndSocieties[0]} - One of only **12 teams worldwide** selected`;
  }

  // Projects
  if (lowerQuery.includes('project') || lowerQuery.includes('built') || lowerQuery.includes('created')) {
    let response = "### Notable Projects\n\n";
    
    const projects = portfolioData.technicalProjects.slice(0, 2);
    projects.forEach(proj => {
      response += `**${proj.name}**\n*${proj.category}*\n\n`;
      response += `${proj.description}\n\n`;
      response += `**Key Features:**\n`;
      proj.technicalHighlights.slice(0, 2).forEach(highlight => {
        const highlighted = highlight
          .replace(/(SAT|GJK|ECS|OpenGL|MVVM|20,000\+|3D|FPS)/g, '**$1**');
        response += `• ${highlighted}\n`;
      });
      response += `\n**Tech:** ${proj.technologies.slice(0, 4).join(', ')}\n\n`;
    });
    
    return response.trim();
  }

  // Freelance/Red Bar Sushi
  if (lowerQuery.includes('freelance') || lowerQuery.includes('red bar') || lowerQuery.includes('sushi')) {
    const freelance = portfolioData.experience.find(exp => exp.company === 'Red Bar Sushi');
    if (freelance) {
      return `### Freelance Project - Red Bar Sushi\n\n**${freelance.title}**\n*${freelance.duration.start} - ${freelance.duration.end}*\n\n${freelance.description}\n\n**Impact:**\n${freelance.achievements.map(a => `• ${a.replace(/(\$15,000\+|600\+|upwards of)/g, '**$1**')}`).join('\n')}\n\n**Tech Stack:** ${freelance.technologies.slice(0, 5).join(', ')}`;
    }
  }

  // Accomplishments
  if (lowerQuery.includes('accomplishment') || lowerQuery.includes('achievement') || lowerQuery.includes('hackathon') || lowerQuery.includes('tunnel')) {
    let response = "### Key Accomplishments\n\n";
    
    portfolioData.teamsAndAccomplishments.forEach(acc => {
      response += `**${acc.title}**\n`;
      if (acc.distinction) {
        response += `*${acc.distinction.replace(/(\d+\+|1st|12 teams|400)/g, '**$1**')}*\n\n`;
      }
      response += `${acc.description}\n\n`;
    });
    
    return response.trim();
  }

  // What makes Bruce unique / Why hire
  if (lowerQuery.includes('unique') || lowerQuery.includes('special') || lowerQuery.includes('why hire') || lowerQuery.includes('stand out')) {
    return `### What Makes Bruce Unique\n\n${portfolioData.summary.uniqueValue}\n\n**Key Differentiators:**\n• **2x Google intern** with impact on **2.5M+ users**\n• Built **revenue-generating** systems (**$15,000+** for Red Bar Sushi)\n• **Deep technical range**: From C++ game engines to cloud AI systems\n• **3.85 GPA** while building production systems\n• **1 of 12 teams worldwide** selected for tunnel robotics competition`;
  }

  // General experience query
  if (lowerQuery.includes('experience') && !lowerQuery.includes('google')) {
    let response = "### Professional Experience\n\n";
    
    // Show top 3 experiences
    portfolioData.experience.slice(0, 3).forEach(exp => {
      const duration = exp.status === 'Upcoming' 
        ? `**${exp.status}** (${exp.duration.start})` 
        : `${exp.duration.start} - ${exp.duration.end}`;
      
      response += `**${exp.title}**\n*${exp.company}${exp.team ? ` - ${exp.team}` : ''}*\n${duration}\n\n`;
      
      // Add key achievement or description
      if (exp.achievements && exp.achievements.length > 0) {
        response += `Key impact: ${exp.achievements[0].replace(/(\$\d+,?\d*\+?|[\d,]+\+? users)/g, '**$1**')}\n\n`;
      } else {
        response += `${exp.description.substring(0, 150)}...\n\n`;
      }
    });
    
    return response.trim();
  }

  // Default: Return formatted version of most relevant chunk
  const topChunk = relevantChunks[0];
  if (topChunk.category === 'experience') {
    const exp = portfolioData.experience.find(e => topChunk.content.includes(e.company));
    if (exp) {
      return `### ${exp.title} at ${exp.company}\n\n*${exp.duration.start} - ${exp.duration.end}*\n\n${exp.description}\n\n**Technologies:** ${exp.technologies.join(', ')}`;
    }
  }
  
  // Fallback - return content but formatted
  const content = relevantChunks[0].content;
  const formatted = content
    .replace(/(\d+\.?\d*[M+]? (?:million|users|monthly|GPA))/gi, '**$1**')
    .replace(/(Google|Virginia Tech|Red Bar Sushi)/g, '**$1**');
  
  return formatted;
}

// Main RAG class
class OfflineRAG {
  constructor() {
    this.chunks = createSearchableChunks(portfolioData);
    this.initialized = true;
  }

  search(query) {
    if (!query || query.trim().length === 0) {
      return "Please ask a question about Bruce Blake's experience, projects, skills, or education.";
    }

    const relevantChunks = searchChunks(query, this.chunks);
    const response = generateResponse(query, relevantChunks);
    
    return response;
  }

  // Get typing delay based on response length
  getTypingDelay(response) {
    const baseDelay = 300;
    const charDelay = 3;
    return Math.min(baseDelay + response.length * charDelay, 1500);
  }
}

// Export singleton instance
export const ragSystem = new OfflineRAG();