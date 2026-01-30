/**
 * API Key Validation Test
 *
 * This script tests that the DashScope API key is valid by submitting
 * a minimal generation request and checking the response.
 *
 * Usage:
 *   npx tsx examples/test-api-key.ts
 */

const API_KEY = process.env.DASHSCOPE_API_KEY || 'sk-86cddb4f27ac4c098ba695e79e9a0a11';
const BASE_URL = 'https://dashscope-intl.aliyuncs.com/api/v1';

async function testApiKey() {
	console.log('Testing DashScope API Key');
	console.log('=========================');
	console.log(`API Key: ${API_KEY.substring(0, 8)}...${API_KEY.substring(API_KEY.length - 4)}`);
	console.log(`Endpoint: ${BASE_URL}`);
	console.log('');

	try {
		// Submit a minimal text-to-video request
		console.log('Submitting test generation task...');

		const response = await fetch(
			`${BASE_URL}/services/aigc/video-generation/video-synthesis`,
			{
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${API_KEY}`,
					'Content-Type': 'application/json',
					'X-DashScope-Async': 'enable'
				},
				body: JSON.stringify({
					model: 'wan2.6-t2v',
					input: {
						prompt: 'A simple test video of a blue sky with white clouds'
					},
					parameters: {
						size: '1280*720',
						duration: 5
					}
				})
			}
		);

		const data = await response.json();

		if (!response.ok) {
			console.log('');
			console.log('API returned an error:');
			console.log(JSON.stringify(data, null, 2));
			console.log('');

			if (response.status === 401) {
				console.log('Diagnosis: Invalid API key or authentication failed.');
				console.log('Make sure your API key is for the international (Singapore) region.');
			} else if (response.status === 403) {
				console.log('Diagnosis: Access denied. The API key may not have permissions for video generation.');
			} else if (response.status === 429) {
				console.log('Diagnosis: Rate limited. Wait a moment and try again.');
			}

			return false;
		}

		console.log('');
		console.log('API key is valid!');
		console.log('');
		console.log('Response:');
		console.log(JSON.stringify(data, null, 2));

		if (data.output?.task_id) {
			console.log('');
			console.log(`Task submitted successfully with ID: ${data.output.task_id}`);
			console.log('');
			console.log('The test task is now generating. You can check its status with:');
			console.log(`  curl -H "Authorization: Bearer ${API_KEY.substring(0, 8)}..." "${BASE_URL}/tasks/${data.output.task_id}"`);
		}

		return true;

	} catch (error) {
		console.log('');
		console.log('Request failed:');
		console.log(error instanceof Error ? error.message : String(error));
		console.log('');
		console.log('Diagnosis: Network error. Check your internet connection.');
		return false;
	}
}

testApiKey().then((success) => {
	process.exit(success ? 0 : 1);
});
