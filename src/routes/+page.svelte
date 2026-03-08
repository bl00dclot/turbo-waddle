<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity';
	import RouteHeader from '$lib/components/RouteHeader.svelte';
	import Map from '$lib/components/Map.svelte';
	import TagFilter from '$lib/components/TagFilter.svelte';
	import DaySection from '$lib/components/DaySection.svelte';
	import FuelSettings from '$lib/components/FuelSettings.svelte';
	import { loadFuelConfig } from '$lib/fuel-config.svelte';

	let { data } = $props();

	$effect(() => {
		loadFuelConfig();
	});

	let activeTags = $state(new SvelteSet<string>());

	const allTags = $derived(
		[...new Set(data.days.flatMap((day) => day.sections.flatMap((s) => s.stops.flatMap((stop) => stop.tags))))]
	);
</script>

<svelte:head>
	<title>Trip to Sakartvelo</title>
</svelte:head>

<RouteHeader />

<div class="max-w-4xl mx-auto px-4 py-8">
	<div class="print:hidden mb-6">
		<TagFilter {allTags} bind:activeTags />
	</div>

	<div class="print:hidden mb-8">
		<Map days={data.days} {activeTags} />
	</div>

	{#each data.days as day (day.title)}
		<DaySection {day} {activeTags} />
	{/each}
</div>

<FuelSettings />
