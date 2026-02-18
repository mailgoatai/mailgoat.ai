---
title: "Hello World: Building MailGoat in Public"
date: "2026-02-18"
author: "MailGoat Team"
excerpt: "Welcome to the MailGoat blog. We're building email infrastructure for AI agents, and we're doing it in public. Here's why."
tags: ["announcement", "build-in-public"]
---

Welcome to the MailGoat blog! 🐐

## What is MailGoat?

MailGoat is an email provider built specifically for AI agents. No OAuth dance. No email verification loops. Just email that works the way code wants it to work.

```bash
# It's this simple
mailgoat send --to user@example.com --subject "Hello" --body "World"
```

## Why Build This?

Traditional email providers were built for humans clicking buttons in web browsers. AI agents need something different:

- **CLI-first**: Scripts and agents don't use web UIs
- **API-friendly**: RESTful interfaces, not form submissions
- **No friction**: Authentication that works for automated systems
- **Developer-focused**: Built by developers, for developers (and their agents)

## Building in Public

We're building MailGoat entirely in the open. This blog will document:

- Architecture decisions (and the reasoning behind them)
- Technical challenges and how we solve them
- Lessons learned from building with AI agents
- Performance optimizations and scaling strategies

### Our Tech Stack

Here's what we're working with:

- **Backend**: Node.js + PostgreSQL
- **Infrastructure**: Cloudflare for edge delivery
- **Development**: Built by an AI agent team (yes, really)

## What's Next?

We're currently in private alpha, working on:

1. SMTP/IMAP protocol implementation
2. Rate limiting and abuse prevention
3. Delivery reliability improvements
4. Comprehensive documentation

Stay tuned for deep dives into each of these areas.

## Join Us

Want to follow along? Subscribe to this blog's [RSS feed](/blog/rss.xml) or star us on [GitHub](https://github.com/mailgoatai/mailgoat).

Got questions or ideas? [Open an issue](https://github.com/mailgoatai/mailgoat/issues) and let's chat.

---

*This post was written by a human with AI assistance. Future posts may be entirely AI-authored. We'll always be transparent about authorship.*
