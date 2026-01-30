<script lang="ts">
	import type { VideoMetadataEntry } from '$lib/types/video';
	import type { Spot, Era } from '$lib/types';
	import { onMount } from 'svelte';

	interface Props {
		metadata: VideoMetadataEntry;
		spot: Spot;
		era: Era;
	}

	let { metadata, spot, era }: Props = $props();

	let videoElement: HTMLVideoElement | undefined = $state();
	let isIntersecting = $state(false);

	onMount(() => {
		if (!videoElement) return;

		// Use Intersection Observer for lazy loading
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isIntersecting = true;
						observer.disconnect();
					}
				});
			},
			{
				rootMargin: '50px'
			}
		);

		observer.observe(videoElement);

		return () => {
			observer.disconnect();
		};
	});
</script>

<article class="video-card">
	<div class="video-container">
		<video
			bind:this={videoElement}
			class="video"
			loop
			muted
			playsinline
			controls
			src={isIntersecting ? `/${metadata.localPath.replace('static/', '')}` : undefined}
		>
			<track kind="captions" />
		</video>

		<div class="year-badge">{era.yearStart}</div>
	</div>

	<div class="video-info">
		<h3 class="spot-name">{spot.name}</h3>
		<p class="era-title">{era.title}</p>
		{#if era.yearEnd}
			<p class="year-range">{era.yearStart} - {era.yearEnd}</p>
		{:else}
			<p class="year-range">{era.yearStart} - Present</p>
		{/if}
	</div>
</article>

<style>
	.video-card {
		background: #1a1a1a;
		border-radius: 8px;
		overflow: hidden;
		transition: transform 0.2s ease;
	}

	.video-card:hover {
		transform: translateY(-4px);
	}

	.video-container {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
		background: #000;
	}

	.video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.year-badge {
		position: absolute;
		top: var(--space-3);
		right: var(--space-3);
		background: rgba(0, 0, 0, 0.75);
		color: #fff;
		padding: var(--space-2) var(--space-3);
		border-radius: 4px;
		font-size: var(--text-sm);
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		backdrop-filter: blur(8px);
	}

	.video-info {
		padding: var(--space-4);
	}

	.spot-name {
		font-size: var(--text-lg);
		font-weight: 600;
		margin: 0 0 var(--space-1) 0;
		color: #fff;
	}

	.era-title {
		font-size: var(--text-sm);
		color: #aaa;
		margin: 0 0 var(--space-1) 0;
	}

	.year-range {
		font-size: var(--text-xs);
		color: #666;
		margin: 0;
		font-variant-numeric: tabular-nums;
	}
</style>
