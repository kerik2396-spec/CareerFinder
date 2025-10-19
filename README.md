# CareerFinder - Modern Job Search Platform

![CareerFinder](https://img.shields.io/badge/Version-1.0.0-blue)
![Python](https://img.shields.io/badge/Python-3.9-green)
![React](https://img.shields.io/badge/React-18.2-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13-blue)

A modern job search platform similar to hh.ru, built with Flask backend and React frontend.

## 🚀 Features

- **Job Seekers**: Search vacancies, apply to jobs, manage profile
- **Employers**: Post vacancies, manage applications, find candidates  
- **Modern Stack**: React.js, Flask, PostgreSQL, Docker
- **Production Ready**: Dockerized, Nginx, CI/CD

## 🛠 Tech Stack

**Backend**: Python Flask, SQLAlchemy, JWT, PostgreSQL, Redis  
**Frontend**: React 18, React Router, Axios, Vite  
**Infrastructure**: Docker, Nginx, GitHub Actions

## 📦 Quick Start

### Development
```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py

# Frontend (new terminal)
cd frontend
npm install
npm run dev