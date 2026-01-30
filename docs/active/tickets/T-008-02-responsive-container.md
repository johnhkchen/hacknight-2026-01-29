---
id: T-008-02
title: Implement responsive container system with desktop centering
story: S-008
status: ready
priority: 1
complexity: M
dependencies: [T-008-01]
---

## Summary

Create a responsive container system that makes the app look native on mobile while gracefully presenting a centered "phone preview" on desktop. This solves the current issue where the app looks awkward on larger screens.

## Acceptance Criteria

A container component or CSS class wraps the main app content. On mobile viewports under 480px, content spans full width with 16px side padding. On tablet viewports between 480px and 768px, content has increased side padding or slight max-width constraint. On desktop viewports over 768px, content centers in a max-width container around 420px that simulates phone dimensions. The desktop view has a subtle visual frame like a light shadow or border to distinguish the app from the background. The background outside the container on desktop uses a neutral gray or subtle pattern. The container handles both the main content area and the bottom nav appropriately.

## Implementation Notes

Create a `.app-container` class in the theme file or a separate `src/lib/styles/layout.css` file. Use CSS media queries with mobile-first breakpoints. The container should use `max-width: 100%` by default, then `max-width: 420px` and `margin: 0 auto` above 768px. Add `box-shadow: 0 0 40px rgba(0,0,0,0.1)` on desktop to create depth. Set a `--container-padding` variable that changes at breakpoints.

For the outer background on desktop, apply a light gray like `#E8E4E0` to the html or body element, while the `.app-container` keeps the cream background. This creates the "phone in a frame" effect.

Consider using CSS `min-height: 100vh` or `100dvh` for the container to ensure it fills the viewport on mobile. The bottom nav should stick to the bottom of this container, not the viewport, on desktop.

## Files to Create or Modify

Add responsive container styles to `src/lib/styles/theme.css` or create `src/lib/styles/layout.css`. Update `src/routes/+layout.svelte` to wrap content in the container.
