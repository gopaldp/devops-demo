# Architecture

This document describes the architectural components, modules, and control flow of the **DevOps Demo** repository.

## Overview

The DevOps Demo project is structured as a decoupled full-stack application with separate backend and frontend services, containerized independently, and built/tested through automated CI/CD pipelines (GitHub Actions and Azure Pipelines).

```
┌──────────────┐         HTTP / JSON          ┌──────────────┐
│  React SPA   │ ───────────────────────────> │ FastAPI API  │
│  (Frontend)  │ <─────────────────────────── │  (Backend)   │
└──────────────┘                              └──────────────┘
       │                                             │
       ▼                                             ▼
 Nginx Container                              Uvicorn / Python
```

---

## Components & Modules

### 1. Backend (`backend/`)
- **Framework:** FastAPI (`0.111.0`) running on Uvicorn (`0.30.0`).
- **Main Application Entrypoint:** `backend/app/main.py`
  - Configures CORS middleware supporting all origins (`*`) for local development and static hosting integration.
  - Exposes REST endpoints:
    - `GET /health`: Returns service health status (`{"status": "ok"}`).
    - `GET /api/hello`: Returns a greeting message with an optional `name` query parameter (default: `"World"`).
- **Testing:** `backend/tests/test_health.py`
  - Uses `pytest` (`8.2.0`) and FastAPI's `TestClient` (`httpx`) to validate endpoint responses.
- **Containerization:** `backend/Dockerfile`
  - Based on `python:3.11-slim`.
  - Installs requirements from `requirements.txt`.
  - Exposes port `8000` and runs Uvicorn.

### 2. Frontend (`frontend/`)
- **Framework:** React (`^18.2.0`) bundled with Vite (`^5.4.0`).
- **Main Source Files:**
  - `frontend/src/main.jsx`: React application bootstrap mounting to the root element.
  - `frontend/src/App.jsx`: Root component fetching backend health and hello greeting on mount.
  - Configures dynamic API connection via `import.meta.env.VITE_API_BASE` (defaulting to `http://localhost:8000`).
- **Containerization:** `frontend/Dockerfile`
  - Multi-stage Docker build:
    1. **Build stage:** Uses `node:20-alpine` with `libc6-compat`, installs npm dependencies (`npm ci`), and builds static assets via Vite (`node ./node_modules/vite/bin/vite.js build`).
    2. **Runtime stage:** Uses `nginx:1.27-alpine` to serve static distribution files on port `80`.

### 3. CI/CD & DevOps Automation
- **GitHub Actions Workflows (`.github/workflows/`):**
  - `ci.yml`: Runs automated builds and tests for both backend and frontend on pushes and pull requests.
  - `docker-publish.yml`: Builds and pushes container images to GitHub Container Registry (GHCR) using repository permissions (`packages: write`).
- **Azure Pipelines (`azure-pipelines.yml`):**
  - Provides mirror build and test capabilities for Azure DevOps environments.

---

## Data and Control Flow

1. **Client Request:** The user accesses the React Single Page Application (SPA) served by Nginx or local Vite dev server.
2. **API Communication:** Upon loading (`useEffect`), the frontend performs asynchronous HTTP GET requests to the configured backend API base URL (`VITE_API_BASE`), targeting `/health` and `/api/hello?name=DevOps`.
3. **Backend Processing:** FastAPI handles requests through path operations defined in `backend/app/main.py`, returning JSON responses.
4. **Response Render:** The React application parses JSON data and updates local component state (`status`, `message`), rendering the live backend status and greeting in the browser.
