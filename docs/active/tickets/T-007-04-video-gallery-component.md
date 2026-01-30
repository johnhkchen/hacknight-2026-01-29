---
id: T-007-04
title: Build video gallery display component
story: S-007
status: ready
priority: 1
complexity: M
dependencies: [T-007-03]
---

## Summary

Build a gallery component that displays generated videos with their spot and era metadata. The gallery reads from the metadata store, filters for ready videos, and renders them in a responsive grid using native HTML5 video elements with lazy loading.

## Acceptance Criteria

A VideoCard component exists that displays a single video with its metadata including spot name, era title, and year. The video uses native HTML5 video element with controls, loop, and playsinline attributes. A VideoGallery component renders a responsive grid of VideoCards. The gallery only shows videos with status "ready" from the metadata store. Videos lazy load when scrolled into view using the loading="lazy" attribute or Intersection Observer. The gallery shows a meaningful empty state when no videos have been generated. Each card displays the spot name and era title overlaid on or below the video.

## Implementation Notes

Create `src/lib/components/VideoCard.svelte` for individual video display. The component accepts the video metadata entry plus spot and era details for display. Use CSS to overlay text on the video or position it below. Include the year badge similar to the ImageCarousel design.

Create `src/lib/components/VideoGallery.svelte` for the grid layout. Import the metadata store and spots data, join them to get full display information, filter for ready status, and render VideoCards. Use CSS Grid with `grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))` for responsive layout.

For lazy loading, the HTML5 video element doesn't support loading="lazy" natively, so use Intersection Observer to set the src attribute only when the video enters the viewport. Alternatively, use a poster image and only load the video on user interaction.

Consider adding a generation status section that shows pending or generating videos with their progress, separate from the ready videos gallery.

## Files to Create

Create `src/lib/components/VideoCard.svelte` for individual video display. Create `src/lib/components/VideoGallery.svelte` for the gallery grid. Optionally create a gallery page at `src/routes/gallery/+page.svelte` to showcase all generated videos.
