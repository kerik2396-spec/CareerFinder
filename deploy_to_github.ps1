# Complete GitHub Deployment Script
Write-Host "=== CareerFinder GitHub Deployment ===" -ForegroundColor Cyan

# Check if Git is installed
try {
    git --version > $null 2>&1
    Write-Host "✓ Git is installed" -ForegroundColor Green
} catch {
    Write-Host "✗ Git is not installed. Please install Git first." -ForegroundColor Red
    Write-Host "Download from: https://git-scm.com/downloads" -ForegroundColor Yellow
    exit 1
}

# Initialize Git if not already
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    git add .
    
    # Create commit message file to avoid multiline issues
    $commitMessage = @"
feat: Initial commit - CareerFinder job platform

- Complete Flask backend with authentication
- React frontend with modern UI  
- Docker configuration for deployment
- PostgreSQL database setup
- Job search and application system
"@
    
    $commitMessage | Out-File -FilePath "commit_msg.txt" -Encoding UTF8
    git commit -F "commit_msg.txt"
    Remove-Item "commit_msg.txt" -Force
    
    git branch -M main
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "✓ Git repository already exists" -ForegroundColor Green
}

# Display GitHub instructions
Write-Host "`n=== GitHub Setup Instructions ===" -ForegroundColor Cyan
Write-Host "`n1. CREATE NEW REPOSITORY ON GITHUB:" -ForegroundColor Yellow
Write-Host "   - Go to: https://github.com/new" -ForegroundColor White
Write-Host "   - Repository name: CareerFinder" -ForegroundColor White
Write-Host "   - Description: Modern job search platform built with Flask and React" -ForegroundColor White
Write-Host "   - Public/Private: Choose as preferred" -ForegroundColor White
Write-Host "   - DO NOT initialize with README (we already have one)" -ForegroundColor White

Write-Host "`n2. CONNECT TO YOUR GITHUB REPOSITORY:" -ForegroundColor Yellow
Write-Host "   Run this command with your username:" -ForegroundColor White
Write-Host "   .\scripts\github_connect.ps1 -Username YourGitHubUsername" -ForegroundColor Green

Write-Host "`n3. PUSH TO GITHUB:" -ForegroundColor Yellow
Write-Host "   Run: .\scripts\github_push.ps1" -ForegroundColor Green

Write-Host "`n4. SET UP GITHUB ACTIONS (Optional):" -ForegroundColor Yellow
Write-Host "   GitHub Actions workflow is already configured in .github/workflows/deploy.yml" -ForegroundColor White

# Ensure scripts directory exists
New-Item -ItemType Directory -Force -Path "scripts" | Out-Null

# Create connection script
@"
param(
    [Parameter(Mandatory=`$true)]
    [string]`$Username
)

`$repoName = "CareerFinder"
`$remoteUrl = "https://github.com/`$Username/`$repoName.git"

Write-Host "Connecting to GitHub repository..." -ForegroundColor Yellow
git remote add origin `$remoteUrl

Write-Host "Verifying connection..." -ForegroundColor Yellow
git remote -v

Write-Host "`n✓ Successfully connected to GitHub!" -ForegroundColor Green
Write-Host "Now run: .\scripts\github_push.ps1" -ForegroundColor White
"@ | Out-File -FilePath "scripts\github_connect.ps1" -Encoding UTF8

# Create push script
@"
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow

# First push
git push -u origin main

if (`$LASTEXITCODE -eq 0) {
    Write-Host "`n✓ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "Your repository is now at: https://github.com/`$(git remote get-url origin | Select-String 'github.com/(.*?)/' | ForEach-Object { `$_.Matches.Groups[1].Value })/CareerFinder" -ForegroundColor White
} else {
    Write-Host "`n✗ Push failed. Please check your GitHub repository URL and permissions." -ForegroundColor Red
}
"@ | Out-File -FilePath "scripts\github_push.ps1" -Encoding UTF8

Write-Host "`n✓ Deployment scripts created in scripts/ folder" -ForegroundColor Green
Write-Host "`nNext: Follow the instructions above to create your GitHub repository" -ForegroundColor Cyan