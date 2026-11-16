# Swipable Day Pagination Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the vertical all-days-at-once layout with a horizontal swipable paginator showing one day at a time, with GSAP-animated dot indicators.

**Architecture:** CSS `scroll-snap` container holds 7 day panels as full-width flex children. An `IntersectionObserver` tracks which day is visible and updates a `$state` index. GSAP animates the dot indicator and powers `scrollTo` on dot tap. Print styles revert to vertical stacked layout.

**Tech Stack:** Svelte 5, CSS scroll-snap, GSAP (core + ScrollToPlugin), Tailwind CSS 4

---

### Task 1: Install GSAP

**Step 1: Install the dependency**

Run: `pnpm add gsap`

**Step 2: Verify installation**

Run: `pnpm ls gsap`
Expected: `gsap` appears in the dependency list.

**Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add gsap dependency for page transition animations"
```

---

### Task 2: Create DayPaginator component (scroll-snap, no animations yet)

**Files:**
- Create: `src/lib/components/DayPaginator.svelte`

**Step 1: Create the component**

```svelte
<script lang="ts">
	import type { DayData } from '$lib/types';
	import DaySection from './DaySection.svelte';

	let {
		days,
		activeTags
	}: {
		days: DayData[];
		activeTags: Set<string>;
	} = $props();

	let activeDay = $state(0);
	let scrollContainer: HTMLDivElement | undefined = $state();
	let dayElements: HTMLDivElement[] = $state([]);

	$effect(() => {
		if (!scrollContainer) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						const index = dayElements.indexOf(entry.target as HTMLDivElement);
						if (index !== -1) activeDay = index;
					}
				}
			},
			{ root: scrollContainer, threshold: 0.5 }
		);

		for (const el of dayElements) {
			if (el) observer.observe(el);
		}

		return () => observer.disconnect();
	});

	function scrollToDay(index: number) {
		dayElements[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
	}
</script>

<!-- Dot indicator -->
<div class="print:hidden flex justify-center gap-2 mb-4">
	{#each days as day, i (day.title)}
		<button
			type="button"
			onclick={() => scrollToDay(i)}
			class="flex flex-col items-center gap-1 transition-all duration-200"
			aria-label="Go to {day.title}"
		>
			<span
				class="block rounded-full transition-all duration-200 {i === activeDay
					? 'h-3 w-3 bg-indigo-500'
					: 'h-2 w-2 bg-gray-300'}"
			></span>
			<span
				class="text-xs transition-opacity duration-200 {i === activeDay
					? 'text-indigo-600 font-semibold opacity-100'
					: 'text-gray-400 opacity-0 sm:opacity-100'}"
			>
				{day.title}
			</span>
		</button>
	{/each}
</div>

<!-- Scroll-snap container -->
<div
	bind:this={scrollContainer}
	class="print:block flex snap-x snap-mandatory overflow-x-auto scrollbar-none -mx-4"
	style="-webkit-overflow-scrolling: touch; scrollbar-width: none;"
>
	{#each days as day, i (day.title)}
		<div
			bind:this={dayElements[i]}
			class="print:w-auto w-full flex-shrink-0 snap-start px-4"
		>
			<DaySection {day} {activeTags} />
		</div>
	{/each}
</div>
```

**Step 2: Build check**

Run: `pnpm build 2>&1 | tail -5`
Expected: Build succeeds (component exists but isn't wired up yet).

**Step 3: Commit**

```bash
git add src/lib/components/DayPaginator.svelte
git commit -m "feat: add DayPaginator component with scroll-snap and dot indicators"
```

---

### Task 3: Wire DayPaginator into +page.svelte

**Files:**
- Modify: `src/routes/+page.svelte`

**Step 1: Replace the day loop with DayPaginator**

In `+page.svelte`, replace:
```svelte
	{#each data.days as day (day.title)}
		<DaySection {day} {activeTags} />
	{/each}
```

With:
```svelte
	<DayPaginator days={data.days} {activeTags} />
```

Update the imports — add `DayPaginator`, remove `DaySection`:
```typescript
	import DayPaginator from '$lib/components/DayPaginator.svelte';
```
Remove the `DaySection` import line.

**Step 2: Build and verify**

Run: `pnpm build 2>&1 | tail -5`
Expected: Build succeeds.

**Step 3: Manual check**

Run: `pnpm dev`
Verify: Page shows one day at a time, swiping horizontally moves between days, dots update.

**Step 4: Commit**

```bash
git add src/routes/+page.svelte
git commit -m "feat: wire DayPaginator into page, replacing vertical day list"
```

---

### Task 4: Add GSAP animations to dot indicator

**Files:**
- Modify: `src/lib/components/DayPaginator.svelte`

**Step 1: Add GSAP imports and animate dots**

Add to the `<script>` block:
```typescript
	import { gsap } from 'gsap';
	import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

	gsap.registerPlugin(ScrollToPlugin);
```

Replace the `scrollToDay` function:
```typescript
	function scrollToDay(index: number) {
		if (!scrollContainer) return;
		gsap.to(scrollContainer, {
			scrollTo: { x: dayElements[index] },
			duration: 0.4,
			ease: 'power2.out'
		});
	}
```

Add a `$effect` that animates dots on `activeDay` change:
```typescript
	let dotElements: HTMLSpanElement[] = $state([]);

	$effect(() => {
		// Reference activeDay to track it
		const current = activeDay;

		dotElements.forEach((dot, i) => {
			if (!dot) return;
			gsap.to(dot, {
				scale: i === current ? 1.3 : 1,
				duration: 0.25,
				ease: 'back.out(2)'
			});
		});
	});
```

Update the dot `<span>` to bind refs:
```svelte
			<span
				bind:this={dotElements[i]}
				class="block rounded-full transition-all duration-200 {i === activeDay
					? 'h-3 w-3 bg-indigo-500'
					: 'h-2 w-2 bg-gray-300'}"
			></span>
```

**Step 2: Build check**

Run: `pnpm build 2>&1 | tail -5`
Expected: Build succeeds.

**Step 3: Manual check**

Run: `pnpm dev`
Verify: Dots scale with a springy animation on swipe. Tapping a dot smoothly scrolls to that day via GSAP.

**Step 4: Commit**

```bash
git add src/lib/components/DayPaginator.svelte
git commit -m "feat: add GSAP animations to dot indicator and scroll-to-day"
```

---

### Task 5: Print styles — revert to vertical layout

**Files:**
- Modify: `src/lib/components/DayPaginator.svelte`

**Step 1: Verify print classes are in place**

The component already has:
- `print:hidden` on the dot indicator div
- `print:block` on the scroll container (overrides `flex` to `block`, breaking the horizontal layout)
- `print:w-auto` on each day panel (overrides `w-full` fixed width)

No code changes needed — just verify these classes exist from Task 2.

**Step 2: Manual check**

Run: `pnpm dev`, open browser, Ctrl+P (print preview).
Verify: All 7 days appear stacked vertically, no dots visible, no horizontal scroll.

**Step 3: Commit (if any tweaks were needed)**

```bash
git add src/lib/components/DayPaginator.svelte
git commit -m "fix: ensure print layout shows all days vertically"
```

---

### Task 6: Hide scrollbar cross-browser

**Files:**
- Modify: `src/lib/components/DayPaginator.svelte` (or `src/app.css` if a global utility is preferred)

**Step 1: Add scrollbar-hiding CSS**

The inline `scrollbar-width: none` handles Firefox. For WebKit/Chrome, add a `<style>` block to `DayPaginator.svelte`:

```svelte
<style>
	.scrollbar-none::-webkit-scrollbar {
		display: none;
	}
</style>
```

**Step 2: Verify**

Run: `pnpm dev` on Chrome/Safari mobile emulation.
Expected: No visible scrollbar on the swipe container.

**Step 3: Commit**

```bash
git add src/lib/components/DayPaginator.svelte
git commit -m "fix: hide scrollbar on WebKit browsers"
```

---

## Verification Checklist

1. `pnpm build` succeeds
2. Swipe left/right on mobile (or trackpad) moves between days
3. Dot indicator updates on swipe with GSAP spring animation
4. Tapping a dot GSAP-scrolls to that day
5. Only one day visible at a time
6. Map + TagFilter stay fixed above
7. FuelSettings floating button still works
8. Print preview shows all 7 days stacked vertically
9. No visible scrollbar on mobile
