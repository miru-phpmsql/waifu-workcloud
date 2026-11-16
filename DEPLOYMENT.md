# Deployment guide

The project is a Next.js web app and can run locally on Windows, macOS, and Linux with Node.js installed.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Import `miru-phpmsql/waifu-workcloud` from GitHub in Vercel.
2. Select the Next.js framework preset.
3. Deploy. The app currently needs no environment variables.
4. Future AI integrations must keep API secrets in the hosting provider's environment settings, never in browser code or committed files.

Current prototype features are demo-only: sample data, simulated chat, and no connected coding agent or persistent database.
