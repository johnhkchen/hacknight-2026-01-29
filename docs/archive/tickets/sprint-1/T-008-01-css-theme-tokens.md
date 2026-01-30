---
id: T-008-01
title: Create global CSS theme file with design tokens
story: S-008
status: ready
priority: 1
complexity: S
dependencies: []
---

## Summary

Create a global CSS file that defines all design tokens as CSS custom properties and establishes base styles for the app. This provides a single source of truth for colors, typography, spacing, and other visual constants that all components will reference.

## Acceptance Criteria

A global theme file exists at `src/app.css` or `src/lib/styles/theme.css`. CSS custom properties define all colors from the wireframe including background cream, coral accent, teal secondary, and brown text. Typography tokens define font families, sizes, weights, and letterspacing for headers and body text. Spacing tokens define consistent padding and margin values. The file includes CSS reset or normalization for consistent cross-browser rendering. Base styles apply the background color to body and set default text color and font. The theme file is imported in the root layout so it applies globally.

## Design Tokens

Colors should include `--color-background: #FAF8F5` for the warm cream, `--color-primary: #E07A5F` for coral accent, `--color-secondary: #5F9EA0` for muted teal, `--color-text: #3D3D3D` for dark brown, `--color-text-light: #6B6B6B` for secondary text, and `--color-border: #E5E0DB` for subtle borders.

Typography should include `--font-family: system-ui, -apple-system, sans-serif` for body text, `--font-family-display: Georgia, serif` or similar for headers if the wireframe uses serif, `--text-xs` through `--text-xl` for size scale, and `--letter-spacing-caps: 0.1em` for small caps headers.

Spacing should include `--space-1` through `--space-8` on a consistent scale like 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px.

## Implementation Notes

Create the file at `src/lib/styles/theme.css` and import it in `src/routes/+layout.svelte`. Include a minimal CSS reset that sets `box-sizing: border-box` on all elements, removes default margins, and sets a base line-height. Apply `background-color: var(--color-background)` and `color: var(--color-text)` to the body. Consider adding a `.small-caps` utility class with `font-variant: small-caps` and `letter-spacing: var(--letter-spacing-caps)`.

## Files to Create

Create `src/lib/styles/theme.css` with all design tokens and base styles. Update `src/routes/+layout.svelte` to import the theme file.
