<script lang="ts">
	import type { Era } from '$lib/types.js';
	import EraCard from './EraCard.svelte';
	import { createEventDispatcher } from 'svelte';

	interface Props {
		eras: Era[];
	}

	let { eras }: Props = $props();

	const dispatch = createEventDispatcher<{ eraChange: string }>();

	let expandedEraId = $state<string>(eras[0]?.id ?? '');

	function handleSelectEra(event: CustomEvent<string>): void {
		expandedEraId = event.detail;
		dispatch('eraChange', expandedEraId);
	}
</script>

<div class="era-accordion" role="region" aria-label="Historical eras">
	{#each eras as era (era.id)}
		<EraCard
			{era}
			expanded={era.id === expandedEraId}
			on:select={handleSelectEra}
		/>
	{/each}
</div>

<style>
	.era-accordion {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		width: 100%;
	}

	@media (min-width: 768px) {
		.era-accordion {
			gap: var(--space-4);
		}
	}
</style>
