# Trip to Sakartvelo — App Redesign

## Overview

Rebuild the Georgia travel route page from a single-file prototype into a well-structured, content-driven static site. Replace inline CSS with Tailwind CSS v4, add an interactive Leaflet map, tag filtering, i18n support, and a print-friendly layout.

## Architecture

Content-driven static site using SvelteKit prerendering. Each day is a Markdown file (mdsvex) with structured frontmatter. Components are small, focused, and styled with Tailwind.

```
src/
  content/
    day-1.md              # Frontmatter: title, sections, stops, coords, tags
    day-2.md
  lib/
    components/
      Map.svelte          # Leaflet map with markers
      StopCard.svelte     # Individual stop card
      UrbexCard.svelte    # Urbex location card
      TagFilter.svelte    # Tag filtering UI
      DaySection.svelte   # Day container with route sections
      RouteHeader.svelte  # Page header with title + lang switcher
    types.ts              # TypeScript types for stops, days, tags
  routes/
    +page.svelte          # Main page — renders all days
    +page.ts              # Load function — imports markdown content
    +layout.svelte        # Shell with print styles, i18n switcher
```

## Data Model

Each day markdown file contains YAML frontmatter:

```yaml
title: Day 1
sections:
  - heading: "Tbilisi → Telavi (via Gombori Pass, ~2 hrs)"
    stops:
      - name: Ujarma Fortress
        desc: "3rd-century royal citadel..."
        coords: "41.8114,45.1543"
        tags: [fortress, viewpoint]
    urbex:
      - name: Telavi Abandoned Church
        coords: "41.9189,45.4243"
```

## Components

| Component | Purpose |
|-----------|---------|
| RouteHeader | Hero header with trip title, route summary, language switcher |
| Map | Full-width Leaflet map with colored markers by tag, popups |
| TagFilter | Horizontal pill toggles to filter stops by category |
| DaySection | Day badge + route sections container |
| StopCard | Numbered card: name, description, tags, Google Maps link |
| UrbexCard | Dark-themed card for urbex locations with coordinates |

## Features

- **Interactive map**: Leaflet + OpenStreetMap tiles, markers for all stops, popups with name + description, colored by tag
- **Tag filtering**: Client-side, reactive — toggles stop visibility across days and map markers
- **i18n**: Paraglide with EN/ES (expandable). UI strings translated, content stays in original language per file
- **Print-friendly**: `@media print` via Tailwind — hides map/filters, clean single-column layout
- **Tailwind CSS v4**: All styling via utility classes, no inline `<style>` blocks

## Data Flow

1. Markdown files in `src/content/` contain frontmatter with structured stop data
2. `+page.ts` load function imports all day files, extracts frontmatter
3. Page component receives days data, passes to Map and DaySection components
4. TagFilter controls a reactive `$state` set of active tags
5. Stops filtered client-side based on active tags
6. Map markers update reactively when filters change

## Tech Choices

- **Leaflet + OSM**: Free, no API key, lightweight, well-supported Svelte wrappers
- **mdsvex**: Already installed, natural fit for content pages with structured data
- **Tailwind v4**: Already installed, replaces all inline CSS
- **Paraglide**: Already installed, used for UI string translations
