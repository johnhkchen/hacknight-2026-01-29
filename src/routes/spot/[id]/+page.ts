import { error } from '@sveltejs/kit';
import { getSpotById } from '$lib/data/spots.js';
import type { PageLoad } from './$types.js';

export const load: PageLoad = ({ params }) => {
	const spot = getSpotById(params.id);

	if (!spot) {
		throw error(404, {
			message: `Spot "${params.id}" not found`
		});
	}

	return { spot };
};
