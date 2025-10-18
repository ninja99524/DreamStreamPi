#!/usr/bin/env bash
set -euo pipefail

echo "Applying Tailwind content path fix and ensuring index.css import..."
if [ -d "client" ]; then
  cd client
else
  echo "ERROR: client/ directory not found." >&2
  exit 1
fi

# Fix tailwind.config.ts
if [ -f tailwind.config.ts ]; then
  [ -f tailwind.config.ts.bak ] || cp tailwind.config.ts tailwind.config.ts.bak
  if sed --version >/dev/null 2>&1; then
    sed -i 's#\./client/index.html#./index.html#g; s#\./client/src#./src#g' tailwind.config.ts
  else
    sed 's#\./client/index.html#./index.html#g; s#\./client/src#./src#g' tailwind.config.ts > tailwind.config.ts.tmp && mv tailwind.config.ts.tmp tailwind.config.ts
  fi
  echo "tailwind.config.ts updated (if needed)."
fi

# Ensure index.css import in main.tsx
MAIN="src/main.tsx"
if [ -f "$MAIN" ]; then
  if ! grep -E -q "import\s+['\"].*index\.css['\"]" "$MAIN"; then
    [ -f "${MAIN}.bak" ] || cp "$MAIN" "${MAIN}.bak"
    echo 'import "./index.css";' | cat - "$MAIN" > tmp && mv tmp "$MAIN"
    echo "Inserted import \"./index.css\" into $MAIN"
  else
    echo "$MAIN already imports index.css"
  fi
fi

echo "Done. Run npm install && npm run dev -- --host from client/ to verify."
