<script lang="ts">
	import { fuelConfig, saveFuelConfig } from '$lib/fuel-config.svelte';
	import { DEFAULT_FUEL_CONFIG } from '$lib/fuel';

	let open = $state(false);

	function resetToDefaults() {
		fuelConfig.pricePerLiter = DEFAULT_FUEL_CONFIG.pricePerLiter;
		fuelConfig.consumptionPer100km = DEFAULT_FUEL_CONFIG.consumptionPer100km;
		fuelConfig.elevationPenalty = DEFAULT_FUEL_CONFIG.elevationPenalty;
		saveFuelConfig();
	}
</script>

{#if open}
	<div
		class="print:hidden fixed right-4 bottom-20 z-50 w-72 rounded-lg bg-gray-800 p-4 text-white shadow-xl"
	>
		<h3 class="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-300">
			Fuel Settings
		</h3>

		<label class="mb-2 block">
			<span class="mb-1 block text-xs text-gray-400">Fuel price (GEL/L)</span>
			<input
				type="number"
				min="0"
				step="0.1"
				bind:value={fuelConfig.pricePerLiter}
				oninput={() => saveFuelConfig()}
				class="w-full rounded bg-gray-700 px-2 py-1 text-sm text-white"
			/>
		</label>

		<label class="mb-2 block">
			<span class="mb-1 block text-xs text-gray-400">Consumption (L/100km)</span>
			<input
				type="number"
				min="0"
				step="0.5"
				bind:value={fuelConfig.consumptionPer100km}
				oninput={() => saveFuelConfig()}
				class="w-full rounded bg-gray-700 px-2 py-1 text-sm text-white"
			/>
		</label>

		<label class="mb-2 block">
			<span class="mb-1 block text-xs text-gray-400">Mountain penalty (L/1000m)</span>
			<input
				type="number"
				min="0"
				step="0.1"
				bind:value={fuelConfig.elevationPenalty}
				oninput={() => saveFuelConfig()}
				class="w-full rounded bg-gray-700 px-2 py-1 text-sm text-white"
			/>
		</label>

		<button
			type="button"
			onclick={resetToDefaults}
			class="mt-2 w-full rounded bg-gray-600 px-3 py-1.5 text-xs text-gray-200 hover:bg-gray-500"
		>
			Reset to defaults
		</button>
	</div>
{/if}

<button
	type="button"
	onclick={() => (open = !open)}
	class="print:hidden fixed right-4 bottom-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-xl shadow-lg hover:bg-gray-700"
>
	⛽
</button>
