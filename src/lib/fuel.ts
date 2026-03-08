import type { FuelConfig, FuelEstimate, RouteSection } from './types';

export const DEFAULT_FUEL_CONFIG: FuelConfig = {
	pricePerLiter: 3.2,
	consumptionPer100km: 8,
	elevationPenalty: 2.5
};

export function calculateFuel(
	distanceKm: number,
	elevationGainM: number,
	config: FuelConfig
): FuelEstimate {
	const baseLiters = (distanceKm / 100) * config.consumptionPer100km;
	const elevationLiters = (elevationGainM / 1000) * config.elevationPenalty;
	const liters = baseLiters + elevationLiters;
	return { liters, cost: liters * config.pricePerLiter };
}

export function sectionFuel(section: RouteSection, config: FuelConfig): FuelEstimate {
	return calculateFuel(section.distance_km, section.elevation_gain_m ?? 0, config);
}

export function dayFuel(sections: RouteSection[], config: FuelConfig): FuelEstimate {
	return sections.reduce(
		(acc, section) => {
			const est = sectionFuel(section, config);
			return { liters: acc.liters + est.liters, cost: acc.cost + est.cost };
		},
		{ liters: 0, cost: 0 }
	);
}
