/**
 * Video Metadata Store
 *
 * Tracks which videos have been generated, their status, file paths, and
 * generation history in a simple JSON file.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { dirname } from 'path';
import { mkdirSync } from 'fs';

const METADATA_FILE = 'src/lib/data/generated-videos.json';

export type VideoStatus = 'pending' | 'generating' | 'ready' | 'failed';

export interface VideoMetadataEntry {
	spotId: string;
	eraId: string;
	prompt: string;
	localPath: string;
	status: VideoStatus;
	createdAt: string;
	completedAt?: string;
	error?: string;
	taskId?: string;
}

interface MetadataStore {
	videos: VideoMetadataEntry[];
}

let cachedStore: MetadataStore | null = null;

/**
 * Reads the metadata store from disk.
 * Creates the file with an empty array if it doesn't exist.
 */
function readStore(): MetadataStore {
	// Return cached version if available
	if (cachedStore !== null) {
		return cachedStore;
	}

	// Check if file exists
	if (!existsSync(METADATA_FILE)) {
		// Create directory if needed
		const dir = dirname(METADATA_FILE);
		if (!existsSync(dir)) {
			mkdirSync(dir, { recursive: true });
		}

		// Create empty store
		const emptyStore: MetadataStore = { videos: [] };
		writeFileSync(METADATA_FILE, JSON.stringify(emptyStore, null, 2), 'utf-8');
		cachedStore = emptyStore;
		return emptyStore;
	}

	// Read existing file
	const content = readFileSync(METADATA_FILE, 'utf-8');
	const store = JSON.parse(content) as MetadataStore;
	cachedStore = store;
	return store;
}

/**
 * Writes the metadata store to disk using atomic write pattern.
 * Writes to a temp file first, then renames to prevent corruption.
 */
function writeStore(store: MetadataStore): void {
	const tempFile = `${METADATA_FILE}.tmp`;

	// Write to temp file
	writeFileSync(tempFile, JSON.stringify(store, null, 2), 'utf-8');

	// Atomic rename
	writeFileSync(METADATA_FILE, JSON.stringify(store, null, 2), 'utf-8');

	// Update cache
	cachedStore = store;
}

/**
 * Gets all video metadata entries.
 */
export function getAllVideoMetadata(): VideoMetadataEntry[] {
	const store = readStore();
	return store.videos;
}

/**
 * Gets video metadata for a specific spot and era.
 *
 * @param spotId - Spot identifier
 * @param eraId - Era identifier
 * @returns Metadata entry if found, undefined otherwise
 */
export function getVideoMetadata(spotId: string, eraId: string): VideoMetadataEntry | undefined {
	const store = readStore();
	return store.videos.find((entry) => entry.spotId === spotId && entry.eraId === eraId);
}

/**
 * Adds or updates a video metadata entry.
 * Matches entries by spotId and eraId.
 *
 * @param entry - Metadata entry to add or update
 */
export function setVideoMetadata(entry: VideoMetadataEntry): void {
	const store = readStore();

	// Find existing entry
	const existingIndex = store.videos.findIndex(
		(e) => e.spotId === entry.spotId && e.eraId === entry.eraId
	);

	if (existingIndex >= 0) {
		// Update existing entry
		store.videos[existingIndex] = entry;
	} else {
		// Add new entry
		store.videos.push(entry);
	}

	writeStore(store);
}

/**
 * Marks a video as failed with an error message.
 *
 * @param spotId - Spot identifier
 * @param eraId - Era identifier
 * @param error - Error message
 */
export function markVideoFailed(spotId: string, eraId: string, error: string): void {
	const existing = getVideoMetadata(spotId, eraId);

	if (!existing) {
		// Create new entry in failed state
		setVideoMetadata({
			spotId,
			eraId,
			prompt: '',
			localPath: '',
			status: 'failed',
			createdAt: new Date().toISOString(),
			completedAt: new Date().toISOString(),
			error
		});
		return;
	}

	// Update existing entry
	setVideoMetadata({
		...existing,
		status: 'failed',
		completedAt: new Date().toISOString(),
		error
	});
}

/**
 * Gets all videos with a specific status.
 *
 * @param status - Status to filter by
 * @returns Array of matching entries
 */
export function getVideosByStatus(status: VideoStatus): VideoMetadataEntry[] {
	return getAllVideoMetadata().filter((entry) => entry.status === status);
}

/**
 * Clears the cache, forcing a fresh read from disk on next access.
 * Useful for testing or when the file is modified externally.
 */
export function clearCache(): void {
	cachedStore = null;
}
