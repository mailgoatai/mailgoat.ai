# Reddit Launch Posts (v1.0.0)

## r/selfhosted

**Title:** mailgoat v1.0.0: open-source CLI + admin panel for Postal workflows

**Body:**
Hi folks, we just released **mailgoat v1.0.0**.

mailgoat is an MIT-licensed tool focused on improving day-to-day workflows for teams running Postal.

What it includes:
- CLI for sending email and utility workflows
- Admin panel for monitoring and inbox operations
- Inbox/message detail views for debugging
- Analytics/dashboard surfaces for operational visibility

Quick start:

```bash
npm install -g mailgoat
mailgoat config init
mailgoat send --to user@example.com --subject "Hello" --body "mailgoat v1.0.0"
```

You can also run:

```bash
mailgoat admin serve
```

to use the admin panel.

If you run Postal in self-hosted environments, I’d love feedback on usability, missing workflows, and integration pain points.

## r/opensource

**Title:** Introducing mailgoat v1.0.0 (MIT): Postal-focused CLI + admin toolkit

**Body:**
We’ve launched **mailgoat v1.0.0**, an open-source (MIT) project built to improve Postal developer/operator experience.

The goal: reduce friction for common workflows like sending test email, inspecting inboxes, and monitoring system behavior.

Highlights in v1.0.0:
- CLI-based send and utility commands
- Admin panel for monitoring and inbox management
- Message detail views and operational dashboard support
- Documentation for quick start, API usage, and troubleshooting

If this sounds useful, please try it and share issues/feature requests. We’re actively shaping the roadmap from user feedback.
