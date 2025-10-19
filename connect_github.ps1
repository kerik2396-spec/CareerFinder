# GitHub Connection Script
param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername,
    
    [Parameter(Mandatory=$true)]
    [string]$RepositoryName
)

$remoteUrl = "https://github.com/$GitHubUsername/$RepositoryName.git"

Write-Host "Setting up connection to GitHub..." -ForegroundColor Green

# Add remote origin
git remote add origin $remoteUrl

# Verify remote
Write-Host "Remote repositories:" -ForegroundColor Yellow
git remote -v

Write-Host "`nTo push to GitHub, run:" -ForegroundColor Green
Write-Host "git push -u origin main" -ForegroundColor White

# Create push script
@"
#!/bin/bash
echo \"Pushing to GitHub...\"
git push -u origin main
"@ | Out-File -FilePath "scripts\push_to_github.sh" -Encoding UTF8

Write-Host "Created push script: scripts\push_to_github.sh" -ForegroundColor Green