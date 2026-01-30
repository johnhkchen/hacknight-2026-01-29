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
