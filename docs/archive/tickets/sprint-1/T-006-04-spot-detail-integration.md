---
id: T-006-04
title: Integrate Spot Detail View with new components and design tokens
story: S-006
status: ready
priority: 1
complexity: M
dependencies: [T-006-01, T-006-03, T-002-04]
---

## Summary

Update the SpotDetailView page to integrate all new components with the accordion-based layout and apply the design token system. This brings together the header, image carousel, and era accordion into a cohesive museum-exhibit experience.

## Acceptance Criteria

The SpotDetailView at `/spot/[id]` uses the new component structure. The page layout flows vertically: SpotDetailHeader at top, ImageCarousel below, EraAccordion filling remaining space. Design tokens are defined as CSS custom properties at the page or app level. The ImageCarousel syncs with the EraAccordion's expanded era via the `eraChange` event. Background uses warm cream color throughout. The page scrolls smoothly with the header remaining visible. The overall aesthetic matches the museum-exhibit mockup.

## Implementation Notes

Define CSS custom properties in a global stylesheet or the layout component: `--color-primary: #E07A5F` (coral), `--color-secondary: #5F9EA0` (teal), `--color-background: #FAF8F5` (cream), `--color-text: #3D3D3D` (brown). Wire up the EraAccordion's `eraChange` event to update the ImageCarousel's displayed era. Use flexbox or grid for the vertical layout with appropriate sections. Test on mobile viewport sizes to ensure the layout works well on phones.

## Files to Modify

Update `src/routes/spot/[id]/+page.svelte` to use the new component structure. Create or update a global CSS file for design tokens if not already present.
