---
id: S-008
title: Responsive Design & CSS Theme System
status: ready
priority: 1
dependencies: [S-006]
---

## Objective

Fix the current layout issues where the app looks awkward on desktop while also not being properly mobile-responsive, and implement a CSS theme system that matches the wireframe design. The app should feel native on mobile phones while gracefully adapting to larger screens with a centered max-width container.

## Context

The wireframe at `docs/desired_theme.png` establishes the visual language: a warm cream background, coral/salmon accents, muted teal icons, dark brown text, and a museum-exhibit aesthetic with small caps typography. Currently the app has inconsistent styling that doesn't match this vision, and the layout breaks at various viewport sizes. We need a systematic approach to theming and responsive design.

## User Story

As a user viewing TimeLens on any device, I want the app to look polished and match the wireframe aesthetic so that the experience feels like a cohesive travel guide whether I'm on my phone or previewing on desktop.

## Acceptance Criteria

A global CSS theme file defines all design tokens as CSS custom properties including colors, typography, spacing, and shadows. The layout uses a mobile-first approach with a max-width container that centers on larger screens. On mobile viewports below 480px, the app fills the screen edge-to-edge. On tablet and desktop viewports, the app renders in a centered column with max-width around 420px to simulate phone dimensions, with a subtle background or shadow to frame it. All components use the design tokens rather than hardcoded values. Typography follows the wireframe with small caps headers, appropriate letterspacing, and the warm brown text color. The coral accent color is used consistently for interactive elements and highlights. The bottom navigation bar matches the wireframe with four icons in the teal color scheme.

## Design Tokens from Wireframe

The wireframe establishes these visual constants. Background color is warm cream around #FAF8F5 or similar off-white. Primary accent is coral/salmon around #E07A5F for buttons and active states. Secondary accent is muted teal around #5F9EA0 for icons and the bottom nav. Text color is dark brown around #3D3D3D rather than pure black. The header uses small caps with generous letterspacing. Era cards have subtle borders or shadows to create depth. The year badge uses a dark overlay on images. The "Listen to the story" button uses coral with rounded corners.

## Responsive Strategy

The app targets mobile-first since TimeLens is designed for on-location use. For viewports under 480px, content spans full width with appropriate padding. For viewports between 480px and 768px, content has slight side margins. For viewports over 768px, content centers in a max-width container around 420px with a light gray or patterned background visible on the sides, creating a "phone preview" effect that works well for demos.

## Bottom Navigation

The wireframe shows a persistent bottom navigation bar with four icons: a list or menu icon, a bookmark or guide icon, a compass or location icon that appears active, and a camera icon. The nav bar uses the cream background with teal icons, and the active icon has a coral highlight. This component should be implemented as part of this story.

## Tickets

This story has three tickets. T-008-01 creates the global CSS theme file with design tokens and base styles. T-008-02 implements the responsive container system with mobile-first breakpoints and desktop centering. T-008-03 builds the BottomNav component matching the wireframe and updates all existing components to use design tokens consistently.
