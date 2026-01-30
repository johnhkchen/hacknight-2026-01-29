/**
 * WAN Prompt Enhancement System
 *
 * Enriches base WAN prompts with era-specific visual modifiers to ensure
 * generated videos have period-appropriate aesthetics.
 */

import type { Spot, Era } from '$lib/types';

const WAN_PROMPT_LIMIT = 1500;

interface VisualStyleModifiers {
	filmStyle: string;
	colorGrading: string;
	cameraWork: string;
}

/**
 * Maps year ranges to visual style characteristics.
 * Each era gets period-appropriate film grain, color palette, and cinematography.
 */
function getVisualStyleForYear(year: number): VisualStyleModifiers {
	// Daguerreotype era (1840-1870)
	if (year < 1870) {
		return {
			filmStyle: 'daguerreotype aesthetic, sepia tones, vignette edges',
			colorGrading: 'monochrome with warm brown tones, high contrast',
			cameraWork: 'static camera, long takes, formal composition'
		};
	}

	// Early cinema era (1870-1920)
	if (year < 1920) {
		return {
			filmStyle: 'early cinema style, black and white, slight flicker, hand-cranked feel',
			colorGrading: 'high contrast black and white, grainy texture',
			cameraWork: 'static or slow panning shots, theatrical framing'
		};
	}

	// Classic Hollywood era (1920-1960)
	if (year < 1960) {
		return {
			filmStyle: 'classic Hollywood cinematography, fine film grain, rich contrast',
			colorGrading: 'black and white or early Technicolor, deep shadows',
			cameraWork: 'smooth dolly shots, professional framing, golden age composition'
		};
	}

	// Documentary/New Wave era (1960-1980)
	if (year < 1980) {
		return {
			filmStyle: 'grainy documentary footage, 16mm film aesthetic',
			colorGrading: 'slightly desaturated colors, vintage color grading',
			cameraWork: 'handheld camera movement, cinema verité style'
		};
	}

	// Modern era (1980-2000)
	if (year < 2000) {
		return {
			filmStyle: 'analog video aesthetic, VHS or Betacam quality',
			colorGrading: 'saturated colors, slight color bleed',
			cameraWork: 'smooth camera movement, professional framing'
		};
	}

	// Contemporary era (2000-present)
	return {
		filmStyle: 'contemporary HD video, crisp detail, natural grain',
		colorGrading: 'natural colors, balanced exposure, modern color science',
		cameraWork: 'smooth gimbal movement, cinematic framing'
	};
}

/**
 * Combines visual style modifiers into a single compact string.
 */
function formatStyleModifiers(modifiers: VisualStyleModifiers): string {
	return `${modifiers.filmStyle}, ${modifiers.colorGrading}, ${modifiers.cameraWork}`;
}

/**
 * Builds an enhanced WAN prompt by combining the era's base prompt with
 * period-appropriate visual style modifiers.
 *
 * The visual style is appended to the base prompt. If the combined length
 * exceeds the WAN API limit, the base prompt is truncated while preserving
 * the style modifiers since they're critical for visual consistency.
 *
 * @param spot - The spot being filmed
 * @param era - The historical era to generate video for
 * @returns Enhanced prompt string optimized for WAN video generation
 */
export function buildEnhancedPrompt(spot: Spot, era: Era): string {
	const basePrompt = era.wanPrompt;
	const visualStyle = getVisualStyleForYear(era.yearStart);
	const styleString = formatStyleModifiers(visualStyle);

	// Append style modifiers to base prompt
	const enhancedPrompt = `${basePrompt} ${styleString}`;

	// If within limit, return as-is
	if (enhancedPrompt.length <= WAN_PROMPT_LIMIT) {
		return enhancedPrompt;
	}

	// If too long, truncate base prompt to make room for style modifiers
	// Reserve space for style string plus a space
	const availableSpace = WAN_PROMPT_LIMIT - styleString.length - 1;
	const truncatedBase = basePrompt.substring(0, availableSpace).trim();

	return `${truncatedBase} ${styleString}`;
}

/**
 * Validates that a prompt meets WAN API requirements.
 */
export function validatePrompt(prompt: string): { valid: boolean; error?: string } {
	if (!prompt || prompt.trim().length === 0) {
		return { valid: false, error: 'Prompt cannot be empty' };
	}

	if (prompt.length > WAN_PROMPT_LIMIT) {
		return { valid: false, error: `Prompt exceeds ${WAN_PROMPT_LIMIT} character limit` };
	}

	return { valid: true };
}
