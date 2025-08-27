# DevOps Demo (GitHub Actions + Azure DevOps)

A minimal full‑stack demo to showcase CI/CD with **GitHub Actions**, container publishing to **GHCR**, and a mirror pipeline in **Azure DevOps**.

## Stack
- **Backend:** FastAPI (`/health`, `/api/hello`), tests with `pytest`
- **Frontend:** React + Vite consuming the API (configurable via `VITE_API_BASE`)
- **Docker:** Separate images for backend and frontend
- **CI/CD:** GitHub Actions (build+test+publish) and Azure Pipelines (build+test)

## Quickstart (local)
```bash
# backend
pip install -r backend/requirements.txt
uvicorn app.main:app --reload --port 8000 --app-dir backend

# frontend (in another terminal)
cd frontend
npm install
VITE_API_BASE=http://localhost:8000 npm run dev
```

## GitHub Actions
- `.github/workflows/ci.yml` builds backend & frontend and runs tests on push/PR.
- `.github/workflows/docker-publish.yml` builds and pushes images to GHCR.
  - Requires **no extra secrets**; uses `GITHUB_TOKEN` with `packages: write` permission.

Images will be tagged as:
```
ghcr.io/<your-account>/devops-demo-backend:latest
ghcr.io/<your-account>/devops-demo-frontend:latest
```

## Azure DevOps
- `azure-pipelines.yml` builds & tests both services.
- Add a deploy stage once you create a Service Connection to your target (Azure Web App, ACR, etc.).

## Next steps (pick any):
1. **Deploy backend** to Azure Web App (Container) using GHCR image.
2. **Deploy frontend** to GitHub Pages or Azure Static Web Apps.
3. Add code quality gates (flake8, mypy, eslint) and caching.
4. Add environments & approvals before production deploy.
5. Add matrix testing (e.g., Python 3.10 & 3.11).

---

Made for interview‑ready DevOps demos.
