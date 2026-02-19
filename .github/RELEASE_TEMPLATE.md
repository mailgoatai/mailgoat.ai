# mailgoat v1.0.0

## Highlights

mailgoat v1.0.0 is the first stable release of our Postal-focused CLI and admin toolkit.

- CLI workflows for sending and utility operations
- Admin panel with inbox visibility and management workflows
- Inbox/message detail experience for faster debugging
- Dashboard and operational status surfaces
- MIT open-source licensing

## Why This Release Matters

Postal is strong infrastructure, but common operator/developer tasks still needed better UX. v1.0.0 provides a practical layer to speed up send, monitor, and troubleshooting workflows.

## Quick Start

```bash
npm install -g mailgoat
mailgoat config init
mailgoat send --to user@example.com --subject "Hello" --body "mailgoat v1.0.0"
```

## Documentation

- Quick start: `docs/CLI_QUICK_START.md`
- API docs: `docs/API.md`
- Troubleshooting: `docs/troubleshooting.md`
- Local dev setup: `docs/local-development.md`

## Known Notes

- Some runtime validation paths require a Docker/PostaI-accessible environment.
- Check troubleshooting docs for environment-specific setup issues.

## Feedback

Please open issues with repro steps, expected behavior, and environment details.
