#!/usr/bin/env bash
# Déploie la doc (docs.fluenzr.co) : gate de build local, rsync vers lemeon, docker compose, contrôle en ligne.
# Usage : scripts/deploy.sh   (depuis n'importe où ; DRY_RUN=1 pour ne rien écrire sur le serveur)
set -euo pipefail
cd "$(dirname "$0")/.."

HOST="${DEPLOY_HOST:-lemeon}"
DIR="${DEPLOY_DIR:-/var/www/FluenzRDoc}"

echo "== 1/4 gate : build local =="
[ -z "$(git status --porcelain)" ] || { echo "Arbre de travail non propre : commitez d'abord."; exit 1; }
npm ci --no-audit --no-fund >/dev/null
npm run build >/dev/null
test -s public/sitemap.xml
[ -z "$(git status --porcelain)" ] || { echo "Le build a modifié des fichiers suivis (sitemap ?) : commitez-les."; git status --short; exit 1; }

echo "== 2/4 rsync vers $HOST:$DIR =="
RSYNC=(rsync -az --delete --itemize-changes
  --exclude node_modules --exclude .nuxt --exclude .output --exclude dist --exclude .git --exclude .idea
  --exclude .github --exclude '*.log')
if [ "${DRY_RUN:-0}" = 1 ]; then "${RSYNC[@]}" --dry-run ./ "$HOST:$DIR/"; exit 0; fi
"${RSYNC[@]}" ./ "$HOST:$DIR/" | tail -n 20

echo "== 3/4 docker compose build + up =="
ssh "$HOST" "cd $DIR && docker compose build && docker compose up -d"

echo "== 4/4 contrôle =="
for i in $(seq 1 30); do
  code=$(curl -s -o /dev/null -w '%{http_code}' https://docs.fluenzr.co/robots.txt || true)
  [ "$code" = 200 ] && break
  sleep 4
done
for p in /robots.txt /sitemap.xml / /en/docs/api/mcp; do
  echo "$p -> $(curl -s -o /dev/null -w '%{http_code}' "https://docs.fluenzr.co$p")"
done
[ "$code" = 200 ] || { echo "robots.txt ne répond pas 200 : échec"; exit 1; }
