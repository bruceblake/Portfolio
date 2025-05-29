// Offline RAG System for Portfolio - Concise Version
// Focused strictly on experience, skills, and projects

import portfolioData from '../../public/bruce-blake-data.json' with { type: 'json' };

// Chunk the portfolio data into searchable segments
function createSearchableChunks(data) {
  const chunks = [];
  
  // Experience chunks
  data.experience.forEach((exp, idx) => {
    const duration = exp.status === 'Upcoming' 
      ? `Upcoming (${exp.duration.start})`
      : `${exp.duration.start} - ${exp.duration.end}`;
    
    const responsibilities = exp.responsibilities 
      ? exp.responsibilities.join(' ')
      : exp.anticipatedResponsibilities 
      ? exp.anticipatedResponsibilities.join(' ')
      : '';
    
    const achievements = exp.achievements 
      ? exp.achievements.join(' ')
      : '';
    
    chunks.push({
      id: `experience-${idx}`,
      category: 'experience',
      content: `${exp.title} at ${exp.company}${exp.team ? ` (${exp.team})` : ''} in ${exp.location}. ${duration}. ${exp.description} ${responsibilities} ${achievements} Technologies: ${exp.technologies.join(', ')}.`,
      metadata: { 
        type: 'experience', 
        company: exp.company,
        title: exp.title,
        technologies: exp.technologies
      }
    });
  });

  // Projects chunks
  data.technicalProjects.forEach((project, idx) => {
    chunks.push({
      id: `project-${idx}`,
      category: 'project',
      content: `Project: ${project.name}. ${project.description} ${project.technicalHighlights.join(' ')} Technologies: ${project.technologies.join(', ')}.`,
      metadata: {
        type: 'project',
        name: project.name,
        category: project.category,
        technologies: project.technologies
      }
    });
  });

  // Skills chunks
  const langChunk = data.skills.programmingLanguages.map(lang => 
    `${lang.language} (${lang.proficiency})`
  ).join(', ');
  chunks.push({
    id: 'skills-languages',
    category: 'skills',
    content: `Programming languages: ${langChunk}`,
    metadata: { type: 'skills', subtype: 'languages' }
  });

  const frameworkChunk = data.skills.frameworksAndLibraries.map(fw => 
    `${fw.name} (${fw.expertise})`
  ).join(', ');
  chunks.push({
    id: 'skills-frameworks',
    category: 'skills',
    content: `Frameworks: ${frameworkChunk}`,
    metadata: { type: 'skills', subtype: 'frameworks' }
  });

  // Education chunk
  data.education.forEach((edu, idx) => {
    chunks.push({
      id: `education-${idx}`,
      category: 'education',
      content: `${edu.degree} at ${edu.institution}. GPA: ${edu.gpaDetails}. Graduating: ${edu.graduationDate}.`,
      metadata: { type: 'education', institution: edu.institution }
    });
  });

  // Accomplishments
  data.teamsAndAccomplishments.forEach((acc, idx) => {
    chunks.push({
      id: `accomplishment-${idx}`,
      category: 'accomplishment',
      content: `${acc.title}. ${acc.distinction || ''} ${acc.description}`,
      metadata: { type: 'accomplishment' }
    });
  });

  return chunks;
}

// Simple keyword extraction
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

// Calculate similarity
function calculateSimilarity(queryKeywords, chunkContent) {
  const chunkLower = chunkContent.toLowerCase();
  let score = 0;

  queryKeywords.forEach(keyword => {
    if (chunkLower.includes(keyword)) {
      score += 10;
      const matches = (chunkLower.match(new RegExp(keyword, 'g')) || []).length;
      score += (matches - 1) * 2;
    }
  });

  return score;
}

// Search chunks
function searchChunks(query, chunks, topK = 3) {
  const queryKeywords = extractKeywords(query);
  const lowerQuery = query.toLowerCase();
  
  const scoredChunks = chunks.map(chunk => {
    let score = calculateSimilarity(queryKeywords, chunk.content);
    
    // Boost scores for specific queries
    if (lowerQuery.includes('experience') && chunk.category === 'experience') score += 20;
    if (lowerQuery.includes('project') && chunk.category === 'project') score += 20;
    if (lowerQuery.includes('skill') && chunk.category === 'skills') score += 20;
    if (lowerQuery.includes('education') && chunk.category === 'education') score += 20;
    if (lowerQuery.includes('google') && chunk.content.toLowerCase().includes('google')) score += 30;
    
    return { ...chunk, score };
  });

  return scoredChunks
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .filter(chunk => chunk.score > 0);
}

// Generate concise response
function generateResponse(query, relevantChunks) {
  if (relevantChunks.length === 0) {
    return "No specific information found. Ask about: experience, projects, skills, or education.";
  }

  const lowerQuery = query.toLowerCase();
  
  // Google experience
  if (lowerQuery.includes('google')) {
    const googleExps = portfolioData.experience.filter(exp => exp.company === 'Google, Inc.');
    if (googleExps.length > 0) {
      return googleExps.map(exp => {
        const status = exp.status === 'Upcoming' ? '**Upcoming**' : `${exp.duration.start}-${exp.duration.end}`;
        const key = exp.responsibilities ? exp.responsibilities[0] : exp.description;
        return `**${exp.title}** at ${exp.team} (${status})\n${key}\nTech: ${exp.technologies.slice(0, 4).join(', ')}`;
      }).join('\n\n');
    }
  }

  // Skills
  if (lowerQuery.includes('skill') || lowerQuery.includes('language') || lowerQuery.includes('technology')) {
    const langs = portfolioData.skills.programmingLanguages
      .filter(l => l.proficiency === 'Expert')
      .slice(0, 4)
      .map(l => `**${l.language}**`)
      .join(', ');
    
    const frameworks = portfolioData.skills.frameworksAndLibraries
      .filter(f => f.expertise === 'Advanced')
      .slice(0, 4)
      .map(f => f.name)
      .join(', ');
    
    return `**Languages:** ${langs}\n**Frameworks:** ${frameworks}`;
  }

  // Projects
  if (lowerQuery.includes('project')) {
    return portfolioData.technicalProjects.slice(0, 2).map(proj => {
      const highlight = proj.technicalHighlights[0];
      return `**${proj.name}**\n${highlight}\nTech: ${proj.technologies.slice(0, 3).join(', ')}`;
    }).join('\n\n');
  }

  // Freelance/Red Bar Sushi
  if (lowerQuery.includes('freelance') || lowerQuery.includes('red bar') || lowerQuery.includes('sushi')) {
    const freelance = portfolioData.experience.find(exp => exp.company === 'Red Bar Sushi');
    if (freelance) {
      return `**${freelance.title}** at ${freelance.company} (${freelance.duration.start}-${freelance.duration.end})\n${freelance.achievements[0]}\nTech: ${freelance.technologies.slice(0, 4).join(', ')}`;
    }
  }

  // Experience
  if (lowerQuery.includes('experience')) {
    return portfolioData.experience.slice(0, 3).map(exp => {
      const duration = exp.status === 'Upcoming' ? 'Upcoming' : `${exp.duration.start}-${exp.duration.end}`;
      const impact = exp.achievements ? exp.achievements[0] : exp.description.substring(0, 80) + '...';
      return `**${exp.title}** at ${exp.company} (${duration})\n${impact}`;
    }).join('\n\n');
  }

  // Education
  if (lowerQuery.includes('education') || lowerQuery.includes('gpa')) {
    const edu = portfolioData.education[0];
    return `**${edu.institution}** - ${edu.degree}\n**GPA:** ${edu.gpaDetails}\n**Graduating:** ${edu.graduationDate}`;
  }

  // Contact
  if (lowerQuery.includes('contact') || lowerQuery.includes('email')) {
    return `📧 ${portfolioData.personal.email}\n📱 ${portfolioData.personal.phone}`;
  }

  // Accomplishments
  if (lowerQuery.includes('accomplishment') || lowerQuery.includes('achievement') || lowerQuery.includes('hackathon')) {
    return portfolioData.teamsAndAccomplishments.map(acc => 
      `**${acc.title}**\n${acc.distinction}`
    ).join('\n\n');
  }

  // What makes unique
  if (lowerQuery.includes('unique') || lowerQuery.includes('special') || lowerQuery.includes('stand out')) {
    return `**2x Google intern** (2.5M+ users impacted)\n**$15K+ revenue** generated at Red Bar Sushi\n**3.85 GPA** at Virginia Tech\n**1 of 12 teams** worldwide in tunnel robotics`;
  }

  // Default: most relevant chunk summary
  const topChunk = relevantChunks[0];
  if (topChunk.category === 'experience') {
    const exp = portfolioData.experience.find(e => topChunk.content.includes(e.company));
    if (exp) {
      return `**${exp.title}** at ${exp.company}\n${exp.description}`;
    }
  } else if (topChunk.category === 'project') {
    const proj = portfolioData.technicalProjects.find(p => topChunk.content.includes(p.name));
    if (proj) {
      return `**${proj.name}**\n${proj.description}`;
    }
  }
  
  // Fallback
  return topChunk.content.substring(0, 150) + '...';
}

// Main RAG class
class OfflineRAG {
  constructor() {
    this.chunks = createSearchableChunks(portfolioData);
    this.initialized = true;
  }

  search(query) {
    if (!query || query.trim().length === 0) {
      return "Ask about: experience, projects, skills, or education.";
    }

    const relevantChunks = searchChunks(query, this.chunks);
    const response = generateResponse(query, relevantChunks);
    
    return response;
  }

  getTypingDelay(response) {
    return Math.min(200 + response.length * 2, 800);
  }
}

// Export singleton instance
export const ragSystem = new OfflineRAG();