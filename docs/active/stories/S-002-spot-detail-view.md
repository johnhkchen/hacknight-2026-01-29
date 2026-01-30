---
id: S-002
title: Spot Detail View with Era Timeline
status: ready
priority: 1
dependencies: []
---

## Objective

Build the core interface where users view a historical spot and navigate between its eras. This is the heart of the TimeLens experience, showing a header with the spot name, an image carousel at the top, a vertical era timeline for navigation, and expandable historical context for each era.

## Context

The Spot Detail View is where the "time machine" magic happens. Users arrive at this view after selecting a spot from a list. The view must feel immersive and polished even in MVP state when videos are replaced by images or prompt placeholders. The era timeline should make it obvious that the user can travel through time, and the vertical card-based layout provides rich context while maintaining scannability.

## User Story

As a user exploring San Francisco history, I want to view a spot and switch between historical eras so that I can see how the location transformed over time.

## Acceptance Criteria

The header displays a back button and the spot name in a distinctive format like "Waterfront: Pier 43". An image carousel fills the top third of the screen showing historical images with year badges in the corner, one image per era, with pagination dots below. The era timeline renders as a vertical list of expandable cards, each showing a themed icon, year, and era title. Tapping an era card expands it to reveal the historical description and an audio narration button. Only one era is expanded at a time. The view is optimized for mobile portrait orientation with a warm, museum-exhibit aesthetic.

## Technical Notes

The Spot Detail View receives a spot ID via route parameter and loads spot data including all eras. State management tracks which era is currently expanded. The video or placeholder component is a separate concern handled by S-004, so this story focuses on layout, era selection, and data flow. Use Svelte's reactivity to ensure era changes propagate smoothly. The audio narration feature can show UI elements in MVP without functional audio playback.

## Design Reference

See `docs/active/design/spot-detail-mockup-analysis.md` for detailed mockup analysis including the image carousel behavior, vertical era timeline pattern, icon theming, color palette, and typography notes.

## Design Sketch

The layout flows vertically starting with a header bar containing back navigation and spot name. Below the header, the image carousel occupies roughly the top third of the viewport with swipeable historical photos, each bearing a year badge. Pagination dots indicate carousel position. The era timeline fills the remaining space as a vertical stack of era cards. Each card shows a themed circular icon on the left with the year and era title beside it. The expanded card reveals a description paragraph and a "Listen to the story" button with speaker icon. Collapsed cards show only icon and title, creating clear visual hierarchy. The color palette uses warm coral accents, muted teal icons, cream backgrounds, and dark brown text.

## Tickets

This story breaks into four tickets. T-002-01 defines the Spot and Era TypeScript types including an icon identifier field, and creates mock data. T-002-02 builds the SpotDetailView Svelte component with the header, layout structure, routing, and era selection state. T-002-03 builds the EraTimeline component as a vertical list of expandable era cards with icons and audio button UI. T-002-04 builds the ImageCarousel component with swipe gestures, year badges, and pagination dots.
