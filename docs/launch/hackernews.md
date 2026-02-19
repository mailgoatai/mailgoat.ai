# Hacker News Submission Draft

## Title
Show HN: mailgoat v1.0.0 – CLI + admin panel for Postal email workflows

## Post Body
Hi HN,

I’m launching **mailgoat v1.0.0**, an open-source (MIT) CLI and admin toolkit built for teams using Postal.

The motivation was simple: Postal is strong infrastructure, but common daily workflows (send/testing, inbox debugging, lightweight ops monitoring) still required too much manual glue.

mailgoat v1.0.0 includes:
- CLI for sending email and utility commands
- Admin panel for status and inbox workflows
- Inbox/message detail views for troubleshooting
- Dashboard surfaces for operational visibility

Quick start:

```bash
npm install -g mailgoat
mailgoat config init
mailgoat send --to user@example.com --subject "Hello" --body "mailgoat v1.0.0"
```

Then:

```bash
mailgoat admin serve
```

for the browser admin panel.

I’d really appreciate feedback on:
- missing workflows
- rough edges in CLI UX
- what’s most important for v1.1

Thanks for taking a look.
