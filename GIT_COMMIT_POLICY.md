# Git Commit Policy - MANDATORY

**Effective: 2026-02-18**

## Core Rule

**Tasks are NOT complete unless code is committed and pushed to main.**

## Why This Matters

We're moving fast. The CEO is seeing tasks marked "done" but no commits in the repository. This creates:
- ❌ Lost work (not in version control)
- ❌ Blocked teammates (can't see/use your work)
- ❌ False progress reports
- ❌ Deployment delays

## The Process

Every development task requires these steps:

1. ✅ **Write the code/docs**
2. ✅ **Commit to main**
3. ✅ **Push to GitHub**

## How to Commit

```bash
# Stage your changes
git add .

# Commit with descriptive message
git commit -m "feat: add blog markdown pipeline"

# Push to main immediately
git push origin main
```

## Commit Message Format

Use conventional commits:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation only
- `refactor:` - Code restructuring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add syntax highlighting to blog posts
fix: resolve build pipeline dependency issues
docs: add deployment guide for DevOps
refactor: improve error handling in email module
```

## No Feature Branches

**Push directly to main.** We're prioritizing:
- ✅ Speed over process
- ✅ Fast iteration over perfect code
- ✅ Shipping over planning

## What to Commit

**Everything:**
- Source code
- Tests
- Documentation (README, guides, ADRs)
- Configuration files
- Build scripts
- Infrastructure code
- Test results (when appropriate)

## When to Commit

**Immediately after completing work:**
- Finished a feature? Commit.
- Fixed a bug? Commit.
- Wrote documentation? Commit.
- Completed a task? Commit.

**Don't wait for:**
- ❌ Perfect code (iterate in main)
- ❌ Complete feature set (ship incrementally)
- ❌ Team review (review can happen post-commit if needed)
- ❌ More testing (basic tests OK, perfect tests come later)

## Task Completion Criteria

Before marking a task "done":

1. [ ] Code/docs written
2. [ ] Local testing passed (basic validation)
3. [ ] **Committed to git**
4. [ ] **Pushed to main**
5. [ ] Worklog updated with commit SHA or "committed"

**If it's not in git, it's not done.**

## For All Team Members

### Developers
- Every code change = commit
- Every doc update = commit
- Architecture reviews = commit docs

### DevOps
- Infrastructure code = commit
- Config changes = commit
- Deployment scripts = commit
- CI/CD workflows = commit

### QA
- Test plans = commit (as markdown)
- Test results = commit (as reports)
- Bug reports = commit (in issues or docs)

### Product/Design
- Design docs = commit
- Specs = commit
- User guides = commit

### DevRel/Content
- Blog posts = commit
- Documentation = commit
- Tutorials = commit

## Examples

### ✅ CORRECT
```
Developer: "Architecture review complete"
Lead: "Where's the commit?"
Developer: *pushes commits with ADRs and improvement docs*
Lead: "Perfect, task actually done now"
```

### ❌ WRONG
```
Developer: "Architecture review complete"
Lead: "Where's the commit?"
Developer: "Oh, it's in my local workspace"
Lead: "Not done. Commit it."
```

## FAQ

**Q: What if my code isn't perfect?**
A: Commit it anyway. We iterate in main. Ship and improve.

**Q: What if I break something?**
A: Fix forward. Commit the fix. We move fast.

**Q: Should I wait for code review?**
A: No. Commit first, review can happen after (if at all).

**Q: What about work in progress?**
A: Commit it. Use WIP commits if needed: `git commit -m "WIP: partial blog pipeline"`

**Q: What if I'm not done with the whole feature?**
A: Commit what you have. Incremental progress in git > perfect feature in your head.

## Violations

If you mark tasks "done" without commits:
1. ⚠️ Task will be marked incomplete
2. ⚠️ You'll be asked to commit immediately
3. ⚠️ Repeated violations = escalation

## Bottom Line

**Commit everything. Push to main. Fast.**

If it's not in git, it didn't happen.
