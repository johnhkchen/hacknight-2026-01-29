<script lang="ts">
	import { getAllVideoMetadata, getVideosByStatus } from '$lib/wanx/video-metadata';
	import type { VideoMetadataEntry } from '$lib/wanx/video-metadata';
	import VideoCard from './VideoCard.svelte';
	import spotsData from '$lib/data/spots.json';
	import type { Spot, Era } from '$lib/types';

	interface VideoWithContext {
		metadata: VideoMetadataEntry;
		spot: Spot;
		era: Era;
	}

	// Get ready videos and join with spot/era data
	const readyVideos = getVideosByStatus('ready');

	const videosWithContext: VideoWithContext[] = readyVideos
		.map((metadata) => {
			const spot = spotsData.spots.find((s) => s.id === metadata.spotId);
			if (!spot) return null;

			const era = spot.eras.find((e) => e.id === metadata.eraId);
			if (!era) return null;

			return { metadata, spot, era };
		})
		.filter((v): v is VideoWithContext => v !== null);

	// Get generation status counts
	const allMetadata = getAllVideoMetadata();
	const statusCounts = {
		ready: allMetadata.filter((m) => m.status === 'ready').length,
		generating: allMetadata.filter((m) => m.status === 'generating').length,
		pending: allMetadata.filter((m) => m.status === 'pending').length,
		failed: allMetadata.filter((m) => m.status === 'failed').length
	};
</script>

<div class="gallery-container">
	<header class="gallery-header">
		<h1>TimeLens Video Gallery</h1>
		<p class="subtitle">AI-generated historical footage from San Francisco landmarks</p>

		{#if statusCounts.ready > 0 || statusCounts.generating > 0}
			<div class="status-summary">
				{#if statusCounts.ready > 0}
					<span class="status-badge ready">{statusCounts.ready} ready</span>
				{/if}
				{#if statusCounts.generating > 0}
					<span class="status-badge generating">{statusCounts.generating} generating</span>
				{/if}
				{#if statusCounts.failed > 0}
					<span class="status-badge failed">{statusCounts.failed} failed</span>
				{/if}
			</div>
		{/if}
	</header>

	{#if videosWithContext.length === 0}
		<div class="empty-state">
			<div class="empty-icon">🎬</div>
			<h2>No videos yet</h2>
			<p>Generated videos will appear here once the WAN video generation process completes.</p>
			<p class="empty-hint">
				Videos are generated from spot and era data using Alibaba's WAN text-to-video API.
			</p>
		</div>
	{:else}
		<div class="video-grid">
			{#each videosWithContext as { metadata, spot, era } (metadata.spotId + metadata.eraId)}
				<VideoCard {metadata} {spot} {era} />
			{/each}
		</div>
	{/if}
</div>

<style>
	.gallery-container {
		max-width: 1400px;
		margin: 0 auto;
		padding: var(--space-7) var(--space-5);
		padding-bottom: 100px; /* Space for BottomNav */
	}

	.gallery-header {
		text-align: center;
		margin-bottom: var(--space-7);
	}

	.gallery-header h1 {
		font-size: 36px;
		font-weight: 700;
		margin: 0 0 var(--space-3) 0;
		color: #fff;
	}

	.subtitle {
		font-size: var(--text-lg);
		color: #aaa;
		margin: 0 0 var(--space-5) 0;
	}

	.status-summary {
		display: flex;
		gap: var(--space-3);
		justify-content: center;
		flex-wrap: wrap;
	}

	.status-badge {
		padding: var(--space-2) var(--space-3);
		border-radius: 16px;
		font-size: var(--text-xs);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.status-badge.ready {
		background: rgba(34, 197, 94, 0.15);
		color: #22c55e;
		border: 1px solid rgba(34, 197, 94, 0.3);
	}

	.status-badge.generating {
		background: rgba(59, 130, 246, 0.15);
		color: #3b82f6;
		border: 1px solid rgba(59, 130, 246, 0.3);
	}

	.status-badge.failed {
		background: rgba(239, 68, 68, 0.15);
		color: #ef4444;
		border: 1px solid rgba(239, 68, 68, 0.3);
	}

	.video-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: var(--space-5);
	}

	.empty-state {
		text-align: center;
		padding: var(--space-8) var(--space-5);
		color: #aaa;
	}

	.empty-icon {
		font-size: 64px;
		margin-bottom: var(--space-5);
		opacity: 0.5;
	}

	.empty-state h2 {
		font-size: var(--text-2xl);
		color: #fff;
		margin: 0 0 var(--space-3) 0;
	}

	.empty-state p {
		font-size: var(--text-base);
		margin: 0 0 var(--space-2) 0;
		max-width: 500px;
		margin-left: auto;
		margin-right: auto;
	}

	.empty-hint {
		font-size: var(--text-sm);
		color: #666;
		font-style: italic;
	}

	@media (max-width: 640px) {
		.gallery-header h1 {
			font-size: 28px;
		}

		.subtitle {
			font-size: var(--text-base);
		}

		.video-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
