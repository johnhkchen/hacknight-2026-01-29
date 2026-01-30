---
id: S-007
title: WAN Video Generation & Local Storage
status: ready
priority: 1
dependencies: [S-002]
---

## Objective

Build the end-to-end pipeline that generates "time-warped" videos from spot and era data using Alibaba's WAN text-to-video API, downloads them before the 24-hour URL expiration, and stores them locally for persistent gallery display. This story transforms the static prompt placeholders into actual AI-generated historical footage.

## Context

The existing WanxClient in `src/lib/wanx/client.ts` provides a typed interface for the DashScope API, handling task submission, polling, and completion. Each spot in `src/lib/data/spots.json` already has detailed WAN prompts for each era. The challenge is orchestrating the full flow from prompt to persistent video file, since DashScope returns temporary URLs that expire in 24 hours.

For a hackathon localhost demo, videos should download to `static/videos/` so SvelteKit serves them directly without additional infrastructure. A JSON metadata file tracks which videos have been generated, their local paths, and generation status.

## User Story

As a developer preparing the TimeLens demo, I want to generate and store videos for each spot/era combination so that users see actual AI-generated historical footage instead of prompt placeholders.

## Acceptance Criteria

A prompt builder takes spot attributes like name, location, and geographic features along with era attributes like time period, visual style, and film grain characteristics, and combines them with the existing wanPrompt to produce optimized WAN prompts. A generation service orchestrates the full workflow by submitting prompts to WAN, polling for completion, downloading finished videos, and saving them to `static/videos/` with predictable filenames like `fishermans-wharf-gold-rush.mp4`. A metadata file at `src/lib/data/generated-videos.json` tracks spotId, eraId, prompt used, local file path, generation status, and timestamps. A gallery component displays generated videos with spot and era metadata using native HTML5 video elements.

## Technical Approach

The prompt builder enhances existing wanPrompt strings with era-specific visual modifiers. Each era could have associated style tokens like "vintage film grain, sepia tones, daguerreotype aesthetic" for Gold Rush or "grainy 1970s documentary footage, desaturated colors" for later eras. The builder concatenates these with the base prompt.

The generation service extends WanxClient with a method that accepts a Spot and Era, builds the enhanced prompt, calls `generateVideoFromText`, downloads the resulting video using fetch, writes it to `static/videos/{spotId}-{eraId}.mp4`, and updates the metadata JSON. Error handling covers API failures, download timeouts, and write errors.

The metadata store is a simple JSON file that gets read at startup and written after each successful generation. Each entry includes the spotId, eraId, prompt, localPath, status of pending, generating, ready, or failed, createdAt timestamp, and optional error message.

The gallery component reads the metadata file, filters for ready videos, and renders a responsive grid of video cards. Each card shows the video in a native HTML5 element with the spot name and era title overlaid. Lazy loading ensures videos only load when scrolled into view.

## Tickets

This story has four tickets. T-007-01 creates the prompt enhancement system that combines spot/era attributes with visual style modifiers. T-007-02 builds the video download and local storage service that fetches from expiring URLs and persists to static/videos. T-007-03 implements the JSON-based metadata tracking for generation status and file paths. T-007-04 builds the gallery display component with video cards and responsive grid layout.
