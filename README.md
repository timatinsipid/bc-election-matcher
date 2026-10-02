# BC 2026 Provincial Election Matcher

A static, no-backend quiz that asks 25 questions on provincial issues and ranks the five BC parties (NDP, Conservatives, Greens, OneBC, CentreBC) by how closely their published platforms match your answers, citing the platform item and source behind each reason. Plain HTML/CSS/JS, so it deploys to Azure Static Web Apps (free tier is fine) with no build step.

## Files

- `data.js` – parties, questions, per-party stances, notes and source links (edit this to update positions)
- `score.js` – scoring and reason selection
- `app.js`, `index.html`, `styles.css` – the UI
- `staticwebapp.config.json` – routing and security headers (strict CSP)
- `test.js` – `node test.js` checks data integrity and scoring
- `.github/workflows/azure-static-web-apps.yml` – optional CI/CD

## Run locally

```
node test.js
npx http-server . -p 8080
```

## Deploy to Azure (Azure CLI, from this folder)

```powershell
az login
az group create -n rg-bc-election -l westus2
az staticwebapp create -n bc-election-matcher -g rg-bc-election -l westus2 --sku Free
$token = az staticwebapp secrets list -n bc-election-matcher -g rg-bc-election --query "properties.apiKey" -o tsv
npx @azure/static-web-apps-cli deploy . --deployment-token $token --env production
```

The app URL is printed by `az staticwebapp show -n bc-election-matcher -g rg-bc-election --query defaultHostname -o tsv`. Add a custom domain with `az staticwebapp hostname set`.

## Deploy via GitHub Actions

Push this folder to a GitHub repo on `main`, create the Static Web App with `--source <repo-url> --branch main --login-with-github` (or add the deployment token as the `AZURE_STATIC_WEB_APPS_API_TOKEN` secret), and the included workflow tests and deploys on every push.

## Updating positions

Edit `QUESTIONS[].stances` in `data.js`. Format: `party: [stance, "note", "sourceKey", inferred?]`, where stance is -2 to +2 and `sourceKey` refers to `SOURCES`. Run `node test.js` afterwards. The snap election is October 24, 2026. Platforms were still being released when this was researched (Oct 2, week 3 of the campaign), so re-check and update `data.js` as parties publish more. Most commitments were cross-checked against the BC Ballot tracker and news coverage.