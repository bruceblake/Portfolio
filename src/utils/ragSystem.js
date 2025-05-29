import Fuse from 'fuse.js';
import portfolioData from '../../public/bruce-blake-data.json' with { type: 'json' };

// Enhanced chunking strategy
function createChunks(data) {
  const chunks = [];
  
  // Personal info chunk
  chunks.push({
    id: 'personal',
    type: 'personal',
    content: `${data.personal.name} ${data.personal.title} ${data.personal.currentFocus}`,
    metadata: {
      section: 'personal',
      weight: 1.5
    },
    data: {...data.personal, ...data.links}
  });
  
  // Experience chunks - more granular
  data.experience.forEach((exp, idx) => {
    // Main experience chunk
    chunks.push({
      id: `exp-${idx}`,
      type: 'experience',
      content: `${exp.title} ${exp.company} ${exp.description || ''}`,
      metadata: {
        section: 'experience',
        company: exp.company,
        title: exp.title,
        weight: 2.0
      },
      data: exp
    });
    
    // Individual responsibility chunks
    exp.responsibilities?.forEach((resp, respIdx) => {
      chunks.push({
        id: `exp-${idx}-resp-${respIdx}`,
        type: 'responsibility',
        content: resp,
        metadata: {
          section: 'experience',
          company: exp.company,
          title: exp.title,
          weight: 1.8
        },
        parentData: exp
      });
    });
    
    // Individual achievement chunks
    exp.achievements?.forEach((ach, achIdx) => {
      chunks.push({
        id: `exp-${idx}-ach-${achIdx}`,
        type: 'achievement',
        content: ach,
        metadata: {
          section: 'experience',
          company: exp.company,
          title: exp.title,
          weight: 1.9
        },
        parentData: exp
      });
    });
  });
  
  // Project chunks - more granular
  data.technicalProjects.forEach((proj, idx) => {
    // Main project chunk
    chunks.push({
      id: `proj-${idx}`,
      type: 'project',
      content: `${proj.name} ${proj.description}`,
      metadata: {
        section: 'projects',
        title: proj.name,
        weight: 1.8
      },
      data: proj
    });
    
    // Technology chunks
    const techString = proj.technologies.join(' ');
    chunks.push({
      id: `proj-${idx}-tech`,
      type: 'technology',
      content: techString,
      metadata: {
        section: 'projects',
        title: proj.name,
        weight: 1.6
      },
      parentData: proj
    });
    
    // Technical highlights chunks
    proj.technicalHighlights?.forEach((highlight, highlightIdx) => {
      chunks.push({
        id: `proj-${idx}-highlight-${highlightIdx}`,
        type: 'highlight',
        content: highlight,
        metadata: {
          section: 'projects',
          title: proj.name,
          weight: 1.7
        },
        parentData: proj
      });
    });
  });
  
  // Skills chunks
  // Programming languages
  if (data.skills.programmingLanguages) {
    const langContent = data.skills.programmingLanguages.map(l => `${l.language} ${l.proficiency}`).join(' ');
    chunks.push({
      id: 'skills-languages',
      type: 'skills',
      content: `Programming Languages ${langContent}`,
      metadata: {
        section: 'skills',
        category: 'programmingLanguages',
        weight: 1.5
      },
      data: { category: 'Programming Languages', items: data.skills.programmingLanguages }
    });
  }
  
  // Frameworks
  if (data.skills.frameworksAndLibraries) {
    const frameworkContent = data.skills.frameworksAndLibraries.map(f => `${f.name} ${f.expertise}`).join(' ');
    chunks.push({
      id: 'skills-frameworks',
      type: 'skills',
      content: `Frameworks Libraries ${frameworkContent}`,
      metadata: {
        section: 'skills',
        category: 'frameworksAndLibraries',
        weight: 1.5
      },
      data: { category: 'Frameworks & Libraries', items: data.skills.frameworksAndLibraries }
    });
  }
  
  // Other skills categories
  ['databasesAndStorage', 'toolsAndPlatforms', 'methodologies'].forEach(category => {
    if (data.skills[category]) {
      const content = Array.isArray(data.skills[category]) ? data.skills[category].join(' ') : '';
      chunks.push({
        id: `skills-${category}`,
        type: 'skills',
        content: `${category} ${content}`,
        metadata: {
          section: 'skills',
          category: category,
          weight: 1.5
        },
        data: { category, items: data.skills[category] }
      });
    }
  });
  
  // Education chunks
  data.education.forEach((edu, idx) => {
    chunks.push({
      id: `edu-${idx}`,
      type: 'education',
      content: `${edu.degree} ${edu.institution} ${edu.minor || ''} ${edu.gpaDetails || ''}`,
      metadata: {
        section: 'education',
        weight: 1.4
      },
      data: edu
    });
  });
  
  // Teams and Accomplishments chunks
  data.teamsAndAccomplishments?.forEach((acc, idx) => {
    chunks.push({
      id: `acc-${idx}`,
      type: 'accomplishment',
      content: `${acc.title} ${acc.distinction || ''} ${acc.description || ''}`,
      metadata: {
        section: 'accomplishments',
        weight: 1.3
      },
      data: acc
    });
  });
  
  return chunks;
}

// TF-IDF implementation
class TFIDFCalculator {
  constructor(chunks) {
    this.chunks = chunks;
    this.documentFrequency = {};
    this.totalDocuments = chunks.length;
    this.calculateDocumentFrequency();
  }
  
  calculateDocumentFrequency() {
    this.chunks.forEach(chunk => {
      const words = this.tokenize(chunk.content);
      const uniqueWords = [...new Set(words)];
      uniqueWords.forEach(word => {
        this.documentFrequency[word] = (this.documentFrequency[word] || 0) + 1;
      });
    });
  }
  
  tokenize(text) {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2);
  }
  
  calculateTFIDF(chunk, query) {
    const chunkWords = this.tokenize(chunk.content);
    const queryWords = this.tokenize(query);
    
    const tf = {};
    chunkWords.forEach(word => {
      tf[word] = (tf[word] || 0) + 1;
    });
    
    // Normalize TF
    const maxTF = Math.max(...Object.values(tf));
    Object.keys(tf).forEach(word => {
      tf[word] = tf[word] / maxTF;
    });
    
    // Calculate TF-IDF score
    let score = 0;
    queryWords.forEach(word => {
      if (tf[word]) {
        const idf = Math.log(this.totalDocuments / (this.documentFrequency[word] || 1));
        score += tf[word] * idf;
      }
    });
    
    return score;
  }
}

// Fuzzy search configuration
const fuseOptions = {
  includeScore: true,
  threshold: 0.4,
  keys: ['content'],
  minMatchCharLength: 2
};

// Keyword extraction
function extractKeywords(query) {
  const stopWords = new Set([
    'what', 'who', 'where', 'when', 'why', 'how', 'is', 'are', 'was', 'were',
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'about', 'tell', 'me', 'show', 'list',
    'give', 'find', 'search', 'get', 'all', 'any', 'some', 'his', 'her'
  ]);
  
  return query.toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word));
}

// Main search function
function search(query) {
  const chunks = createChunks(portfolioData);
  const keywords = extractKeywords(query);
  
  // Initialize TF-IDF calculator
  const tfidfCalculator = new TFIDFCalculator(chunks);
  
  // Initialize Fuse.js
  const fuse = new Fuse(chunks, fuseOptions);
  
  // Calculate scores for each chunk
  const scoredChunks = chunks.map(chunk => {
    // TF-IDF score
    const tfidfScore = tfidfCalculator.calculateTFIDF(chunk, query);
    
    // Fuzzy search score
    const fuseResults = fuse.search(chunk.content);
    const fuzzyScore = fuseResults.length > 0 ? (1 - fuseResults[0].score) : 0;
    
    // Keyword match score
    const chunkKeywords = extractKeywords(chunk.content);
    const keywordMatches = keywords.filter(kw => 
      chunkKeywords.some(ck => ck.includes(kw) || kw.includes(ck))
    ).length;
    const keywordScore = keywordMatches / Math.max(keywords.length, 1);
    
    // Section weight
    const sectionWeight = chunk.metadata.weight || 1;
    
    // Combined score
    const combinedScore = (
      tfidfScore * 0.3 +
      fuzzyScore * 0.3 +
      keywordScore * 0.2 +
      sectionWeight * 0.2
    );
    
    return {
      chunk,
      score: combinedScore,
      tfidfScore,
      fuzzyScore,
      keywordScore
    };
  });
  
  // Sort by score and get top results
  const topChunks = scoredChunks
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
  
  // Group by type for comprehensive responses
  const groupedResults = {};
  topChunks.forEach(({ chunk }) => {
    const type = chunk.metadata.section;
    if (!groupedResults[type]) {
      groupedResults[type] = [];
    }
    groupedResults[type].push(chunk);
  });
  
  return { topChunks, groupedResults, keywords };
}

// Response generation
function generateResponse(query, conversationHistory = []) {
  const { topChunks, groupedResults, keywords } = search(query);
  
  // Check for specific intents
  const lowerQuery = query.toLowerCase();
  
  // Contact info - highest priority
  if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('phone') || 
      keywords.some(kw => ['contact', 'email', 'phone', 'linkedin', 'github'].includes(kw))) {
    const personal = portfolioData.personal;
    const links = portfolioData.links;
    return `**Contact Information:**\n\n` +
      `• Email: ${personal.email}\n` +
      `• Phone: ${personal.phone}\n` +
      `• LinkedIn: [${links.linkedin}](${links.linkedin})\n` +
      `• GitHub: [${links.github}](${links.github})`;
  }
  
  // Education - check before experience
  if (lowerQuery.includes('education') || lowerQuery.includes('degree') || lowerQuery.includes('university') ||
      lowerQuery.includes('school') || lowerQuery.includes('gpa') || lowerQuery.includes('virginia tech')) {
    return `**Education:**\n\n` + portfolioData.education.map(edu => {
      return `• **${edu.degree}**\n  ${edu.institution} (${edu.graduationDate})\n  ${edu.gpaDetails || ''}`;
    }).join('\n\n');
  }
  
  // Skills - check before experience
  if (lowerQuery.includes('skill') || lowerQuery.includes('technology') || lowerQuery.includes('language') ||
      lowerQuery.includes('framework') || lowerQuery.includes('programming')) {
    const skills = portfolioData.skills;
    let response = `**Technical Skills:**\n\n`;
    
    if (skills.programmingLanguages) {
      const langs = skills.programmingLanguages
        .filter(l => l.proficiency === 'Expert' || l.proficiency === 'Proficient')
        .map(l => l.language);
      response += `• **Programming Languages:** ${langs.join(', ')}\n`;
    }
    
    if (skills.frameworksAndLibraries) {
      const frameworks = skills.frameworksAndLibraries
        .slice(0, 8)
        .map(f => f.name);
      response += `• **Frameworks & Libraries:** ${frameworks.join(', ')}\n`;
    }
    
    if (skills.databasesAndStorage) {
      const databases = skills.databasesAndStorage
        .map(db => db.name || db);
      response += `• **Databases & Storage:** ${databases.join(', ')}\n`;
    }
    
    return response.trim();
  }
  
  // Projects - check before experience
  if (lowerQuery.includes('project') || lowerQuery.includes('built') || lowerQuery.includes('created') ||
      lowerQuery.includes('developed') || lowerQuery.includes('portfolio')) {
    const projects = portfolioData.technicalProjects;
    
    return `**Technical Projects:**\n\n` + projects.map(proj => {
      const tech = proj.technologies.slice(0, 3).join(', ');
      return `• **${proj.name}**\n  ${proj.description}\n  *Tech: ${tech}*`;
    }).join('\n\n');
  }
  
  // Google specific
  if (lowerQuery.includes('google')) {
    const googleExps = portfolioData.experience.filter(exp => exp.company.includes('Google'));
    return `**Google Experience:**\n\n` + googleExps.map(exp => {
      const duration = `${exp.duration.start}-${exp.duration.end}`;
      const highlights = exp.achievements || exp.responsibilities || [];
      return `• **${exp.title}** (${duration})\n  Team: ${exp.team || 'N/A'}\n  ${highlights[0] || exp.description}`;
    }).join('\n\n');
  }
  
  // Experience - default for work-related queries
  if (lowerQuery.includes('experience') || lowerQuery.includes('work') || lowerQuery.includes('job') ||
      lowerQuery.includes('intern') || groupedResults.experience) {
    const experiences = portfolioData.experience;
    
    return `**Professional Experience:**\n\n` + experiences.map(exp => {
      const duration = exp.status === 'Upcoming' ? `Upcoming` : `${exp.duration.start}-${exp.duration.end}`;
      const highlight = exp.achievements?.[0] || exp.responsibilities?.[0] || exp.description || '';
      return `• **${exp.title}** at ${exp.company} (${duration})\n  ${highlight}`;
    }).join('\n\n');
  }
  
  // Default: Show most relevant chunks
  if (topChunks.length > 0) {
    const relevantData = new Set();
    topChunks.slice(0, 3).forEach(({ chunk }) => {
      if (chunk.data) {
        relevantData.add(JSON.stringify(chunk.data));
      } else if (chunk.parentData) {
        relevantData.add(JSON.stringify(chunk.parentData));
      }
    });
    
    const items = Array.from(relevantData).map(item => JSON.parse(item));
    return formatRelevantItems(items);
  }
  
  return "I couldn't find specific information about that. Try asking about experience, projects, skills, or education.";
}

function formatRelevantItems(items) {
  if (items.length === 0) return "No relevant information found.";
  
  const formatted = items.map(item => {
    if (item.title && item.company) {
      // Experience
      return `• **${item.title}** at ${item.company}`;
    } else if (item.name && item.technologies) {
      // Project
      return `• **${item.name}**: ${item.description}`;
    } else if (item.category && item.items) {
      // Skills
      if (item.category === 'Programming Languages') {
        const langs = item.items.map(l => l.language).slice(0, 5);
        return `• **${item.category}:** ${langs.join(', ')}`;
      } else if (item.category === 'Frameworks & Libraries') {
        const frameworks = item.items.map(f => f.name).slice(0, 5);
        return `• **${item.category}:** ${frameworks.join(', ')}`;
      } else {
        return `• **${item.category}:** ${item.items.slice(0, 5).join(', ')}`;
      }
    } else if (item.degree) {
      // Education
      return `• **${item.degree}** from ${item.institution}`;
    }
    return JSON.stringify(item);
  });
  
  return `**Relevant Information:**\n\n${formatted.join('\n')}`;
}

// Conversation memory for follow-ups
let conversationHistory = [];

export function processQuery(query) {
  const response = generateResponse(query, conversationHistory);
  
  // Add to conversation history
  conversationHistory.push({ query, response });
  
  // Keep only last 10 exchanges
  if (conversationHistory.length > 10) {
    conversationHistory = conversationHistory.slice(-10);
  }
  
  return response;
}

export function clearHistory() {
  conversationHistory = [];
}