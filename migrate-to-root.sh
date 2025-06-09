#!/bin/bash

# Migration script to move portfolio-react to root level
# Run this from the parent directory: /home/proxyie/MySoftware/Portfolio/

echo "Starting migration from portfolio-react subdirectory to root..."

# Check if we're in the right directory
if [ ! -d "portfolio-react" ]; then
    echo "Error: portfolio-react directory not found. Make sure you're in the parent directory."
    exit 1
fi

# Copy all portfolio-react contents to root
echo "Copying portfolio-react contents to root..."
cp -r portfolio-react/* .
cp -r portfolio-react/.[!.]* . 2>/dev/null || true

# Remove old root-level files that aren't part of React app
echo "Removing old implementation files..."
rm -rf AZURE-*.md IMPLEMENTATION-GUIDE.md RAG-IMPLEMENTATION.md Dockerfile
rm -rf api-integration-example.js azure-deploy.* azure-functions/ backend/
rm -rf bruce-blake-data.json claude-script.js claude-styles.css claude-ui.html
rm -rf deploy.sh docker-compose.yml functions/ index.html portfolio-data.js
rm -rf rag-example.js script.js server.js setup.sh styles.css web.config
rm -rf node_modules/ package-lock.json package.json

# Handle any existing public directory conflicts
if [ -d "public" ] && [ -d "portfolio-react/public" ]; then
    echo "Merging public directories..."
    rm -rf public/
fi

# Remove the portfolio-react directory
echo "Removing portfolio-react subdirectory..."
rm -rf portfolio-react/

# Fix git submodule issues
echo "Fixing git submodule configuration..."
git submodule deinit --all -f 2>/dev/null || true
git rm --cached portfolio-react 2>/dev/null || true
rm -f .gitmodules

# Clean up any git cache issues
git rm -r --cached . 2>/dev/null || true
git add .

echo "Migration complete! Ready to commit changes."
echo ""
echo "To commit the changes, run:"
echo "git commit -m \"Migrate from submodule to single React portfolio"
echo ""
echo "- Moved portfolio-react contents to root level"
echo "- Removed old Express/Node.js implementation" 
echo "- Cleaned up duplicate components and unused files"
echo "- Removed test dependencies and configurations"
echo "- Simplified package.json dependencies"
echo ""
echo "🤖 Generated with Claude Code"
echo ""
echo "Co-Authored-By: Claude <noreply@anthropic.com>\""