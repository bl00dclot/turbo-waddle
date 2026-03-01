<script lang="ts">
	import type { UrbexSpot } from '$lib/types';

	let { spot }: { spot: UrbexSpot } = $props();
</script>

<a
	href={`https://www.google.com/maps?q=${spot.decimal}`}
	target="_blank"
	rel="noopener noreferrer"
	class="bg-zinc-800 border border-zinc-700 rounded-lg p-3 hover:border-amber-400 hover:bg-zinc-750 transition-colors block no-underline"
>
	<p class="text-white font-semibold text-sm">{spot.name}</p>
	<p class="text-xs font-mono text-zinc-400">{spot.coords}</p>
</a>
