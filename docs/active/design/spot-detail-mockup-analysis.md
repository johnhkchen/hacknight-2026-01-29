# Spot Detail View Mockup Analysis

This document captures the UI design from the mockup for the Spot Detail View.

## Header

The header displays a back arrow on the left and the spot name in a distinctive format like "Waterfront: Pier 43". The typography uses small caps with generous letterspacing for a museum-exhibit feel.

## Era Accordion

The main content area is a **vertical accordion** where each era is an expandable card. This is not a carousel - the images are embedded within each era's expanded content.

### Collapsed State

Each collapsed era shows a horizontal row containing a circular icon badge on the left with a themed icon (anchor for maritime, factory for industrial, pier for modern), followed by the year and era title formatted as "1854 - Gold Rush Era" in small caps.

### Expanded State

The currently selected era expands to reveal its full content. At the top of the expanded card, a historical image displays with a year badge in the bottom-right corner ("1854"). Below the image, the era title repeats, followed by a description paragraph providing historical context in readable prose. At the bottom, a "Listen to the story" button with a speaker icon offers audio narration.

### Interaction

Tapping a collapsed era expands it while collapsing the previously expanded one, creating an accordion behavior where only one era shows full content at a time. The first era is expanded by default when the view loads.

### Era Icons Observed

The Gold Rush era (1854) uses an anchor icon suggesting maritime commerce. The Industrial Expansion era (1916) uses a factory icon. The Modern Waterfront era (2021) uses a pier/dock icon.

## Nearby Partners Section

Below the era accordion, a "Visit Nearby Partners" section header appears, suggesting integration with local businesses or related sites. This can be deferred for MVP.

## Bottom Navigation

A fixed bottom navigation bar contains four icons: list view, bookmark/guide, compass/location (currently active), and camera. This navigation persists across views.

## Color Palette

The design uses warm, inviting colors. Primary accent is coral/salmon for active elements and buttons. Secondary accent is muted teal for era icons. Backgrounds use warm cream/off-white. Text uses dark brown rather than pure black for a softer appearance.

## Typography

Spot titles and era headers use small caps with letterspacing. Body text uses a readable serif or transitional typeface. The overall aesthetic suggests a travel guide or museum exhibit.

## Mobile Considerations

The layout is portrait-optimized with generous touch targets. Era cards have ample vertical spacing for comfortable tapping. The audio button is large and clearly tappable.
