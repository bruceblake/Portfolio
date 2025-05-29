# GitHub Pages Deployment Guide

## Automatic Deployment (Recommended)

The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the `main` branch.

### Setup Steps:

1. **Enable GitHub Pages in your repository:**
   - Go to Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **Push to main branch:**
   ```bash
   git add .
   git commit -m "Deploy portfolio to GitHub Pages"
   git push origin main
   ```

3. **Wait for deployment:**
   - The GitHub Action will automatically build and deploy
   - Check Actions tab to monitor progress
   - Your site will be available at: `https://[username].github.io/Portfolio/`

## Manual Deployment

If you prefer to deploy manually:

```bash
cd portfolio-react
npm install
npm run deploy
```

This will build the project and push to the `gh-pages` branch.

## Important Notes

- The base path is already configured in `vite.config.js` as `/Portfolio/`
- All assets use relative paths for proper GitHub Pages deployment
- The chat interface uses static responses (no backend needed)
- Responsive design works on all devices

## Troubleshooting

- If the site shows 404, ensure GitHub Pages is enabled in repository settings
- If assets don't load, check that the base path matches your repository name
- Clear browser cache if you see old content after deployment