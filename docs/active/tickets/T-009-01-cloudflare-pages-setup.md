---
id: T-009-01
title: Configure Cloudflare Pages deployment
story: S-009
status: ready
priority: 1
complexity: S
---

# T-009-01: Configure Cloudflare Pages deployment

Connect the GitHub repository to Cloudflare Pages for automatic deployments. This establishes the production hosting infrastructure.

## Implementation

Go to the Cloudflare dashboard and create a new Pages project connected to the hacknight-2026-01-29 repo. Configure the build settings to use `bun run build` as the build command and `.svelte-kit/cloudflare` as the output directory (this is the default for adapter-cloudflare). Enable automatic deployments from the main branch.

## Verification

Push a commit to main and verify the build triggers automatically. Check that the deployed site loads at the assigned *.pages.dev URL and that all routes work correctly.

## Notes

The adapter-cloudflare is already configured in svelte.config.js so no code changes are needed. Cloudflare Pages free tier is sufficient for this demo.
