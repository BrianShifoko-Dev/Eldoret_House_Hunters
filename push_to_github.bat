@echo off
REM ============================================
REM Eldoret House Hunters - Push to GitHub
REM ============================================

echo.
echo ========================================
echo   PUSHING TO GITHUB
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [1/5] Checking current status...
git status

echo.
echo [2/5] Adding all files...
git add .

echo.
echo [3/5] Committing changes...
git commit -m "feat: implement full-stack real estate platform

Backend (FastAPI + Python):
- Complete REST API with 20+ endpoints
- JWT authentication and role-based access
- MySQL database with optimized schema
- Image upload and processing
- Auto-generated API documentation
- Dashboard statistics endpoint

Frontend (Next.js + React + TypeScript):
- Property listings with advanced filtering
- Admin dashboard with analytics
- Property management interface (CRUD)
- Image upload functionality
- API service layer
- Mobile-responsive design

Database (MySQL):
- 5 optimized tables with relationships
- Sample data and default admin user
- Performance indexes and full-text search

Documentation:
- Complete setup and deployment guides
- API documentation
- Database ERD
- CPanel deployment instructions

Features:
- Secure JWT authentication
- Image optimization
- Property CRUD operations
- Dashboard analytics
- Role-based authorization
- Mobile-first design

Status: Production-ready for Eldoret House Hunters
Built to win tenders and contracts"

echo.
echo [4/5] Setting remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/BrianShifoko-Dev/Eldoret_House_Hunters.git

echo.
echo [5/5] Pushing to GitHub...
echo.
echo IMPORTANT: You will be prompted for GitHub credentials
echo Username: Your GitHub username
echo Password: Use a Personal Access Token (not your password!)
echo.
echo To create a token: GitHub Settings > Developer settings > Personal access tokens > Tokens (classic) > Generate new token
echo.
pause

git branch -M main
git push -u origin main

echo.
if %errorlevel% equ 0 (
    echo ========================================
    echo   SUCCESS! Code pushed to GitHub
    echo ========================================
    echo.
    echo View your repository at:
    echo https://github.com/BrianShifoko-Dev/Eldoret_House_Hunters
    echo.
) else (
    echo ========================================
    echo   PUSH FAILED
    echo ========================================
    echo.
    echo Common issues:
    echo 1. Authentication failed - Use Personal Access Token
    echo 2. Repository already has commits - Try: git pull origin main --rebase
    echo 3. Network issues - Check internet connection
    echo.
)

pause

