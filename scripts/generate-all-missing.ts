/**
 * Concurrent Video Generation for All Missing Videos
 *
 * Generates videos for all spots that are missing at least one era video.
 * Runs multiple spots in parallel for faster completion.
 */

import { generateAndStoreVideo } from '../src/lib/wanx/video-storage';
import { getAllVideoMetadata } from '../src/lib/wanx/video-metadata';
import spotsData from '../src/lib/data/spots.json';
import type { Spot, Era } from '../src/lib/types';

const DASHSCOPE_API_KEY = process.env.DASHSCOPE_API_KEY;

if (!DASHSCOPE_API_KEY) {
	console.error('Error: DASHSCOPE_API_KEY environment variable not set');
	console.error('Set it with: export DASHSCOPE_API_KEY=your-api-key');
	process.exit(1);
}

interface MissingEra {
	spot: Spot;
	era: Era;
}

function findMissingVideos(): MissingEra[] {
	const metadata = getAllVideoMetadata();
	const missing: MissingEra[] = [];

	for (const spot of spotsData.spots) {
		for (const era of spot.eras) {
			const existing = metadata.find(
				(m) =>
					m.spotId === spot.id &&
					m.eraId === era.id &&
					(m.status === 'ready' || m.status === 'generating')
			);

			if (!existing) {
				missing.push({ spot, era });
			}
		}
	}

	return missing;
}

async function generateEra(spot: Spot, era: Era, index: number, total: number) {
	const prefix = `[${index}/${total}] ${spot.name} - ${era.title}`;

	console.log(`\n${prefix}: Starting...`);

	try {
		const result = await generateAndStoreVideo(spot, era, DASHSCOPE_API_KEY, (progress) => {
			switch (progress.stage) {
				case 'submitting':
					console.log(`${prefix}: Submitted to WAN API`);
					break;
				case 'generating':
					if (progress.attempt && progress.attempt % 5 === 0) {
						console.log(`${prefix}: Generating... (${progress.attempt} attempts)`);
					}
					break;
				case 'downloading':
					console.log(`${prefix}: Downloading video`);
					break;
				case 'complete':
					// Will be handled below
					break;
			}
		});

		if (result.success) {
			console.log(`${prefix}: ✅ Complete - ${result.localPath}`);
		} else {
			console.log(`${prefix}: ❌ Failed - ${result.error}`);
		}

		return result;
	} catch (error) {
		const errorMsg = error instanceof Error ? error.message : String(error);
		console.log(`${prefix}: ❌ Error - ${errorMsg}`);
		return { success: false, error: errorMsg };
	}
}

async function main() {
	console.log('🚀 TimeLens Concurrent Video Generation');
	console.log('========================================\n');

	// Find all missing videos
	const missing = findMissingVideos();

	if (missing.length === 0) {
		console.log('✨ All videos already generated!');
		console.log('\nTo regenerate specific videos, delete entries from:');
		console.log('   src/lib/data/generated-videos.json\n');
		return;
	}

	console.log(`Found ${missing.length} videos to generate:\n`);

	// Group by spot for display
	const bySpot = new Map<string, Era[]>();
	for (const { spot, era } of missing) {
		if (!bySpot.has(spot.id)) {
			bySpot.set(spot.id, []);
		}
		bySpot.get(spot.id)!.push(era);
	}

	for (const [spotId, eras] of bySpot) {
		const spot = spotsData.spots.find((s) => s.id === spotId);
		console.log(`  ${spot?.name}: ${eras.map((e) => e.title).join(', ')}`);
	}

	console.log(`\n⏱️  Running all ${missing.length} generations sequentially...`);
	console.log(`Estimated time: ${missing.length * 7} minutes (about 7 min per video)\n`);

	const startTime = Date.now();

	// Generate all videos sequentially to avoid rate limits
	const results = [];
	for (let i = 0; i < missing.length; i++) {
		const { spot, era } = missing[i];
		const result = await generateEra(spot, era, i + 1, missing.length);
		results.push(result);
	}

	const elapsed = Math.round((Date.now() - startTime) / 1000);
	const minutes = Math.floor(elapsed / 60);
	const seconds = elapsed % 60;

	console.log('\n========================================');
	console.log('🎉 Generation Complete!\n');
	console.log(`Total time: ${minutes}m ${seconds}s`);
	console.log(`Successful: ${results.filter((r) => r.success).length}/${results.length}`);
	console.log(`Failed: ${results.filter((r) => !r.success).length}/${results.length}`);

	if (results.some((r) => !r.success)) {
		console.log('\n❌ Failed videos:');
		results.forEach((result, index) => {
			if (!result.success) {
				const { spot, era } = missing[index];
				console.log(`   - ${spot.name} / ${era.title}: ${result.error}`);
			}
		});
	}

	console.log('\n📁 Videos saved to: static/videos/');
	console.log('📊 Metadata updated: src/lib/data/generated-videos.json');
	console.log('\n🌐 Start dev server and visit:');
	console.log('   http://localhost:5173/spots - Browse all locations');
	console.log('   http://localhost:5173/gallery - View video gallery\n');
}

main().catch((error) => {
	console.error('\n💥 Fatal error:', error);
	process.exit(1);
});
