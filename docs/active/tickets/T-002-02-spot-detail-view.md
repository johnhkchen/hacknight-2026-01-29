---
id: T-002-02
title: Build SpotDetailView component with header and layout
story: S-002
status: ready
priority: 1
complexity: M
dependencies: [T-002-01]
---

## Summary

Build the main SpotDetailView Svelte component that displays a spot with its eras. The component handles routing, loads spot data, manages selected era state, and renders the overall layout structure including header, carousel area, and timeline area.

## Acceptance Criteria

A SpotDetailView component exists at `src/routes/spot/[id]/+page.svelte`. The component receives spot ID from the route parameter and loads the corresponding spot. A header bar displays a back button (left arrow) and the spot name in a distinctive format. The layout provides slots or areas for the ImageCarousel component at the top, the EraTimeline component below, and the expanded era content. State tracks which era is currently expanded, defaulting to the first era. Selecting a new era from the timeline updates the carousel position and expands that era's card. The view is mobile-optimized with appropriate sizing and spacing. The color palette follows the design spec with warm coral accents, cream backgrounds, and dark brown text.

## Implementation Notes

Use SvelteKit's load function to get the spot ID from params. Use the getSpotById helper from T-002-01 to fetch spot data. Implement the header as a fixed or sticky element with back navigation using goto or history.back. The back button should use a left-arrow icon. Style the spot name with small caps or letterspacing for a distinguished look.

Create CSS custom properties for the design system colors so child components can use them. The primary accent should be a coral/salmon color around hsl(10, 70%, 65%), with muted teal for icons around hsl(170, 25%, 45%), cream background around hsl(35, 40%, 95%), and dark brown text around hsl(20, 30%, 20%).

For MVP, the ImageCarousel and EraTimeline components can be stubbed with placeholder divs until T-002-03 and T-002-04 are complete.

## Files to Create

Create `src/routes/spot/[id]/+page.svelte` as the main view. Create `src/routes/spot/[id]/+page.ts` for the load function. Consider creating `src/lib/styles/design-tokens.css` for shared color and typography values.
