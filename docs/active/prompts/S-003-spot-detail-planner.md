# Planner Prompt: S-003 Spot Detail View Implementation

## Task

Plan the implementation of the Spot Detail View based on the mockup at `docs/active/design/spot-detail-mockup-analysis.md`.

## Key Design Elements

The view is a **vertical accordion timeline**, not a carousel. Each era is an expandable card:

**Header**: Back arrow + spot name ("Waterfront: Pier 43")

**Era Accordion**: Vertical stack of era cards where:
- Each card shows: themed icon (anchor, factory, etc.) + year + era title ("1854 - Gold Rush Era")
- Expanded card reveals: historical image with year badge, description text, "Listen to the story" audio button
- Only one era expanded at a time
- First era expanded by default

**Bottom section**: "Visit Nearby Partners" (can defer for MVP)

**Bottom nav**: 4-icon navigation bar

## Color Palette

- Primary accent: coral/salmon
- Icons: muted teal
- Background: warm cream
- Text: dark brown (not pure black)

## Existing Context

- Spot/Era types exist in `src/lib/types.ts`
- Spot data in `src/lib/data/spots.json` (5 spots, 3 eras each)
- Data loader in `src/lib/data/spots.ts`
- This is a Svelte/SvelteKit project

## Deliverables

Plan should cover:
1. Component breakdown (SpotDetailView, EraAccordion, EraCard, etc.)
2. Data model updates needed (icon field per era, image URL per era)
3. Route structure (`/spot/[id]`)
4. State management (expanded era tracking)
5. Styling approach (CSS custom properties for design tokens)

Reference the mockup analysis doc and existing codebase structure.
