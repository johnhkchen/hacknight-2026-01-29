---
id: T-002-03
title: Build EraTimeline component with expandable cards
story: S-002
status: complete
priority: 1
complexity: M
dependencies: [T-002-01]
completed_at: 2026-01-30T03:15:00.000Z
---

## Summary

Build the EraTimeline component that renders a vertical list of expandable era cards. Each card shows a themed icon, year, and era title. Tapping a card expands it to reveal the historical description and audio narration button while collapsing any previously expanded card.

## Acceptance Criteria

An EraTimeline component exists at `src/lib/components/EraTimeline.svelte`. The component accepts an array of Era objects and the currently expanded era ID as props. The component dispatches a select event when an era card is tapped, passing the era ID.

Each era renders as a vertical card showing a circular icon badge on the left using the era's icon identifier, the year and era title formatted as "1854 - Gold Rush Era" in small caps, and when expanded, the historical description paragraph plus a "Listen to the story" button with speaker icon.

The selected/expanded era card is visually distinct with the description visible and audio button showing. Collapsed cards show only the icon and title row. Smooth expand/collapse animation provides visual feedback. Cards have appropriate touch targets for mobile use with at least 48px tap height on collapsed cards.

## Implementation Notes

Use CSS flexbox for the vertical list layout. Use Svelte's slide transition or CSS transitions for expand/collapse animation. Use Svelte's createEventDispatcher for the select event.

The icon badge should be a muted teal circular background containing an icon. Icons can be implemented using an icon library like Lucide or simple SVGs. Map era icon identifiers to actual icons. Suggested mappings include anchor for maritime/harbor eras, factory for industrial eras, building for modern/urban eras, ship for trade/commerce eras, and users for cultural/social eras.

The audio button should have a speaker icon and "Listen to the story" label. For MVP, the button can be non-functional but should still render with proper styling. Use the coral accent color for the button background.

## Files to Create

Create `src/lib/components/EraTimeline.svelte` as the timeline component. Consider creating `src/lib/components/EraCard.svelte` if the card logic becomes complex enough to warrant separation.
