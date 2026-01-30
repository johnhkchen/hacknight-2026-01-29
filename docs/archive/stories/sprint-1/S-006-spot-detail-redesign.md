---
id: S-006
title: Spot Detail View Redesign (Accordion Pattern)
status: ready
priority: 1
dependencies: [S-002]
---

## Objective

Redesign the Spot Detail View to use a vertical accordion pattern based on the mockup, replacing the original horizontal timeline concept. The new design features expandable era cards, a header with back navigation, an image carousel synced to the selected era, and a warm museum-exhibit aesthetic.

## Context

The original S-002 design used a horizontal era timeline, but the mockup reveals a more engaging vertical accordion approach. Each era becomes an expandable card with themed icons, and only one era is expanded at a time. This creates a more immersive, scrollable experience that feels like a travel guide or museum exhibit. The image carousel at the top syncs with the currently expanded era.

## User Story

As a user viewing a historical spot, I want to browse eras in an accordion layout so that I can focus on one era at a time while seeing the full timeline of available periods.

## Acceptance Criteria

The header displays a back arrow and the spot name in a distinctive format like "Waterfront: Pier 43" with small caps and letterspacing. The image carousel at the top shows the image for the currently expanded era with a year badge overlay and pagination dots. The era accordion displays a vertical stack of era cards where each collapsed card shows a themed icon, year, and title. Tapping a collapsed card expands it while collapsing any previously expanded card. The expanded card reveals the historical description and a "Listen to the story" audio button. The first era is expanded by default when the view loads. The color palette uses coral/salmon for accents, muted teal for icons, warm cream backgrounds, and dark brown text.

## Design Tokens

The design system uses CSS custom properties for consistent theming. Primary accent is coral/salmon around #E07A5F. Secondary accent is muted teal around #5F9EA0. Background uses warm cream around #FAF8F5. Text uses dark brown around #3D3D3D rather than pure black. Era icons use the teal color on circular badges.

## Component Breakdown

**SpotDetailHeader** renders the back arrow and spot name with the museum-exhibit typography. **ImageCarousel** displays era images with year badges and pagination dots, syncing to the expanded era. **EraAccordion** manages the accordion state and renders the stack of EraCard components. **EraCard** handles its own collapsed/expanded states with icon, title, description, and audio button.

## Data Model Updates

The Era type now includes an icon field specifying which themed icon to display. The spots.json has been updated with icon values: anchor for maritime, factory for industrial, ship for ferries, building for modern architecture, mountain for landscapes, temple for cultural sites, train for railroad history, flower for counterculture, castle for fortifications, and users for community movements.

## Tickets

This story has four tickets. T-006-01 creates the SpotDetailHeader component with back navigation and museum-exhibit typography. T-006-02 builds the EraCard component with collapsed and expanded states including icon, title, description, and audio button. T-006-03 builds the EraAccordion component that manages expansion state and renders the vertical card stack. T-006-04 updates the SpotDetailView page to integrate all components with the new layout and design tokens.
