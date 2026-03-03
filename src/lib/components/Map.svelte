<script lang="ts">
	import { onMount } from 'svelte';
	import type { DayData } from '$lib/types';
	import type L from 'leaflet';

	interface Props {
		days: DayData[];
		activeTags: Set<string>;
	}

	let { days, activeTags }: Props = $props();

	const TAG_COLORS: Record<string, string> = {
		fortress: '#92400e',
		viewpoint: '#1e40af',
		monastery: '#5b21b6',
		village: '#065f46',
		food: '#9d174d',
		wine: '#78350f',
		museum: '#3730a3',
		palace: '#854d0e',
		ancient: '#6b21a8',
		nature: '#166534',
		academy: '#155e75'
	};

	let mapContainer: HTMLDivElement;
	let map: L.Map | undefined;
	let markerLayer: L.LayerGroup | undefined;
	let leafletModule: typeof L | undefined;

	function updateMarkers(Leaf: typeof L) {
		if (!markerLayer || !map) return;

		markerLayer.clearLayers();

		const bounds: L.LatLngExpression[] = [];

		for (const day of days) {
			for (const section of day.sections) {
				for (const stop of section.stops) {
					if (activeTags.size > 0 && !stop.tags.some((t) => activeTags.has(t))) {
						continue;
					}

					const parts = stop.coords.split(',').map((s) => parseFloat(s.trim()));
					if (parts.length < 2 || isNaN(parts[0]) || isNaN(parts[1])) continue;

					const latlng: L.LatLngExpression = [parts[0], parts[1]];
					const color = TAG_COLORS[stop.tags[0]] ?? '#6b7280';

					const marker = Leaf.circleMarker(latlng, {
						radius: 8,
						fillColor: color,
						color: '#fff',
						weight: 2,
						fillOpacity: 0.8
					});

					const truncatedDesc =
						stop.desc.length > 120 ? stop.desc.slice(0, 120) + '...' : stop.desc;
					marker.bindPopup(`<strong>${stop.name}</strong><br>${truncatedDesc}`);

					marker.addTo(markerLayer);
					bounds.push(latlng);
				}

				for (const spot of section.urbex) {
					const parts = spot.decimal.split(',').map((s) => parseFloat(s.trim()));
					if (parts.length < 2 || isNaN(parts[0]) || isNaN(parts[1])) continue;

					const latlng: L.LatLngExpression = [parts[0], parts[1]];

					const marker = Leaf.circleMarker(latlng, {
						radius: 6,
						fillColor: '#000000',
						color: '#fff',
						weight: 2,
						fillOpacity: 0.9
					});

					marker.bindPopup(`<strong>URBEX: ${spot.name}</strong>`);
					marker.addTo(markerLayer);
					bounds.push(latlng);
				}
			}
		}

		if (bounds.length > 0) {
			map.fitBounds(Leaf.latLngBounds(bounds as L.LatLngExpression[]), { padding: [30, 30] });
		}
	}

	onMount(() => {
		let mounted = true;

		(async () => {
			const Leaf = await import('leaflet');
			await import('leaflet/dist/leaflet.css');

			if (!mounted) return;

			leafletModule = Leaf.default ?? Leaf;

			map = leafletModule.map(mapContainer).setView([41.75, 45.4], 9);
			leafletModule
				.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution: '&copy; OpenStreetMap contributors'
				})
				.addTo(map);

			markerLayer = leafletModule.layerGroup().addTo(map);
			updateMarkers(leafletModule);
		})();

		return () => {
			mounted = false;
			map?.remove();
		};
	});

	$effect(() => {
		// Reference activeTags.size and iterate to track reactivity
		const _size = activeTags.size;
		for (const _ of activeTags) {
			/* track each entry */
		}

		if (leafletModule && markerLayer && map) {
			updateMarkers(leafletModule);
		}
	});
</script>

<div bind:this={mapContainer} class="relative z-0 h-96 w-full overflow-hidden rounded-xl shadow-lg">
</div>
