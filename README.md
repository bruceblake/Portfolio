# Bruce Blake's Portfolio

A modern, responsive portfolio website built with React and Vite, showcasing professional experience, projects, skills, and accomplishments.

🔗 **Live Demo**: [https://bruceblake.github.io/Portfolio/](https://bruceblake.github.io/Portfolio/)

## Features

- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- 🌓 **Dark/Light Theme** - Toggle between themes with persistent preference
- 🎨 **Modern Design** - Clean, professional UI with smooth animations (Framer Motion)
- ⚡ **Fast Performance** - Built with Vite for optimal loading speed
- 📊 **Dynamic Sections** - Experience, Projects, Skills, Education, and more
- 🔄 **Smooth Navigation** - Navigation with section highlighting
- ✨ **Interactive Elements** - Particle background and magnetic buttons

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (localhost:5173)
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Deploy to GitHub Pages
npm run deploy
```

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   └── Footer.tsx           # Footer component
│   ├── sections/
│   │   ├── Achievements.tsx     # Awards and achievements
│   │   ├── Contact.tsx          # Contact information
│   │   ├── Education.tsx        # Academic background
│   │   ├── Experience.tsx       # Work experience timeline
│   │   ├── Hero.tsx             # Landing section
│   │   ├── Projects.tsx         # Featured projects
│   │   └── Skills.tsx           # Technical skills
│   └── ui/
│       ├── LoadingScreen.tsx    # Loading animation
│       ├── MagneticButton.tsx   # Interactive button component
│       ├── Navigation.tsx       # Main navigation
│       ├── ParticleBackground.tsx # Animated background
│       ├── ScrollProgress.tsx   # Scroll indicator
│       └── SectionHeader.tsx    # Reusable section headers
├── types/
│   └── portfolio.ts             # TypeScript definitions
├── utils/
│   └── cn.ts                    # Utility for conditional classes
├── App.tsx                      # Main app component
└── main.tsx                     # Entry point
```

## Configuration

- **Vite Config**: Path aliases and build settings
- **Tailwind**: Custom theme and responsive design
- **ESLint**: Code quality and consistency
- **TypeScript**: Type safety and better DX

## Data

Portfolio data is dynamically loaded from `public/bruce-blake-data.json`:
- Personal information and contact details
- Work experience (Google internships, freelance work)
- Projects (3D game engine, iOS apps, web applications)
- Education (Virginia Tech Computer Science)
- Technical skills organized by category
- Professional achievements and awards

## Deployment

Automated deployment to GitHub Pages via GitHub Actions:
1. Push to `main` branch
2. GitHub Actions builds the project
3. Deploys to `gh-pages` branch
4. Live at github.io URL

Manual deployment:
```bash
npm run deploy
```

## Contact

- Email: bruceblake@vt.edu
- LinkedIn: [linkedin.com/in/bruceblake](https://linkedin.com/in/bruceblake)
- GitHub: [github.com/bruceblake](https://github.com/bruceblake)