# Straveda Voice: run it locally with Docker

## You need
- Docker Desktop (Windows/Mac) or Docker Engine + Compose (Linux), running
- About 8 GB free RAM and 10 GB free disk
- Free local ports: 3010 (UI), 8000 (API), 5432, 6379, 9000, 9001

## Start
1. Unzip the folder anywhere.
2. Open a terminal in the folder, then run:

   Windows (PowerShell):
   ```
   powershell -ExecutionPolicy Bypass -File .\setup-team.ps1
   ```
   macOS / Linux:
   ```
   ./setup-team.sh
   ```
3. The first run builds the images and takes about 10 to 20 minutes. Later starts take a minute or two.
4. When `docker ps` shows `dograh-api-1` as `(healthy)`, open http://localhost:3010 and create your account.

The script creates a `.env` file with fresh random secrets on the first run and keeps it afterwards.

## Everyday commands
```
docker compose -f docker-compose.yaml -f docker-compose.straveda.yaml up -d      # start
docker compose -f docker-compose.yaml -f docker-compose.straveda.yaml down       # stop (keeps data)
docker compose -f docker-compose.yaml -f docker-compose.straveda.yaml logs -f api
docker compose -f docker-compose.yaml -f docker-compose.straveda.yaml up -d --build   # after code changes
```
Do NOT add `-v` to `down` unless you want to wipe the database.

## Using AI models
Open **Models** and **Providers** in the app and add your own provider keys (for example OpenAI, Deepgram, ElevenLabs). Without them, agents can't run.

## Troubleshooting
- Page does not load: wait for the `api` container to be `(healthy)`, then refresh.
- Port already in use: stop whatever uses it, or change the port mapping in `docker-compose.yaml`.
- Browser voice test cannot connect on another machine: this setup targets one machine (localhost). Remote access needs a server with TURN configured.
