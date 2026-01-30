---
id: S-004
title: Era Video Player Component
status: ready
priority: 2
dependencies: [S-002, S-003]
---

## Objective

Build the video player component that displays WAN-generated videos for each era, with graceful fallback to the prompt placeholder when videos aren't available. The player should loop seamlessly, handle loading states elegantly, and transition smoothly when the user switches eras.

## Context

The video player is the visual centerpiece of TimeLens. When videos are available, they create the "wow" moment of seeing a location transformed through time. The player must handle the reality that videos may not exist for all eras, since generation is async and may not complete during the hacknight. The fallback to prompt placeholder should feel intentional rather than broken.

## User Story

As a user viewing a spot, I want to see looping historical footage when available or an attractive placeholder when not, so that the experience feels polished regardless of video availability.

## Acceptance Criteria

The EraVideoPlayer component displays a looping video when a video URL exists for the selected era. Videos loop seamlessly without visible restart glitches. When no video URL exists, the component renders the PromptPlaceholder from S-003. A loading state appears while video is buffering with a subtle loading indicator. Switching eras triggers a smooth transition rather than a jarring cut. The video maintains aspect ratio and fills the container appropriately on mobile.

## Technical Notes

Use the HTML5 video element with loop and playsinline attributes for mobile compatibility. The playsinline attribute is essential for iOS to play video inline rather than fullscreen. Preload metadata to get dimensions before playback. Handle the loadeddata event to hide the loading state. Consider using a crossfade transition when switching between eras to avoid harsh cuts. The component receives the current era as a prop and reacts to changes.

## Loading States

Three states exist: loading shows a subtle spinner or shimmer over a blurred version of the previous frame, playing shows the video looping normally, and placeholder shows the PromptPlaceholder when no video URL exists. Transitions between states should be smooth with opacity fades.

## Mobile Considerations

Mobile video playback has quirks that the component must handle. Always include playsinline and muted attributes to enable autoplay on iOS. Use the webkit-playsinline attribute for older iOS versions. Consider adding controls as a fallback but hiding them by default for a cleaner look. Test that touch interactions don't accidentally pause the video.

## Tickets

This story breaks into two tickets. T-004-01 builds the core EraVideoPlayer component with video playback, looping, and loading states. T-004-02 integrates the PromptPlaceholder fallback, adds era-switch transitions, and handles the conditional rendering between video and placeholder states.
