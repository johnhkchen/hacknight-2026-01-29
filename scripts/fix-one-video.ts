/**
 * Fix a Single Stuck Video
 *
 * Marks a specific video as failed and regenerates it.
 * Usage: tsx scripts/fix-one-video.ts golden-gate-park ggp-sand-dunes
 */

import { markVideoFailed } from '../src/lib/wanx/video-metadata';
import { generateAndStoreVideo } from '../src/lib/wanx/video-storage';
import spotsData from '../src/lib/data/spots.json';

const DASHSCOPE_API_KEY = process.env.DASHSCOPE_API_KEY;

if (!DASHSCOPE_API_KEY) {
	console.error('Error: DASHSCOPE_API_KEY environment variable not set');
	process.exit(1);
}

async function main() {
	const spotId = process.argv[2];
	const eraId = process.argv[3];

	if (!spotId || !eraId) {
		console.log('Usage: npm run fix-one-video <spot-id> <era-id>');
		console.log('\nExample: npm run fix-one-video golden-gate-park ggp-sand-dunes');
		console.log('\nAvailable spots and eras:');
		for (const spot of spotsData.spots) {
			console.log(`\n${spot.name} (${spot.id}):`);
			spot.eras.forEach(era => {
				console.log(`  - ${era.title}: ${era.id}`);
			});
		}
		process.exit(1);
	}

	const spot = spotsData.spots.find(s => s.id === spotId);
	if (!spot) {
		console.error(`Error: Spot "${spotId}" not found`);
		process.exit(1);
	}

	const era = spot.eras.find(e => e.id === eraId);
	if (!era) {
		console.error(`Error: Era "${eraId}" not found in spot "${spotId}"`);
		process.exit(1);
	}

	console.log('🔧 Fixing Stuck Video');
	console.log('=====================\n');
	console.log(`Spot: ${spot.name}`);
	console.log(`Era: ${era.title} (${era.yearStart})`);
	console.log('');

	// Mark as failed first
	console.log('Marking as failed...');
	markVideoFailed(spotId, eraId, 'Manually marked for regeneration');

	// Regenerate
	console.log('Starting regeneration...\n');

	const result = await generateAndStoreVideo(spot, era, DASHSCOPE_API_KEY, (progress) => {
		switch (progress.stage) {
			case 'submitting':
				console.log('Submitted to WAN API');
				break;
			case 'generating':
				if (progress.attempt && progress.attempt % 5 === 0) {
					console.log(`Generating... (${progress.attempt} attempts)`);
				}
				break;
			case 'downloading':
				console.log('Downloading video');
				break;
		}
	});

	console.log('\n=====================');
	if (result.success) {
		console.log('✅ Success!');
		console.log(`Video: ${result.localPath}`);
	} else {
		console.log('❌ Failed');
		console.log(`Error: ${result.error}`);
	}
	console.log('');
}

main().catch(error => {
	console.error('Error:', error);
	process.exit(1);
});
