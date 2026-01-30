/**
 * Alibaba Cloud DashScope Wanx Video Generation Client
 *
 * This client provides a typed interface for the DashScope API's video generation
 * capabilities including text-to-video, image-to-video, and reference-to-video models.
 */

const DASHSCOPE_BASE_URL = 'https://dashscope-intl.aliyuncs.com/api/v1';

export type VideoModel =
	| 'wan2.6-t2v'
	| 'wan2.6-i2v'
	| 'wan2.6-i2v-flash'
	| 'wan2.6-r2v'
	| 'wan2.6-image'
	| 'wan2.6-t2i';

export type VideoResolution = '480P' | '720P' | '1080P';

export type VideoSize =
	| '848*480'
	| '624*624'
	| '480*848'
	| '1280*720'
	| '960*960'
	| '720*1280'
	| '1920*1080'
	| '1440*1440'
	| '1080*1920';

export type ShotType = 'single' | 'multi';

export type TaskStatus = 'PENDING' | 'RUNNING' | 'SUCCEEDED' | 'FAILED' | 'UNKNOWN';

export interface TextToVideoInput {
	prompt: string;
	negative_prompt?: string;
	audio_url?: string;
}

export interface TextToVideoParameters {
	size?: VideoSize;
	duration?: number;
	prompt_extend?: boolean;
	shot_type?: ShotType;
	watermark?: boolean;
	seed?: number;
}

export interface ImageToVideoInput {
	prompt: string;
	img_url: string;
	negative_prompt?: string;
	audio_url?: string;
}

export interface ImageToVideoParameters {
	resolution?: VideoResolution;
	duration?: number;
	prompt_extend?: boolean;
	shot_type?: ShotType;
	audio?: boolean;
	watermark?: boolean;
	seed?: number;
}

export interface TaskSubmitResponse {
	output: {
		task_status: TaskStatus;
		task_id: string;
	};
	request_id: string;
}

export interface TaskQueryResponse {
	output: {
		task_status: TaskStatus;
		task_id: string;
		video_url?: string;
		orig_prompt?: string;
		submit_time?: string;
		end_time?: string;
		code?: string;
		message?: string;
	};
	usage?: {
		duration: number;
		size?: string;
		output_video_duration: number;
	};
	request_id: string;
}

export interface WanxClientConfig {
	apiKey: string;
	baseUrl?: string;
	pollIntervalMs?: number;
	maxPollAttempts?: number;
}

export class WanxClient {
	private apiKey: string;
	private baseUrl: string;
	private pollIntervalMs: number;
	private maxPollAttempts: number;

	constructor(config: WanxClientConfig) {
		this.apiKey = config.apiKey;
		this.baseUrl = config.baseUrl || DASHSCOPE_BASE_URL;
		this.pollIntervalMs = config.pollIntervalMs || 15000;
		this.maxPollAttempts = config.maxPollAttempts || 40;
	}

	private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
		const url = `${this.baseUrl}${endpoint}`;
		const headers: Record<string, string> = {
			Authorization: `Bearer ${this.apiKey}`,
			'Content-Type': 'application/json',
			...(options.headers as Record<string, string>)
		};

		const response = await fetch(url, {
			...options,
			headers
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`DashScope API error (${response.status}): ${errorText}`);
		}

		return response.json();
	}

	/**
	 * Submit a text-to-video generation task
	 */
	async submitTextToVideo(
		input: TextToVideoInput,
		parameters?: TextToVideoParameters
	): Promise<TaskSubmitResponse> {
		return this.request<TaskSubmitResponse>(
			'/services/aigc/video-generation/video-synthesis',
			{
				method: 'POST',
				headers: {
					'X-DashScope-Async': 'enable'
				},
				body: JSON.stringify({
					model: 'wan2.6-t2v',
					input,
					parameters: parameters || {}
				})
			}
		);
	}

	/**
	 * Submit an image-to-video generation task
	 */
	async submitImageToVideo(
		input: ImageToVideoInput,
		parameters?: ImageToVideoParameters,
		model: 'wan2.6-i2v' | 'wan2.6-i2v-flash' = 'wan2.6-i2v'
	): Promise<TaskSubmitResponse> {
		return this.request<TaskSubmitResponse>(
			'/services/aigc/video-generation/video-synthesis',
			{
				method: 'POST',
				headers: {
					'X-DashScope-Async': 'enable'
				},
				body: JSON.stringify({
					model,
					input,
					parameters: parameters || {}
				})
			}
		);
	}

	/**
	 * Query the status of a generation task
	 */
	async queryTask(taskId: string): Promise<TaskQueryResponse> {
		return this.request<TaskQueryResponse>(`/tasks/${taskId}`);
	}

	/**
	 * Wait for a task to complete, polling at regular intervals
	 */
	async waitForTask(
		taskId: string,
		onProgress?: (status: TaskStatus, attempt: number) => void
	): Promise<TaskQueryResponse> {
		let attempts = 0;

		while (attempts < this.maxPollAttempts) {
			const result = await this.queryTask(taskId);

			if (onProgress) {
				onProgress(result.output.task_status, attempts);
			}

			if (result.output.task_status === 'SUCCEEDED') {
				return result;
			}

			if (result.output.task_status === 'FAILED') {
				throw new Error(
					`Task failed: ${result.output.code || 'Unknown error'} - ${result.output.message || ''}`
				);
			}

			if (result.output.task_status === 'UNKNOWN') {
				throw new Error('Task not found or expired');
			}

			attempts++;
			await this.sleep(this.pollIntervalMs);
		}

		throw new Error(`Task timed out after ${this.maxPollAttempts} attempts`);
	}

	/**
	 * Generate a video from text prompt and wait for completion
	 */
	async generateVideoFromText(
		prompt: string,
		options?: {
			negativePrompt?: string;
			audioUrl?: string;
			size?: VideoSize;
			duration?: number;
			promptExtend?: boolean;
			shotType?: ShotType;
			onProgress?: (status: TaskStatus, attempt: number) => void;
		}
	): Promise<{ videoUrl: string; taskId: string; duration: number }> {
		const input: TextToVideoInput = {
			prompt,
			negative_prompt: options?.negativePrompt,
			audio_url: options?.audioUrl
		};

		const parameters: TextToVideoParameters = {
			size: options?.size || '1280*720',
			duration: options?.duration || 5,
			prompt_extend: options?.promptExtend ?? true,
			shot_type: options?.shotType || 'single'
		};

		const submitResult = await this.submitTextToVideo(input, parameters);
		const taskId = submitResult.output.task_id;

		const result = await this.waitForTask(taskId, options?.onProgress);

		if (!result.output.video_url) {
			throw new Error('No video URL in completed task');
		}

		return {
			videoUrl: result.output.video_url,
			taskId,
			duration: result.usage?.output_video_duration || 0
		};
	}

	/**
	 * Generate a video from an image and wait for completion
	 */
	async generateVideoFromImage(
		imageUrl: string,
		prompt: string,
		options?: {
			negativePrompt?: string;
			audioUrl?: string;
			resolution?: VideoResolution;
			duration?: number;
			promptExtend?: boolean;
			useFlashModel?: boolean;
			onProgress?: (status: TaskStatus, attempt: number) => void;
		}
	): Promise<{ videoUrl: string; taskId: string; duration: number }> {
		const input: ImageToVideoInput = {
			prompt,
			img_url: imageUrl,
			negative_prompt: options?.negativePrompt,
			audio_url: options?.audioUrl
		};

		const parameters: ImageToVideoParameters = {
			resolution: options?.resolution || '720P',
			duration: options?.duration || 5,
			prompt_extend: options?.promptExtend ?? true
		};

		const model = options?.useFlashModel ? 'wan2.6-i2v-flash' : 'wan2.6-i2v';
		const submitResult = await this.submitImageToVideo(input, parameters, model);
		const taskId = submitResult.output.task_id;

		const result = await this.waitForTask(taskId, options?.onProgress);

		if (!result.output.video_url) {
			throw new Error('No video URL in completed task');
		}

		return {
			videoUrl: result.output.video_url,
			taskId,
			duration: result.usage?.output_video_duration || 0
		};
	}

	private sleep(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}

/**
 * Create a pre-configured client instance
 */
export function createWanxClient(apiKey: string): WanxClient {
	return new WanxClient({ apiKey });
}
