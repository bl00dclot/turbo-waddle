import { DEFAULT_FUEL_CONFIG } from './fuel';
import type { FuelConfig } from './types';

const STORAGE_KEY = 'fuel-config';

export let fuelConfig: FuelConfig = $state({ ...DEFAULT_FUEL_CONFIG });

export function saveFuelConfig(): void {
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(fuelConfig));
	}
}

export function loadFuelConfig(): void {
	if (typeof localStorage !== 'undefined') {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				const parsed = JSON.parse(stored) as FuelConfig;
				fuelConfig.pricePerLiter = parsed.pricePerLiter;
				fuelConfig.consumptionPer100km = parsed.consumptionPer100km;
				fuelConfig.elevationPenalty = parsed.elevationPenalty;
			} catch {
				// ignore invalid stored data
			}
		}
	}
}
