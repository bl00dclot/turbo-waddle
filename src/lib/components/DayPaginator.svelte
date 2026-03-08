<script lang="ts">
	import type { DayData } from '$lib/types';
	import DaySection from './DaySection.svelte';
	import { gsap } from 'gsap';
	import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

	gsap.registerPlugin(ScrollToPlugin);

	let { days, activeTags }: { days: DayData[]; activeTags: Set<string> } = $props();

	let activeDay = $state(0);
	let scrollContainer: HTMLDivElement | undefined = $state();
	let dayPanels: HTMLDivElement[] = $state([]);
	let dotElements: HTMLSpanElement[] = $state([]);

	function scrollToDay(index: number) {
		if (!scrollContainer) return;
		const panel = dayPanels[index];
		if (!panel) return;
		gsap.to(scrollContainer, {
			scrollTo: { x: panel },
			duration: 0.4,
			ease: 'power2.out'
		});
	}

	$effect(() => {
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
				bind:this={dotElements[i]}
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
>
	{#each days as day, i (day.title)}
		<div
			bind:this={dayPanels[i]}
			class="w-full flex-shrink-0 snap-start snap-always px-4 print:w-auto"
		>
			<DaySection {day} {activeTags} />
		</div>
	{/each}
</div>

<style>
	.scrollbar-none {
		scrollbar-width: none;
	}
	.scrollbar-none::-webkit-scrollbar {
		display: none;
	}
</style>
