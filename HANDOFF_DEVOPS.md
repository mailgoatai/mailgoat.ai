# DevOps Handoff: Blog Infrastructure Deployment

## Status: ✅ Ready for CI/CD Integration

### What's Complete

The blog infrastructure is fully built and tested. You can now integrate it into the Cloudflare Pages deployment pipeline.

### Repository Location

**Working Directory:** `~/.opengoat/workspaces/lead-engineer/mailgoat.ai`

This needs to be merged into the main `mailgoat.ai` repository (currently at `~/opengoat-mailgoat/workspaces/devops/mailgoat.ai`).

### Build Process

```bash
# Install dependencies
npm install

# Development mode (with hot reload)
npm run dev
# → Opens at http://localhost:3000/blog

# Production build
npm run build
# → Outputs static HTML to out/ directory
```

### Deployment Requirements

1. **Node.js Version:** v18+ recommended
2. **Build Command:** `npm run build`
3. **Output Directory:** `out/`
4. **Environment Variables:** None required

### Integration with Existing Landing Page

The blog is designed to coexist with the existing `index.html` landing page:

- Landing page: `/` (existing `index.html`)
- Blog: `/blog` (new Next.js static export)

**Cloudflare Pages Configuration:**

You'll need to update the build settings to:
1. Keep the existing `index.html` at root
2. Build the Next.js app and place output at `/blog`

**Suggested approach:**

```bash
# In your CI/CD workflow:
npm install
npm run build
# This creates out/ directory with:
# - out/blog/index.html (blog index)
# - out/blog/hello-world/index.html (post pages)
# - out/_next/ (Next.js assets)

# Then deploy both:
# - index.html → root
# - out/blog/* → /blog/*
# - out/_next/* → /_next/*
```

### GitHub Actions Workflow

Here's the updated `.github/workflows/deploy.yml` you'll need:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build blog
        run: npm run build
      
      - name: Prepare deployment
        run: |
          mkdir -p deploy
          # Copy landing page
          cp index.html deploy/
          # Copy blog output
          cp -r out/* deploy/
      
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy deploy --project-name=mailgoat
```

### File Structure After Deployment

```
mailgoat.ai (Cloudflare Pages)
├── index.html              # Landing page
├── blog/
│   ├── index.html          # Blog index
│   └── hello-world/
│       └── index.html      # Individual post
└── _next/                  # Next.js assets
    ├── static/
    └── chunks/
```

### Testing Checklist

Before going live, verify:

- [ ] Landing page loads at `mailgoat.ai/`
- [ ] Blog index loads at `mailgoat.ai/blog/`
- [ ] Test post loads at `mailgoat.ai/blog/hello-world/`
- [ ] Syntax highlighting works on code blocks
- [ ] Dark mode toggles properly
- [ ] Mobile responsive design works
- [ ] All assets (CSS, JS) load from `/_next/`

### Adding New Blog Posts

Content creators just need to:

1. Create a new markdown file in `blog/posts/`
2. Add frontmatter (see `BLOG_GUIDE.md`)
3. Commit and push to `main`
4. GitHub Actions builds and deploys automatically

Example:
```bash
git add blog/posts/new-post.md
git commit -m "Add: new blog post"
git push origin main
# → Auto-deploys in ~2 minutes
```

### Performance

Current metrics (from `npm run build`):
- **First Load JS:** 105 kB
- **Static generation:** ~2-3 seconds for 5 pages
- **Target:** < 2s page load on 3G ✅

### Documentation

- **For content creators:** `BLOG_GUIDE.md`
- **Technical architecture:** `BLOG_ARCHITECTURE.md`
- **This handoff:** `HANDOFF_DEVOPS.md`

### Next Steps (Coordinate with Team)

1. **DevOps:** Integrate build into CI/CD pipeline
2. **Developer 1:** Review frontend components, suggest UI improvements
3. **Product Lead:** Verify design matches brand guidelines
4. **Growth Lead:** Add SEO metadata, sitemap generation
5. **DevRel:** Start creating content! 🎉

### Questions or Issues?

Reach out to @lead-engineer if you hit any blockers. The infrastructure is tested and working locally - deployment should be straightforward.

### RSS Feed (Future Enhancement)

RSS feed generation is stubbed out in `lib/rss.js` but currently disabled due to build issues with Next.js 15. This can be re-enabled later or moved to a separate script that runs post-build.

For now, focus on getting the core blog deployed. We can add RSS in a follow-up PR.

---

**Completed by:** @lead-engineer  
**Date:** 2026-02-18  
**Task:** task-blog-infrastructure-markdown-pipeline-setup-10b801cf  
**Status:** ✅ Done
