<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity';
	import { TAG_CONFIG } from '$lib/types';

	let { allTags, activeTags = $bindable() }: { allTags: string[]; activeTags: Set<string> } = $props();

	function toggleTag(tag: string) {
		const next = new SvelteSet(activeTags);
		if (next.has(tag)) {
			next.delete(tag);
		} else {
			next.add(tag);
		}
		activeTags = next;
	}

	function clearAll() {
		activeTags = new SvelteSet<string>();
	}

	const isAllActive = $derived(activeTags.size === 0);
</script>

<div class="flex flex-wrap gap-2">
	<button
		type="button"
		onclick={clearAll}
		class="rounded-full px-3 py-1 text-sm font-medium transition-colors {isAllActive
			? 'bg-indigo-600 text-white'
			: 'bg-gray-200 text-gray-600 hover:bg-gray-300'}"
	>
		All
	</button>

	{#each allTags as tag (tag)}
		{@const config = TAG_CONFIG[tag]}
		{@const isActive = activeTags.has(tag)}
		<button
			type="button"
			onclick={() => toggleTag(tag)}
			class="rounded-full px-3 py-1 text-sm font-medium transition-colors {isActive
				? `${config?.bg ?? 'bg-gray-200'} ${config?.text ?? 'text-gray-800'}`
				: 'bg-gray-200 text-gray-600 hover:bg-gray-300'}"
		>
			{config?.icon ?? ''} {tag}
		</button>
	{/each}
</div>
