<script lang="ts">
	import { TAG_CONFIG, type Stop } from '$lib/types';

	let { stop, index }: { stop: Stop; index: number } = $props();
</script>

<div class="flex items-start gap-4 rounded-xl border bg-white p-4 transition-shadow hover:shadow-md">
	<div
		class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 font-bold text-sm text-indigo-700"
	>
		{index}
	</div>

	<div class="min-w-0 flex-1">
		<div class="flex items-center gap-2">
			<h3 class="font-bold text-gray-900">{stop.name}</h3>
			<a
				href="https://www.google.com/maps?q={stop.coords}"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 hover:bg-indigo-100"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-3.5 w-3.5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
						clip-rule="evenodd"
					/>
				</svg>
				Map
			</a>
		</div>

		<p class="mt-1 text-sm text-gray-500">{stop.desc}</p>

		{#if stop.tags.length > 0}
			<div class="mt-2 flex flex-wrap gap-1.5">
				{#each stop.tags as tag (tag)}
					{@const config = TAG_CONFIG[tag]}
					{#if config}
						<span
							class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium {config.bg} {config.text}"
						>
							{config.icon}
							{tag}
						</span>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
</div>
