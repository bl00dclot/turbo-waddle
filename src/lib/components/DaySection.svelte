<script lang="ts">
	import type { DayData } from '$lib/types';
	import StopCard from './StopCard.svelte';
	import UrbexCard from './UrbexCard.svelte';

	let { day, activeTags }: { day: DayData; activeTags: Set<string> } = $props();

	let filteredSections = $derived(
		day.sections.map((section) => ({
			...section,
			filteredStops:
				activeTags.size === 0
					? section.stops
					: section.stops.filter((stop) => stop.tags.some((tag) => activeTags.has(tag)))
		}))
	);
</script>

<div class="space-y-6">
	<div class="flex justify-center">
		<span
			class="bg-gradient-to-r from-indigo-700 to-indigo-500 text-white font-bold text-sm px-4 py-1.5 rounded-full uppercase tracking-wide"
		>
			{day.title}
		</span>
	</div>

	{#each filteredSections as section (section.heading)}
		<div class="space-y-4">
			<h2 class="text-xl font-semibold text-gray-900">🛣 {section.heading}</h2>

			{#if section.filteredStops.length > 0}
				<div class="space-y-3">
					{#each section.filteredStops as stop, i (stop.name)}
						<StopCard {stop} index={i + 1} />
					{/each}
				</div>
			{/if}

			{#if section.urbex.length > 0}
				<div class="bg-zinc-900 rounded-xl border border-zinc-800 p-5">
					<h3 class="text-amber-400 font-semibold text-lg mb-4">
						⚠️ Digger / Urbex Locations
					</h3>
					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
						{#each section.urbex as spot (spot.name)}
							<UrbexCard {spot} />
						{/each}
					</div>
				</div>
			{/if}
		</div>
	{/each}
</div>
