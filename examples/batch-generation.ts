/**
 * Batch Video Generation Example
 *
 * This example demonstrates how to submit multiple video generation tasks
 * in parallel and track their progress. Useful for generating a gallery
 * of videos from multiple prompts.
 *
 * Usage:
 *   npx tsx examples/batch-generation.ts
 *
 * Environment:
 *   DASHSCOPE_API_KEY - Your DashScope API key
 */

import { createWanxClient, type TaskStatus, type TaskQueryResponse } from '../src/lib/wanx';

const API_KEY = process.env.DASHSCOPE_API_KEY || 'sk-86cddb4f27ac4c098ba695e79e9a0a11';

interface GenerationJob {
	id: string;
	prompt: string;
	taskId?: string;
	status: 'pending' | 'submitted' | 'running' | 'completed' | 'failed';
	videoUrl?: string;
	error?: string;
}

const SAMPLE_PROMPTS = [
	'A peaceful zen garden with cherry blossoms gently falling, soft morning light',
	'Ocean waves crashing on rocky cliffs at sunset, cinematic drone shot',
	'A cozy coffee shop interior with steam rising from cups, warm ambient lighting',
	'Northern lights dancing across a starry sky over snow-covered mountains',
	'A butterfly emerging from its cocoon in macro detail, nature documentary style'
];

async function main() {
	console.log('Batch Video Generation Example');
	console.log('==============================');
	console.log(`Generating ${SAMPLE_PROMPTS.length} videos in parallel`);
	console.log('');

	const client = createWanxClient(API_KEY);

	const jobs: GenerationJob[] = SAMPLE_PROMPTS.map((prompt, index) => ({
		id: `job-${index + 1}`,
		prompt,
		status: 'pending'
	}));

	// Submit all jobs
	console.log('Submitting generation tasks...');
	for (const job of jobs) {
		try {
			const result = await client.submitTextToVideo(
				{ prompt: job.prompt },
				{ size: '1280*720', duration: 5, prompt_extend: true }
			);
			job.taskId = result.output.task_id;
			job.status = 'submitted';
			console.log(`  [${job.id}] Submitted: ${job.taskId}`);
		} catch (error) {
			job.status = 'failed';
			job.error = error instanceof Error ? error.message : String(error);
			console.log(`  [${job.id}] Failed to submit: ${job.error}`);
		}
	}

	console.log('');
	console.log('Polling for results...');

	// Poll until all jobs complete
	const maxAttempts = 40;
	let attempts = 0;

	while (attempts < maxAttempts) {
		const pendingJobs = jobs.filter(
			(j) => j.status === 'submitted' || j.status === 'running'
		);

		if (pendingJobs.length === 0) {
			break;
		}

		for (const job of pendingJobs) {
			if (!job.taskId) continue;

			try {
				const result: TaskQueryResponse = await client.queryTask(job.taskId);
				const status = result.output.task_status;

				if (status === 'RUNNING' && job.status !== 'running') {
					job.status = 'running';
				} else if (status === 'SUCCEEDED') {
					job.status = 'completed';
					job.videoUrl = result.output.video_url;
				} else if (status === 'FAILED') {
					job.status = 'failed';
					job.error = result.output.message || 'Unknown error';
				}
			} catch (error) {
				// Ignore polling errors, will retry
			}
		}

		// Print status update
		const elapsed = attempts * 15;
		const completed = jobs.filter((j) => j.status === 'completed').length;
		const failed = jobs.filter((j) => j.status === 'failed').length;
		const running = jobs.filter((j) => j.status === 'running' || j.status === 'submitted').length;
		console.log(`  [${elapsed}s] Completed: ${completed}, Running: ${running}, Failed: ${failed}`);

		attempts++;
		await sleep(15000);
	}

	// Print final results
	console.log('');
	console.log('Generation Results');
	console.log('==================');

	for (const job of jobs) {
		console.log(`\n[${job.id}] ${job.status.toUpperCase()}`);
		console.log(`  Prompt: ${job.prompt.substring(0, 60)}...`);
		if (job.videoUrl) {
			console.log(`  Video: ${job.videoUrl}`);
		}
		if (job.error) {
			console.log(`  Error: ${job.error}`);
		}
	}

	// Summary
	const successful = jobs.filter((j) => j.status === 'completed');
	console.log('');
	console.log(`Summary: ${successful.length}/${jobs.length} videos generated successfully`);

	if (successful.length > 0) {
		console.log('');
		console.log('Video URLs (valid for 24 hours):');
		successful.forEach((job, i) => {
			console.log(`  ${i + 1}. ${job.videoUrl}`);
		});
	}
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

main();
