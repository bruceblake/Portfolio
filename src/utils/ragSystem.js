// Offline RAG System for Portfolio
// This implements a client-side RAG system that works entirely offline

import portfolioData from '../../public/bruce-blake-data.json';

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
    return "I couldn't find specific information about that in Bruce's portfolio. Try asking about his experience at Google, projects, technical skills, education, or accomplishments.";
  }

  const lowerQuery = query.toLowerCase();
  
  // Combine relevant content
  const context = relevantChunks.map(chunk => chunk.content).join('\n\n');
  
  // Generate appropriate response based on query type
  if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('reach')) {
    const personal = relevantChunks.find(c => c.category === 'personal');
    if (personal) {
      return `You can reach Bruce Blake at:\n\n📧 Email: ${portfolioData.personal.email}\n📱 Phone: ${portfolioData.personal.phone}\n📍 Location: ${portfolioData.personal.location} (${portfolioData.personal.timezone})\n\nBruce is interested in: ${portfolioData.personal.interests.join(', ')}.`;
    }
  }

  if (lowerQuery.includes('summary') || lowerQuery.includes('about') || lowerQuery.includes('who is')) {
    return context;
  }

  if (lowerQuery.includes('google')) {
    const googleExps = relevantChunks.filter(c => 
      c.metadata.company === 'Google, Inc.' || c.content.includes('Google')
    );
    if (googleExps.length > 0) {
      return `Here's Bruce's Google experience:\n\n${googleExps.map(exp => exp.content).join('\n\n')}`;
    }
  }

  if (lowerQuery.includes('skill') || lowerQuery.includes('language') || lowerQuery.includes('technology')) {
    const skills = relevantChunks.filter(c => c.category === 'skills');
    if (skills.length > 0) {
      return `Bruce's technical skills:\n\n${skills.map(s => s.content).join('\n\n')}`;
    }
  }

  // Default: Return the most relevant content
  const response = relevantChunks[0].content;
  
  // If multiple relevant chunks, add more context
  if (relevantChunks.length > 1) {
    return `${response}\n\nAdditional relevant information:\n${relevantChunks.slice(1).map(c => `• ${c.content.substring(0, 200)}...`).join('\n')}`;
  }

  return response;
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