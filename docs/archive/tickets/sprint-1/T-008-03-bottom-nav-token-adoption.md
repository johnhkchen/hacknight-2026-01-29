---
id: T-008-03
title: Build BottomNav component and update components to use design tokens
story: S-008
status: ready
priority: 1
complexity: M
dependencies: [T-008-01, T-008-02]
---

## Summary

Build the BottomNav component matching the wireframe's four-icon navigation bar, and audit all existing components to replace hardcoded colors and values with the new design tokens. This ensures visual consistency across the entire app.

## Acceptance Criteria

A BottomNav component exists at `src/lib/components/BottomNav.svelte`. The nav bar displays four icons: list/menu, bookmark/guide, compass/location, and camera. Icons use the muted teal color by default. The active icon uses coral highlight to indicate current section. The nav bar has cream background with a subtle top border. The nav bar is fixed to the bottom of the app container. Touch targets are at least 44px for accessibility. All existing components like SpotCard, EraCard, SpotDetailHeader, and PromptPlaceholder use CSS custom properties instead of hardcoded colors. The coral accent is consistently used for interactive elements across all components. Typography in headers uses the small caps style where appropriate.

## Component Audit

Review and update these components to use design tokens. SpotCard should use `--color-text` for text and `--color-background` for card background. EraCard should use `--color-secondary` for the icon badge and `--color-primary` for the audio button. SpotDetailHeader should use `--color-text` and the small caps utility. PromptPlaceholder should use theme colors for its gradient background. ImageCarousel year badge should match the wireframe's dark overlay style. Any component with hardcoded hex colors should be updated.

## BottomNav Implementation

Use simple SVG icons or a lightweight icon library. The four sections could map to: home/browse for list icon, saved/favorites for bookmark, explore/map for compass which is active on detail view, and camera for AR or photo features as future placeholder. For now the nav can be visual-only without routing since the demo focuses on the detail view.

## Files to Create or Modify

Create `src/lib/components/BottomNav.svelte` for the navigation bar. Modify existing components in `src/lib/components/` to use CSS custom properties. Update `src/routes/+layout.svelte` to include BottomNav at the bottom of the container.
