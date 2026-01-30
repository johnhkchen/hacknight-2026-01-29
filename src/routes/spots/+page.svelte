<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>All Spots - TimeLens</title>
</svelte:head>

<div class="page">
	<header class="hero">
		<h1 class="title">Explore San Francisco</h1>
		<p class="tagline">Discover {data.spots.length} historic locations and their stories across time</p>
	</header>

	<main class="spots-grid">
		{#each data.spots as spot (spot.id)}
			<a href="/spot/{spot.id}" class="spot-card">
				<div class="spot-header">
					<h2 class="spot-name">{spot.name}</h2>
					<span class="era-count">{spot.eras.length} eras</span>
				</div>
				<p class="spot-description">{spot.description}</p>
				<div class="spot-footer">
					<span class="explore-link">Explore →</span>
				</div>
			</a>
		{/each}
	</main>
</div>

<style>
	.page {
		min-height: 100vh;
		background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
		color: #f5f5f5;
		font-family: system-ui, -apple-system, sans-serif;
		padding: 2rem 1rem;
	}

	.hero {
		text-align: center;
		margin-bottom: 3rem;
		padding: 2rem 0;
	}

	.title {
		font-size: 3rem;
		font-weight: 800;
		margin: 0 0 1rem;
		background: linear-gradient(135deg, #a5b4fc 0%, #7eb8b8 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		letter-spacing: -0.02em;
	}

	.tagline {
		font-size: 1.125rem;
		color: rgba(255, 255, 255, 0.7);
		margin: 0;
		font-weight: 400;
	}

	.spots-grid {
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
		padding: 0 1rem;
	}

	.spot-card {
		display: block;
		padding: 1.75rem;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 16px;
		text-decoration: none;
		color: inherit;
		transition:
			all 0.3s ease;
		cursor: pointer;
	}

	.spot-card:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(165, 180, 252, 0.4);
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
	}

	.spot-card:active {
		transform: translateY(0);
	}

	.spot-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 0.75rem;
	}

	.spot-name {
		font-size: 1.5rem;
		font-weight: 700;
		margin: 0;
		color: #f5f5f5;
	}

	.era-count {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.5);
		font-weight: 500;
		white-space: nowrap;
	}

	.spot-description {
		margin: 0 0 1.25rem;
		font-size: 1rem;
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.7);
	}

	.spot-footer {
		display: flex;
		justify-content: flex-end;
	}

	.explore-link {
		font-size: 0.9375rem;
		font-weight: 600;
		color: #a5b4fc;
		transition: color 0.2s ease;
	}

	.spot-card:hover .explore-link {
		color: #c7d2fe;
	}

	@media (min-width: 640px) {
		.spots-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.title {
			font-size: 4rem;
		}

		.tagline {
			font-size: 1.25rem;
		}

		.spots-grid {
			gap: 2rem;
		}

		.spot-card {
			padding: 2rem;
		}

		.spot-name {
			font-size: 1.75rem;
		}
	}
</style>
