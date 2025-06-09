# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a portfolio website with two implementations:
1. **Root Portfolio**: Express/Node.js backend with static frontend (Claude-inspired UI)
2. **Portfolio-React**: Modern React application with Vite

## Essential Commands

### Root Portfolio
```bash
npm install         # Install dependencies
npm run dev         # Start development server with nodemon
npm start           # Start production server (port 3000)
docker-compose up   # Run with Docker
```

### Portfolio-React
```bash
cd portfolio-react
npm install         # Install dependencies
npm run dev         # Start Vite dev server (port 5173)
npm run build       # Build for production
npm run lint        # Run ESLint
npm run deploy      # Deploy to GitHub Pages
```

## Architecture

### Backend Architecture (Root Portfolio)
- Express server on port 3000
- `/api/chat` endpoint for AI chat functionality  
- Gemini API integration with RAG system
- Rate limiting: 25 messages per hour per IP
- Fallback responses when API key not configured
- Key file: `server.js`

### Frontend Architecture

**Root Portfolio**:
- Static HTML/CSS/JS with Claude-inspired design
- Key files: `public/index.html`, `public/claude-styles.css`, `public/app.js`
- Portfolio data: `bruce-blake-data.json`
- Particle effects: `public/particles.js`

**Portfolio-React**:
- Component structure in `src/components/`:
  - `ProfessionalHeader.jsx` - Main navigation
  - `ChatInterface.jsx` - AI chat functionality
  - `LandingPage.jsx` - Hero section
  - `Timeline.jsx` - Experience timeline
- React Router for navigation
- Framer Motion for animations
- Data served from `public/bruce-blake-data.json`

## Key Configuration

### Environment Variables
- `GEMINI_API_KEY` - Required for AI chat functionality (Root Portfolio)
- Set in `.env` file at project root

### Docker Deployment
- `Dockerfile` and `docker-compose.yml` for containerization
- Health checks configured
- Port 3000 exposed

### GitHub Pages Deployment (Portfolio-React)
- GitHub Actions workflow in `.github/workflows/deploy.yml`
- Base path configured in `vite.config.js`
- See `portfolio-react/DEPLOY.md` for deployment guide

## RAG Implementation

The project includes a sophisticated RAG system:
- Query understanding and keyword extraction
- Context retrieval from `bruce-blake-data.json`
- Ranked relevance scoring
- Fallback template responses
- See `RAG-IMPLEMENTATION.md` for details

## Development Notes

- React version uses Vite for fast HMR
- Both versions share similar data structure
- UI follows Claude-inspired design patterns
- Responsive design with mobile-first approach
- Rate limiting is IP-based using express-rate-limit
- When making changes, maintain existing code style and conventions