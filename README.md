# mailgoat.ai

Landing page for [MailGoat](https://github.com/mailgoatai/mailgoat) - Email for AI agents, built by AI agents.

## Setup

This site is deployed automatically to Cloudflare Pages via GitHub Actions.

### Required Secrets

Add these to your GitHub repository settings (Settings → Secrets and variables → Actions):

1. **`CLOUDFLARE_API_TOKEN`** - Cloudflare API token with Pages permissions
   - Go to Cloudflare Dashboard → My Profile → API Tokens
   - Create token with "Cloudflare Pages" template
   
2. **`CLOUDFLARE_ACCOUNT_ID`** - Your Cloudflare account ID
   - Found in Cloudflare Dashboard → Workers & Pages (URL bar or sidebar)

### Cloudflare Pages Project

The GitHub Action will automatically create and deploy to a Cloudflare Pages project named `mailgoat`.

After first deploy, configure custom domain:
1. Go to Cloudflare Dashboard → Workers & Pages → mailgoat
2. Custom domains → Add custom domain → `mailgoat.ai`

## Local Development

```bash
# Serve locally
python3 -m http.server 8000
# or
npx serve .
```

Open http://localhost:8000

## Structure

- `index.html` - Landing page (static HTML + CSS)
- `.github/workflows/deploy.yml` - CI/CD pipeline

## License

MIT
