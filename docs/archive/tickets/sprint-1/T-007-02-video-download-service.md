---
id: T-007-02
title: Build video download and local storage service
story: S-007
status: ready
priority: 1
complexity: M
dependencies: [T-007-01]
---

## Summary

Create a service that downloads videos from DashScope's temporary URLs and persists them to the local filesystem at `static/videos/`. This is critical because DashScope URLs expire after 24 hours, so videos must be downloaded immediately after generation completes.

## Acceptance Criteria

A `downloadVideo` function fetches a video from a URL and saves it to a specified local path. A `generateAndStoreVideo` function orchestrates the full flow by building the enhanced prompt, calling WanxClient, downloading the result, and saving to `static/videos/`. Videos are saved with predictable filenames following the pattern `{spotId}-{eraId}.mp4`. The service handles errors gracefully including network failures, write errors, and API failures. Progress callbacks allow the caller to track generation status. The `static/videos/` directory is created if it doesn't exist.

## Implementation Notes

Create `src/lib/wanx/video-storage.ts` for the storage service. Use Node.js `fs` and `path` modules for file operations since this runs server-side. The download function should stream the response to disk rather than loading the entire video into memory, which is important for larger files.

The generateAndStoreVideo function should accept a Spot, Era, and optional progress callback. It builds the enhanced prompt using T-007-01's builder, creates a WanxClient instance using the DASHSCOPE_API_KEY environment variable, calls generateVideoFromText with the enhanced prompt, downloads the video using fetch with streaming, writes to `static/videos/{spotId}-{eraId}.mp4`, and returns the local path on success.

For error handling, wrap the entire flow in try/catch and return a result object with success boolean, localPath on success, and error message on failure. Consider implementing a retry mechanism for transient network failures.

## Files to Create

Create `src/lib/wanx/video-storage.ts` with downloadVideo and generateAndStoreVideo functions.
