<script lang="ts">
	type NavSection = 'browse' | 'saved' | 'explore' | 'camera';

	interface Props {
		active?: NavSection;
	}

	let { active = 'explore' }: Props = $props();

	const navItems: Array<{
		id: NavSection;
		label: string;
		icon: string;
		ariaLabel: string;
		href: string;
		disabled?: boolean;
	}> = [
		{
			id: 'browse',
			label: 'Browse',
			ariaLabel: 'Browse spots',
			href: '/',
			icon: `<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>`
		},
		{
			id: 'saved',
			label: 'Saved',
			ariaLabel: 'Saved spots (coming soon)',
			href: '/spots',
			disabled: true,
			icon: `<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>`
		},
		{
			id: 'camera',
			label: 'Gallery',
			ariaLabel: 'Video gallery (coming soon)',
			href: '/gallery',
			disabled: true,
			icon: `<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>`
		}
	];
</script>

<nav class="bottom-nav" aria-label="Main navigation">
	{#each navItems as item (item.id)}
		{#if item.disabled}
			<button
				class="nav-item disabled"
				aria-label={item.ariaLabel}
				aria-disabled="true"
				disabled
			>
				<svg
					class="nav-icon"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					{@html item.icon}
				</svg>
				<span class="nav-label">{item.label}</span>
			</button>
		{:else}
			<a
				href={item.href}
				class="nav-item"
				class:active={item.id === active}
				aria-label={item.ariaLabel}
				aria-current={item.id === active ? 'page' : undefined}
			>
				<svg
					class="nav-icon"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					{@html item.icon}
				</svg>
				<span class="nav-label">{item.label}</span>
			</a>
		{/if}
	{/each}
</nav>

<style>
	.bottom-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		background-color: var(--color-background);
		border-top: 1px solid var(--color-border);
		padding: var(--space-2) 0;
		gap: var(--space-1);
		z-index: 100;
	}

	/* Desktop: constrain to container width */
	@media (min-width: 768px) {
		.bottom-nav {
			max-width: 1024px;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	.nav-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-1);
		padding: var(--space-2);
		background: none;
		border: none;
		color: var(--color-secondary);
		cursor: pointer;
		transition: all 0.2s ease;
		position: relative;
		min-height: 44px; /* Accessibility touch target */
		min-width: 44px;
	}

	.nav-item:hover {
		color: var(--color-primary);
	}

	.nav-item:focus-visible {
		outline: 2px solid var(--color-secondary);
		outline-offset: 2px;
		border-radius: var(--space-2);
	}

	.nav-item.active {
		color: var(--color-primary);
	}

	.nav-item.active::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 48px;
		height: 48px;
		background: var(--color-primary);
		opacity: 0.1;
		border-radius: 50%;
		z-index: -1;
	}

	.nav-icon {
		width: 24px;
		height: 24px;
	}

	.nav-label {
		font-size: var(--text-xs);
		font-weight: 500;
		letter-spacing: 0.02em;
	}

	.nav-item.disabled {
		opacity: 0.4;
		cursor: not-allowed;
		pointer-events: none;
	}

	.nav-item.disabled:hover {
		color: var(--color-secondary);
		transform: none;
	}
</style>
