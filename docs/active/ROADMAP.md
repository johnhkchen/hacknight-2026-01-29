# Project Roadmap

> **Last Updated**: 2026-01-30

This document tracks project status and progress for TimeLens, a time-traveling tour app that uses WAN-generated video to show historical footage of San Francisco locations.

---

## Current Phase

**Phase: Deployment** - S-009 (Production Deployment)

All app features are complete. The demo runs locally via `bun dev` and includes 15 AI-generated historical videos covering five San Francisco spots across three eras each. The focus now shifts to getting the app deployed to production so it stays up beyond the hacknight event.

### Active Work

**S-009: Production Deployment with Video Hosting** - Status: Ready

This story deploys TimeLens to Cloudflare Pages for persistent hosting. The ~102MB of generated videos will be served from static hosting since all files are under Cloudflare's 25MB per-file limit.

**T-009-01: Configure Cloudflare Pages deployment** - Ready. Connect the GitHub repo to Cloudflare Pages and configure build settings.

**T-009-02: Verify video assets deploy correctly** - Ready (depends on T-009-01). Confirm videos are included in the build and play correctly on the production site.

**T-009-03: Document deployment setup and process** - Ready (depends on T-009-01). Add deployment documentation for future maintainers.

---

## Completed Milestones

- **M1: Concept Defined** - Complete. TimeLens specification establishes the vision, data model, and user experience.
- **M2: Foundation Ready** - Complete. Technical infrastructure in place with Spot Browser and Detail View working.
- **M3: MVP Complete** - Complete. Core user journey works end-to-end with AI-generated video content.

## Upcoming Milestones

- **M4: Production Deployed** - App is live and accessible without local dev server

---

## Quick Reference

**Check status**:
```bash
just dag-status
```

**Get next task**:
```bash
just prompt
```

---

## Archived Work

**Sprint 1** (S-002 through S-008) completed the full app experience including Spot Browser, Spot Detail View with accordion eras, WAN video generation pipeline, and responsive design system. All 21 tickets archived to `docs/archive/stories/sprint-1/` and `docs/archive/tickets/sprint-1/`.

**S-001** (Project Ideation & Specification) completed with specification document at `docs/specification.md`. Previous chassis preparation work archived under S-000 prefix in `docs/archive/`.
