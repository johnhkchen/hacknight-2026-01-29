# Project Roadmap

> **Last Updated**: 2026-01-30

This document tracks project status and progress for TimeLens, a time-traveling tour app that uses WAN-generated video to show historical footage of San Francisco locations.

---

## Current Phase

**Phase: Implementation** - S-002 through S-005 (Core App Experience)

With the specification complete and content data prepared, we're building the full app experience. Four stories deliver a complete vertical slice: users can browse available spots, select one, view era information, switch between eras, and see either generated videos or prompt placeholders.

### Active Work

**S-002: Spot Detail View with Era Timeline** - Status: Ready

This story builds the core interface where users view a historical spot and navigate between its eras. T-002-01 defines data types and loads from spots.json, which unblocks most other work.

**S-003: WAN Prompt Framework** - Status: Complete

This story documents the prompt template pattern and builds the placeholder display system. The spots.json contains 15 complete WAN prompts following a standardized structure. The PromptPlaceholder component now provides a cinematic placeholder for videos that will be generated, with a dark gradient background, film grain effect, and prominent era title display.

**S-004: Era Video Player Component** - Status: Ready

This story builds the video player with looping, loading states, and fallback to prompt placeholder when videos aren't available.

**S-005: Spot Browser Main Page** - Status: Complete

This story builds the landing page where users browse and select from five San Francisco locations. The SpotCard component displays each spot as a tappable card with its image, name, description, and era count. The main page at `/` features a TimeLens header with gradient branding and a responsive grid that shows one column on mobile and two columns on tablets and wider screens. Users can tap any card to navigate to that spot's detail view.

**S-006: Spot Detail View Redesign (Accordion Pattern)** - Status: In Progress

This story redesigns the Spot Detail View using a vertical accordion pattern based on the mockup, featuring expandable era cards with themed icons and a warm museum-exhibit aesthetic. The EraCard component (T-006-02) is complete with collapsed and expanded states showing icons, titles, descriptions, and audio buttons. The EraAccordion component (T-006-03) is complete, managing the accordion state where only one era expands at a time with the first era expanded by default. The SpotDetailHeader (T-006-01) and integration work (T-006-04) are ready to start.

**S-007: WAN Video Generation & Local Storage** - Status: Complete

This story builds the end-to-end pipeline for generating time-warped videos using Alibaba's WAN text-to-video API and storing them locally. The prompt enhancement system adds era-specific visual modifiers for period-appropriate aesthetics. The video download service persists videos to `static/videos/` before the 24-hour URL expiration. The JSON-based metadata store tracks generation status and file paths. The video gallery component displays generated videos in a responsive grid with spot and era metadata.

**S-008: Responsive Design & CSS Theme System** - Status: In Progress

This story implements the responsive layout and design token system that matches the wireframe aesthetic. T-008-02 is complete, establishing the responsive container system that makes the app feel native on mobile while presenting a centered phone preview on desktop. The global theme file defines design tokens for the warm cream background, coral accents, muted teal icons, and dark brown text. On mobile devices the content spans edge-to-edge with appropriate padding, while on desktop viewports over 768px the app centers in a 420px container with a subtle shadow, creating an elegant demo-friendly presentation. T-008-01 (CSS theme tokens) and T-008-03 (BottomNav component and token adoption) remain ready for implementation.

### Content Ready

The `src/lib/data/spots.json` file contains complete data for five San Francisco spots, each with three distinct historical eras and detailed WAN prompts:

**Fisherman's Wharf** covers the Gold Rush (1849), Industrial Era (1890), and Modern Era (2000). **Ferry Building** spans the Grand Opening (1898), Freeway Era (1959), and Modern Renaissance (2003). **Golden Gate Park** includes the Outside Lands (1865), Midwinter Fair (1894), and Human Be-In (1967). **Chinatown** features the Railroad Era (1865), Post-Earthquake Rebuild (1906), and Living Heritage (2000). **Alcatraz Island** covers the Military Fortress (1859), Federal Penitentiary (1934), and Native American Occupation (1969).

### Task Dependencies

T-002-01 (types and data loader) is the starting point and unblocks T-002-02, T-002-03, T-003-01, and T-005-01 for parallel development. T-002-02 unblocks T-004-01. T-003-01 unblocks T-003-02. T-005-01 unblocks T-005-02. Finally, T-004-01 and T-003-02 both unblock T-004-02.

### Future Work

**WAN Video Generation Integration** will use the prompts in spots.json to generate actual videos via Alibaba's WAN API. **Additional Spots** can be added following the established data model.

---

## Completed Milestones

- **M1: Concept Defined** - Complete. TimeLens specification establishes the vision, data model, and user experience.

## Upcoming Milestones

- **M2: Foundation Ready** - Technical infrastructure in place with Spot Browser and Detail View working
- **M3: MVP Complete** - Core user journey works end-to-end with video or placeholder content

---

## Quick Reference

**Check status**:
```bash
just dag-status
```

**Get next task**:
```bash
just prompt
```

**Run autonomous loop**:
```bash
RALPH_ALLOW_MAIN=1 WORKTREE_STORY=S-002 just ralph
```

---

## Archived Work

S-001 (Project Ideation & Specification) completed with specification document at `docs/specification.md`. Previous chassis preparation work archived under S-000 prefix in `docs/archive/`.
