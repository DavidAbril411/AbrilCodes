#!/usr/bin/env bash
# Run from the ROOT of the AbrilCodes repo:
#   bash path/to/production/install.sh
# Archives the v1 site into archive/v1/ and installs the 2026 redesign.
set -euo pipefail

PKG="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ ! -f package.json ] || ! grep -q '"frontend-abrilcodes"' package.json; then
  echo "Run this from the root of the AbrilCodes repo." >&2
  exit 1
fi

mv_safe() { # git mv when tracked, plain mv otherwise
  mkdir -p "$(dirname "$2")"
  git mv "$1" "$2" 2>/dev/null || mv "$1" "$2"
}

echo "→ Archiving v1 into archive/v1/"
mkdir -p archive/v1/app archive/v1/src
mv_safe "src/app/[locale]/page.tsx" "archive/v1/app/[locale]/page.tsx"
mv_safe src/app/layout.tsx archive/v1/app/layout.tsx
mv_safe src/app/globals.css archive/v1/app/globals.css
mv_safe src/components archive/v1/src/components
mv_safe src/data archive/v1/src/data
mv_safe src/images archive/v1/src/images

echo "→ Installing v2"
cp "$PKG/src/app/layout.tsx" src/app/layout.tsx
cp "$PKG/src/app/globals.css" src/app/globals.css
cp "$PKG/src/app/locale/page.tsx" "src/app/[locale]/page.tsx"   # folder renamed: brackets can't travel in the zip
mkdir -p src/components/v2
cp "$PKG/src/components/v2/"* src/components/v2/
mkdir -p public/images
cp -R "$PKG/public/images/." public/images/
cp "$PKG/tsconfig.json" tsconfig.json

echo "→ Done. Next: npm run build && npx serve out   (then commit)"
