# ---- Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Needed by some toolchains (vite/rollup/esbuild) on Alpine (musl)
RUN apk add --no-cache libc6-compat

# Install deps (lockfile preferred)
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci --no-audit --no-fund || npm i --no-audit --no-fund

# Build
COPY frontend .
RUN npm run build

# ---- Runtime stage
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
