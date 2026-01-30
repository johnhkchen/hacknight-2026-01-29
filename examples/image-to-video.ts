/**
 * Image-to-Video Generation Example
 *
 * This example demonstrates how to generate a video from an initial image
 * using the Alibaba Cloud DashScope Wanx API.
 *
 * Usage:
 *   npx tsx examples/image-to-video.ts "https://example.com/image.jpg" "The scene comes to life"
 *
 * Environment:
 *   DASHSCOPE_API_KEY - Your DashScope API key
 */

import { createWanxClient, type TaskStatus } from '../src/lib/wanx';

const API_KEY = process.env.DASHSCOPE_API_KEY || 'sk-86cddb4f27ac4c098ba695e79e9a0a11';

async function main() {
	const imageUrl = process.argv[2];
	const prompt = process.argv[3] || 'The scene gently animates with natural movement';

	if (!imageUrl) {
		console.error('Usage: npx tsx examples/image-to-video.ts <image-url> [prompt]');
		console.error('');
		console.error('Example:');
		console.error('  npx tsx examples/image-to-video.ts "https://example.com/photo.jpg" "A gentle breeze moves through the scene"');
		process.exit(1);
	}

	console.log('Image-to-Video Generation Example');
	console.log('=================================');
	console.log(`Image URL: ${imageUrl}`);
	console.log(`Prompt: ${prompt}`);
	console.log('');

	const client = createWanxClient(API_KEY);

	try {
		console.log('Submitting generation task...');

		const result = await client.generateVideoFromImage(imageUrl, prompt, {
			resolution: '720P',
			duration: 5,
			promptExtend: true,
			useFlashModel: false,
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
