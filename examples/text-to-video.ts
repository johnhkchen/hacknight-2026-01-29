/**
 * Text-to-Video Generation Example
 *
 * This example demonstrates how to generate a video from a text prompt
 * using the Alibaba Cloud DashScope Wanx API.
 *
 * Usage:
 *   npx tsx examples/text-to-video.ts "A cat playing with a ball of yarn"
 *
 * Environment:
 *   DASHSCOPE_API_KEY - Your DashScope API key
 */

import { createWanxClient, type TaskStatus } from '../src/lib/wanx';

const API_KEY = process.env.DASHSCOPE_API_KEY || 'sk-86cddb4f27ac4c098ba695e79e9a0a11';

async function main() {
	const prompt = process.argv[2] || 'A serene mountain landscape at sunrise with mist rolling through the valleys, cinematic quality';

	console.log('Text-to-Video Generation Example');
	console.log('================================');
	console.log(`Prompt: ${prompt}`);
	console.log('');

	const client = createWanxClient(API_KEY);

	try {
		console.log('Submitting generation task...');

		const result = await client.generateVideoFromText(prompt, {
			size: '1280*720',
			duration: 5,
			promptExtend: true,
			shotType: 'single',
			onProgress: (status: TaskStatus, attempt: number) => {
				const elapsed = attempt * 15;
				console.log(`  [${elapsed}s] Status: ${status}`);
			}
		});

		console.log('');
		console.log('Generation complete!');
		console.log(`  Task ID: ${result.taskId}`);
		console.log(`  Duration: ${result.duration} seconds`);
		console.log(`  Video URL: ${result.videoUrl}`);
		console.log('');
		console.log('Note: The video URL expires in 24 hours. Download it promptly.');

	} catch (error) {
		console.error('Generation failed:', error);
		process.exit(1);
	}
}

main();
