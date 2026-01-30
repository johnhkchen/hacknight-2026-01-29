---
id: S-003
title: WAN Prompt Framework
status: ready
priority: 2
dependencies: [S-002]
---

## Objective

Establish a standardized framework for WAN video generation prompts that ensures visual consistency across eras and spots. This includes defining prompt templates, creating the prompt library for sample content, and building the placeholder display system that shows prompts before videos are generated.

## Context

WAN (Alibaba's video generation model) produces best results with carefully crafted prompts that include specific visual details, camera movements, and style cues. Without standardization, each era's video would have inconsistent quality and aesthetic. The prompt framework solves this by providing templates and guidelines that ensure all generated videos feel like they belong to the same app.

Additionally, since video generation takes time and may not be complete during the hacknight, the prompt display system serves as a meaningful placeholder that communicates what the video will show while also being useful for debugging and iteration on prompts.

## User Story

As a developer working on TimeLens, I want standardized prompt templates and a placeholder system so that I can create consistent video content and test the app before videos are generated.

## Acceptance Criteria

A prompt template structure exists that includes required elements like era, location, visual style, and camera movement. The template produces prompts that work well with WAN's video generation capabilities. Sample prompts exist for all four eras of Fisherman's Wharf following the template. A PromptPlaceholder component renders the prompt text in a visually appealing way that fits the video area. The placeholder clearly indicates it's a placeholder while still feeling polished.

## Technical Notes

The prompt template should be a TypeScript function or template literal that accepts era-specific parameters and returns a complete prompt string. Key elements for WAN prompts include the setting or location, time period with visual cues like clothing and technology, weather and lighting, camera movement like slow pan or static, and film style like vintage 8mm or documentary. Store prompts in the era data model so they're available wherever era data is used.

## Prompt Template Structure

A good WAN prompt for TimeLens follows this pattern: it starts with the scene description including location and era-specific details, then adds atmospheric elements like weather, time of day, and lighting quality, followed by human activity and period-appropriate details, then camera movement instructions, and finally a style directive like "archival footage style" or "vintage film grain."

## Sample Prompt: Fisherman's Wharf Gold Rush

"San Francisco waterfront in 1850, wooden docks extending into the bay, tall-masted sailing ships anchored offshore, men in rough work clothes and wide-brimmed hats unloading cargo, morning fog lifting to reveal blue sky, seagulls circling overhead. Slow panning shot across the bustling dock. Vintage daguerreotype photography style brought to life, sepia tones, slight vignette."

## Tickets

This story breaks into two tickets. T-003-01 defines the prompt template structure and creates the four Fisherman's Wharf era prompts following the template. T-003-02 builds the PromptPlaceholder component that displays prompts attractively in the video area with appropriate styling and a clear placeholder indicator.
