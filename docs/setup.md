# Setup & Troubleshooting Guide

This guide provides detailed local setup instructions, containerization workflows, and troubleshooting steps for the **DevOps Demo** project.

---

## Prerequisites

Ensure you have the following installed on your local machine:
- **Python 3.11+** (for running and testing the FastAPI backend)
- **Node.js (v20+) & npm** (for building and running the React frontend)
- **Docker** (optional, for containerized local execution)
- **Git**

---

## Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/gopaldp/devops-demo.git
cd devops-demo
```

### 2. Backend Setup & Execution
Navigate to the repository root, install Python dependencies, and start the FastAPI development server:

```bash
# Install required dependencies
pip install -r backend/requirements.txt

# Run the FastAPI application with auto-reload on port 8000
uvicorn app.main:app --reload --port 8000 --app-dir backend
```

Verify the backend is running by visiting:
- Health check: [http://localhost:8000/health](http://localhost:8000/health)
- Greeting API: [http://localhost:8000/api/hello?name=Developer](http://localhost:8000/api/hello?name=Developer)

### 3. Frontend Setup & Execution
Open a separate terminal window, navigate to the frontend directory, install dependencies, and start the Vite dev server:

```bash
cd frontend

# Install npm packages
npm install

# Start Vite dev server (configured to communicate with backend)
VITE_API_BASE=http://localhost:8000 npm run dev
```

Open your browser at the URL provided by Vite (typically [http://localhost:5173](http://localhost:5173)).

---

## Running Tests

### Backend Tests
Run automated unit tests using `pytest`:
```bash
pytest backend/tests/test_health.py
```

---

## Docker Containerization & Local Testing

You can build and run both services locally using Docker:

### Backend Container
```bash
# Build the backend image
docker build -f backend/Dockerfile -t devops-demo-backend .

# Run the backend container
docker run -p 8000:8000 devops-demo-backend
```

### Frontend Container
```bash
# Build the frontend image (multi-stage Vite + Nginx)
docker build -f frontend/Dockerfile -t devops-demo-frontend .

# Run the frontend container
docker run -p 8080:80 devops-demo-frontend
```
Access the containerized frontend at [http://localhost:8080](http://localhost:8080).

---

## Troubleshooting

### Common Issues & Solutions

1. **CORS Errors when Frontend connects to Backend:**
   - *Cause:* The frontend is making requests to a backend URL that does not permit CORS or the `VITE_API_BASE` environment variable is misconfigured.
   - *Solution:* Ensure `backend/app/main.py` includes `CORSMiddleware` with `allow_origins=["*"]` (default in this demo) and verify `VITE_API_BASE` matches your running backend URL.

2. **Node Module Build Failures (`npm ci` errors):**
   - *Cause:* Missing `package-lock.json` or incompatible Node version.
   - *Solution:* Ensure Node.js v20+ is installed. If `npm ci` fails due to lockfile discrepancies, `frontend/Dockerfile` falls back to `npm i --no-audit --no-fund`.

3. **Python Import Errors for `app.main`:**
   - *Cause:* Running `uvicorn` without specifying `--app-dir backend` or running outside the virtual environment.
   - *Solution:* Always run Uvicorn with `--app-dir backend` from the repository root or execute directly from within the `backend/` directory (`uvicorn app.main:app --reload`).
