---
id: T-006-02
title: Build EraCard component with collapsed and expanded states
story: S-006
status: complete
priority: 1
complexity: M
dependencies: [T-002-01]
---

## Summary

Build the EraCard component that represents a single era in the accordion. The card has two states: collapsed shows the icon, year, and title in a horizontal row; expanded reveals the full historical description and an audio narration button.

## Acceptance Criteria

An EraCard component exists at `src/lib/components/EraCard.svelte`. The component accepts an Era object and an `expanded` boolean prop. Collapsed state displays a circular icon badge, the year, and era title in a horizontal row. Expanded state shows everything from collapsed plus the historical description and a "Listen to the story" button with speaker icon. The component dispatches a `select` event when tapped in collapsed state. Transition between states is smooth with appropriate animation. Icon badge uses muted teal background with white icon. The audio button uses coral/salmon accent color.

## Implementation Notes

Use the era's `icon` field to render the appropriate icon. Consider using a simple icon set or SVG sprites for: anchor, factory, ship, building, mountain, temple, train, flower, castle, users. Use Svelte's `slide` transition or CSS max-height transition for smooth expand/collapse. The audio button is visual-only for MVP since audio generation is future work. Format the year display as just the start year for simplicity.

## Icon Mapping

The icon field maps to visual representations: `anchor` for maritime themes, `factory` for industrial, `ship` for ferry/transit, `building` for modern architecture, `mountain` for landscapes, `temple` for cultural/religious sites, `train` for railroad, `flower` for counterculture, `castle` for fortifications, `users` for community movements.

## Files to Create

Create `src/lib/components/EraCard.svelte` as the era card component.

## Implementation Summary

Created the EraCard component at src/lib/components/EraCard.svelte with the following features:

**Props and Events:** The component accepts an `era` prop of type Era and an `expanded` boolean prop. It uses Svelte's createEventDispatcher to emit a `select` event with the era ID when clicked in collapsed state.

**Collapsed State:** Displays a horizontal row with a circular icon badge (44px diameter), the year in small caps with letterspacing, and the era title. The icon badge uses a muted teal background (rgba(95, 158, 160, 0.15)) with the teal icon color (#5f9ea0).

**Expanded State:** Shows all collapsed content plus the historical description in a readable serif font and a "Listen to the story" button with a speaker icon. The audio button uses the coral accent color (#e07a5f) with hover and active states.

**Transitions:** Uses Svelte's built-in slide transition with 250ms duration for smooth expand/collapse animations. The card itself has subtle transform and shadow transitions on hover and focus.

**Design Tokens:** Applied the warm museum-exhibit color palette with cream backgrounds (#faf8f5), dark brown text (#3d3d3d), muted teal for icons (#5f9ea0), and coral for the audio button (#e07a5f). Border colors transition from subtle cream (#e8dfd0) to teal when expanded.

**Icon System:** Implemented SVG icon mapping for all ten era icon types (anchor, factory, ship, building, mountain, temple, train, flower, castle, users) with consistent stroke styling.

**Accessibility:** Added proper ARIA attributes including aria-expanded, aria-controls, and aria-label. Keyboard navigation works with Enter and Space keys. Focus states use visible outlines.

The component is ready to be integrated into the EraAccordion component (T-006-03) and follows the design patterns established in the story S-006.
