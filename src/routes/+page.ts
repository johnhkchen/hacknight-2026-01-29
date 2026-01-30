import { getAllSpots } from '$lib/data/spots.js';
import type { PageLoad } from './$types.js';

export const load: PageLoad = () => {
	const spots = getAllSpots();
	return { spots };
};
