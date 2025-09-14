# 3eeeS — Apartment Games CRM

A lightweight React + Tailwind app to track apartment games (pool, darts) with players, games, and leaderboards.
No backend yet — data saves to `localStorage` in your browser.

## Quick Start

```bash
# install deps
npm install

# run dev server
npm run dev
```

Open http://localhost:5173

## Tech

- Vite + React + TypeScript
- TailwindCSS
- No external UI libs (simple Tailwind components)

## Deploy (GitHub Pages)

1. Add this repo to GitHub.
2. Enable Pages (Settings → Pages → Build and deployment: GitHub Actions).
3. Use the provided workflow below (create `.github/workflows/pages.yml`).

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```
