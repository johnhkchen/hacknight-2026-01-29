---
id: T-003-01
title: Document WAN prompt template pattern and validate prompts
story: S-003
status: ready
priority: 2
complexity: S
dependencies: [T-002-01]
---

## Summary

Document the standardized prompt template pattern used for WAN video generation and optionally create a builder utility. The spots.json file already contains 15 complete prompts (5 spots × 3 eras) following the established pattern. This ticket validates the pattern and creates documentation for future content creators.

## Acceptance Criteria

A prompt template documentation or style guide exists explaining the pattern. The pattern covers: scene description with location and era details, atmospheric elements like weather and lighting, human activity and period-appropriate details, camera movement instructions, and visual style directive. Optionally, a builder function exists to help create new prompts following the pattern. The existing prompts in spots.json are validated against the pattern.

## Pre-existing Prompts

The spots.json file already contains complete WAN prompts for all 15 eras across 5 spots. Each prompt follows this structure: setting and era-specific visuals, atmospheric and lighting details, human activity and authentic period elements, camera movement like "slow panning shot" or "tracking shot", and style directive like "vintage documentary style" or "period newsreel style."

## Implementation Notes

Create a `src/lib/prompts/template.ts` file that documents the prompt pattern and optionally exports a builder function. The builder could accept structured input and concatenate it into a well-formed prompt, useful for programmatically generating prompts for new spots. Include a style guide as code comments explaining what makes an effective WAN prompt for historical footage.

## Files to Create

Create `src/lib/prompts/template.ts` with pattern documentation and optional builder utility.
