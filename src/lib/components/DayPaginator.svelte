<script lang="ts">
	import type { DayData } from '$lib/types';
	import DaySection from './DaySection.svelte';

	let { days, activeTags }: { days: DayData[]; activeTags: Set<string> } = $props();

	let activeDay = $state(0);
	let scrollContainer: HTMLDivElement | undefined = $state();
	let dayPanels: HTMLDivElement[] = $state([]);

	function scrollToDay(index: number) {
		const panel = dayPanels[index];
		if (panel) {
			panel.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
		}
	}

	$effect(() => {
		const container = scrollContainer;
		if (!container) return;

		const observers: IntersectionObserver[] = [];

		for (let i = 0; i < dayPanels.length; i++) {
			const panel = dayPanels[i];
			if (!panel) continue;

			const observer = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						if (entry.isIntersecting) {
							activeDay = i;
						}
					}
				},
				{ root: container, threshold: 0.5 }
			);

			observer.observe(panel);
			observers.push(observer);
		}

		return () => {
			for (const observer of observers) {
				observer.disconnect();
			}
		};
	});
</script>

<!-- Dot indicator row -->
<nav class="flex items-end justify-center gap-3 pb-3 print:hidden" aria-label="Day navigation">
	{#each days as day, i (day.title)}
		<button
			class="flex flex-col items-center gap-1 transition-all"
			onclick={() => scrollToDay(i)}
			aria-label="Go to {day.title}"
			aria-current={activeDay === i ? 'step' : undefined}
		>
			<span
				class="rounded-full transition-all {activeDay === i
					? 'h-3 w-3 bg-indigo-500'
					: 'h-2 w-2 bg-gray-300'}"
			></span>
			<span
				class="text-xs transition-opacity whitespace-nowrap {activeDay === i
					? 'text-indigo-600 font-semibold opacity-100'
					: 'opacity-0 sm:opacity-100 text-gray-400'}"
			>
				{day.title}
			</span>
		</button>
	{/each}
</nav>

<!-- Scroll-snap container -->
<div
	bind:this={scrollContainer}
	class="scrollbar-none flex snap-x snap-mandatory overflow-x-auto -mx-4 print:block"
	style="-webkit-overflow-scrolling: touch; scrollbar-width: none;"
>
	{#each days as day, i (day.title)}
		<div
			bind:this={dayPanels[i]}
			class="w-full flex-shrink-0 snap-start px-4 print:w-auto"
		>
			<DaySection {day} {activeTags} />
		</div>
	{/each}
</div>

<style>
	.scrollbar-none::-webkit-scrollbar {
		display: none;
	}
</style>
