/**
 * Generate Remaining Videos - Batched Concurrent
 *
 * Processes missing/failed videos in small batches to balance speed and rate limits.
 * Runs 2 videos concurrently with 5 second delays between batches.
 */

import { generateAndStoreVideo } from '../src/lib/wanx/video-storage';
import { getAllVideoMetadata } from '../src/lib/wanx/video-metadata';
import spotsData from '../src/lib/data/spots.json';
import type { Spot, Era } from '../src/lib/types';

const DASHSCOPE_API_KEY = process.env.DASHSCOPE_API_KEY;

if (!DASHSCOPE_API_KEY) {
	console.error('Error: DASHSCOPE_API_KEY environment variable not set');
	process.exit(1);
}

const BATCH_SIZE = 2; // Process 2 videos at a time
const BATCH_DELAY_MS = 5000; // 5 second delay between batches
const STUCK_THRESHOLD_MINUTES = 20; // Consider stuck after 20 minutes

interface MissingEra {
	spot: Spot;
	era: Era;
	reason: string;
}

function findMissingVideos(): MissingEra[] {
	const metadata = getAllVideoMetadata();
	const missing: MissingEra[] = [];
	const now = Date.now();

	for (const spot of spotsData.spots) {
		for (const era of spot.eras) {
			const existing = metadata.find(
				(m) => m.spotId === spot.id && m.eraId === era.id
			);

			if (!existing) {
				missing.push({ spot, era, reason: 'No metadata entry' });
			} else if (existing.status === 'failed') {
				missing.push({ spot, era, reason: `Failed: ${existing.error}` });
			} else if (existing.status === 'generating') {
				// Check if stuck (generating for too long)
				const createdAt = new Date(existing.createdAt).getTime();
				const elapsedMinutes = (now - createdAt) / 60000;

				if (elapsedMinutes > STUCK_THRESHOLD_MINUTES) {
					missing.push({ spot, era, reason: `Stuck in generating for ${Math.floor(elapsedMinutes)} min` });
				}
			} else if (existing.status !== 'ready') {
				missing.push({ spot, era, reason: `Status: ${existing.status}` });
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

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
	console.log('🚀 Generate Remaining Videos (Batched)');
	console.log('=======================================\n');

	const missing = findMissingVideos();

	if (missing.length === 0) {
		console.log('✨ All videos generated!\n');
		return;
	}

	console.log(`Found ${missing.length} videos to generate:\n`);

	for (const { spot, era, reason } of missing) {
		console.log(`  ${spot.name} / ${era.title}`);
		console.log(`    Reason: ${reason}`);
	}

	console.log(`\n⚡ Processing in batches of ${BATCH_SIZE} with ${BATCH_DELAY_MS / 1000}s delays`);
	console.log(`Estimated time: ${Math.ceil(missing.length / BATCH_SIZE) * 7} minutes\n`);

	const startTime = Date.now();
	const results = [];

	// Process in batches
	for (let i = 0; i < missing.length; i += BATCH_SIZE) {
		const batch = missing.slice(i, i + BATCH_SIZE);
		const batchNum = Math.floor(i / BATCH_SIZE) + 1;
		const totalBatches = Math.ceil(missing.length / BATCH_SIZE);

		console.log(`\n${'='.repeat(50)}`);
		console.log(`Batch ${batchNum}/${totalBatches} - Starting ${batch.length} videos`);
		console.log('='.repeat(50));

		// Run batch concurrently
		const batchPromises = batch.map(({ spot, era }, batchIndex) =>
			generateEra(spot, era, i + batchIndex + 1, missing.length)
		);

		const batchResults = await Promise.all(batchPromises);
		results.push(...batchResults);

		// Delay before next batch (except after last batch)
		if (i + BATCH_SIZE < missing.length) {
			console.log(`\n⏳ Waiting ${BATCH_DELAY_MS / 1000}s before next batch...`);
			await sleep(BATCH_DELAY_MS);
		}
	}

	const elapsed = Math.round((Date.now() - startTime) / 1000);
	const minutes = Math.floor(elapsed / 60);
	const seconds = elapsed % 60;

	console.log('\n' + '='.repeat(50));
	console.log('🎉 Generation Complete!');
	console.log('='.repeat(50));
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
		console.log('\n💡 Tip: Run "npm run backfill-failed" to retry failed ones as N64 game scenes');
	}

	console.log('\n📁 Videos saved to: static/videos/');
	console.log('🌐 View at: http://localhost:5173/gallery\n');
}

main().catch((error) => {
	console.error('\n💥 Fatal error:', error);
	process.exit(1);
});
