<script lang="ts">
	import type { Spot } from '$lib/types.js';
	import { onMount } from 'svelte';

	interface Props {
		spot: Spot;
	}

	let { spot }: Props = $props();

	let currentEraIndex = $state(0);
	let isHovering = $state(false);
	let videoElement: HTMLVideoElement | null = $state(null);
	let cycleInterval: number | null = null;

	// Get eras that have videos
	const erasWithVideos = $derived(spot.eras.filter((era) => era.videoUrl));
	const hasVideos = $derived(erasWithVideos.length > 0);
	const currentEra = $derived(
		hasVideos ? erasWithVideos[currentEraIndex % erasWithVideos.length] : null
	);

	// Cycle through eras every 4 seconds
	onMount(() => {
		if (hasVideos) {
			cycleInterval = window.setInterval(() => {
				if (!isHovering) {
					currentEraIndex = (currentEraIndex + 1) % erasWithVideos.length;
				}
			}, 4000);
		}

		return () => {
			if (cycleInterval) {
				clearInterval(cycleInterval);
			}
		};
	});

	// Play video on hover
	$effect(() => {
		if (videoElement) {
			if (isHovering) {
				videoElement.play().catch(() => {
					// Ignore autoplay errors
				});
			} else {
				videoElement.pause();
			}
		}
	});

	function handleMouseEnter() {
		isHovering = true;
	}

	function handleMouseLeave() {
		isHovering = false;
	}
</script>

<a
	href="/spot/{spot.id}"
	class="spot-card"
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
>
	<div class="media-container">
		{#if hasVideos && currentEra?.videoUrl}
			<!-- Video background that plays on hover -->
			<!-- svelte-ignore a11y_media_has_caption -->
			<video
				bind:this={videoElement}
				src={currentEra.videoUrl}
				loop
				muted
				playsinline
				class="card-video"
				class:playing={isHovering}
			></video>
		{/if}

		<!-- Static thumbnail extracted from video -->
		<div class="card-image" style="background-image: url({spot.imageUrl})"></div>

		<div class="gradient-scrim"></div>
		<div class="card-content">
			<div class="card-header">
				<h2 class="spot-name">{spot.name}</h2>
				<div class="badges">
					{#if hasVideos}
						<span class="era-indicator" title="Era {currentEraIndex + 1} of {erasWithVideos.length}">
							{currentEraIndex + 1}/{erasWithVideos.length}
						</span>
					{/if}
					<span class="era-badge">{spot.eras.length} eras</span>
				</div>
			</div>
			<p class="spot-description">{spot.description}</p>
		</div>
	</div>
</a>

<style>
	.spot-card {
		display: block;
		position: relative;
		aspect-ratio: 16 / 9;
		border-radius: 16px;
		overflow: hidden;
		text-decoration: none;
		color: inherit;
		transition: all 0.3s ease;
		box-shadow: var(--shadow-md);
	}

	.spot-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
	}

	.spot-card:active {
		transform: translateY(-2px);
	}

	.media-container {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.card-video {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0;
		transition: opacity 0.4s ease;
		z-index: 1;
	}

	.card-video.playing {
		opacity: 1;
	}

	.card-image {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, #d4a574 0%, #c89666 50%, #b88860 100%);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		z-index: 0;
	}

	.gradient-scrim {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 0.3) 50%,
			rgba(0, 0, 0, 0.8) 100%
		);
		z-index: 2;
	}

	.card-content {
		position: relative;
		z-index: 3;
		padding: var(--space-5);
		color: #ffffff;
	}

	.card-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--space-3);
		margin-bottom: var(--space-2);
	}

	.spot-name {
		font-size: var(--text-2xl);
		font-weight: 700;
		margin: 0;
		color: #ffffff;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		flex: 1;
	}

	.badges {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		flex-shrink: 0;
	}

	.era-indicator {
		display: inline-block;
		padding: var(--space-1) var(--space-3);
		background: rgba(95, 158, 160, 0.3);
		backdrop-filter: blur(8px);
		border-radius: 12px;
		font-size: var(--text-xs);
		font-weight: 600;
		white-space: nowrap;
		border: 1px solid rgba(95, 158, 160, 0.5);
		color: #ffffff;
	}

	.era-badge {
		display: inline-block;
		padding: var(--space-1) var(--space-3);
		background: rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(8px);
		border-radius: 12px;
		font-size: var(--text-xs);
		font-weight: 600;
		white-space: nowrap;
		border: 1px solid rgba(255, 255, 255, 0.3);
	}

	.spot-description {
		margin: 0;
		font-size: var(--text-sm);
		line-height: 1.5;
		color: rgba(255, 255, 255, 0.95);
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	@media (min-width: 1024px) {
		.card-content {
			padding: var(--space-6);
		}

		.spot-name {
			font-size: 1.75rem;
		}

		.spot-description {
			font-size: var(--text-base);
			-webkit-line-clamp: 3;
		}
	}
</style>
