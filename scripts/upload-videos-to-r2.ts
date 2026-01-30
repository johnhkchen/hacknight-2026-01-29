#!/usr/bin/env tsx
/**
 * Upload videos to Cloudflare R2
 *
 * This script uploads all generated videos from static/videos/ to an R2 bucket
 * and updates the video metadata to use R2 URLs.
 */

import { execSync } from 'child_process';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const BUCKET_NAME = 'timelens-videos';
const VIDEOS_DIR = 'static/videos';
const METADATA_FILE = 'src/lib/data/generated-videos.json';

console.log('🚀 Uploading videos to Cloudflare R2...\n');

// Check if bucket exists, create if not
console.log(`📦 Checking if bucket "${BUCKET_NAME}" exists...`);
try {
	execSync(`bunx wrangler r2 bucket list`, { stdio: 'pipe' });
	console.log('✓ R2 buckets accessible\n');
} catch (error) {
	console.error('❌ Failed to access R2. Make sure you\'re logged in with: bunx wrangler login');
	process.exit(1);
}

// Create bucket if it doesn't exist
try {
	const buckets = execSync(`bunx wrangler r2 bucket list`, { encoding: 'utf-8' });
	if (!buckets.includes(BUCKET_NAME)) {
		console.log(`Creating bucket "${BUCKET_NAME}"...`);
		execSync(`bunx wrangler r2 bucket create ${BUCKET_NAME}`, { stdio: 'inherit' });
		console.log('✓ Bucket created\n');
	} else {
		console.log(`✓ Bucket "${BUCKET_NAME}" already exists\n`);
	}
} catch (error) {
	console.error('❌ Failed to create/check bucket');
	process.exit(1);
}

// Upload all videos
console.log('📤 Uploading videos...\n');
const videoFiles = readdirSync(VIDEOS_DIR).filter(f => f.endsWith('.mp4'));
let uploadedCount = 0;

for (const file of videoFiles) {
	const localPath = join(VIDEOS_DIR, file);
	const r2Key = `videos/${file}`;

	try {
		console.log(`  Uploading ${file}...`);
		execSync(`bunx wrangler r2 object put ${BUCKET_NAME}/${r2Key} --file=${localPath}`, {
			stdio: 'pipe'
		});
		uploadedCount++;
		console.log(`  ✓ ${file}`);
	} catch (error) {
		console.error(`  ❌ Failed to upload ${file}`);
	}
}

console.log(`\n✓ Uploaded ${uploadedCount}/${videoFiles.length} videos\n`);

// Update metadata file with R2 URLs
console.log('📝 Updating video metadata with R2 URLs...\n');
const metadata = JSON.parse(readFileSync(METADATA_FILE, 'utf-8'));

// You'll need to set this after setting up custom domain or public access
const R2_PUBLIC_URL = `https://pub-YOUR-ID.r2.dev`; // This will be provided after setup

metadata.videos = metadata.videos.map((video: any) => {
	if (video.localPath.startsWith('static/videos/')) {
		const filename = video.localPath.replace('static/videos/', '');
		return {
			...video,
			// Keep localPath for reference, add r2Url for production
			r2Url: `${R2_PUBLIC_URL}/videos/${filename}`
		};
	}
	return video;
});

writeFileSync(METADATA_FILE, JSON.stringify(metadata, null, 2));
console.log('✓ Metadata updated\n');

console.log('🎉 Done! Next steps:');
console.log('1. Enable public access: bunx wrangler r2 bucket public-access enable ' + BUCKET_NAME);
console.log('2. Get the public URL and update R2_PUBLIC_URL in this script');
console.log('3. Run this script again to update metadata with correct URLs');
console.log('4. Update the app to use r2Url instead of localPath');
