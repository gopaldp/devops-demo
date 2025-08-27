# ---- Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Make musl-based Alpine play nice with common toolchains
RUN apk add --no-cache libc6-compat

# Install deps (lockfile preferred)
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci --no-audit --no-fund || npm i --no-audit --no-fund

# Add source
COPY frontend .

# Ensure the local vite shim is executable if present (belt-and-suspenders)
RUN test -f node_modules/.bin/vite && chmod +x node_modules/.bin/vite || true

# Call vite directly via node (avoids executing the shim)
RUN node ./node_modules/vite/bin/vite.js build

# ---- Runtime stage
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
