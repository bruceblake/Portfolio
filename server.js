import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rate limiting
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 25, // 25 requests per hour
    message: 'Too many requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api/chat', limiter);

// Load portfolio data
const portfolioData = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'bruce-blake-data.json'), 'utf8'));

// RAG implementation
function extractKeywords(query) {
    const lower = query.toLowerCase();
    return {
        hasExperience: /experience|work|job|internship|google|red bar/i.test(query),
        hasProjects: /project|built|created|developed|engine|app/i.test(query),
        hasSkills: /skill|technology|language|framework|know/i.test(query),
        hasEducation: /education|school|degree|gpa|virginia tech/i.test(query),
        hasImpact: /revenue|impact|users|achieve/i.test(query),
        hasUnique: /unique|special|different|stand out/i.test(query)
    };
}

function retrieveContext(query) {
    const keywords = extractKeywords(query);
    const context = {
        query: query,
        relevantData: {}
    };
    
    // Add relevant sections based on keywords
    if (keywords.hasExperience) {
        context.relevantData.experience = portfolioData.experience;
        context.relevantData.summary = portfolioData.summary;
    }
    
    if (keywords.hasProjects) {
        context.relevantData.projects = portfolioData.projects;
    }
    
    if (keywords.hasSkills) {
        context.relevantData.skills = portfolioData.skills;
    }
    
    if (keywords.hasEducation) {
        context.relevantData.education = portfolioData.education;
    }
    
    if (keywords.hasImpact) {
        context.relevantData.achievements = portfolioData.achievements;
        // Extract specific impact metrics
        context.relevantData.impact = {
            revenueGenerated: "$15,000+",
            usersServed: "2.5M+ monthly",
            customersHelped: "600+"
        };
    }
    
    if (keywords.hasUnique) {
        context.relevantData.uniqueValue = portfolioData.summary.uniqueValue;
        context.relevantData.philosophy = portfolioData.philosophy;
    }
    
    // Always include basic info
    context.relevantData.personal = {
        name: portfolioData.personal.name,
        title: portfolioData.personal.title,
        currentFocus: portfolioData.personal.currentFocus
    };
    
    return context;
}

// API endpoint for chat
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }
        
        // Check if API key exists
        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your-gemini-api-key-here') {
            return res.status(500).json({ 
                error: 'Gemini API key not configured. Please add a valid API key to the .env file.' 
            });
        }
        
        // Retrieve relevant context
        const context = retrieveContext(message);
        
        // Prepare the prompt for Gemini
        const prompt = `You are an expert AI assistant helping recruiters evaluate Bruce Blake for software engineering positions. Your responses should be optimized for busy recruiters who skim content quickly.

Context about Bruce Blake:
${JSON.stringify(context.relevantData, null, 2)}

CRITICAL FORMATTING RULES:
1. **ALWAYS use markdown formatting** for better readability
2. Start with a **bolded summary sentence** that directly answers the question
3. Use **bullet points** for lists and key information
4. **Bold** important numbers, metrics, and achievements (e.g., **2.5M+ users**, **$15K revenue**)
5. Use **headers** (##) to organize longer responses
6. Keep paragraphs short (2-3 sentences max)
7. Use **emphasis** on key skills and technologies

Content Guidelines:
- Lead with the most impressive and relevant achievements
- Quantify impact with specific metrics whenever possible
- Highlight technical skills that match industry demands
- Show progression and growth over time
- Emphasize both technical depth and business impact
- Make comparisons to industry standards when relevant
- Keep responses concise but comprehensive

Example Format:
**Bruce has [key qualification] with proven results in [area].**

## Key Highlights
• **[Metric]** - [Achievement]
• **[Technology]** - [How used/impact]
• **[Skill]** - [Context/result]

[Additional relevant details in short paragraphs...]

User Question: ${message}`;

        // Call Gemini API - using gemini-1.5-flash (cheapest and fastest)
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.8,
                    maxOutputTokens: 500,
                }
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Gemini API Error:', response.status, errorData);
            
            if (response.status === 401 || response.status === 403) {
                return res.status(401).json({ 
                    error: 'Invalid Gemini API key. Please check your API key in the .env file.' 
                });
            } else if (response.status === 429) {
                return res.status(429).json({ 
                    error: 'Gemini rate limit exceeded. Please try again later.' 
                });
            } else if (response.status === 400) {
                return res.status(400).json({ 
                    error: 'Invalid request to Gemini API. Please check the configuration.' 
                });
            }
            
            throw new Error(`Gemini API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Extract the response text from Gemini's format
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
        
        res.json({ 
            response: responseText
        });
        
    } catch (error) {
        console.error('Chat API error:', error.message);
        
        return res.status(500).json({ 
            error: 'Failed to get response from Gemini. Please check your API key and try again.' 
        });
    }
});

// Removed fallback generator - API only

// Serve portfolio data endpoint
app.get('/api/portfolio-data', (req, res) => {
    res.json(portfolioData);
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', port: PORT });
});

// Start server
app.listen(PORT, () => {
    console.log(`Portfolio server running on http://localhost:${PORT}`);
    const hasKey = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your-gemini-api-key-here';
    
    if (hasKey) {
        console.log(`✅ Gemini API Key configured (using gemini-1.5-flash model)`);
        console.log(`   Key preview: ${process.env.GEMINI_API_KEY.substring(0, 10)}...`);
    } else {
        console.log('❌ No Gemini API Key found - the portfolio will not work without it');
        console.log('   Please add GEMINI_API_KEY to your .env file');
        console.log('   Get your free key at: https://makersuite.google.com/app/apikey');
    }
});