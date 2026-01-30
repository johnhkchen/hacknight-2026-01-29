---
id: T-004-02
title: Integrate placeholder fallback and era transitions
story: S-004
status: ready
priority: 2
complexity: M
dependencies: [T-004-01, T-003-02]
---

## Summary

Integrate the PromptPlaceholder component into EraVideoPlayer as a fallback for missing videos, and add smooth transitions when switching between eras. This completes the video player with graceful degradation and polished interactions.

## Acceptance Criteria

The EraVideoPlayer shows PromptPlaceholder when era.videoUrl is null or undefined. The EraVideoPlayer shows PromptPlaceholder when video loading fails with an error. Switching eras triggers a crossfade transition between content rather than a hard cut. The transition works correctly whether switching between two videos, two placeholders, or a mix. The component in SpotDetailView is replaced with EraVideoPlayer connected to selected era state. The full flow works: user views spot, sees video or placeholder, taps era in timeline, content transitions smoothly.

## Implementation Notes

Use Svelte's transition directive or CSS transitions for the crossfade effect. One approach is to use Svelte's crossfade transition from svelte/transition with keyed each blocks. Another approach is CSS opacity transitions triggered by a key change. When era changes, briefly show both old and new content during the transition. Pass the full Era object to EraVideoPlayer so it has access to both videoUrl and the prompt for fallback. Test the transition with placeholder-to-placeholder, video-to-video if test videos exist, and mixed scenarios.

## Files to Modify

Update `src/lib/components/EraVideoPlayer.svelte` to add placeholder fallback and transitions. Update `src/routes/spot/[id]/+page.svelte` to use EraVideoPlayer instead of placeholder div.
