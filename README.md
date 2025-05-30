# Bruce Blake's Portfolio

A modern, responsive portfolio website built with React and Vite, showcasing professional experience, projects, skills, and accomplishments.

🔗 **Live Demo**: [https://bruceblake.github.io/Portfolio/](https://bruceblake.github.io/Portfolio/)

## Features

- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- 🌓 **Dark/Light Theme** - Toggle between themes with persistent preference
- 🎨 **Modern Design** - Clean, professional UI with smooth animations
- ⚡ **Fast Performance** - Built with Vite for optimal loading speed
- 📊 **Dynamic Sections** - Experience, Projects, Skills, Education, and more
- 🔄 **Smooth Navigation** - Scrollspy navigation with active section highlighting

## Tech Stack

- **Frontend**: React, Vite
- **Styling**: CSS3 with CSS Variables
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

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
│   ├── ProfessionalHeader # Navigation header with theme toggle
│   ├── Hero             # Landing section with CTA
│   ├── About            # Personal summary and interests
│   ├── Experience       # Work experience timeline
│   ├── Projects         # Featured and other projects
│   ├── Skills           # Technical skills by category
│   ├── Education        # Academic background
│   ├── Accomplishments  # Awards and achievements
│   └── Contact          # Contact information
├── App.jsx              # Main app component
├── App.css              # App-level styles
├── index.css            # Global styles and theme variables
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