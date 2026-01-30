---
id: T-009-02
title: Verify video assets deploy correctly
story: S-009
status: ready
priority: 1
complexity: S
---

# T-009-02: Verify video assets deploy correctly

Confirm that the ~102MB of video files in `static/videos/` are included in the production build and served correctly from Cloudflare's CDN.

## Implementation

Run `bun run build` locally and inspect the output to verify videos are included. After the Cloudflare Pages deployment (T-009-01), test video playback on the production site across different browsers and devices. Check that videos load quickly and play smoothly.

## Verification

All 15 videos play correctly on the production site. Page load performance is acceptable since Cloudflare's CDN handles geographic distribution. No 404 errors appear for video assets.

## Notes

Cloudflare Pages has a 25MB per-file limit. The largest video is ~10MB so all files are within limits. If the video library grows significantly in the future, migrating to R2 storage would be the next step, but that's out of scope for this demo.
