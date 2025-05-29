# Bruce Blake's Portfolio

A modern, interactive portfolio featuring an AI chat assistant and visual timeline of experience.

🔗 **Live Demo**: [https://bruceblake.github.io/Portfolio/](https://bruceblake.github.io/Portfolio/)

## Features

- 🤖 **Interactive AI Chat** - Ask questions about my experience, skills, and projects
- 📊 **Visual Timeline** - Explore my journey through an animated timeline
- 🎨 **Beautiful Animations** - Smooth transitions and engaging UI
- 🌓 **Dark/Light Theme** - Toggle between themes
- 📱 **Fully Responsive** - Works on all devices
- ⚡ **Fast & Static** - No backend required, works on GitHub Pages

## Tech Stack

- **Frontend**: React, Vite, Framer Motion
- **Styling**: CSS Modules, Responsive Design
- **Chat**: Intelligent keyword-based responses
- **Deployment**: GitHub Pages, GitHub Actions

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── LandingPage      # Initial selection screen
│   ├── ChatInterface    # AI chat component
│   ├── Timeline         # Visual timeline
│   ├── ProfessionalHeader # Navigation header
│   └── QuickStats       # Stats display cards
├── utils/               # Helper functions
│   └── chatResponses    # Static chat responses
├── App.jsx              # Main app component
├── App.css              # App-level styles
├── index.css            # Global styles
└── main.jsx             # Entry point
```

## Deployment

The portfolio automatically deploys to GitHub Pages when you push to the `main` branch.

## Data

Portfolio data is stored in `public/bruce-blake-data.json` and includes:
- Personal information
- Work experience (Google internships, freelance work)
- Projects (3D game engine, iOS apps, etc.)
- Education (Virginia Tech)
- Skills and technologies

## Contact

- Email: bruceblake@vt.edu
- LinkedIn: [linkedin.com/in/bruceblake](https://linkedin.com/in/bruceblake)
- GitHub: [github.com/bruceblake](https://github.com/bruceblake)