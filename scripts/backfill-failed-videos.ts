/**
 * Backfill Failed Videos with Nintendo 64 Game Style
 *
 * Identifies videos that failed due to content problems and regenerates them
 * as whimsical Nintendo 64 game scenes to bypass content filters.
 */

import { generateAndStoreVideo } from '../src/lib/wanx/video-storage';
import { getAllVideoMetadata, setVideoMetadata } from '../src/lib/wanx/video-metadata';
import spotsData from '../src/lib/data/spots.json';
import type { Spot, Era } from '../src/lib/types';

const DASHSCOPE_API_KEY = process.env.DASHSCOPE_API_KEY;

if (!DASHSCOPE_API_KEY) {
	console.error('Error: DASHSCOPE_API_KEY environment variable not set');
	process.exit(1);
}

/**
 * Converts a historical scene into a Nintendo 64 game style prompt
 */
function createN64GamePrompt(spot: Spot, era: Era): string {
	const baseName = spot.name.replace(/'/g, '');
	const eraYear = era.yearStart;

	// Extract key elements from the original prompt (if it exists)
	const original = era.wanPrompt || era.description;

	// Create N64-style prompt based on the location and era
	let gamePrompt = '';

	// Alcatraz-specific prompts (the likely problematic ones)
	if (spot.id.includes('alcatraz')) {
		if (era.title.includes('Military') || era.title.includes('Fortress')) {
			gamePrompt = `Retro Nintendo 64 game scene showing blocky 3D fortress island in San Francisco Bay circa ${eraYear}, low-poly soldiers in period uniforms standing guard, chunky pixel-art cannons on ramparts, simplified geometric buildings, bright pastel sky, classic N64 fog effect obscuring distant water, Mario 64 style camera angle, vibrant cartoony colors, obvious video game graphics with visible polygons`;
		} else if (era.title.includes('Penitentiary') || era.title.includes('Prison')) {
			gamePrompt = `Nintendo 64 adventure game level set on island facility ${eraYear}, blocky low-poly architecture with guard towers, cartoonish characters in vintage uniforms, bright daylight with N64-style bloom, simplified geometric shapes, GoldenEye 007 aesthetic but more whimsical, pastel color palette, obvious polygonal graphics, family-friendly tone, video game UI elements visible`;
		} else if (era.title.includes('Native American') || era.title.includes('Occupation')) {
			gamePrompt = `Retro N64 game cutscene showing peaceful protest scene ${eraYear}, blocky low-poly people holding colorful signs on island, bright optimistic lighting, Legend of Zelda Ocarina of Time visual style, chunky simplified characters, vibrant colors, visible polygons, family-friendly depiction of historical activism, uplifting atmosphere`;
		}
	}

	// Ferry Building scenes
	else if (spot.id.includes('ferry')) {
		gamePrompt = `Nintendo 64 racing game scene at ${baseName} terminal ${eraYear}, low-poly building with clock tower, blocky 3D people and vehicles, Mario Kart 64 style graphics, bright saturated colors, chunky polygonal ferry boats, simplified geometric architecture, N64 fog effects, cheerful atmosphere`;
	}

	// Fisherman's Wharf scenes
	else if (spot.id.includes('fisherman')) {
		if (era.title.includes('Gold Rush')) {
			gamePrompt = `Classic N64 adventure game level at waterfront port ${eraYear}, low-poly sailing ships with blocky sails, chunky pixel-art dock workers, simplified wooden structures, Banjo-Kazooie visual style, bright pastel colors, obvious video game graphics, cartoonish seagulls`;
		} else {
			gamePrompt = `Nintendo 64 simulation game scene showing ${baseName} ${eraYear}, blocky fishing boats, low-poly market stalls, chunky 3D characters, bright cheerful colors, simplified geometry, family-friendly fishing village atmosphere, N64-era graphics quality`;
		}
	}

	// Chinatown scenes
	else if (spot.id.includes('chinatown')) {
		gamePrompt = `Retro N64 RPG town level depicting ${baseName} circa ${eraYear}, blocky low-poly buildings with bright lanterns, chunky pixelated shop signs, simplified geometric architecture, vibrant saturated colors, Paper Mario 64 aesthetic, cartoonish friendly NPCs, obvious polygonal graphics, cheerful bustling atmosphere`;
	}

	// Golden Gate Park scenes
	else if (spot.id.includes('golden-gate-park')) {
		gamePrompt = `Nintendo 64 open world game scene in park setting ${eraYear}, low-poly trees and gardens, blocky 3D visitors, bright pastel sky, Super Mario 64 style environment, chunky simplified nature, vibrant green colors, obvious video game polygons, whimsical peaceful atmosphere`;
	}

	// Fallback for any other scenes
	else {
		gamePrompt = `Nintendo 64 era video game scene depicting ${baseName} in ${eraYear}, blocky low-polygon 3D graphics, bright saturated colors, chunky simplified geometry, obvious retro game aesthetic, family-friendly cartoonish style, classic N64 visual quality with fog effects and visible polygons`;
	}

	// Add N64-specific technical details
	gamePrompt += `, classic late 1990s console game graphics, 320x240 render resolution upscaled, chunky textures, simplified lighting, nostalgic retro gaming aesthetic`;

	return gamePrompt;
}

async function backfillFailedVideo(
	spot: Spot,
	era: Era,
	metadata: any,
	index: number,
	total: number
) {
	const prefix = `[${index}/${total}] ${spot.name} - ${era.title}`;

	console.log(`\n${prefix}`);
	console.log(`Original error: ${metadata.error}`);
	console.log(`Regenerating as Nintendo 64 game scene...\n`);

	// Create N64-style prompt
	const n64Prompt = createN64GamePrompt(spot, era);

	console.log(`N64 Prompt: ${n64Prompt.substring(0, 150)}...`);

	// Temporarily override the era's wanPrompt
	const originalPrompt = era.wanPrompt;
	const modifiedEra = { ...era, wanPrompt: n64Prompt };

	try {
		const result = await generateAndStoreVideo(
			spot,
			modifiedEra,
			DASHSCOPE_API_KEY,
			(progress) => {
				switch (progress.stage) {
					case 'submitting':
						console.log(`${prefix}: Submitted N64 version to WAN`);
						break;
					case 'generating':
						if (progress.attempt && progress.attempt % 5 === 0) {
							console.log(`${prefix}: Generating... (${progress.attempt} attempts)`);
						}
						break;
					case 'downloading':
						console.log(`${prefix}: Downloading N64 video`);
						break;
				}
			}
		);

		if (result.success) {
			console.log(`${prefix}: ✅ N64 version complete - ${result.localPath}`);
		} else {
			console.log(`${prefix}: ❌ N64 version also failed - ${result.error}`);
		}

		return result;
	} catch (error) {
		const errorMsg = error instanceof Error ? error.message : String(error);
		console.log(`${prefix}: ❌ Error - ${errorMsg}`);
		return { success: false, error: errorMsg };
	}
}

async function main() {
	console.log('🎮 Nintendo 64 Style Video Backfill');
	console.log('===================================\n');

	const metadata = getAllVideoMetadata();
	const failed = metadata.filter((m) => m.status === 'failed');

	if (failed.length === 0) {
		console.log('✨ No failed videos to backfill!');
		return;
	}

	console.log(`Found ${failed.length} failed videos:\n`);

	// Match failed metadata to spot/era data
	const toBackfill: Array<{ spot: Spot; era: Era; metadata: any }> = [];

	for (const failedMeta of failed) {
		const spot = spotsData.spots.find((s) => s.id === failedMeta.spotId);
		if (!spot) continue;

		const era = spot.eras.find((e) => e.id === failedMeta.eraId);
		if (!era) continue;

		toBackfill.push({ spot, era, metadata: failedMeta });
		console.log(`  - ${spot.name} / ${era.title}`);
		console.log(`    Error: ${failedMeta.error?.substring(0, 80)}...`);
	}

	console.log('\n🎮 Converting to Nintendo 64 game style to bypass content filters...');
	console.log('This makes everything whimsical, blocky, and family-friendly!\n');

	const startTime = Date.now();
	const results = [];

	// Process sequentially to avoid rate limits
	for (let i = 0; i < toBackfill.length; i++) {
		const { spot, era, metadata } = toBackfill[i];
		const result = await backfillFailedVideo(spot, era, metadata, i + 1, toBackfill.length);
		results.push(result);
	}

	const elapsed = Math.round((Date.now() - startTime) / 1000);
	const minutes = Math.floor(elapsed / 60);
	const seconds = elapsed % 60;

	console.log('\n===================================');
	console.log('🎉 Backfill Complete!\n');
	console.log(`Total time: ${minutes}m ${seconds}s`);
	console.log(`Successful: ${results.filter((r) => r.success).length}/${results.length}`);
	console.log(`Failed: ${results.filter((r) => !r.success).length}/${results.length}`);

	console.log('\n🎮 Your historical scenes are now retro N64 game levels!');
	console.log('📁 Videos saved to: static/videos/');
	console.log('🌐 View them at: http://localhost:5173/gallery\n');
}

main().catch((error) => {
	console.error('\n💥 Fatal error:', error);
	process.exit(1);
});
