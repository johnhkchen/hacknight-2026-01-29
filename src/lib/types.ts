/**
 * Core data types for TimeLens spots and eras.
 */

export interface Coordinates {
	latitude: number;
	longitude: number;
}

export type EraIcon = 'anchor' | 'factory' | 'building' | 'ship' | 'users' | 'mountain' | 'flower' | 'train' | 'temple' | 'castle';

export interface Era {
	id: string;
	title: string;
	yearStart: number;
	yearEnd: number | null;
	description: string;
	wanPrompt: string;
	videoUrl: string | null;
	icon: EraIcon;
}

export interface Spot {
	id: string;
	name: string;
	description: string;
	coordinates: Coordinates;
	imageUrl: string;
	category: string;
	eras: Era[];
}

export interface SpotsData {
	spots: Spot[];
}
