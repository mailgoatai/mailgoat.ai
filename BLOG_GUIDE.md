# MailGoat Blog - Publishing Guide

## Quick Start

To publish a new blog post:

1. Create a markdown file in `blog/posts/`
2. Add frontmatter (see template below)
3. Write your content in markdown
4. Commit and push - the blog rebuilds automatically!

## Post Template

Create a new file: `blog/posts/my-post-slug.md`

```markdown
---
title: "Your Post Title"
date: "2026-02-18"
author: "Your Name"
excerpt: "A brief summary that appears in the blog index and RSS feed"
tags: ["tag1", "tag2", "tag3"]
---

Your content starts here...

## First Heading

Write in standard markdown...
```

## Frontmatter Fields

All fields in the frontmatter (between `---` markers):

- **title** (required): Post title shown at the top
- **date** (required): Publication date in `YYYY-MM-DD` format
- **author** (optional): Author name
- **excerpt** (optional): Short description for previews and SEO
- **tags** (optional): Array of tags for categorization

## Markdown Features

### Headings

```markdown
## Main Section (H2)
### Subsection (H3)
```

H2 and H3 headings automatically generate a table of contents.

### Code Blocks

Use triple backticks with language for syntax highlighting:

```markdown
```javascript
const example = "Hello World";
console.log(example);
```
```

Supported languages: javascript, typescript, python, bash, json, yaml, html, css, and more.

### Images

Place images in `blog/assets/` and reference them:

```markdown
![Alt text](/blog/assets/my-image.png)
```

Images are automatically optimized for web delivery.

### Links

```markdown
[Link text](https://example.com)
[Internal link](/blog/another-post)
```

### Lists

```markdown
- Unordered item
- Another item

1. Ordered item
2. Another ordered item
```

### Blockquotes

```markdown
> This is a quote
> It can span multiple lines
```

### Tables

```markdown
| Column 1 | Column 2 |
|----------|----------|
| Data     | Data     |
```

## File Naming

Post slugs (URLs) are derived from filenames:

- `hello-world.md` → `/blog/hello-world`
- `my-first-post.md` → `/blog/my-first-post`

**Best practices:**
- Use lowercase
- Use hyphens (not underscores or spaces)
- Keep it concise
- Make it descriptive

## Local Development

### Preview Your Post Locally

```bash
# Install dependencies (first time only)
npm install

# Start dev server
npm run dev
```

Visit `http://localhost:3000/blog` to see your posts.

### Build for Production

```bash
npm run build
```

This generates static HTML in the `out/` directory.

## Deployment

The blog is automatically deployed when changes are pushed to the main branch:

1. Commit your new post: `git add blog/posts/my-post.md`
2. Push: `git push origin main`
3. GitHub Actions builds and deploys to Cloudflare Pages
4. Your post is live at `https://mailgoat.ai/blog/your-slug`

## RSS Feed

The blog automatically generates an RSS feed at:
`https://mailgoat.ai/blog/rss.xml`

This updates automatically when new posts are published.

## SEO & Performance

The blog is optimized for:

- **Fast loading**: Static generation, no runtime processing
- **SEO-friendly**: Proper meta tags, semantic HTML, sitemap
- **Mobile-responsive**: Works on all screen sizes
- **Accessibility**: Semantic markup, proper heading hierarchy

## Markdown Tips

### Reading Time

Reading time is calculated automatically from your content length.

### Table of Contents

Any H2 (`##`) or H3 (`###`) headings automatically appear in the table of contents at the top of your post.

### Code Highlighting

Syntax highlighting works automatically for code blocks. Just specify the language:

- `bash` for shell commands
- `javascript` or `js` for JavaScript
- `python` for Python
- `json` for JSON
- `yaml` for YAML configs

## Troubleshooting

### Post not showing up?

1. Check frontmatter is valid YAML between `---` markers
2. Ensure `date` field is in `YYYY-MM-DD` format
3. Make sure file has `.md` extension
4. Verify file is in `blog/posts/` directory

### Build failing?

1. Check for syntax errors in markdown
2. Verify all frontmatter fields are properly formatted
3. Check the GitHub Actions logs for specific errors

### Images not loading?

1. Ensure images are in `blog/assets/`
2. Use absolute paths: `/blog/assets/image.png`
3. Check image file extensions (`.png`, `.jpg`, `.gif`, `.webp`)

## Questions?

Open an issue on GitHub or reach out to the team!
