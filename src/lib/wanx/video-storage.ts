/**
 * Video Download and Local Storage Service
 *
 * Downloads videos from DashScope's temporary URLs and persists them to the
 * local filesystem. This is critical because DashScope URLs expire after 24 hours.
 */

import { createWriteStream } from 'fs';
import { mkdir } from 'fs/promises';
import { dirname } from 'path';
import { pipeline } from 'stream/promises';
import { WanxClient } from './client';
import { buildEnhancedPrompt } from './prompt-builder';
import { setVideoMetadata, markVideoFailed } from './video-metadata';
import type { Spot, Era } from '$lib/types';
import type { TaskStatus } from './client';

export interface VideoGenerationResult {
	success: boolean;
	localPath?: string;
	error?: string;
	taskId?: string;
}

export interface GenerationProgress {
	stage: 'prompting' | 'submitting' | 'generating' | 'downloading' | 'saving' | 'complete';
	status?: TaskStatus;
	attempt?: number;
	message: string;
}

/**
 * Downloads a video from a URL and saves it to a local file path.
 * Uses streaming to avoid loading the entire video into memory.
 *
 * @param videoUrl - URL of the video to download
 * @param localPath - Local filesystem path to save the video
 * @throws Error if download or write fails
 */
export async function downloadVideo(videoUrl: string, localPath: string): Promise<void> {
	// Ensure the directory exists
	const dir = dirname(localPath);
	await mkdir(dir, { recursive: true });

	// Fetch the video with streaming
	const response = await fetch(videoUrl);

	if (!response.ok) {
		throw new Error(`Failed to download video: ${response.status} ${response.statusText}`);
	}

	if (!response.body) {
		throw new Error('Response body is null');
	}

	// Stream the response to disk
	// @ts-expect-error - Node.js stream types
	await pipeline(response.body, createWriteStream(localPath));
}

/**
 * Generates a video using WAN and stores it locally.
 *
 * This orchestrates the full workflow:
 * 1. Build enhanced prompt with era-specific visual modifiers
 * 2. Submit to WAN API and wait for completion
 * 3. Download the resulting video before URL expires
 * 4. Save to static/videos/ with predictable filename
 *
 * @param spot - The spot to generate video for
 * @param era - The era to generate video for
 * @param apiKey - DashScope API key
 * @param onProgress - Optional callback for progress updates
 * @returns Result object with success status, local path, or error
 */
export async function generateAndStoreVideo(
	spot: Spot,
	era: Era,
	apiKey: string,
	onProgress?: (progress: GenerationProgress) => void
): Promise<VideoGenerationResult> {
	const createdAt = new Date().toISOString();

	try {
		// Stage 1: Build enhanced prompt
		if (onProgress) {
			onProgress({
				stage: 'prompting',
				message: 'Building enhanced prompt with era-specific visual style'
			});
		}

		const enhancedPrompt = buildEnhancedPrompt(spot, era);

		// Record generation start in metadata
		setVideoMetadata({
			spotId: spot.id,
			eraId: era.id,
			prompt: enhancedPrompt,
			localPath: '',
			status: 'generating',
			createdAt
		});

		// Stage 2: Submit to WAN
		if (onProgress) {
			onProgress({
				stage: 'submitting',
				message: 'Submitting video generation task to WAN API'
			});
		}

		const client = new WanxClient({ apiKey });

		// Stage 3: Generate video with polling
		const result = await client.generateVideoFromText(enhancedPrompt, {
			size: '1280*720',
			duration: 5,
			promptExtend: true,
			shotType: 'single',
			onProgress: (status: TaskStatus, attempt: number) => {
				if (onProgress) {
					onProgress({
						stage: 'generating',
						status,
						attempt,
						message: `Generating video: ${status} (attempt ${attempt})`
					});
				}
			}
		});

		const { videoUrl, taskId } = result;

		// Stage 4: Download video
		if (onProgress) {
			onProgress({
				stage: 'downloading',
				message: 'Downloading video from temporary URL'
			});
		}

		const filename = `${spot.id}-${era.id}.mp4`;
		const localPath = `static/videos/${filename}`;

		await downloadVideo(videoUrl, localPath);

		// Stage 5: Complete - update metadata with success
		const completedAt = new Date().toISOString();

		setVideoMetadata({
			spotId: spot.id,
			eraId: era.id,
			prompt: enhancedPrompt,
			localPath,
			status: 'ready',
			createdAt,
			completedAt,
			taskId
		});

		if (onProgress) {
			onProgress({
				stage: 'complete',
				message: `Video saved to ${localPath}`
			});
		}

		return {
			success: true,
			localPath,
			taskId
		};
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);

		// Mark as failed in metadata
		markVideoFailed(spot.id, era.id, errorMessage);

		if (onProgress) {
			onProgress({
				stage: 'complete',
				message: `Error: ${errorMessage}`
			});
		}

		return {
			success: false,
			error: errorMessage
		};
	}
}

/**
 * Generates videos for all eras of a spot.
 *
 * @param spot - The spot to generate videos for
 * @param apiKey - DashScope API key
 * @param onProgress - Optional callback for progress updates
 * @returns Array of results, one per era
 */
export async function generateAllEraVideos(
	spot: Spot,
	apiKey: string,
	onProgress?: (eraId: string, progress: GenerationProgress) => void
): Promise<VideoGenerationResult[]> {
	const results: VideoGenerationResult[] = [];

	for (const era of spot.eras) {
		const result = await generateAndStoreVideo(
			spot,
			era,
			apiKey,
			onProgress ? (progress) => onProgress(era.id, progress) : undefined
		);
		results.push(result);
	}

	return results;
}
