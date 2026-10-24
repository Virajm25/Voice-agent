#!/usr/bin/env bash
# Straveda Voice: one-command local setup for macOS / Linux. Requires Docker running.
set -euo pipefail
cd "$(dirname "$0")"

secret() { if command -v openssl >/dev/null 2>&1; then openssl rand -hex "${1:-32}"; else python3 -c "import secrets,sys; print(secrets.token_hex(int(sys.argv[1])))" "${1:-32}"; fi; }

docker info >/dev/null 2>&1 || { echo "Docker is not running. Start it and try again." >&2; exit 1; }

if [[ ! -f .env ]]; then
  : > .env
  while IFS= read -r line || [[ -n "$line" ]]; do
    line="${line//straveda__GENERATE_SHORT__/straveda$(secret 6)}"
    while [[ "$line" == *__GENERATE__* ]]; do
      line="${line/__GENERATE__/$(secret 32)}"
    done
    printf '%s
' "$line" >> .env
  done < team.env.example
  echo "Created .env with fresh secrets."
else
  echo ".env already exists, keeping it."
fi

docker compose -f docker-compose.yaml -f docker-compose.straveda.yaml up -d --build

echo
echo "Straveda Voice is starting (first start takes a few minutes)."
echo "Open http://localhost:3010 once the 'api' container shows (healthy) in: docker ps"
