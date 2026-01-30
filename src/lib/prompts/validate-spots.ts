/**
 * Validation script for spots.json prompts.
 *
 * Run with: npx tsx src/lib/prompts/validate-spots.ts
 *
 * This script validates all 15 WAN prompts in spots.json against the
 * established template pattern to ensure consistency and completeness.
 */

import spotsData from '../data/spots.json';
import { validatePromptStructure } from './template.js';

interface ValidationResult {
	spotName: string;
	eraTitle: string;
	eraId: string;
	isValid: boolean;
	warnings: string[];
}

function validateAllPrompts(): void {
	const results: ValidationResult[] = [];
	let totalValid = 0;
	let totalPrompts = 0;

	for (const spot of spotsData.spots) {
		for (const era of spot.eras) {
			totalPrompts++;
			const validation = validatePromptStructure(era.wanPrompt);

			if (validation.isValid) {
				totalValid++;
			}

			results.push({
				spotName: spot.name,
				eraTitle: era.title,
				eraId: era.id,
				isValid: validation.isValid,
				warnings: validation.warnings
			});
		}
	}

	console.log('\n=== WAN Prompt Validation Report ===\n');
	console.log(`Total prompts: ${totalPrompts}`);
	console.log(`Valid prompts: ${totalValid}`);
	console.log(`Success rate: ${((totalValid / totalPrompts) * 100).toFixed(1)}%\n`);

	// Show any prompts with warnings
	const withWarnings = results.filter((r) => r.warnings.length > 0);
	if (withWarnings.length > 0) {
		console.log('Prompts with warnings:\n');
		for (const result of withWarnings) {
			console.log(`  ${result.spotName} - ${result.eraTitle} (${result.eraId})`);
			for (const warning of result.warnings) {
				console.log(`    ⚠ ${warning}`);
			}
			console.log();
		}
	} else {
		console.log('✓ All prompts pass validation!\n');
	}

	// List all validated prompts
	console.log('All prompts:');
	for (const result of results) {
		const status = result.isValid ? '✓' : '✗';
		console.log(`  ${status} ${result.spotName} - ${result.eraTitle}`);
	}
	console.log();
}

validateAllPrompts();
