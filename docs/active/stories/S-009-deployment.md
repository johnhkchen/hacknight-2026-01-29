---
id: S-009
title: Production Deployment with Video Hosting
status: ready
priority: 1
---

# S-009: Production Deployment with Video Hosting

This story deploys TimeLens to production so the demo can run persistently without a local dev server. The app needs to be accessible via a public URL, and the ~102MB of WAN-generated videos need a hosting strategy that serves them reliably.

## Context

The hacknight demo has been running locally via `bun dev`, which means it goes down when the laptop closes. All features are complete and the app is ready for production. The project already uses `@sveltejs/adapter-cloudflare` so Cloudflare Pages is the natural deployment target.

## Video Hosting Strategy

The 15 generated videos total ~102MB which is reasonable to serve from static hosting. Cloudflare Pages has a 25MB per-file limit but no file exceeds that, so the videos can be included in the static build. For larger video libraries in the future, R2 (Cloudflare's S3-compatible storage) would be the upgrade path, but for this demo the static approach is simplest.

## Acceptance Criteria

The app deploys to Cloudflare Pages at a public URL and loads correctly with all videos playing. The deployment process is documented so future deploys are straightforward. The site remains accessible even when local development machines are off.

## Technical Approach

First connect the GitHub repo to Cloudflare Pages which will enable automatic deploys on push to main. Then verify the build works with `bun run build` and that static assets including videos are included. Finally document the deployment setup and any environment configuration needed.
