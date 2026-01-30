<script lang="ts">
	import type { Era } from '$lib/types';
	import PromptPlaceholder from './PromptPlaceholder.svelte';
	import { fade } from 'svelte/transition';

	interface Props {
		era: Era;
	}

	let { era }: Props = $props();

	let hasError = $state(false);

	// Reset error state when era changes
	$effect(() => {
		era.id; // Track era.id
		hasError = false;
	});

	function handleError() {
		hasError = true;
	}

	// Determine whether to show video or placeholder
	const shouldShowPlaceholder = $derived(!era.videoUrl || hasError);
</script>

<div class="video-player">
	{#key era.id}
		{#if shouldShowPlaceholder}
			<div class="placeholder-container" transition:fade={{ duration: 300 }}>
				<PromptPlaceholder prompt={era.wanPrompt} eraTitle={era.title} />
			</div>
		{:else}
			<div class="video-container" transition:fade={{ duration: 300 }}>
				<!-- svelte-ignore a11y_missing_attribute -->
				<video
					src={era.videoUrl}
					loop
					muted
					autoplay
					playsinline
					onerror={handleError}
				>
					<track kind="captions" />
				</video>
			</div>
		{/if}
	{/key}
</div>

<style>
	.video-player {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
		background: #000;
		border-radius: 0; /* Edge-to-edge on mobile */
		overflow: hidden;
		box-shadow: none; /* No shadow on mobile */
	}

	.placeholder-container,
	.video-container {
		width: 100%;
		height: 100%;
		position: absolute;
		inset: 0;
	}

	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	/* Add rounded corners and shadow on larger screens */
	@media (min-width: 768px) {
		.video-player {
			border-radius: 12px;
			box-shadow: var(--shadow-lg);
		}
	}
</style>
