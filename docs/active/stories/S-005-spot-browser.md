---
id: S-005
title: Spot Browser Main Page
status: ready
priority: 1
dependencies: []
---

## Objective

Build the main landing page where users browse and select from available historical spots in San Francisco. This is the entry point to the TimeLens experience, presenting the curated collection of locations that users can explore through time.

## Context

Before users can view a spot's eras and videos, they need to discover and choose which spot interests them. The Spot Browser serves as both a discovery interface and a navigation hub. It should feel like opening a time traveler's guidebook, with each spot card hinting at the historical journeys available within.

## User Story

As a user exploring San Francisco history, I want to browse available historical spots so that I can choose which location to explore through time.

## Acceptance Criteria

The main page displays a grid or list of spot cards showing all available locations. Each card shows the spot name, a thumbnail image, a brief description, and the number of eras available. Tapping a card navigates to that spot's detail view at `/spot/[id]`. The layout is mobile-optimized and works well on phone screens. The page loads spot data from the central spots JSON file. A header identifies the app as TimeLens with appropriate branding.

## Technical Notes

The page lives at the root route `/` as the app's landing page. It imports spot data from the JSON data file and renders a card for each spot. Use SvelteKit's routing to navigate to spot detail pages. Cards should have a subtle hover or tap state for interactivity feedback. Consider lazy loading images for performance, though with only 5 spots this is optional for MVP.

## Design Sketch

The layout starts with a header containing the TimeLens logo or title and a tagline like "Travel through San Francisco's history." Below that, a grid of spot cards fills the screen, with cards arranged in a single column on narrow phones or two columns on wider screens. Each card is a tappable rectangle with a background image, the spot name overlaid at the bottom, and a small badge showing the era count like "3 eras."

## Tickets

This story has two tickets. T-005-01 builds the SpotCard component that renders a single spot with its image, name, and era count. T-005-02 builds the SpotBrowser page that renders the header and grid of SpotCards with navigation to detail views.
