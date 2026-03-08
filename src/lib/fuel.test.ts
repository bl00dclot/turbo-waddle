import { describe, it, expect } from 'vitest';
import { calculateFuel, sectionFuel, dayFuel, DEFAULT_FUEL_CONFIG } from './fuel';
import type { RouteSection } from './types';

describe('calculateFuel', () => {
	it('calculates flat road fuel', () => {
		const result = calculateFuel(100, 0, DEFAULT_FUEL_CONFIG);
		expect(result.liters).toBeCloseTo(8);
		expect(result.cost).toBeCloseTo(25.6);
	});

	it('adds elevation penalty', () => {
		const result = calculateFuel(100, 1000, DEFAULT_FUEL_CONFIG);
		expect(result.liters).toBeCloseTo(10.5); // 8 + 2.5
		expect(result.cost).toBeCloseTo(33.6);
	});

	it('handles zero distance', () => {
		const result = calculateFuel(0, 0, DEFAULT_FUEL_CONFIG);
		expect(result.liters).toBe(0);
		expect(result.cost).toBe(0);
	});

	it('Zugdidi → Mestia (135km, +1400m)', () => {
		const result = calculateFuel(135, 1400, DEFAULT_FUEL_CONFIG);
		expect(result.liters).toBeCloseTo(14.3);
		expect(result.cost).toBeCloseTo(45.76);
	});

	it('Nokalakevi → Zugdidi (45km, +50m)', () => {
		const result = calculateFuel(45, 50, DEFAULT_FUEL_CONFIG);
		expect(result.liters).toBeCloseTo(3.725);
		expect(result.cost).toBeCloseTo(11.92);
	});
});

describe('sectionFuel', () => {
	it('uses section distance and elevation', () => {
		const section = {
			heading: 'Test',
			distance_km: 100,
			drive_time: '1 hr',
			elevation_gain_m: 500,
			stops: [],
			urbex: []
		} satisfies RouteSection;

		const result = sectionFuel(section, DEFAULT_FUEL_CONFIG);
		expect(result.liters).toBeCloseTo(9.25); // 8 + 1.25
	});

	it('handles missing elevation', () => {
		const section = {
			heading: 'Test',
			distance_km: 100,
			drive_time: '1 hr',
			stops: [],
			urbex: []
		} satisfies RouteSection;

		const result = sectionFuel(section, DEFAULT_FUEL_CONFIG);
		expect(result.liters).toBeCloseTo(8);
	});
});

describe('dayFuel', () => {
	it('sums across sections', () => {
		const sections: RouteSection[] = [
			{ heading: 'A', distance_km: 100, drive_time: '1h', elevation_gain_m: 0, stops: [], urbex: [] },
			{ heading: 'B', distance_km: 50, drive_time: '30m', elevation_gain_m: 1000, stops: [], urbex: [] }
		];

		const result = dayFuel(sections, DEFAULT_FUEL_CONFIG);
		expect(result.liters).toBeCloseTo(14.5); // 8 + (4 + 2.5)
		expect(result.cost).toBeCloseTo(46.4);
	});
});
