---
id: T-003-02
title: Build PromptPlaceholder component
story: S-003
status: ready
priority: 2
complexity: S
dependencies: [T-003-01]
---

## Summary

Build the PromptPlaceholder component that displays a WAN prompt in the video area when no video is available. The placeholder should be visually attractive and clearly indicate that it represents a video-to-be-generated while still feeling like part of the polished app experience.

## Acceptance Criteria

A PromptPlaceholder component exists at `src/lib/components/PromptPlaceholder.svelte`. The component accepts a prompt string and era title as props. The placeholder fills the video container area with appropriate aspect ratio. A styled background with gradient or subtle pattern distinguishes it from a broken video. The prompt text displays in a readable font with appropriate sizing and padding. A small indicator like "Video preview" or a film icon signals that this is a placeholder. The era title appears prominently so users know which era they're viewing. The design looks intentional and polished, not like an error state.

## Implementation Notes

Use a dark gradient background to evoke a cinematic feel, perhaps dark blue to purple or sepia tones. Display the prompt in a slightly smaller, muted font that's readable but doesn't dominate. The era title should be large and centered or positioned prominently. Consider adding a subtle film grain overlay or scanlines CSS effect to reinforce the historical footage concept. Keep the component simple since it may be replaced by video soon.

## Files to Create

Create `src/lib/components/PromptPlaceholder.svelte` as the placeholder component.
