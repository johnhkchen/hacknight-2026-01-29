<script lang="ts">
	import type { Era } from '$lib/types.js';
	import EraTimeline from '$lib/components/EraTimeline.svelte';
	import EraVideoPlayer from '$lib/components/EraVideoPlayer.svelte';

	let { data } = $props();

	let selectedEraId = $state(data.spot.eras[0]?.id ?? '');

	const selectedEra: Era | undefined = $derived(
		data.spot.eras.find((era) => era.id === selectedEraId)
	);

	function selectEra(eraId: string) {
		selectedEraId = eraId;
	}

	function formatYearRange(era: Era): string {
		if (era.yearEnd === null) {
			return `${era.yearStart} – Present`;
		}
		if (era.yearStart === era.yearEnd) {
			return `${era.yearStart}`;
		}
		return `${era.yearStart} – ${era.yearEnd}`;
	}
</script>

<svelte:head>
	<title>{data.spot.name} | TimeLens</title>
</svelte:head>

<div class="spot-detail">
	<!-- Era video player with prompt fallback -->
	<div class="video-area">
		{#if selectedEra}
			<EraVideoPlayer era={selectedEra} />
		{/if}
	</div>

	<div class="content">
		<!-- Spot header with name and current era -->
		<header class="spot-header">
			<h1 class="spot-name small-caps">{data.spot.name}</h1>
			{#if selectedEra}
				<p class="era-subtitle">
					<span class="era-title">{selectedEra.title}</span>
					<span class="era-years">{formatYearRange(selectedEra)}</span>
				</p>
			{/if}
		</header>

		<!-- Era timeline with expandable cards -->
		<section class="era-timeline-container">
			<EraTimeline
				eras={data.spot.eras}
				{selectedEraId}
				onselect={selectEra}
			/>
		</section>
	</div>
</div>

<style>
	.spot-detail {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		font-family: var(--font-family);
		background-color: var(--color-background);
		color: var(--color-text);
		padding-bottom: 80px; /* Space for BottomNav */
	}

	/* Video area - contains the EraVideoPlayer component */
	.video-area {
		width: 100vw; /* Full viewport width on mobile */
		margin-left: calc(-1 * var(--container-padding)); /* Break out of container padding */
		margin-right: calc(-1 * var(--container-padding));
		padding: 0;
		background-color: var(--color-background);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.content {
		flex: 1;
		padding: var(--space-5) 0;
		max-width: 600px;
		margin: 0 auto;
		width: 100%;
		box-sizing: border-box;
	}

	.spot-header {
		margin-bottom: var(--space-5);
	}

	.spot-name {
		font-size: 1.75rem;
		font-weight: 700;
		margin: 0 0 var(--space-2);
		line-height: 1.2;
		color: var(--color-text);
	}

	.era-subtitle {
		margin: 0;
		display: flex;
		align-items: baseline;
		gap: var(--space-2);
		flex-wrap: wrap;
	}

	.era-title {
		font-size: var(--text-lg);
		font-weight: 600;
		color: var(--color-secondary);
	}

	.era-years {
		font-size: var(--text-sm);
		color: var(--color-text-light);
	}

	.era-timeline-container {
		margin-bottom: var(--space-5);
	}

	/* Larger screens */
	@media (min-width: 768px) {
		.video-area {
			width: 100%; /* Reset to normal width */
			margin-left: 0;
			margin-right: 0;
			padding: var(--space-6);
		}

		.content {
			padding: var(--space-6) 0;
		}

		.spot-name {
			font-size: 2.25rem;
		}
	}
</style>
