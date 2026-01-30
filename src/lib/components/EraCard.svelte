<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { Era, EraIcon } from '$lib/types.js';
	import { createEventDispatcher } from 'svelte';

	interface Props {
		era: Era;
		expanded: boolean;
	}

	let { era, expanded = false }: Props = $props();

	const dispatch = createEventDispatcher<{ select: string }>();

	function handleClick(): void {
		if (!expanded) {
			dispatch('select', era.id);
		}
	}

	function formatYear(era: Era): string {
		return `${era.yearStart}`;
	}

	function getIconSvg(icon: EraIcon): string {
		const icons: Record<EraIcon, string> = {
			anchor: `<path d="M12 2a1 1 0 0 1 1 1v1.07A7.002 7.002 0 0 1 19 11v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a7.002 7.002 0 0 1 6-6.93V3a1 1 0 0 1 1-1z"/><circle cx="12" cy="5" r="1.5"/><path d="M12 8v12M8 20h8M5 11h2M17 11h2"/>`,
			factory: `<path d="M2 20V8l6 3V8l6 3V8l6 3v9H2zM4 14h4v6H4zM10 14h4v6h-4zM16 14h4v6h-4z"/>`,
			building: `<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 6h2v2H9zM13 6h2v2h-2zM9 10h2v2H9zM13 10h2v2h-2zM9 14h2v2H9zM13 14h2v2h-2zM9 18h6v4H9z"/>`,
			ship: `<path d="M2 21l.5-2A2 2 0 0 1 4.5 17h15a2 2 0 0 1 2 2l.5 2"/><path d="M12 17V5"/><path d="M5 17l7-4 7 4"/><path d="M12 5l-4 4h8z"/>`,
			users: `<circle cx="9" cy="7" r="3"/><circle cx="15" cy="7" r="3"/><path d="M4 21v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2"/><path d="M14 15a4 4 0 0 1 4 4v2"/>`,
			mountain: `<path d="M8 3l4 8 5-5 5 14H2z"/>`,
			flower: `<circle cx="12" cy="12" r="3"/><path d="M12 2a3 3 0 0 0 0 6 3 3 0 0 0 0-6z"/><path d="M17.196 6.804a3 3 0 0 0-4.243 4.243 3 3 0 0 0 4.243-4.243z"/><path d="M22 12a3 3 0 0 0-6 0 3 3 0 0 0 6 0z"/><path d="M17.196 17.196a3 3 0 0 0-4.243-4.243 3 3 0 0 0 4.243 4.243z"/><path d="M12 22a3 3 0 0 0 0-6 3 3 0 0 0 0 6z"/><path d="M6.804 17.196a3 3 0 0 0 4.243-4.243 3 3 0 0 0-4.243 4.243z"/><path d="M2 12a3 3 0 0 0 6 0 3 3 0 0 0-6 0z"/><path d="M6.804 6.804a3 3 0 0 0 4.243 4.243 3 3 0 0 0-4.243-4.243z"/>`,
			train: `<rect x="4" y="4" width="16" height="12" rx="2"/><path d="M4 12h16M12 4v12M6 20l2-4M18 20l-2-4M8 20h8"/><circle cx="8" cy="8" r="1"/><circle cx="16" cy="8" r="1"/>`,
			temple: `<path d="M12 2L2 8h20zM4 8v12h16V8M8 12v8M16 12v8M12 12v8M6 20h12"/>`,
			castle: `<path d="M4 21V11l2-2V4h2v3l2-2V4h4v1l2 2V4h2v5l2 2v10z"/><rect x="9" y="14" width="6" height="7"/><rect x="6" y="2" width="2" height="4"/><rect x="10" y="2" width="4" height="4"/><rect x="16" y="2" width="2" height="4"/>`
		};
		return icons[icon] || icons.building;
	}
</script>

<div
	class="era-card"
	class:expanded
	role="button"
	tabindex="0"
	onclick={handleClick}
	onkeydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleClick();
		}
	}}
	aria-expanded={expanded}
	aria-controls="era-content-{era.id}"
>
	<div class="era-header">
		<div class="era-icon" aria-hidden="true">
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				{@html getIconSvg(era.icon)}
			</svg>
		</div>
		<div class="era-info">
			<span class="era-year">{formatYear(era)}</span>
			<span class="era-title">{era.title}</span>
		</div>
	</div>

	{#if expanded}
		<div
			id="era-content-{era.id}"
			class="era-content"
			transition:slide={{ duration: 250 }}
		>
			<p class="era-description">{era.description}</p>
			<button
				class="audio-button"
				onclick={(e) => {
					e.stopPropagation();
				}}
				aria-label="Listen to the story about {era.title}"
			>
				<svg
					class="speaker-icon"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
					<path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
					<path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
				</svg>
				<span>Listen to the story</span>
			</button>
		</div>
	{/if}
</div>

<style>
	.era-card {
		width: 100%;
		padding: 0;
		border: 1px solid var(--color-border);
		border-radius: 12px;
		background: var(--color-background);
		cursor: pointer;
		transition:
			background 0.2s ease,
			border-color 0.2s ease,
			box-shadow 0.2s ease,
			transform 0.1s ease;
		text-align: left;
		overflow: hidden;
	}

	.era-card:hover {
		background: color-mix(in srgb, var(--color-background) 90%, var(--color-text) 10%);
		border-color: color-mix(in srgb, var(--color-border) 70%, var(--color-text) 30%);
		transform: translateY(-1px);
	}

	.era-card:focus-visible {
		outline: 2px solid var(--color-secondary);
		outline-offset: 2px;
	}

	.era-card:active {
		transform: translateY(0);
	}

	.era-card.expanded {
		background: #ffffff;
		border-color: var(--color-secondary);
		box-shadow: var(--shadow-md);
		cursor: default;
	}

	.era-header {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		padding: var(--space-4);
		min-height: 48px;
	}

	.era-icon {
		flex-shrink: 0;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: color-mix(in srgb, var(--color-secondary) 15%, transparent);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-secondary);
		transition:
			background 0.2s ease,
			color 0.2s ease;
	}

	.era-card.expanded .era-icon {
		background: color-mix(in srgb, var(--color-secondary) 25%, transparent);
		color: color-mix(in srgb, var(--color-secondary) 80%, black 20%);
	}

	.era-icon svg {
		width: 22px;
		height: 22px;
	}

	.era-info {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		flex: 1;
	}

	.era-year {
		font-size: var(--text-xs);
		font-weight: 600;
		color: color-mix(in srgb, var(--color-text) 60%, var(--color-primary) 40%);
		text-transform: uppercase;
		letter-spacing: var(--letter-spacing-caps);
	}

	.era-title {
		font-size: var(--text-base);
		font-weight: 600;
		color: var(--color-text);
		line-height: 1.4;
	}

	.era-card.expanded .era-title {
		color: color-mix(in srgb, var(--color-text) 110%, black 10%);
	}

	.era-content {
		padding: 0 var(--space-4) var(--space-4);
		padding-left: calc(var(--space-4) + 44px + var(--space-4));
	}

	.era-description {
		margin: 0 0 var(--space-4);
		font-size: var(--text-sm);
		line-height: 1.65;
		color: var(--color-text-light);
	}

	.audio-button {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: 0.625rem var(--space-4);
		border: none;
		border-radius: 24px;
		background: var(--color-primary);
		color: white;
		font-size: var(--text-sm);
		font-weight: 500;
		cursor: pointer;
		transition:
			background 0.2s ease,
			transform 0.1s ease,
			box-shadow 0.2s ease;
		box-shadow: 0 2px 8px color-mix(in srgb, var(--color-primary) 20%, transparent);
	}

	.audio-button:hover {
		background: color-mix(in srgb, var(--color-primary) 85%, black 15%);
		box-shadow: 0 4px 12px color-mix(in srgb, var(--color-primary) 30%, transparent);
	}

	.audio-button:active {
		transform: scale(0.98);
		box-shadow: var(--shadow-sm);
	}

	.audio-button:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
	}

	.speaker-icon {
		width: 18px;
		height: 18px;
	}

	@media (min-width: 768px) {
		.era-header {
			padding: 1.125rem 1.25rem;
		}

		.era-content {
			padding: 0 1.25rem 1.25rem;
			padding-left: calc(1.25rem + 44px + var(--space-4));
		}

		.era-description {
			font-size: var(--text-base);
		}
	}
</style>
