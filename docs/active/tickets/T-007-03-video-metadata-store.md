---
id: T-007-03
title: Implement JSON-based video metadata tracking
story: S-007
status: ready
priority: 1
complexity: S
dependencies: [T-007-02]
---

## Summary

Create a simple JSON-based metadata store that tracks which videos have been generated, their local file paths, generation status, and timestamps. This allows the app to know which era videos are available without scanning the filesystem and provides a record of generation history.

## Acceptance Criteria

A metadata store module exists that reads and writes `src/lib/data/generated-videos.json`. Each entry tracks spotId, eraId, prompt used, localPath, status as pending, generating, ready, or failed, createdAt timestamp, completedAt timestamp, and optional error message. Functions exist to get all entries, get entry by spotId and eraId, add or update an entry, and mark an entry as failed with error. The store handles the case where the JSON file doesn't exist by creating it with an empty array. File writes are atomic to prevent corruption from concurrent access.

## Implementation Notes

Create `src/lib/wanx/video-metadata.ts` for the metadata store. Define a TypeScript interface for the metadata entry that matches the GalleryEntry pattern from the research doc but simplified for our needs.

The store should read the JSON file synchronously at module load time for simplicity, or lazily on first access. Write operations should use a write-then-rename pattern for atomicity: write to a temp file, then rename to the target path.

Provide these functions: `getAllVideoMetadata()` returns all entries, `getVideoMetadata(spotId, eraId)` returns a single entry or undefined, `setVideoMetadata(entry)` adds or updates an entry matching on spotId and eraId, and `markVideoFailed(spotId, eraId, error)` updates status to failed with the error message.

The generateAndStoreVideo function from T-007-02 should call setVideoMetadata at each stage: once with status "generating" when starting, once with status "ready" and localPath when complete, or once with status "failed" and error on failure.

## Files to Create

Create `src/lib/wanx/video-metadata.ts` with the metadata store interface and functions. Create the initial `src/lib/data/generated-videos.json` as an empty array.
