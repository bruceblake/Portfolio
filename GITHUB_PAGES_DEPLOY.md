# GitHub Pages Deployment Instructions

## Steps to Deploy to Your Existing Portfolio Repo

### 1. Build the Project
```bash
npm install
npm run build
```

### 2. Prepare Your GitHub Repository
Since you want to replace everything in your existing Portfolio repo:

```bash
# Clone your existing repo (if not already done)
git clone https://github.com/YOUR_USERNAME/Portfolio.git temp-portfolio
cd temp-portfolio

# Remove all existing files except .git
git rm -rf .
git commit -m "Clean repository for new portfolio"

# Copy the built files
cp -r /path/to/portfolio-react/dist/* .

# Add all new files
git add .
git commit -m "Add new React portfolio"
git push origin main
```

### 3. Enable GitHub Pages
1. Go to your repository settings on GitHub
2. Navigate to "Pages" section
3. Under "Source", select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Click Save

### 4. Alternative: Using GitHub Actions
The project includes a GitHub Actions workflow that will automatically build and deploy when you push to main.

Create `.github/workflows/deploy.yml` in your Portfolio repo with the provided workflow file.

## Important Notes
- The site will be available at: `https://YOUR_USERNAME.github.io/Portfolio/`
- First deployment may take a few minutes
- Make sure the `base` in `vite.config.js` matches your repo name: `/Portfolio/`

## Project Structure
```
Portfolio/
├── index.html
├── assets/
│   ├── index-*.js
│   └── index-*.css
├── bruce-blake-data.json
└── api-fallback.json
```

## Features Included
- ✅ Interactive AI Chat (with static responses)
- ✅ Visual Timeline of experience/projects
- ✅ Animated landing page
- ✅ Dark/light theme
- ✅ Mobile responsive
- ✅ No backend required