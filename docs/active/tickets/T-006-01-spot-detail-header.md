---
id: T-006-01
title: Build SpotDetailHeader component
story: S-006
status: ready
priority: 1
complexity: S
dependencies: [T-002-01]
---

## Summary

Build the SpotDetailHeader component that displays a back arrow and the spot name with museum-exhibit typography. The header establishes the visual identity of the detail view with small caps, letterspacing, and the warm color palette.

## Acceptance Criteria

A SpotDetailHeader component exists at `src/lib/components/SpotDetailHeader.svelte`. The component accepts the spot name as a prop. A back arrow on the left navigates to the previous page or spot browser. The spot name displays in a distinctive format with small caps and generous letterspacing. Typography uses dark brown text on warm cream background. The header is fixed or sticky at the top during scroll. Touch target for back arrow meets mobile accessibility standards at 44px minimum.

## Implementation Notes

Use CSS `font-variant: small-caps` and `letter-spacing: 0.1em` for the museum-exhibit feel. The back arrow can use a simple SVG icon or Unicode character. Use SvelteKit's `goto` or browser history for navigation. Apply the design tokens: `--color-text: #3D3D3D` and `--color-background: #FAF8F5`. Consider adding a subtle bottom border or shadow to separate header from content.

## Files to Create

Create `src/lib/components/SpotDetailHeader.svelte` as the header component.
