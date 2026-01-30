/**
 * Video Status Checker
 *
 * Shows complete status of all spots and eras to identify missing videos
 */

import { getAllVideoMetadata } from '../src/lib/wanx/video-metadata';
import spotsData from '../src/lib/data/spots.json';

function main() {
	console.log('📊 Complete Video Status Report');
	console.log('================================\n');

	const metadata = getAllVideoMetadata();

	let totalEras = 0;
	let readyCount = 0;
	let generatingCount = 0;
	let failedCount = 0;
	let missingCount = 0;

	for (const spot of spotsData.spots) {
		console.log(`\n${spot.name} (${spot.id})`);
		console.log('─'.repeat(50));

		for (const era of spot.eras) {
			totalEras++;
			const meta = metadata.find(
				m => m.spotId === spot.id && m.eraId === era.id
			);

			let status = '❌ MISSING - No metadata entry';
			let details = '';

			if (meta) {
				switch (meta.status) {
					case 'ready':
						status = '✅ READY';
						details = meta.localPath;
						readyCount++;
						break;
					case 'generating':
						status = '⏳ GENERATING';
						const elapsed = Date.now() - new Date(meta.createdAt).getTime();
						const minutes = Math.floor(elapsed / 60000);
						details = `Started ${minutes} min ago`;
						generatingCount++;
						break;
					case 'failed':
						status = '❌ FAILED';
						details = meta.error || 'Unknown error';
						failedCount++;
						break;
					case 'pending':
						status = '⏸️  PENDING';
						details = 'Not started';
						break;
					default:
						status = `⚠️  ${meta.status.toUpperCase()}`;
				}
			} else {
				missingCount++;
			}

			console.log(`  ${era.title} (${era.yearStart})`);
			console.log(`    ID: ${era.id}`);
			console.log(`    Status: ${status}`);
			if (details) console.log(`    Details: ${details}`);
		}
	}

	console.log('\n\n================================');
	console.log('Summary');
	console.log('================================');
	console.log(`Total eras: ${totalEras}`);
	console.log(`✅ Ready: ${readyCount}`);
	console.log(`⏳ Generating: ${generatingCount}`);
	console.log(`❌ Failed: ${failedCount}`);
	console.log(`❌ Missing metadata: ${missingCount}`);
	console.log(`\nTo generate: ${totalEras - readyCount} videos\n`);

	// List all missing/failed explicitly
	const needsWork: string[] = [];

	for (const spot of spotsData.spots) {
		for (const era of spot.eras) {
			const meta = metadata.find(
				m => m.spotId === spot.id && m.eraId === era.id
			);

			if (!meta || meta.status === 'failed') {
				needsWork.push(`${spot.id} / ${era.id}`);
			}
		}
	}

	if (needsWork.length > 0) {
		console.log('Videos needing generation:');
		needsWork.forEach(item => console.log(`  - ${item}`));
		console.log('');
	}
}

main();
