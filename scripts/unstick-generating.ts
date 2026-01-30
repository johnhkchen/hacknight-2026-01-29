/**
 * Unstick Videos Stuck in "Generating" Status
 *
 * Finds videos that have been generating for too long and marks them
 * as failed so they can be regenerated.
 */

import { getAllVideoMetadata, setVideoMetadata, markVideoFailed } from '../src/lib/wanx/video-metadata';

const STUCK_THRESHOLD_MINUTES = 20; // Consider stuck after 20 minutes

function main() {
	console.log('🔧 Unsticking Videos in Generating Status');
	console.log('==========================================\n');

	const metadata = getAllVideoMetadata();
	const now = Date.now();

	const stuck = metadata.filter(m => {
		if (m.status !== 'generating') return false;

		const createdAt = new Date(m.createdAt).getTime();
		const elapsedMinutes = (now - createdAt) / 60000;

		return elapsedMinutes > STUCK_THRESHOLD_MINUTES;
	});

	if (stuck.length === 0) {
		console.log('✨ No stuck videos found!\n');
		return;
	}

	console.log(`Found ${stuck.length} videos stuck in generating status:\n`);

	for (const meta of stuck) {
		const createdAt = new Date(meta.createdAt).getTime();
		const elapsedMinutes = Math.floor((now - createdAt) / 60000);

		console.log(`  ${meta.spotId} / ${meta.eraId}`);
		console.log(`    Stuck for: ${elapsedMinutes} minutes`);
		console.log(`    Marking as failed...\n`);

		// Mark as failed with timeout error
		markVideoFailed(
			meta.spotId,
			meta.eraId,
			`Video generation timed out after ${elapsedMinutes} minutes - likely failed on server`
		);
	}

	console.log('✅ All stuck videos marked as failed\n');
	console.log('Next steps:');
	console.log('  1. Run: npm run backfill-failed');
	console.log('     (Generates them as N64 game scenes to bypass content filters)\n');
	console.log('  OR\n');
	console.log('  2. Run: npm run generate-all');
	console.log('     (Tries again with original prompts)\n');
}

main();
