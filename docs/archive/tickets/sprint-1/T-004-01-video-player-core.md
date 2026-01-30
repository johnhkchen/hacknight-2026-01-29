---
id: T-004-01
title: Build EraVideoPlayer core with video playback
story: S-004
status: ready
priority: 2
complexity: M
dependencies: [T-002-02]
---

## Summary

Build the core EraVideoPlayer component that handles video playback with looping, loading states, and mobile-optimized settings. This component is the technical foundation for displaying WAN-generated historical footage.

## Acceptance Criteria

An EraVideoPlayer component exists at `src/lib/components/EraVideoPlayer.svelte`. The component accepts an Era object as a prop. When era.videoUrl exists, the component renders an HTML5 video element. The video loops seamlessly using the loop attribute. The video autoplays with muted audio using muted and autoplay attributes. Mobile-specific attributes playsinline and webkit-playsinline enable inline playback on iOS. A loading state shows while video is buffering, using the loadeddata or canplay event to detect readiness. The video maintains 16:9 aspect ratio and fills container width. Basic error handling exists for failed video loads.

## Implementation Notes

Use a Svelte reactive statement to detect when videoUrl changes and reset loading state. The loading indicator can be a simple centered spinner or pulsing overlay. Use CSS object-fit cover to fill the container while maintaining aspect ratio. Listen for the error event on the video element to handle load failures gracefully. For now, failed loads can show a simple error message, but T-004-02 will add proper fallback to the placeholder.

## Files to Create

Create `src/lib/components/EraVideoPlayer.svelte` as the video player component.
