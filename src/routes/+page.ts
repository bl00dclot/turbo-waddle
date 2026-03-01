import type { DayData } from '$lib/types';

export async function load() {
	const files = import.meta.glob('/src/content/*.md', { eager: true });
	const days: DayData[] = Object.entries(files)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([, mod]) => (mod as { metadata: DayData }).metadata);
	return { days };
}
