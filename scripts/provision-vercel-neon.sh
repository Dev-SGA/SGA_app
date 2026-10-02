#!/usr/bin/env bash
# Provisions Neon Postgres for this Vercel project and syncs env vars locally.
# Requires: VERCEL_TOKEN (https://vercel.com/account/tokens) and a linked project.
set -euo pipefail
cd "$(dirname "$0")/.."

if [[ -z "${VERCEL_TOKEN:-}" ]]; then
  echo "Set VERCEL_TOKEN to a Vercel account token, then re-run." >&2
  exit 1
fi

export VERCEL_TOKEN

npx --yes vercel@latest link --yes --project sga-app 2>/dev/null || npx --yes vercel@latest link --yes

npx --yes vercel@latest integration add neon \
  --name sga-athletes-db \
  --plan free \
  -e production \
  -e preview \
  --yes

npx --yes vercel@latest env pull .env.local --yes
echo "Done. Redeploy production (vercel --prod) so DATABASE_URL is available at runtime."
