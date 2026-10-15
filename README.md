# Lower Mainland & BC Election Matcher

One static, no-backend web app with a drop-down of elections. Pick the BC provincial election or a Lower Mainland municipal election, answer the questions, and see which party's published platform you're closest to, with reasons and sources. Every election page shows **when its data was last updated**.

- **Alignment quiz (6):** BC provincial, Vancouver, Surrey, Burnaby, Richmond, Delta.
- **Candidate info only (19):** Coquitlam, New Westminster, Port Coquitlam, Port Moody, North Vancouver (City and District), West Vancouver, Langley (City and Township), Maple Ridge, Pitt Meadows, White Rock, Abbotsford, Mission, Chilliwack, Anmore, Belcarra, Lions Bay, Bowen Island. These have no score because no detailed platform data was found; they link to official and independent candidate lists.

Deep links work: `index.html#surrey`, `#burnaby`, `#bc-provincial`, and so on.

## Files

- `index.html`, `styles.css`, `app.js` – the UI and routing
- `registry.js` – the global `ELECTIONS` list and the data schema
- `elections/*.js` – one file per election (or a group, as in `directory.js`)
- `score.js` – scoring and reason selection
- `test.js` – `node test.js` validates every election's data and the scoring
- `staticwebapp.config.json` – routing and security headers (strict CSP)
- `.github/workflows/azure-static-web-apps.yml` – optional CI/CD (runs the tests, then deploys)

## Run locally

```
node test.js
npx http-server . -p 8080
```

## Deploy to Azure (Static Web Apps, from this folder)

```powershell
az login
az group create -n rg-election-matcher -l westus2
az staticwebapp create -n election-matcher -g rg-election-matcher -l westus2 --sku Free
$token = az staticwebapp secrets list -n election-matcher -g rg-election-matcher --query "properties.apiKey" -o tsv
npx @azure/static-web-apps-cli deploy . --deployment-token $token --env production
az staticwebapp show -n election-matcher -g rg-election-matcher --query defaultHostname -o tsv
```

For GitHub Actions, push this folder to `main`, add the deployment token as the `AZURE_STATIC_WEB_APPS_API_TOKEN` secret, and the included workflow tests and deploys on every push.

## Keeping data current

Each election object has an `updated` date (`YYYY-MM-DD`). **Whenever you change an election's data, update its `updated` field**, since that is the date shown on the page. Stances use the format `party: [stance, "note", "sourceKey", inferred?]` where stance is -2 to +2 and `sourceKey` refers to that election's `sources`. Run `node test.js` after any edit.

To add a municipality, add an object to `ELECTIONS` (copy `delta.js` for a quiz or an entry in `directory.js` for an info page) and, for a new file, add a `<script>` tag to `index.html`.

## Data notes

Research snapshot: October 15, 2026. Municipal elections are October 17, 2026; the BC provincial election is October 24, 2026. Platforms for several parties were thin or came from a single news summary, which each page's caveat says. Positions marked "inferred" are a reasonable reading of a related platform item, not a direct statement.
