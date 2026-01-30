---
id: T-005-02
title: Build SpotBrowser main page
story: S-005
status: pending
priority: 1
complexity: M
dependencies: [T-005-01]
---

## Summary

Build the SpotBrowser page as the app's main landing page, displaying a header with TimeLens branding and a grid of SpotCards for all available locations.

## Acceptance Criteria

The SpotBrowser page exists at the root route `src/routes/+page.svelte`. A header displays "TimeLens" with a tagline like "Travel through San Francisco's history." The page imports spot data from the JSON data file. SpotCards render in a responsive grid: single column on phones, two columns on tablets. Tapping a card navigates to `/spot/[id]` for that spot. The page has appropriate padding and spacing for mobile viewing. Loading state shows while data loads if using async loading.

## Implementation Notes

Import the SPOTS array from the data file. Use CSS Grid with `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))` for responsive layout. The header can be a simple styled div for MVP, with potential for a proper nav component later. Ensure the page scrolls smoothly if content exceeds viewport. Consider adding a subtle background color or pattern to distinguish from spot cards.

## Files to Create

Create `src/routes/+page.svelte` as the main landing page. Optionally create `src/routes/+page.ts` if load function is needed.
