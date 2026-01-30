---
id: T-006-03
title: Build EraAccordion component
story: S-006
status: ready
priority: 1
complexity: M
dependencies: [T-006-02]
---

## Summary

Build the EraAccordion component that manages the accordion state and renders a vertical stack of EraCard components. Only one era can be expanded at a time, and the first era is expanded by default.

## Acceptance Criteria

An EraAccordion component exists at `src/lib/components/EraAccordion.svelte`. The component accepts an array of Era objects as a prop. The component tracks which era is currently expanded via internal state. Renders EraCard components in a vertical stack with appropriate spacing. Clicking a collapsed card expands it and collapses the previously expanded one. The first era is expanded when the component mounts. The component dispatches an `eraChange` event when the expanded era changes, passing the era ID. Vertical spacing between cards follows the design system.

## Implementation Notes

Use a reactive variable like `expandedEraId` initialized to the first era's ID. Pass `expanded={era.id === expandedEraId}` to each EraCard. Handle the EraCard's `select` event by updating `expandedEraId`. Use CSS gap or margin for consistent vertical spacing between cards. The `eraChange` event allows parent components like ImageCarousel to sync with the selected era.

## Files to Create

Create `src/lib/components/EraAccordion.svelte` as the accordion container component.
