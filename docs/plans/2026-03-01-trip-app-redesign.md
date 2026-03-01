# Trip App Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the Georgia travel route page into a componentized, Tailwind-styled SvelteKit app with an interactive Leaflet map, tag filtering, i18n, and print-friendly layout.

**Architecture:** Content lives in mdsvex markdown files with YAML frontmatter. Components are small and focused, styled exclusively with Tailwind CSS v4. Leaflet map renders all stops as markers. Tag filtering is client-side reactive state.

**Tech Stack:** SvelteKit, Svelte 5, Tailwind CSS v4, Leaflet, mdsvex, Paraglide i18n

---

## Pre-requisites

- mdsvex is already configured in `svelte.config.js` (extensions: `.svelte`, `.svx`)
- Tailwind CSS v4 is already in `src/routes/layout.css`
- Paraglide is configured with `en` and `es` locales in `project.inlang/settings.json`
- No database is needed — this is a static content site

---

### Task 1: Install Leaflet

**Files:**
- Modify: `package.json`

**Step 1: Install leaflet and its types**

Run: `pnpm add leaflet && pnpm add -D @types/leaflet`

**Step 2: Verify installation**

Run: `pnpm ls leaflet`
Expected: leaflet version listed

**Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add leaflet dependency"
```

---

### Task 2: Define TypeScript types

**Files:**
- Create: `src/lib/types.ts`

**Step 1: Create the types file**

```ts
export interface Stop {
	name: string;
	desc: string;
	coords: string;
	tags: string[];
}

export interface UrbexSpot {
	name: string;
	coords: string;
	decimal: string;
}

export interface RouteSection {
	heading: string;
	stops: Stop[];
	urbex: UrbexSpot[];
}

export interface DayData {
	title: string;
	sections: RouteSection[];
}

export const TAG_CONFIG: Record<string, { bg: string; text: string; icon: string }> = {
	fortress: { bg: 'bg-amber-100', text: 'text-amber-800', icon: '🏰' },
	viewpoint: { bg: 'bg-blue-100', text: 'text-blue-800', icon: '👁' },
	monastery: { bg: 'bg-violet-100', text: 'text-violet-800', icon: '⛪' },
	village: { bg: 'bg-emerald-100', text: 'text-emerald-800', icon: '🏘' },
	food: { bg: 'bg-pink-100', text: 'text-pink-800', icon: '🍯' },
	wine: { bg: 'bg-yellow-200', text: 'text-yellow-900', icon: '🍷' },
	museum: { bg: 'bg-indigo-100', text: 'text-indigo-800', icon: '🏛' },
	palace: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '👑' },
	ancient: { bg: 'bg-purple-100', text: 'text-purple-800', icon: '🏚' },
	nature: { bg: 'bg-green-100', text: 'text-green-800', icon: '🌳' },
	academy: { bg: 'bg-cyan-100', text: 'text-cyan-800', icon: '📚' }
};
```

**Step 2: Commit**

```bash
git add src/lib/types.ts
git commit -m "feat: add TypeScript types for trip data"
```

---

### Task 3: Create content markdown files

**Files:**
- Create: `src/content/day-1.md`
- Create: `src/content/day-2.md`

**Step 1: Create `src/content/day-1.md`**

Extract the Day 1 data from the current `+page.svelte` into a markdown file. The frontmatter contains structured data; the markdown body can contain optional prose.

```markdown
---
title: "Day 1"
sections:
  - heading: "Tbilisi → Telavi (via Gombori Pass, ~2 hrs)"
    stops:
      - name: "Ujarma Fortress"
        desc: "3rd-century royal citadel of King Vakhtang Gorgasali perched above the Iori River gorge. One of the most important fortresses guarding the pass from Kartli into Kakheti. Panoramic views, 10 GEL entry."
        coords: "41.8114,45.1543"
        tags: ["fortress", "viewpoint"]
      - name: "Gombori Village (1,050m)"
        desc: "Roadside farmers sell honey, walnuts, cheese, and fresh vegetables. WWII memorial nearby."
        coords: "41.8594,45.2003"
        tags: ["village", "food"]
      - name: "New Shuamta"
        desc: "Active 16th-century nunnery with frescoes, founded by the wife of King Lewan II."
        coords: "41.9136,45.3910"
        tags: ["monastery"]
      - name: "Old Shuamta"
        desc: "Three churches dating from the 5th-7th centuries in a forested mountain setting at 1,015m. Rarely crowded and deeply atmospheric."
        coords: "41.9109,45.4059"
        tags: ["monastery", "ancient"]
      - name: "Ikalto Monastery & Academy"
        desc: "6th-century monastery with ruins of a 12th-century academy where poet Shota Rustaveli studied. Ancient qvevri wine pots visible in the gardens."
        coords: "41.9374,45.3811"
        tags: ["monastery", "academy"]
      - name: "Alaverdi Monastery"
        desc: "Georgia's second-tallest cathedral at over 55 meters, built in the 11th century. Monks produce wine on-site."
        coords: "42.0325,45.3772"
        tags: ["monastery", "wine"]
      - name: "Batonistsikhe Fortress"
        desc: "King Erekle II's 18th-century palace with an excellent modern history museum."
        coords: "41.9173,45.4760"
        tags: ["fortress", "museum"]
      - name: "Giant Plane Tree"
        desc: "900-year-old tree with a 12m trunk circumference, right next to the fortress."
        coords: "41.9167,45.4782"
        tags: ["nature"]
    urbex:
      - name: "Telavi Abandoned Church"
        coords: "41°55'08.0\"N 45°25'27.6\"E"
        decimal: "41.9189,45.4243"
  - heading: "Telavi → Sighnaghi (~1.5 hrs through vineyard villages)"
    stops:
      - name: "Tsinandali Estate"
        desc: "19th-century palace of poet Prince Chavchavadze with an 18-hectare European-designed garden and historic winery."
        coords: "41.8969,45.5652"
        tags: ["palace", "wine"]
      - name: "Schuchmann Wine Chateau"
        desc: "Modern winery in Kisiskhevi with tastings, restaurant, and even a wine spa."
        coords: "41.9000,45.5413"
        tags: ["wine"]
      - name: "Alazani Valley Viewpoint"
        desc: "Sweeping panorama just before entering Sighnaghi — don't skip this."
        coords: "41.6279,45.9204"
        tags: ["viewpoint"]
      - name: "Sighnaghi Viewpoint"
        desc: "Best in-town viewpoint overlooking the valley and Caucasus mountains."
        coords: "41.6207,45.9224"
        tags: ["viewpoint"]
      - name: "Sighnaghi National Museum"
        desc: "Home to ~40 works by Niko Pirosmani. Great terrace view. 20 GEL, closed Mondays."
        coords: "41.6197,45.9229"
        tags: ["museum"]
      - name: "Bodbe Monastery"
        desc: "9th-century monastery housing the grave of St. Nino, who converted Georgia to Christianity. Beautiful gardens and a holy spring."
        coords: "41.6063,45.9339"
        tags: ["monastery"]
    urbex:
      - name: "Sighnaghi City"
        coords: "41°37'04.1\"N 45°55'22.5\"E"
        decimal: "41.6178,45.9229"
      - name: "Eniseli Abandoned / Unconstructed Landmark"
        coords: "42°00'00.4\"N 45°39'21.8\"E"
        decimal: "42.0001,45.6561"
      - name: "Gurjaani High Building"
        coords: "41°44'36.7\"N 45°46'46.7\"E"
        decimal: "41.7435,45.7796"
---
```

**Step 2: Create `src/content/day-2.md`**

```markdown
---
title: "Day 2"
sections:
  - heading: "Sighnaghi → Tbilisi"
    stops: []
    urbex:
      - name: "Close to Vaziani"
        coords: "41°38'03.3\"N 45°03'13.4\"E"
        decimal: "41.6343,45.0537"
      - name: "Vaziani"
        coords: "41°42'19.1\"N 45°02'13.0\"E"
        decimal: "41.7053,45.0369"
      - name: "Georgia–Azerbaijan Border Destroyed Complex"
        coords: "41°27'57.6\"N 45°25'16.6\"E"
        decimal: "41.4660,45.4213"
      - name: "Udabno Village"
        coords: "41°30'10.8\"N 45°22'52.1\"E"
        decimal: "41.5030,45.3811"
---
```

**Step 3: Commit**

```bash
git add src/content/
git commit -m "feat: add trip content as mdsvex markdown files"
```

---

### Task 4: Build StopCard component

**Files:**
- Create: `src/lib/components/StopCard.svelte`

**Step 1: Create the component**

Props: `stop: Stop`, `index: number`. Displays numbered card with name, description, tags (Tailwind-styled pills), and Google Maps link. All styling via Tailwind utilities.

Reference `TAG_CONFIG` from `$lib/types` for tag colors. The Google Maps link opens `https://www.google.com/maps?q={coords}`.

**Step 2: Run autofixer**

Use the Svelte MCP `svelte-autofixer` tool on the component. Fix any issues.

**Step 3: Commit**

```bash
git add src/lib/components/StopCard.svelte
git commit -m "feat: add StopCard component"
```

---

### Task 5: Build UrbexCard component

**Files:**
- Create: `src/lib/components/UrbexCard.svelte`

**Step 1: Create the component**

Props: `spot: UrbexSpot`. Dark-themed card (`bg-zinc-800 border-zinc-700`) with name and monospace coordinates. Links to Google Maps via decimal coords.

**Step 2: Run autofixer**

Use the Svelte MCP `svelte-autofixer` tool. Fix any issues.

**Step 3: Commit**

```bash
git add src/lib/components/UrbexCard.svelte
git commit -m "feat: add UrbexCard component"
```

---

### Task 6: Build TagFilter component

**Files:**
- Create: `src/lib/components/TagFilter.svelte`

**Step 1: Create the component**

Props: `allTags: string[]`, bindable `activeTags: Set<string>`.

Renders a horizontal row of pill buttons for each tag. Clicking toggles the tag in/out of `activeTags`. Uses `TAG_CONFIG` for colors. An "All" button resets to showing everything.

Use Svelte 5 `$bindable()` for `activeTags` so the parent can react.

**Step 2: Run autofixer**

Use the Svelte MCP `svelte-autofixer` tool. Fix any issues.

**Step 3: Commit**

```bash
git add src/lib/components/TagFilter.svelte
git commit -m "feat: add TagFilter component"
```

---

### Task 7: Build DaySection component

**Files:**
- Create: `src/lib/components/DaySection.svelte`

**Step 1: Create the component**

Props: `day: DayData`, `activeTags: Set<string>`.

Renders: day badge pill, then for each section: route heading, filtered StopCards (only show stops where at least one tag is in `activeTags`, or all if `activeTags` is empty), and UrbexCards section if urbex spots exist.

**Step 2: Run autofixer**

Use the Svelte MCP `svelte-autofixer` tool. Fix any issues.

**Step 3: Commit**

```bash
git add src/lib/components/DaySection.svelte
git commit -m "feat: add DaySection component"
```

---

### Task 8: Build Map component

**Files:**
- Create: `src/lib/components/Map.svelte`

**Step 1: Create the component**

Props: `days: DayData[]`, `activeTags: Set<string>`.

- Import Leaflet dynamically (browser-only) using `onMount` since Leaflet requires `window`
- Import Leaflet CSS from `leaflet/dist/leaflet.css`
- Render a `<div>` container with fixed height (e.g. `h-96`)
- Initialize map centered on the trip area (approx `41.75, 45.4`, zoom 9)
- Use OpenStreetMap tiles: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
- Add circle markers for each stop, colored by first tag using TAG_CONFIG
- Each marker gets a popup with stop name and description
- Use `$effect` to reactively update markers when `activeTags` changes — filter out stops whose tags don't intersect with `activeTags` (show all if empty)
- Fit bounds to visible markers

**Step 2: Run autofixer**

Use the Svelte MCP `svelte-autofixer` tool. Fix any issues.

**Step 3: Commit**

```bash
git add src/lib/components/Map.svelte
git commit -m "feat: add interactive Leaflet map component"
```

---

### Task 9: Build RouteHeader component

**Files:**
- Create: `src/lib/components/RouteHeader.svelte`

**Step 1: Create the component**

Renders the hero header section:
- Indigo gradient background (using Tailwind: `bg-gradient-to-br from-indigo-950 via-indigo-800 to-indigo-600`)
- Georgian flag emoji, "Trip to Sakartvelo" title (large serif font via Tailwind), route subtitle
- Language switcher using Paraglide's `locales` and `localizeHref` from `$lib/paraglide/runtime`

**Step 2: Run autofixer**

Use the Svelte MCP `svelte-autofixer` tool. Fix any issues.

**Step 3: Commit**

```bash
git add src/lib/components/RouteHeader.svelte
git commit -m "feat: add RouteHeader component with i18n switcher"
```

---

### Task 10: Create content loader and wire up the page

**Files:**
- Create: `src/routes/+page.ts`
- Rewrite: `src/routes/+page.svelte`

**Step 1: Create the load function in `+page.ts`**

Use Vite's `import.meta.glob` to load all `.md` files from `src/content/`. Extract frontmatter metadata (the `metadata` export from mdsvex). Return array of `DayData` sorted by filename.

```ts
import type { DayData } from '$lib/types';

export async function load() {
	const files = import.meta.glob('/src/content/*.md', { eager: true });
	const days: DayData[] = Object.entries(files)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([, mod]: [string, any]) => mod.metadata as DayData);
	return { days };
}
```

**Step 2: Rewrite `+page.svelte`**

- Remove ALL existing content and inline `<style>` block
- Import and use: `RouteHeader`, `Map`, `TagFilter`, `DaySection`
- Receive `data` from load function via `$props()`
- Create reactive state: `let activeTags = $state(new Set<string>())`
- Collect all unique tags from all stops across all days
- Render: RouteHeader → TagFilter → Map → DaySections
- Add `print:hidden` class to Map and TagFilter for print-friendly output

**Step 3: Run autofixer**

Use the Svelte MCP `svelte-autofixer` tool on `+page.svelte`. Fix any issues.

**Step 4: Commit**

```bash
git add src/routes/+page.ts src/routes/+page.svelte
git commit -m "feat: wire up page with content loader and all components"
```

---

### Task 11: Update layout and add print styles

**Files:**
- Modify: `src/routes/+layout.svelte`
- Modify: `src/routes/layout.css`

**Step 1: Clean up `+layout.svelte`**

Keep the favicon, CSS import, and `{@render children()}`. Remove the hidden locale links div (language switcher is now in RouteHeader). Add a Google Fonts link for `Inter` and `DM Serif Display` in `<svelte:head>`.

**Step 2: Add print styles to `layout.css`**

After the existing Tailwind imports, add:

```css
@media print {
  body { background: white; }
}
```

Tailwind's `print:` variant handles the rest (hiding map/filters via `print:hidden` classes in components).

**Step 3: Run autofixer on layout**

Use the Svelte MCP `svelte-autofixer` tool. Fix any issues.

**Step 4: Commit**

```bash
git add src/routes/+layout.svelte src/routes/layout.css
git commit -m "feat: update layout with print styles and font imports"
```

---

### Task 12: Add i18n message strings

**Files:**
- Modify: `messages/en.json`
- Modify: `messages/es.json`

**Step 1: Add UI strings to `messages/en.json`**

```json
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "site_title": "Trip to Sakartvelo",
  "route_subtitle": "Tbilisi → Gombori Pass → Telavi → Sighnaghi → Tbilisi",
  "filter_all": "All",
  "urbex_heading": "Digger / Urbex Locations",
  "open_map": "Map",
  "day_label": "Day {number}"
}
```

**Step 2: Add Spanish translations to `messages/es.json`**

```json
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "site_title": "Viaje a Sakartvelo",
  "route_subtitle": "Tiflis → Paso Gombori → Telavi → Sighnaghi → Tiflis",
  "filter_all": "Todos",
  "urbex_heading": "Ubicaciones Urbex",
  "open_map": "Mapa",
  "day_label": "Día {number}"
}
```

**Step 3: Run paraglide to regenerate**

Run: `pnpm build` (or `pnpm dev` briefly) to trigger Paraglide code generation, then update components to use `m.site_title()` etc. instead of hardcoded strings.

**Step 4: Commit**

```bash
git add messages/ src/lib/paraglide/
git commit -m "feat: add i18n message strings for EN and ES"
```

---

### Task 13: Dev server smoke test

**Step 1: Start dev server**

Run: `pnpm dev`

**Step 2: Verify in browser**

- Page loads without errors
- Header renders with gradient and title
- Map shows with markers on correct locations
- Stop cards display with numbered list, tags, Google Maps links
- Urbex section renders with dark theme
- Tag filter toggles stop visibility
- Language switcher changes UI strings
- Print preview (`Ctrl+P`) shows clean layout without map/filters

**Step 3: Fix any issues found**

**Step 4: Final commit**

```bash
git add -A
git commit -m "fix: address smoke test issues"
```

---

### Task 14: Clean up unused files

**Step 1: Remove old demo routes if no longer needed**

Check `src/routes/demo/` — if these are just scaffolding demos, remove them.

**Step 2: Remove the old `page.svelte.spec.ts` if it tests the old page**

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: clean up scaffolding and unused files"
```
