# Copilot instructions

## Project

Minimal full-stack demo of CI/CD: a FastAPI backend and a React + Vite
frontend, each with its own Docker image, built by GitHub Actions and
Azure Pipelines.

Stack: Python 3.11 (FastAPI, Uvicorn, pytest), Node 20 (React 18, Vite 5).

How it runs:

1. Backend: `pip install -r backend/requirements.txt`, then
   `uvicorn app.main:app --reload --port 8000 --app-dir backend`.
   Endpoints (`backend/app/main.py`): `GET /health`, `GET /api/hello?name=…`.
2. Frontend: `cd frontend && npm install && npm run dev`. The API base URL
   comes from `VITE_API_BASE` (default `http://localhost:8000`, see
   `frontend/src/App.jsx`).
3. Tests: `pytest -q` in `backend/` (`backend/tests/test_health.py`).

Docker: `backend/Dockerfile` (port 8000) and `frontend/Dockerfile`.

CI/CD:
- `.github/workflows/ci.yml` runs backend tests and builds the frontend on push and PR.
- `.github/workflows/docker-publish.yml` pushes images to GHCR on push to `main`.
- `azure-pipelines.yml` mirrors build and test in Azure DevOps.

## Documentation notes

- The existing README is short. Keep its structure (Stack, Quickstart,
  GitHub Actions, Azure DevOps) and fill in what the code supports.
- Image names follow `ghcr.io/<account>/devops-demo-backend` and
  `devops-demo-frontend`. Check `docker-publish.yml` for the exact tags.

## Ignore

- `venv/` (a committed virtual environment) and `frontend/node_modules/`.
  Never describe their contents.

## Conventions

- Keep changes small and focused. One concern per pull request.
- Base documentation on the actual code. Never invent features, metrics or
  commands. Mark anything uncertain with `TODO: confirm …`.
- Use UTF-8 for all text files.
