<script lang="ts">
	import PromptPlaceholder from '$lib/components/PromptPlaceholder.svelte';
	import EraVideoPlayer from '$lib/components/EraVideoPlayer.svelte';
	import spotsData from '$lib/data/spots.json';
	import type { Era } from '$lib/types';

	const sampleEra = spotsData.spots[0].eras[0];

	// Create a mock era with a video URL for testing
	const mockEraWithVideo: Era = {
		...(sampleEra as Era),
		videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
	};
</script>

<svelte:head>
	<title>Component Demos - TimeLens</title>
</svelte:head>

<main>
	<div class="demo-container">
		<h1>TimeLens Component Demos</h1>
		<p class="demo-description">
			Interactive demos of the video player and placeholder components.
		</p>

		<section class="demo-section">
			<h2 class="section-title">EraVideoPlayer Component</h2>
			<p class="section-description">
				Displays looping video with loading states and mobile-optimized playback settings.
			</p>

			<div class="demo-wrapper">
				<EraVideoPlayer era={mockEraWithVideo} />
			</div>

			<div class="era-details">
				<h3>Test Era: {mockEraWithVideo.title}</h3>
				<p><strong>Years:</strong> {mockEraWithVideo.yearStart} - {mockEraWithVideo.yearEnd || 'Present'}</p>
				<p><strong>Video URL:</strong> {mockEraWithVideo.videoUrl}</p>
				<p><strong>Description:</strong> {mockEraWithVideo.description}</p>
			</div>
		</section>

		<section class="demo-section">
			<h2 class="section-title">PromptPlaceholder Component</h2>
			<p class="section-description">
				Displays WAN prompts as cinematic placeholders for videos that will be generated.
			</p>

			<div class="demo-wrapper">
				<PromptPlaceholder prompt={sampleEra.wanPrompt} eraTitle={sampleEra.title} />
			</div>

			<div class="era-details">
				<h3>Sample Era: {sampleEra.title}</h3>
				<p><strong>Years:</strong> {sampleEra.yearStart} - {sampleEra.yearEnd || 'Present'}</p>
				<p><strong>Description:</strong> {sampleEra.description}</p>
			</div>
		</section>
	</div>
</main>

<style>
	main {
		min-height: 100vh;
		padding: 2rem;
		background: #0f1117;
		color: rgba(255, 255, 255, 0.9);
	}

	.demo-container {
		max-width: 1200px;
		margin: 0 auto;
	}

	h1 {
		font-size: 2rem;
		font-weight: 700;
		margin: 0 0 0.5rem;
		color: #a5b4fc;
	}

	.demo-section {
		margin-bottom: 4rem;
	}

	.section-title {
		font-size: 1.5rem;
		font-weight: 600;
		margin: 2rem 0 0.5rem;
		color: rgba(255, 255, 255, 0.9);
	}

	.section-description {
		font-size: 0.9375rem;
		color: rgba(255, 255, 255, 0.6);
		margin: 0 0 1.5rem;
	}

	.demo-description {
		font-size: 1rem;
		color: rgba(255, 255, 255, 0.6);
		margin: 0 0 2rem;
	}

	.demo-wrapper {
		margin: 2rem 0;
	}

	.era-details {
		margin-top: 3rem;
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
	}

	.era-details h3 {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0 0 1rem;
		color: rgba(255, 255, 255, 0.9);
	}

	.era-details p {
		margin: 0.5rem 0;
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.7);
	}

	.era-details strong {
		color: rgba(255, 255, 255, 0.85);
	}

	@media (min-width: 768px) {
		main {
			padding: 3rem;
		}

		h1 {
			font-size: 2.5rem;
		}
	}
</style>
