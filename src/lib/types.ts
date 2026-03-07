export interface Stop {
	name: string;
	desc: string;
	coords: string;
	tags: string[];
}

export interface UrbexSpot {
	name: string;
	coords: string;
	decimal: string;
}

export interface RouteSection {
	heading: string;
	distance_km: number;
	drive_time: string;
	stops: Stop[];
	urbex: UrbexSpot[];
}

export interface DailyDriving {
	total_km: number;
	total_time: string;
}

export interface DayData {
	title: string;
	daily_driving: DailyDriving;
	sections: RouteSection[];
}

export const TAG_CONFIG: Record<string, { bg: string; text: string; icon: string }> = {
	fortress: { bg: 'bg-amber-100', text: 'text-amber-800', icon: '🏰' },
	viewpoint: { bg: 'bg-blue-100', text: 'text-blue-800', icon: '👁' },
	monastery: { bg: 'bg-violet-100', text: 'text-violet-800', icon: '⛪' },
	village: { bg: 'bg-emerald-100', text: 'text-emerald-800', icon: '🏘' },
	food: { bg: 'bg-pink-100', text: 'text-pink-800', icon: '🍯' },
	wine: { bg: 'bg-yellow-200', text: 'text-yellow-900', icon: '🍷' },
	museum: { bg: 'bg-indigo-100', text: 'text-indigo-800', icon: '🏛' },
	palace: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '👑' },
	ancient: { bg: 'bg-purple-100', text: 'text-purple-800', icon: '🏚' },
	nature: { bg: 'bg-green-100', text: 'text-green-800', icon: '🌳' },
	academy: { bg: 'bg-cyan-100', text: 'text-cyan-800', icon: '📚' },
	soviet: { bg: 'bg-gray-200', text: 'text-gray-800', icon: '☭' },
	sculpture: { bg: 'bg-pink-200', text: 'text-pink-900', icon: '🗿' },
	bakery: { bg: 'bg-orange-200', text: 'text-orange-800', icon: '🍞' },
	racetrack: { bg: 'bg-blue-200', text: 'text-blue-900', icon: '🏁' },
	offroad: { bg: 'bg-zinc-300', text: 'text-zinc-700', icon: '🚙' },
	winery: { bg: 'bg-amber-100', text: 'text-amber-900', icon: '🍇' },
	spa: { bg: 'bg-sky-100', text: 'text-sky-800', icon: '♨️' },
	art: { bg: 'bg-amber-100', text: 'text-amber-800', icon: '🎨' },
	mosque: { bg: 'bg-green-50', text: 'text-green-800', icon: '🕌' },
	observatory: { bg: 'bg-indigo-950', text: 'text-indigo-200', icon: '🔭' },
	architecture: { bg: 'bg-pink-50', text: 'text-pink-800', icon: '🏛' }
};
