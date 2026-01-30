# Video Gallery Integration Strategy

This document outlines the architecture and implementation strategy for displaying Wanx-generated videos in a gallery interface within a SvelteKit application.

## Architecture Overview

The gallery system has three main components that work together. A generation service handles API communication and task management, a persistence layer stores video metadata and cached URLs, and a gallery UI displays videos with playback controls and generation status.

## Generation Flow

When a user requests a video, the flow proceeds as follows. The UI collects the prompt and parameters from the user, then calls the generation service which submits a task to the DashScope API. The service stores the task ID and metadata in the persistence layer, then starts polling for completion in the background. When the task completes, the service downloads the video since URLs expire in 24 hours, stores it in persistent storage like S3 or local filesystem, and updates the gallery entry with the permanent URL.

The key insight here is that DashScope video URLs expire after 24 hours, so the system must download and re-host videos for permanent gallery display. This also enables additional features like transcoding, thumbnail generation, and CDN distribution.

## Data Model

Each gallery entry should track the original prompt, generation parameters like size and duration, task status and progress, timestamps for creation and completion, the temporary DashScope URL before download, the permanent storage URL after download, metadata like duration and file size, and optionally a thumbnail image URL.

A TypeScript interface might look like this:

```typescript
interface GalleryEntry {
  id: string;
  prompt: string;
  parameters: {
    model: string;
    size: string;
    duration: number;
  };
  status: 'pending' | 'generating' | 'processing' | 'ready' | 'failed';
  taskId?: string;
  tempVideoUrl?: string;
  permanentVideoUrl?: string;
  thumbnailUrl?: string;
  createdAt: Date;
  completedAt?: Date;
  error?: string;
}
```

## Background Processing

Video generation takes 1-5 minutes, so the UI cannot block. Instead, use a job queue pattern where generation requests go into a queue, a background worker processes the queue and polls DashScope, the UI shows real-time status via server-sent events or polling, and completed videos appear in the gallery automatically.

For a SvelteKit app, consider using a simple in-memory queue for development or BullMQ with Redis for production. The worker can run as a separate process or as part of the SvelteKit server hooks.

## Storage Strategy

For development, store videos in a local `static/videos` directory and serve them directly through SvelteKit. For production, upload to S3 or similar object storage, use CloudFront or equivalent CDN for delivery, and generate thumbnails at upload time using ffmpeg.

The storage service should handle downloading from the temporary DashScope URL, generating a thumbnail from the first frame, uploading both video and thumbnail to permanent storage, and returning permanent URLs for the gallery entry.

## UI Components

The gallery needs several components. A generation form collects prompts and lets users choose parameters like resolution and duration. A status indicator shows generation progress with elapsed time and current status. A video card displays the thumbnail, plays on hover or click, and shows metadata like duration and creation date. A gallery grid arranges cards in a responsive layout with filtering and sorting options.

For video playback, use the native HTML5 video element with controls. Implement lazy loading so videos only load when scrolled into view, and consider autoplay on hover for a more engaging browsing experience.

## API Routes

The SvelteKit API should expose these endpoints:

POST `/api/gallery/generate` accepts a prompt and parameters, creates a gallery entry, and starts background generation. It returns the entry ID immediately so the UI can track progress.

GET `/api/gallery/[id]` returns a single gallery entry with current status. The UI polls this endpoint during generation.

GET `/api/gallery` returns a paginated list of gallery entries for the main gallery view.

DELETE `/api/gallery/[id]` removes an entry and deletes associated files.

## Real-time Updates

For a better UX during generation, implement server-sent events. The client opens an EventSource connection to `/api/gallery/[id]/events`, and the server sends status updates as the task progresses. When generation completes, the server sends the final event with the video URL and closes the connection.

Alternatively, simple polling every 5-10 seconds works fine and is easier to implement. The trade-off is slightly higher server load and less immediate feedback.

## Error Handling

Generation can fail for several reasons. DashScope may reject the prompt if it contains prohibited content, the task may time out if generation takes too long, downloading may fail if the URL expires before processing, or storage upload may fail due to network issues.

Each failure mode needs appropriate handling. For content policy violations, show a clear message to the user. For timeouts, offer a retry option. For download failures, attempt a retry immediately since the URL may still be valid. For storage failures, queue for retry and alert if persistent.

## Thumbnail Generation

Generate thumbnails when downloading videos using ffmpeg. Extract a frame from around the 1-second mark to avoid black frames, resize to a consistent dimension like 480x270, and compress as JPEG for fast loading. Store thumbnails alongside videos with a predictable naming convention.

```bash
ffmpeg -i video.mp4 -ss 00:00:01 -vframes 1 -vf "scale=480:-1" thumbnail.jpg
```

## Caching Considerations

Cache gallery listings at the edge with a short TTL like 60 seconds to handle frequent updates. Cache individual video files aggressively since they never change. Invalidate gallery cache when new videos complete. Use ETags for conditional requests on video metadata.

## Implementation Priority

Start with a minimal viable gallery by implementing the generation service with the WanxClient, adding a simple database or JSON file for persistence, building a basic gallery grid with video cards, and storing videos locally during development.

Then enhance the experience by adding real-time status updates via SSE, implementing thumbnail generation, moving to cloud storage for production, and adding filtering and search capabilities.

Finally, polish and optimize by implementing lazy loading and virtualization for large galleries, adding video preloading on hover, optimizing for mobile with responsive design and touch gestures, and considering video transcoding for adaptive bitrate streaming.
