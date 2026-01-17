#!/usr/bin/env bash
set -euo pipefail

# Kunci port biar cocok dengan port forwarding Replit
export PORT="${PORT:-7575}"

# Bikin .env kalau belum ada (biar SESSION_SECRET konsisten)
if [ ! -f .env ]; then
  echo "PORT=$PORT" > .env
  node generate-secret.js >/dev/null 2>&1 || true
fi

# Install dependencies sekali saja
if [ ! -d node_modules ]; then
  npm ci
fi

# Jalankan mode production (lebih stabil dari nodemon)
export NODE_ENV=production
npm start
