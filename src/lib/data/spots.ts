/**
 * Data loader for spot and era data.
 * Imports from the pre-populated spots.json and provides type-safe access.
 * Merges in generated video URLs from the metadata store.
 */

import type { Spot, SpotsData } from '$lib/types.js';
import spotsJson from './spots.json';
import generatedVideosJson from './generated-videos.json';

// Enrich a single spot with video URLs from generated videos metadata
function enrichSpotWithVideos(spot: Spot, videoMetadata: Array<{ spotId: string; eraId: string; localPath: string; status: string }>): Spot {
	return {
		...spot,
		eras: spot.eras.map(era => {
			const metadata = videoMetadata.find(
				v => v.spotId === spot.id && v.eraId === era.id && v.status === 'ready'
			);

			if (metadata && metadata.localPath) {
				// Use R2 CDN for video hosting
				const filename = metadata.localPath.replace(/^static\/videos\//, '');
				return {
					...era,
					videoUrl: `https://timelens-sf-videos.b28.dev/videos/${filename}`
				};
			}

			return era;
		})
	};
}

/**
 * Returns all spots in the dataset with video URLs populated from metadata.
 * Re-reads source data on each call to pick up changes during development.
 */
export function getAllSpots(): Spot[] {
	const data = spotsJson as SpotsData;
	const videoMetadata = (generatedVideosJson as { videos: Array<{ spotId: string; eraId: string; localPath: string; status: string }> }).videos;
	return data.spots.map(spot => enrichSpotWithVideos(spot, videoMetadata));
}

/**
 * Returns a spot by its ID, or undefined if not found.
 */
export function getSpotById(id: string): Spot | undefined {
	const data = spotsJson as SpotsData;
	const videoMetadata = (generatedVideosJson as { videos: Array<{ spotId: string; eraId: string; localPath: string; status: string }> }).videos;
	const spot = data.spots.find((s) => s.id === id);
	return spot ? enrichSpotWithVideos(spot, videoMetadata) : undefined;
}
