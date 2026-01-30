/**
 * WAN Prompt utilities for TimeLens video generation.
 *
 * This module exports the prompt template pattern documentation, builder utility,
 * and validation functions for creating consistent historical footage prompts.
 */

export {
	buildWanPrompt,
	validatePromptStructure,
	CAMERA_MOVEMENTS,
	STYLE_DIRECTIVES,
	type WanPromptComponents
} from './template.js';
