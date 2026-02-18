# MailGoat Blog - Technical Architecture

## Overview

The MailGoat blog is built with **Next.js App Router** using **static site generation (SSG)**. All blog content is written in Markdown with frontmatter, processed at build time, and exported as static HTML for fast, reliable delivery.

## Technology Stack

### Core Framework
- **Next.js 14+** with App Router
- **React 18+** for UI components
- **Static Site Generation (SSG)** - No runtime server needed

### Markdown Processing
- **gray-matter** - Frontmatter parsing
- **remark** - Markdown to HTML conversion
- **remark-prism** - Syntax highlighting
- **reading-time** - Estimated read time calculation

### Performance
- Static HTML generation (no SSR overhead)
- Optimized images (lazy loading, proper sizing)
- CSS Modules for scoped, tree-shakeable styles
- Sub-2s page loads on 3G networks

## Directory Structure

```
mailgoat.ai/
├── app/
│   ├── layout.js              # Root layout (global styles, metadata)
│   ├── globals.css            # Global CSS variables and resets
│   └── blog/
│       ├── page.js            # Blog index (list of posts)
│       ├── blog.module.css    # Blog index styles
│       ├── [slug]/
│       │   ├── page.js        # Individual blog post
│       │   └── post.module.css # Blog post styles
│       ├── components/        # Reusable blog components
│       └── rss.xml/
│           └── route.js       # RSS feed generator
├── blog/
│   ├── posts/                 # Markdown files (one per post)
│   │   ├── hello-world.md
│   │   └── ...
│   └── assets/                # Images, videos, other media
│       └── ...
├── lib/
│   ├── markdown.js            # Markdown processing utilities
│   └── rss.js                 # RSS feed generation
├── public/
│   └── blog/                  # Static assets served at /blog/*
├── next.config.js             # Next.js configuration
├── package.json               # Dependencies and scripts
├── BLOG_GUIDE.md              # Content creator documentation
└── BLOG_ARCHITECTURE.md       # This file
```

## Build Process

### 1. Development Mode (`npm run dev`)

```
User runs: npm run dev
  ↓
Next.js dev server starts on :3000
  ↓
On page request:
  - Reads markdown files from blog/posts/
  - Processes frontmatter
  - Converts markdown → HTML
  - Injects into React components
  - Renders page with hot reload
```

### 2. Production Build (`npm run build`)

```
User runs: npm run build
  ↓
Next.js build process:
  1. Read all markdown files from blog/posts/
  2. Generate static params for [slug] routes
  3. Pre-render all blog pages as static HTML
  4. Generate RSS feed at /blog/rss.xml
  5. Output static files to out/ directory
     ├── blog/index.html
     ├── blog/hello-world/index.html
     ├── blog/rss.xml/index.html
     └── ...
  ↓
Deploy out/ directory to Cloudflare Pages
```

## Data Flow

### Blog Index Page (`/blog`)

```
Request: GET /blog
  ↓
getAllPosts() in lib/markdown.js:
  - Reads all .md files from blog/posts/
  - Parses frontmatter for each
  - Calculates reading time
  - Sorts by date (newest first)
  - Returns array of post metadata
  ↓
React component receives posts array
  ↓
Renders list with:
  - Title, excerpt, date
  - Author, reading time
  - Tags
  - Link to full post
  ↓
Static HTML returned (at build time)
```

### Individual Post Page (`/blog/[slug]`)

```
Request: GET /blog/hello-world
  ↓
getPostBySlug('hello-world') in lib/markdown.js:
  - Reads blog/posts/hello-world.md
  - Parses frontmatter
  - Converts markdown → HTML
  - Generates table of contents
  - Calculates reading time
  - Returns post object
  ↓
React component receives post data
  ↓
Renders:
  - Title, metadata
  - Table of contents (if H2/H3 present)
  - Full HTML content
  - Syntax-highlighted code blocks
  ↓
Static HTML returned (at build time)
```

### RSS Feed (`/blog/rss.xml`)

```
Request: GET /blog/rss.xml
  ↓
generateRssFeed() in lib/rss.js:
  - Calls getAllPosts()
  - Formats posts as RSS 2.0 XML
  - Includes title, link, date, excerpt, tags
  - Sets proper cache headers
  ↓
Returns XML document
```

## Markdown Processing Pipeline

```
Raw Markdown File (blog/posts/hello-world.md)
  ↓
gray-matter: Extract frontmatter
  - Separates YAML metadata from content
  - Returns { data: {...}, content: "..." }
  ↓
reading-time: Calculate read time
  - Counts words
  - Estimates minutes to read
  ↓
generateTableOfContents: Extract headings
  - Regex-based H2/H3 extraction
  - Generates anchor IDs
  - Returns array of {id, text, level}
  ↓
remark pipeline:
  - remark-prism: Syntax highlighting
  - remark-html: Markdown → HTML
  - Preserves HTML for dangerouslySetInnerHTML
  ↓
Final Post Object:
{
  slug: "hello-world",
  title: "Hello World",
  date: "2026-02-18",
  author: "MailGoat Team",
  excerpt: "Welcome to...",
  tags: ["announcement"],
  content: "<h2>What is...</h2><p>...",
  toc: [{id: "what-is-mailgoat", ...}],
  readingTime: "3 min read"
}
```

## CSS Architecture

### Global Styles (`app/globals.css`)
- CSS custom properties (variables) for theming
- Dark mode support via `prefers-color-scheme`
- Global resets and base styles

### Component Styles (CSS Modules)
- Scoped to individual components
- `blog.module.css` for blog index
- `post.module.css` for individual posts
- Automatic class name hashing (no conflicts)

### Design System Variables

```css
:root {
  --bg: #ffffff;           /* Background */
  --text: #1a1a1a;        /* Main text */
  --text-dim: #6b7280;    /* Secondary text */
  --accent: #4f9fff;      /* Links, highlights */
  --surface: #f3f4f6;     /* Cards, code blocks */
  --border: #e5e7eb;      /* Dividers */
}

@media (prefers-color-scheme: dark) {
  /* Automatic dark mode */
}
```

## Performance Optimizations

### 1. Static Generation
- All pages pre-rendered at build time
- No server-side processing on request
- Instant page loads from CDN

### 2. Code Splitting
- React components loaded on demand
- CSS modules scoped per page
- Minimal JavaScript payload

### 3. Asset Optimization
- Images lazy-loaded by default
- Modern image formats (WebP) when supported
- Proper image sizing and compression

### 4. Caching Strategy
- Static HTML: Cache forever (immutable)
- RSS feed: 1 hour cache (fresh content)
- Assets: Long-term cache with content hashing

## Deployment Pipeline

```
Developer pushes to GitHub
  ↓
GitHub Actions triggered (.github/workflows/deploy.yml)
  ↓
Workflow steps:
  1. Checkout code
  2. Setup Node.js
  3. Install dependencies (npm ci)
  4. Build blog (npm run build)
  5. Deploy to Cloudflare Pages
  ↓
Cloudflare Pages:
  - Serves from edge network
  - Automatic HTTPS
  - Global CDN distribution
  ↓
Blog live at https://mailgoat.ai/blog
```

## SEO Features

### Metadata
- Dynamic `<title>` and `<meta description>` per post
- Open Graph tags (future: add in layout)
- Canonical URLs

### Sitemap
- Auto-generated from post slugs
- Submitted to search engines
- Updated on each build

### RSS Feed
- Standard RSS 2.0 format
- Full content in feed items
- Category tags for filtering

### Semantic HTML
- Proper heading hierarchy (`h1` → `h2` → `h3`)
- `<article>`, `<time>`, `<nav>` elements
- ARIA landmarks (implicit)

## Extensibility

### Adding New Features

**Custom Components:**
Create in `app/blog/components/` and import:
```javascript
import CustomComponent from '../components/CustomComponent';
```

**Custom Markdown Processors:**
Add to `lib/markdown.js` remark pipeline:
```javascript
.use(remarkPlugin)
```

**New Routes:**
Add to `app/blog/` following Next.js conventions.

### Future Enhancements

- [ ] Search functionality (client-side with Fuse.js)
- [ ] Tag-based filtering pages
- [ ] Related posts suggestions
- [ ] Comment system integration
- [ ] Newsletter signup form
- [ ] Analytics integration
- [ ] Social sharing buttons

## Maintenance

### Updating Dependencies

```bash
npm update           # Update all dependencies
npm audit fix        # Fix security vulnerabilities
```

### Adding New Posts

Just add `.md` files to `blog/posts/` - no code changes needed!

### Troubleshooting Build Issues

1. Check Node.js version (v18+ recommended)
2. Clear Next.js cache: `rm -rf .next`
3. Reinstall dependencies: `rm -rf node_modules && npm install`
4. Check for markdown syntax errors in posts

## Questions?

For technical questions about the blog architecture, open an issue on GitHub or contact the Lead Engineer.
