<script lang="ts">
	import SpotCard from '$lib/components/SpotCard.svelte';
	import type { Spot } from '$lib/types';

	let { data } = $props();

	// Define category order
	const categoryOrder = ['Parks & Nature', 'Cultural Districts', 'Waterfront'];

	// Group spots by category
	const spotsByCategory = $derived.by(() => {
		const grouped = new Map<string, Spot[]>();
		for (const spot of data.spots) {
			const category = spot.category || 'Other';
			if (!grouped.has(category)) {
				grouped.set(category, []);
			}
			grouped.get(category)!.push(spot);
		}
		return grouped;
	});

	// Get categories in specified order
	const orderedCategories = $derived(
		categoryOrder
			.filter((cat) => spotsByCategory.has(cat))
			.map((cat) => [cat, spotsByCategory.get(cat)!] as [string, Spot[]])
	);
</script>

<svelte:head>
	<title>TimeLens - Explore San Francisco Through Time</title>
</svelte:head>

<div class="page">
	<header class="hero">
		<h1 class="title small-caps">TimeLens</h1>
		<p class="tagline">Travel through San Francisco's history</p>
	</header>

	<main class="spots-container">
		{#each orderedCategories as [category, spots] (category)}
			<section class="category-section">
				<h2 class="category-title small-caps">{category}</h2>
				<div class="spots-grid">
					{#each spots as spot (spot.id)}
						<SpotCard {spot} />
					{/each}
				</div>
			</section>
		{/each}
	</main>
</div>

<style>
	.page {
		min-height: 100vh;
		background-color: var(--color-background);
		color: var(--color-text);
		font-family: var(--font-family);
		padding: var(--space-6) 0;
		padding-bottom: 100px; /* Space for BottomNav */
	}

	.hero {
		text-align: center;
		margin-bottom: var(--space-7);
		padding: var(--space-6) 0;
	}

	.title {
		font-size: 3rem;
		font-weight: 800;
		margin: 0 0 var(--space-4);
		color: var(--color-text);
	}

	.tagline {
		font-size: var(--text-lg);
		color: var(--color-text-light);
		margin: 0;
		font-weight: 400;
	}

	.spots-container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.category-section {
		margin-bottom: var(--space-8);
	}

	.category-section:last-child {
		margin-bottom: 0;
	}

	.category-title {
		font-size: var(--text-xl);
		font-weight: 700;
		color: var(--color-secondary);
		margin: 0 0 var(--space-5);
		padding-bottom: var(--space-3);
		border-bottom: 2px solid var(--color-border);
	}

	.spots-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-5);
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
			font-size: var(--text-xl);
		}

		.category-title {
			font-size: var(--text-2xl);
		}

		.spots-grid {
			gap: var(--space-6);
		}
	}
</style>
