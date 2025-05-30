# Bruce Blake's Portfolio - React Version

A modern, responsive portfolio website built with React, Vite, and Framer Motion. Features a dark theme, smooth animations, and comprehensive sections showcasing work experience, projects, achievements, and skills.

## 🚀 Live Demo

[View Live Portfolio](https://bruceblake.github.io/Portfolio/)

## 📋 Features

- **Modern Tech Stack**: React 18, Vite, Framer Motion
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Dark Theme**: Sophisticated dark UI with glassmorphism effects
- **Smooth Animations**: Intersection Observer for scroll-triggered animations
- **Dynamic Content**: All data loaded from JSON for easy updates
- **Interactive Elements**: Expandable cards with "View Details" buttons
- **Performance Optimized**: Lazy loading, code splitting, and optimized assets

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.3
- **Build Tool**: Vite 6.0
- **Styling**: CSS3 with CSS Modules
- **Animations**: Framer Motion, CSS Animations
- **Icons**: Lucide React
- **Deployment**: GitHub Pages with GitHub Actions

## 📁 Project Structure

```
portfolio-react/
├── public/
│   ├── bruce-blake-data.json    # Portfolio data (experience, projects, skills)
│   ├── Bruce_Blake_Resume.pdf   # Downloadable resume
│   └── api-fallback.json        # Fallback data for API
├── src/
│   ├── components/
│   │   ├── ProfessionalHeader.jsx/css  # Navigation header with theme toggle
│   │   ├── Hero.jsx/css               # Landing section with CTA
│   │   ├── About.jsx/css              # Personal introduction
│   │   ├── Timeline.jsx/css           # Work experience timeline
│   │   ├── Projects.jsx/css           # Project showcase grid
│   │   ├── Achievements.jsx/css       # Awards and recognition
│   │   ├── Skills.jsx/css             # Technical skills display
│   │   ├── Contact.jsx/css            # Contact information
│   │   ├── LoadingScreen.jsx/css      # Initial loading animation
│   │   ├── ScrollProgress.jsx/css     # Scroll progress indicator
│   │   └── ParticleBackground.jsx/css # Animated background
│   ├── App.jsx                  # Main app component
│   ├── App.css                  # Global styles
│   └── main.jsx                 # React entry point
├── package.json                 # Dependencies and scripts
├── vite.config.js              # Vite configuration
└── .github/workflows/deploy.yml # GitHub Pages deployment
```

## 🎨 UI Architecture Overview

### Design System

**Color Palette**:
- Primary: Blue (#3b82f6) - Used for CTAs, links, primary actions
- Secondary: Purple (#8b5cf6) - Projects, creative elements
- Accent: Orange (#f59e0b) - Achievements, highlights
- Success: Green (#10b981) - Completed items, education
- Background: Dark (#0a0a0a to #0f1729) - Gradient backgrounds
- Surface: Semi-transparent whites - Cards and overlays
- Text: White (#ffffff) to Gray (#64748b) - Text hierarchy

**Typography**:
- Headers: Bold, uppercase with letter-spacing
- Body: Regular weight, 1.5-1.6 line height
- Monospace: Code and technical elements

**Spacing System**:
- Base unit: 0.25rem (4px)
- Common spacings: 0.5rem, 1rem, 1.5rem, 2rem, 3rem
- Section padding: 80-100px vertical

### Component Architecture

#### 1. **ProfessionalHeader** (Sticky Navigation)
- **Structure**: Logo/Name | Navigation Links | Resume/Theme Toggle
- **Features**: 
  - Sticky positioning with backdrop blur
  - Active section highlighting based on scroll
  - Mobile hamburger menu
  - Theme toggle (light/dark modes)
- **Animations**: Smooth underline on hover, fade-in on mobile menu

#### 2. **Hero** (Landing Section)
- **Structure**: Name/Title | Skill Badges | Description | CTA Buttons | Social Links
- **Features**:
  - Animated particle background
  - Primary skills displayed as badges with glow effect
  - Two CTA buttons: "View Journey" and "Get In Touch"
- **Key Tech Highlighting**: Python, Java, TypeScript, etc. as badges

#### 3. **About** (Personal Introduction)
- **Structure**: Summary | 3-Column Grid (Background/Focus/Experience) | Interests
- **Features**:
  - Brief bio with full text (no truncation)
  - Icon-based information cards
  - Interest tags with hover effects
- **Data**: Pulls from `portfolioData.summary.brief` and `personal.interests`

#### 4. **Timeline** (Work Experience Only)
- **Structure**: Vertical timeline with alternating left/right cards
- **Features**:
  - Animated line with gradient glow
  - Experience cards with:
    - Company + Team name
    - Location and duration
    - "Upcoming" badge for future positions
    - Tech stack in bordered container
    - Key highlights section
    - Expandable details with smooth animation
- **Animations**: Cards fade in on scroll, hover effects lift cards

#### 5. **Projects** (Grid Layout)
- **Structure**: Responsive grid (auto-fit, min 350px)
- **Card Structure**:
  - Header: Title + Status Badge
  - Category subtitle
  - Description paragraph
  - Tech Stack section (highlighted key technologies)
  - Key Features list (2 shown, expandable)
  - Footer: GitHub/Live links + Expand button
- **Features**:
  - 5 projects total (2 real + 3 placeholders)
  - All have GitHub links
  - Status badges (Completed/In Progress)
  - Expandable for full details

#### 6. **Achievements** (Recognition Grid)
- **Structure**: Responsive grid (auto-fit, min 400px)
- **Card Structure**:
  - Icon + Title/Event
  - Distinction badge (gold highlight)
  - Description
  - Key contributions list
  - Technologies used
  - Date/Duration
- **Categories**:
  - Hackathon wins (purple accent)
  - Team competitions (blue accent)  
  - Education achievements (green accent)

#### 7. **Skills** (Categorized Display)
- **Structure**: 6 categories in responsive grid
- **Categories**:
  - Languages
  - Frontend
  - Backend  
  - Databases
  - AI/ML & APIs
  - DevOps & Cloud
- **Features**:
  - Gradient backgrounds for each category
  - Expandable to show all skills (shows 6 by default)
  - Key technologies highlighted with blue glow
  - Animated background shapes

#### 8. **Contact** (Simple CTA)
- **Structure**: Centered content with email/social links
- **Features**: 
  - Large CTA text
  - Email and social media links
  - Hover animations

### Animation System

1. **Scroll-triggered Animations**:
   - Intersection Observer on all major sections
   - Elements fade in and slide up when visible
   - Staggered delays for multiple items

2. **Hover Effects**:
   - Cards lift and increase shadow
   - Buttons have ripple effects
   - Links have underline animations

3. **Background Animations**:
   - Particle system in hero
   - Gradient shifts in section backgrounds
   - Floating shapes in skills section

4. **Micro-interactions**:
   - Expand/collapse with smooth height transitions
   - Tag selections with glow effects
   - Progress bar for scroll position

### State Management

- **Component State**: 
  - `expandedItems` sets for showing/hiding details
  - `visibleItems` sets for scroll animations
  - `filter` state for timeline (currently unused)
  - `theme` state in header

- **Data Flow**:
  - Portfolio data loaded once in App.jsx
  - Passed down as props to all components
  - No global state management (simple prop drilling)

### Responsive Design

**Breakpoints**:
- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

**Mobile Optimizations**:
- Stack navigation into hamburger menu
- Single column layouts for cards
- Reduced padding and font sizes
- Touch-friendly tap targets (min 44px)

### Performance Considerations

1. **Code Splitting**: Vite automatically splits vendor chunks
2. **Lazy Loading**: Images loaded on demand
3. **CSS Optimization**: Unused styles removed in build
4. **Animation Performance**: Using transform/opacity for animations
5. **Bundle Size**: ~230KB JS, ~48KB CSS (gzipped: 70KB + 9KB)

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation
```bash
# Clone the repository
git clone https://github.com/bruceblake/Portfolio.git
cd Portfolio/portfolio-react

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment
The project auto-deploys to GitHub Pages when pushing to main branch.

Manual deployment:
```bash
npm run deploy
```

## 📊 Data Structure

All portfolio content is stored in `public/bruce-blake-data.json`:

```json
{
  "personal": {
    "name": "Bruce Blake",
    "title": "Software Engineer",
    "email": "bruceiiiblake@gmail.com",
    "currentFocus": "...",
    "interests": ["AI/ML", "Full-Stack", ...]
  },
  "experience": [...],
  "technicalProjects": [...],
  "teamsAndAccomplishments": [...],
  "skills": {
    "programmingLanguages": [...],
    "frameworksAndLibraries": [...],
    "databasesAndStorage": [...],
    "toolsAndPlatforms": [...]
  }
}
```

## 🎯 Future Enhancements

- [ ] Add blog section
- [ ] Implement dark/light theme toggle
- [ ] Add more project demos
- [ ] Integrate with CMS for easier updates
- [ ] Add animations for skill percentages
- [ ] Implement contact form functionality

## 📄 License

This project is open source and available under the MIT License.

## 👤 Contact

Bruce Blake - [bruceiiiblake@gmail.com](mailto:bruceiiiblake@gmail.com)

Project Link: [https://github.com/bruceblake/Portfolio](https://github.com/bruceblake/Portfolio)