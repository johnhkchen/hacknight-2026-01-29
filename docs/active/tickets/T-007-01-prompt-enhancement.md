---
id: T-007-01
title: Build prompt enhancement system for era-specific visual styles
story: S-007
status: ready
priority: 1
complexity: S
dependencies: [T-002-01]
---

## Summary

Create a prompt enhancement system that takes the existing wanPrompt from era data and enriches it with era-specific visual modifiers for film style, grain characteristics, and color grading. This ensures generated videos have period-appropriate aesthetics that reinforce the time-travel experience.

## Acceptance Criteria

A `buildEnhancedPrompt` function exists that accepts a Spot and Era and returns an optimized WAN prompt string. The function combines the era's existing wanPrompt with visual style tokens appropriate to the time period. Era-specific modifiers exist for different historical periods covering film grain, color palette, and cinematography style. The enhanced prompt stays within WAN's 1500 character limit. The function is exported from a module that can be imported by the generation service.

## Implementation Notes

Create `src/lib/wanx/prompt-builder.ts` for the enhancement logic. Define a mapping of year ranges to visual style tokens. For example, 1840-1870 gets "daguerreotype aesthetic, sepia tones, vignette edges, static camera", 1870-1920 gets "early cinema style, black and white, slight flicker, hand-cranked feel", 1920-1960 gets "classic Hollywood cinematography, film grain, rich contrast", 1960-1980 gets "grainy documentary footage, slightly desaturated, handheld camera movement", and 1980-present gets "contemporary HD video, natural colors, smooth motion".

The builder should determine the era's visual style based on yearStart, prepend or append the style tokens to the wanPrompt, and ensure the total length doesn't exceed the API limit. If the combined prompt is too long, truncate the original wanPrompt while preserving the style tokens since they're critical for visual consistency.

## Files to Create

Create `src/lib/wanx/prompt-builder.ts` with the buildEnhancedPrompt function and era style mappings.
