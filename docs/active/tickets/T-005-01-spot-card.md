---
id: T-005-01
title: Build SpotCard component
story: S-005
status: ready
priority: 1
complexity: S
dependencies: [T-002-01]
---

## Summary

Build the SpotCard component that displays a single spot as a tappable card with its image, name, description snippet, and era count. This component is used in the Spot Browser grid.

## Acceptance Criteria

A SpotCard component exists at `src/lib/components/SpotCard.svelte`. The component accepts a Spot object as a prop. The card displays the spot's image as a background or prominent visual. The spot name appears prominently, readable against the image. A badge or label shows the number of eras like "3 eras". The card has a tappable area that dispatches a click event or uses an anchor tag. Visual feedback on hover or tap indicates interactivity. The card maintains consistent aspect ratio across different image sizes.

## Implementation Notes

Use CSS to overlay text on the image with a gradient scrim for readability. The era count can be calculated from `spot.eras.length`. Consider using a link wrapper with SvelteKit's `href="/spot/{spot.id}"` for navigation. Card aspect ratio of 3:2 or 16:9 works well for landscape photos. Add a subtle shadow or border to define card boundaries.

## Files to Create

Create `src/lib/components/SpotCard.svelte` as the card component.
