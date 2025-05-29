// Offline RAG System for Portfolio - Pure Data-Driven Version
// Everything comes from the JSON data file

import portfolioData from '../../public/bruce-blake-data.json' with { type: 'json' };

// Create searchable chunks from data
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
        technologies: exp.technologies,
        rawData: exp
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
        technologies: project.technologies,
        rawData: project
      }
    });
  });

  // Skills chunks
  chunks.push({
    id: 'skills-languages',
    category: 'skills',
    content: `Programming languages: ${data.skills.programmingLanguages.map(l => `${l.language} (${l.proficiency})`).join(', ')}`,
    metadata: { 
      type: 'skills', 
      subtype: 'languages',
      rawData: data.skills.programmingLanguages
    }
  });

  chunks.push({
    id: 'skills-frameworks',
    category: 'skills',
    content: `Frameworks and libraries: ${data.skills.frameworksAndLibraries.map(f => `${f.name} (${f.expertise})`).join(', ')}`,
    metadata: { 
      type: 'skills', 
      subtype: 'frameworks',
      rawData: data.skills.frameworksAndLibraries
    }
  });

  // Education chunks
  data.education.forEach((edu, idx) => {
    chunks.push({
      id: `education-${idx}`,
      category: 'education',
      content: `${edu.degree} at ${edu.institution}. GPA: ${edu.gpaDetails}. Graduating: ${edu.graduationDate}. Activities: ${edu.activitiesAndSocieties.join(', ')}`,
      metadata: { 
        type: 'education', 
        institution: edu.institution,
        rawData: edu
      }
    });
  });

  // Accomplishments chunks
  data.teamsAndAccomplishments.forEach((acc, idx) => {
    chunks.push({
      id: `accomplishment-${idx}`,
      category: 'accomplishment',
      content: `${acc.title}. ${acc.distinction || ''} ${acc.description}`,
      metadata: { 
        type: 'accomplishment',
        rawData: acc
      }
    });
  });

  // Personal/Contact chunk
  chunks.push({
    id: 'personal',
    category: 'personal',
    content: `Contact: ${data.personal.email}, ${data.personal.phone}. Location: ${data.personal.location}. Interests: ${data.personal.interests.join(', ')}`,
    metadata: {
      type: 'personal',
      rawData: data.personal
    }
  });

  // Summary chunks
  chunks.push({
    id: 'summary',
    category: 'summary',
    content: data.summary.brief,
    metadata: {
      type: 'summary',
      subtype: 'brief',
      rawData: data.summary
    }
  });

  chunks.push({
    id: 'unique-value',
    category: 'summary',
    content: data.summary.uniqueValue,
    metadata: {
      type: 'summary',
      subtype: 'unique',
      rawData: data.summary
    }
  });

  return chunks;
}

// Extract keywords from query
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

// Calculate relevance score
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

// Search and rank chunks
function searchChunks(query, chunks, topK = 3) {
  const queryKeywords = extractKeywords(query);
  const lowerQuery = query.toLowerCase();
  
  const scoredChunks = chunks.map(chunk => {
    let score = calculateSimilarity(queryKeywords, chunk.content);
    
    // Boost scores for category matches
    if (lowerQuery.includes('experience') && chunk.category === 'experience') score += 20;
    if (lowerQuery.includes('project') && chunk.category === 'project') score += 20;
    if (lowerQuery.includes('skill') && chunk.category === 'skills') score += 20;
    if (lowerQuery.includes('education') && chunk.category === 'education') score += 20;
    if (lowerQuery.includes('accomplishment') && chunk.category === 'accomplishment') score += 20;
    if ((lowerQuery.includes('contact') || lowerQuery.includes('email')) && chunk.category === 'personal') score += 30;
    if ((lowerQuery.includes('unique') || lowerQuery.includes('stand out')) && chunk.metadata.subtype === 'unique') score += 30;
    
    // Company-specific boosts
    if (lowerQuery.includes('google') && chunk.content.toLowerCase().includes('google')) score += 30;
    if ((lowerQuery.includes('freelance') || lowerQuery.includes('sushi')) && chunk.content.toLowerCase().includes('sushi')) score += 30;
    
    return { ...chunk, score };
  });

  return scoredChunks
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .filter(chunk => chunk.score > 0);
}

// Generate response from chunks using actual data
function generateResponse(query, relevantChunks) {
  if (relevantChunks.length === 0) {
    return "No information found. Try: experience, projects, skills, education";
  }

  const lowerQuery = query.toLowerCase();
  
  // For specific queries, format the raw data nicely
  const topChunk = relevantChunks[0];
  
  // Experience queries
  if (topChunk.category === 'experience' && topChunk.metadata.rawData) {
    const exp = topChunk.metadata.rawData;
    const duration = exp.status === 'Upcoming' ? `**${exp.status}**` : `${exp.duration.start}-${exp.duration.end}`;
    const highlight = exp.achievements ? exp.achievements[0] : 
                     exp.responsibilities ? exp.responsibilities[0] : 
                     exp.description;
    return `**${exp.title}** at ${exp.company}${exp.team ? ` (${exp.team})` : ''} (${duration})\n${highlight}\nTech: ${exp.technologies.slice(0, 4).join(', ')}`;
  }

  // Project queries
  if (topChunk.category === 'project' && topChunk.metadata.rawData) {
    const proj = topChunk.metadata.rawData;
    const highlight = proj.technicalHighlights[0];
    return `**${proj.name}**\n${highlight}\nTech: ${proj.technologies.slice(0, 4).join(', ')}`;
  }

  // Skills queries
  if (topChunk.category === 'skills') {
    const langs = relevantChunks.find(c => c.metadata.subtype === 'languages');
    const frameworks = relevantChunks.find(c => c.metadata.subtype === 'frameworks');
    
    let response = '';
    if (langs && langs.metadata.rawData) {
      const expertLangs = langs.metadata.rawData
        .filter(l => l.proficiency === 'Expert')
        .slice(0, 4)
        .map(l => `**${l.language}**`)
        .join(', ');
      response += `**Languages:** ${expertLangs}\n`;
    }
    if (frameworks && frameworks.metadata.rawData) {
      const topFrameworks = frameworks.metadata.rawData
        .filter(f => f.expertise === 'Advanced' || f.expertise === 'Proficient')
        .slice(0, 4)
        .map(f => f.name)
        .join(', ');
      response += `**Frameworks:** ${topFrameworks}`;
    }
    return response.trim();
  }

  // Education queries
  if (topChunk.category === 'education' && topChunk.metadata.rawData) {
    const edu = topChunk.metadata.rawData;
    return `**${edu.institution}** - ${edu.degree}\n**GPA:** ${edu.gpaDetails}\n**Graduating:** ${edu.graduationDate}`;
  }

  // Contact queries
  if (topChunk.category === 'personal' && topChunk.metadata.rawData) {
    const personal = topChunk.metadata.rawData;
    return `📧 ${personal.email}\n📱 ${personal.phone}`;
  }

  // Accomplishments
  if (topChunk.category === 'accomplishment' && topChunk.metadata.rawData) {
    const acc = topChunk.metadata.rawData;
    return `**${acc.title}**\n${acc.distinction || acc.description}`;
  }

  // Summary/unique value
  if (topChunk.category === 'summary') {
    return topChunk.content;
  }

  // Multiple relevant items - show all
  if (relevantChunks.length > 1 && relevantChunks[0].category === relevantChunks[1].category) {
    return relevantChunks.slice(0, 3).map(chunk => {
      if (chunk.metadata.rawData) {
        const data = chunk.metadata.rawData;
        if (chunk.category === 'experience') {
          const duration = data.status === 'Upcoming' ? 'Upcoming' : `${data.duration.start}-${data.duration.end}`;
          return `**${data.title}** at ${data.company} (${duration})`;
        } else if (chunk.category === 'project') {
          return `**${data.name}** - ${data.category}`;
        } else if (chunk.category === 'accomplishment') {
          return `**${data.title}**`;
        }
      }
      return chunk.content.substring(0, 100) + '...';
    }).join('\n\n');
  }

  // Fallback to chunk content
  return topChunk.content.substring(0, 200) + '...';
}

// Main RAG class with conversation memory
class OfflineRAG {
  constructor() {
    this.chunks = createSearchableChunks(portfolioData);
    this.initialized = true;
    this.conversationHistory = [];
  }

  search(query) {
    if (!query || query.trim().length === 0) {
      return "Ask about: experience, projects, skills, or education.";
    }

    // Add query to history for context
    this.conversationHistory.push({ role: 'user', content: query });

    // Search with context awareness
    const relevantChunks = searchChunks(query, this.chunks);
    const response = generateResponse(query, relevantChunks);
    
    // Add response to history
    this.conversationHistory.push({ role: 'assistant', content: response });
    
    // Keep only last 10 exchanges for memory efficiency
    if (this.conversationHistory.length > 20) {
      this.conversationHistory = this.conversationHistory.slice(-20);
    }
    
    return response;
  }

  getTypingDelay(response) {
    return Math.min(200 + response.length * 2, 800);
  }
}

// Export singleton instance
export const ragSystem = new OfflineRAG();