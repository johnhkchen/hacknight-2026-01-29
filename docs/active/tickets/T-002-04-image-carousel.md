---
id: T-002-04
title: Build ImageCarousel component with year badges
story: S-002
status: ready
priority: 1
complexity: M
dependencies: [T-002-01]
---

## Summary

Build the ImageCarousel component that displays a horizontally-scrollable series of historical images, one per era. Each image shows a year badge in the corner, and pagination dots below indicate the current position.

## Acceptance Criteria

An ImageCarousel component exists at `src/lib/components/ImageCarousel.svelte`. The component accepts an array of Era objects containing image URLs and years, plus the currently selected era ID as a prop. The component dispatches a select event when the user swipes to a new image, passing the era ID.

The carousel fills the top portion of the viewport, roughly 35-40% height. Images display with proper aspect ratio, cropping or letterboxing as needed. A year badge appears in the bottom-right corner of each image showing the era's start year in a small pill-shaped overlay. The right edge shows a partial glimpse of the next image to signal scrollability. Pagination dots below the carousel indicate total images and current position. Swiping left or right navigates between images with smooth snap-to-image behavior.

## Implementation Notes

Use CSS scroll-snap for smooth swipe-to-snap behavior with scroll-snap-type: x mandatory on the container and scroll-snap-align: start on each image. Use an Intersection Observer or scroll event listener to detect which image is currently visible and dispatch select events accordingly.

The year badge can be positioned absolutely within each image container. Use a semi-transparent dark background with light text for readability over any image. Round the corners and add subtle padding.

For pagination dots, create a row of small circles below the carousel. The active dot should be larger or filled while inactive dots are smaller or outlined. Map the dot count to the number of eras.

For MVP, if era image URLs are not yet populated in the data, display placeholder images or use the era's WAN prompt text as fallback content styled attractively.

## Files to Create

Create `src/lib/components/ImageCarousel.svelte` as the carousel component.
