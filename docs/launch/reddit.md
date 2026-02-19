# Reddit Launch Posts (v1.2.0)

## r/selfhosted

**Title:** mailgoat v1.2.0: open-source CLI + admin toolkit for Postal workflows

**Body:**
Hi folks, we just released **mailgoat v1.2.0**.

mailgoat is an MIT-licensed tool focused on practical workflows for teams running Postal.

What’s useful in v1.2.0:
- CLI for send/testing and utility workflows
- Admin panel for monitoring and inbox operations
- Inbox/message detail flows for troubleshooting
- Better operational dashboard visibility

Quick start:

```bash
npm install -g mailgoat
mailgoat config init
mailgoat send --to user@example.com --subject "mailgoat v1.2.0" --body "Hello"
```

Admin panel:

```bash
mailgoat admin serve
```

If you’re self-hosting Postal, I’d appreciate feedback on missing workflows and rough edges.

## r/opensource

**Title:** Introducing mailgoat v1.2.0 (MIT): Postal-focused CLI + admin toolkit

**Body:**
We’ve launched **mailgoat v1.2.0**, an MIT-licensed open-source project to improve Postal developer/operator workflows.

Goal: reduce friction for common tasks like send testing, inbox debugging, and operational monitoring.

v1.2.0 highlights:
- improved CLI workflows
- admin panel and inbox workflow improvements
- better operational visibility
- practical docs and examples

If this is relevant to your stack, I’d love your feedback and issue reports.

## r/node

**Title:** mailgoat v1.2.0: open-source Node.js/TypeScript CLI + admin tooling for Postal

**Body:**
Shipped **mailgoat v1.2.0** for teams running Postal and wanting smoother Node.js/TypeScript workflows.

What it gives you:
- CLI-first send/testing workflows
- admin panel for monitoring/inbox operations
- easier email troubleshooting with message-level visibility

Install:

```bash
npm install -g mailgoat
```

Would love feedback from Node users on DX, command ergonomics, and integration gaps.
