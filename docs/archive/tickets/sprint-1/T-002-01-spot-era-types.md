---
id: T-002-01
title: Define Spot and Era types with data loader
story: S-002
status: ready
priority: 1
complexity: S
dependencies: []
---

## Summary

Define the TypeScript interfaces for Spot and Era data models, then create a data loader module that imports from the pre-populated spots.json file. This establishes the type-safe data foundation that all other components will consume.

## Acceptance Criteria

A Spot interface exists with id, name, coordinates (latitude and longitude), description, imageUrl, and an array of Era objects. An Era interface exists with id, title, yearStart, yearEnd (optional for ongoing eras), description, wanPrompt, and videoUrl (optional, null when not yet generated). A data loader module imports spots from `src/lib/data/spots.json` and exports typed data. Helper functions getSpotById and getAllSpots provide convenient data access. TypeScript types match the JSON structure exactly.

## Implementation Notes

Create a `src/lib/types.ts` file for the interfaces. Create a `src/lib/data/spots.ts` file that imports the JSON and exports typed data with helper functions. The spots.json file already contains 5 San Francisco spots with 3 eras each: Fisherman's Wharf, Ferry Building, Golden Gate Park, Chinatown, and Alcatraz Island. Each era has a complete WAN prompt ready for video generation.

## Pre-existing Data

The `src/lib/data/spots.json` file contains the full spot and era data with detailed WAN prompts. The TypeScript module should import this JSON and provide type-safe access.

## Files to Create

Create `src/lib/types.ts` with the Spot and Era interfaces. Create `src/lib/data/spots.ts` that imports the JSON and exports typed helpers.
