/**
 * Video Generation Script
 *
 * Generates WAN videos for a specific spot or all spots.
 * Usage: node --loader ts-node/esm scripts/generate-videos.ts [spot-id]
 */

import { generateAndStoreVideo, generateAllEraVideos } from '../src/lib/wanx/video-storage';
import spotsData from '../src/lib/data/spots.json';
import type { Spot } from '../src/lib/types';

const DASHSCOPE_API_KEY = process.env.DASHSCOPE_API_KEY;

if (!DASHSCOPE_API_KEY) {
	console.error('Error: DASHSCOPE_API_KEY environment variable not set');
	console.error('Set it with: export DASHSCOPE_API_KEY=your-api-key');
	process.exit(1);
}

async function generateForSpot(spot: Spot) {
	console.log(`\n🎬 Generating videos for ${spot.name}`);
	console.log(`   Location: ${spot.description}`);
	console.log(`   Eras to generate: ${spot.eras.length}\n`);

	const results = await generateAllEraVideos(spot, DASHSCOPE_API_KEY, (eraId, progress) => {
		const era = spot.eras.find((e) => e.id === eraId);
		const eraTitle = era ? era.title : eraId;

		switch (progress.stage) {
			case 'prompting':
				console.log(`\n📝 [${eraTitle}] Building enhanced prompt`);
				break;
			case 'submitting':
				console.log(`   [${eraTitle}] Submitting to WAN API...`);
				break;
			case 'generating':
				console.log(`   [${eraTitle}] ${progress.message}`);
				break;
			case 'downloading':
				console.log(`   [${eraTitle}] Downloading video...`);
				break;
			case 'complete':
				console.log(`   [${eraTitle}] ${progress.message}`);
				break;
		}
	});

	console.log(`\n✅ Generation complete for ${spot.name}`);
	console.log(`   Successful: ${results.filter((r) => r.success).length}`);
	console.log(`   Failed: ${results.filter((r) => !r.success).length}`);

	results.forEach((result, index) => {
		const era = spot.eras[index];
		if (result.success) {
			console.log(`   ✓ ${era.title}: ${result.localPath}`);
		} else {
			console.log(`   ✗ ${era.title}: ${result.error}`);
		}
	});

	return results;
}

async function main() {
	const spotId = process.argv[2];

	if (!spotId) {
		console.log('Usage: npm run generate-videos [spot-id]');
		console.log('\nAvailable spots:');
		spotsData.spots.forEach((spot) => {
			console.log(`  - ${spot.id}: ${spot.name} (${spot.eras.length} eras)`);
		});
		process.exit(1);
	}

	const spot = spotsData.spots.find((s) => s.id === spotId);

	if (!spot) {
		console.error(`Error: Spot "${spotId}" not found`);
		console.log('\nAvailable spots:');
		spotsData.spots.forEach((s) => {
			console.log(`  - ${s.id}: ${s.name}`);
		});
		process.exit(1);
	}

	console.log('🚀 TimeLens Video Generation');
	console.log('============================\n');

	await generateForSpot(spot);

	console.log('\n🎉 Done!');
	console.log('\nNext steps:');
	console.log('  1. Check the videos in static/videos/');
	console.log('  2. View the gallery at http://localhost:5173/gallery');
	console.log('  3. Check metadata at src/lib/data/generated-videos.json\n');
}

main().catch((error) => {
	console.error('\n💥 Fatal error:', error);
	process.exit(1);
});
