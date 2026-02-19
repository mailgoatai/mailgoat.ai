# Hacker News Submission Draft (v1.2.0)

## Title
Show HN: mailgoat v1.2.0 - Open-source CLI for Postal email server workflows

## Post Body
Hi HN,

I’m sharing **mailgoat v1.2.0**, an open-source (MIT) CLI + admin toolkit for teams using Postal.

Motivation: Postal is great infrastructure, but common daily tasks (send testing, inbox troubleshooting, ops checks) often needed too much manual glue.

What v1.2.0 includes:
- improved CLI workflows for send/utilities
- admin panel for monitoring and inbox operations
- message-level inbox workflows for debugging
- better operational visibility

Quick start:

```bash
npm install -g mailgoat
mailgoat config init
mailgoat send --to user@example.com --subject "mailgoat v1.2.0" --body "Hello"
```

Then:

```bash
mailgoat admin serve
```

for the browser admin experience.

Feedback wanted on:
- missing workflows
- rough edges in CLI UX
- what should be prioritized for the next release

Thanks for checking it out.
