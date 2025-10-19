# Git Setup Script for CareerFinder
Write-Host "Setting up Git repository..." -ForegroundColor Green

# Initialize Git repository
git init

# Add all files to git
git add .

# Create initial commit
git commit -m "Initial commit: CareerFinder job platform"

# Create and switch to main branch
git branch -M main

Write-Host "Git repository initialized successfully!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Create repository on GitHub: https://github.com/new" -ForegroundColor White
Write-Host "2. Run the next script to connect to GitHub" -ForegroundColor White