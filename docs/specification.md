# Project Specification: TimeLens

TimeLens transforms your phone into a time machine for exploring historical locations. The app takes popular tourist and historical spots in San Francisco, pairs them with significant historical periods, and uses WAN (Alibaba's video generation model) to create immersive "historical footage" that brings the past to life.

## Problem Statement

Tourists and history enthusiasts visiting San Francisco see only the present-day version of landmarks. The rich historical context of places like the waterfront, Chinatown, or Market Street remains invisible unless you read plaques or guidebooks. There's no visceral, visual way to experience what these places looked like during the Gold Rush, the 1906 earthquake, or the Summer of Love.

## Proposed Solution

TimeLens presents each location as a "spot" with multiple historical "eras." When viewing a spot, users see a looping AI-generated video at the top that depicts the location during the selected era. Users can swipe between eras to see the same location transform across time, from Gold Rush shanties to Victorian architecture to modern skylines.

The app focuses on San Francisco as the launch city, with curated spots that have strong visual transformations across well-documented historical periods.

## Core User Experience

A user opens the app and sees a list of San Francisco spots. They tap "Fisherman's Wharf" and land on the Spot Detail View. At the top, a looping video shows the wharf during the Gold Rush era with wooden docks, sailing ships, and period-appropriate activity. Below the video, an era timeline shows available periods: Gold Rush (1849), Industrial Era (1900), Summer of Love (1967), and Modern Day. Tapping "Industrial Era" swaps the video to show early automobiles, different architecture, and the evolving waterfront. Each era includes a brief historical caption explaining what the user is seeing.

## Technical Approach

The frontend is a Svelte-based mobile web app optimized for phone viewing. Each spot has a data model containing its name, location coordinates, a description, and an array of eras. Each era contains a title, year range, historical description, and either a WAN-generated video URL or a WAN prompt that serves as a placeholder until video generation is complete.

Video generation uses Alibaba's WAN model via API. The app maintains a library of standardized prompts optimized for historical scene generation, which ensures visual consistency across eras and spots. Videos are pre-generated and cached rather than generated on-demand, since WAN generation takes time.

The initial MVP displays prompt text as placeholders where videos would appear, allowing the full UX flow to be built and tested before video generation is integrated.

## Scope for Hacknight

Given time constraints, we'll build three stories that establish the foundation for the experience. First, the Spot Detail View with Era Timeline provides the core interface for viewing a spot and switching between eras. Second, the WAN Prompt Framework establishes the standardized prompt structure and placeholder system. Third, the Era Video Player Component handles video playback with loading states and fallback to prompt display.

These three stories create a complete vertical slice: users can view a spot, see era information, and see either generated videos or the prompts that would generate them.

## Data Model

A Spot contains an id, name, coordinates as latitude and longitude, a description, an image URL for the listing, and an array of Era objects. Each Era contains an id, a title like "Gold Rush" or "Industrial Era", a year or year range, a historical description, a WAN prompt string, and an optional video URL that starts as null until generation completes.

## Sample Content: Fisherman's Wharf

The Fisherman's Wharf spot includes four eras. The Gold Rush era covers 1849 to 1855 and describes how the wharf began as a simple wooden dock where ships arrived carrying prospectors and supplies for the gold fields. The Industrial Era spans 1890 to 1920 when Italian immigrants established the fishing fleet that gave the wharf its name, with feluccas and crab pots lining the waterfront. The Summer of Love era covers 1965 to 1970 when the wharf became a tourist destination as San Francisco drew visitors from around the world. The Modern Era from 2000 to present shows the wharf as it exists today with sea lions, sourdough bread bowls, and crowds of tourists.

## Success Metrics

The MVP is successful if users can navigate to a spot, view era information, switch between eras with visible UI feedback, and see either video content or prompt placeholders. The experience should feel like a polished demo even without real video content.
