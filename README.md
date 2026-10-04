# DevOps Demo (GitHub Actions + Azure DevOps)

A minimal full‑stack demo to showcase CI/CD with **GitHub Actions**, container publishing to **GHCR**, and a mirror pipeline in **Azure DevOps**.

## Key Features
- **Backend API:** FastAPI service with health check (`/health`) and greeting (`/api/hello`) endpoints.
- **Frontend SPA:** React + Vite application consuming the backend API (configurable via `VITE_API_BASE`).
- **Containerization:** Independent multi-stage Dockerfiles for both backend (`python:3.11-slim`) and frontend (`node:20-alpine` + `nginx:1.27-alpine`).
- **CI/CD Automation:** Automated GitHub Actions workflows for building, testing, and publishing container images to GitHub Container Registry (GHCR), alongside Azure Pipelines support.

## Tech Stack
- **Backend:** FastAPI (`0.111.0`), Uvicorn (`0.30.0`), pytest (`8.2.0`), httpx (`0.27.0`)
- **Frontend:** React (`^18.2.0`), Vite (`^5.4.0`)
- **Docker & Deployment:** Docker, GitHub Container Registry (GHCR), Nginx
- **CI/CD:** GitHub Actions, Azure Pipelines

## Prerequisites
- **Python:** 3.11+
- **Node.js:** v20+ & npm
- **Docker:** Optional (for container execution)

## Installation & Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/gopaldp/devops-demo.git
cd devops-demo
```

## Usage

### 1. Run Backend
```bash
pip install -r backend/requirements.txt
uvicorn app.main:app --reload --port 8000 --app-dir backend
```
Access API at [http://localhost:8000/health](http://localhost:8000/health).

### 2. Run Frontend
In a separate terminal:
```bash
cd frontend
npm install
VITE_API_BASE=http://localhost:8000 npm run dev
```

## Configuration
- `VITE_API_BASE`: Environment variable for the frontend to locate the backend API base URL (defaults to `http://localhost:8000`).

## Project Structure
```
devops-demo/
├── backend/            # FastAPI backend service & tests
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── app/
│   │   └── main.py
│   └── tests/
│       └── test_health.py
├── frontend/           # React + Vite frontend SPA
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       └── main.jsx
├── docs/               # Detailed documentation
│   ├── architecture.md
│   └── setup.md
├── .github/workflows/  # GitHub Actions CI/CD workflows
└── azure-pipelines.yml # Azure DevOps pipeline configuration
```

## Testing
Run backend unit tests with `pytest`:
```bash
pytest backend/tests/test_health.py
```

## Docker & Deployment
Build and run container images locally:
```bash
# Backend container
docker build -f backend/Dockerfile -t devops-demo-backend .
docker run -p 8000:8000 devops-demo-backend

# Frontend container
docker build -f frontend/Dockerfile -t devops-demo-frontend .
docker run -p 8080:80 devops-demo-frontend
```

GitHub Actions workflows publish container images to GHCR (`ghcr.io/<owner>/devops-demo-backend` and `ghcr.io/<owner>/devops-demo-frontend`).

The registered pipelines are:
- **CI (build & test)** (GitHub Actions workflow)
- **Copilot Setup Steps** (GitHub Actions workflow)
- **Generate or Update Docs** (GitHub Actions workflow)
- **Generate or Update Docs (Gemini)** (GitHub Actions workflow)
- **Publish Docker images (GHCR)** (GitHub Actions workflow)

## Documentation
- [Architecture Guide](docs/architecture.md)
- [Setup & Troubleshooting Guide](docs/setup.md)
- [Documentation portal](http://localhost:1313/repos/github/gopaldp/devops-demo/)

---

Made for interview‑ready DevOps demos.
