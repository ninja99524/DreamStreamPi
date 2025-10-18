#!/usr/bin/env bash
set -euo pipefail

echo "Starting Tailwind/Vite/React audit..."
if [ -d "client" ]; then
  cd client
  echo "Switched to client/ directory"
else
  echo "ERROR: client/ folder not found." >&2
  exit 1
fi

echo
echo "1) Check package.json"
[ -f package.json ] && echo "  OK: package.json found" || echo "  MISSING: package.json"

echo
echo "2) Check CSS Import in src/main.tsx"
MAIN_TSX="src/main.tsx"
if [ -f "$MAIN_TSX" ]; then
  if grep -E -q "import\s+['\"].*index\.css['\"]" "$MAIN_TSX"; then
    echo "  OK: index.css appears imported"
  else
    echo "  MISSING: import './index.css' not found in $MAIN_TSX"
  fi
else
  echo "  NOT FOUND: $MAIN_TSX"
fi

echo
echo "3) Check vite.config.ts"
[ -f vite.config.ts ] && echo "  Found vite.config.ts" || echo "  NOT FOUND"
grep -q "root *:" vite.config.ts && grep -n "root *:" vite.config.ts || echo "  WARN: no explicit root found"
grep -q "react()" vite.config.ts && echo "  OK: react() found in plugins" || echo "  WARNING: react() missing in plugins"

echo
echo "4) Check tailwind.config.ts content paths"
if [ -f tailwind.config.ts ]; then
  if grep -q "\./index.html" tailwind.config.ts && grep -q "\./src/\*\*" tailwind.config.ts; then
    echo "  OK: content includes ./index.html and ./src/**/*"
  else
    echo "  POSSIBLE ISSUE: content paths may be wrong"
  fi
else
  echo "  NOT FOUND: tailwind.config.ts"
fi

echo
echo "5) Check installed packages"
npm ls --depth=0 tailwindcss react react-dom --silent || true

echo
echo "6) Git history for src/pages/home.tsx"
[ -f src/pages/home.tsx ] && git --no-pager log -n 5 -- src/pages/home.tsx || echo "  NOT FOUND: src/pages/home.tsx"

echo
echo "7) Final readiness"
[ -f package.json ] && echo "  To start dev: npm install && npm run dev -- --host"
echo "Audit complete."
