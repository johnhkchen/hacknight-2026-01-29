<script lang="ts">
	interface Props {
		prompt: string;
		eraTitle: string;
	}

	let { prompt, eraTitle }: Props = $props();
</script>

<div class="prompt-placeholder">
	<div class="film-grain"></div>

	<div class="content">
		<div class="preview-badge">
			<svg
				class="film-icon"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
				<line x1="7" y1="2" x2="7" y2="22" />
				<line x1="17" y1="2" x2="17" y2="22" />
				<line x1="2" y1="12" x2="22" y2="12" />
				<line x1="2" y1="7" x2="7" y2="7" />
				<line x1="2" y1="17" x2="7" y2="17" />
				<line x1="17" y1="17" x2="22" y2="17" />
				<line x1="17" y1="7" x2="22" y2="7" />
			</svg>
			<span>Video Preview</span>
		</div>

		<h2 class="era-title">{eraTitle}</h2>

		<div class="prompt-text">
			<p>{prompt}</p>
		</div>
	</div>
</div>

<style>
	.prompt-placeholder {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
		background: linear-gradient(135deg, #1a1f35 0%, #2d1b3d 50%, #1a1f35 100%);
		border-radius: 0; /* Edge-to-edge on mobile */
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.5rem;
		box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.3);
	}

	.film-grain {
		position: absolute;
		inset: 0;
		background-image:
			repeating-linear-gradient(
				0deg,
				transparent,
				transparent 2px,
				rgba(255, 255, 255, 0.02) 2px,
				rgba(255, 255, 255, 0.02) 4px
			);
		pointer-events: none;
		opacity: 0.6;
		animation: scanlines 8s linear infinite;
	}

	@keyframes scanlines {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(4px);
		}
	}

	.content {
		position: relative;
		z-index: 1;
		max-width: 800px;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-5);
	}

	.preview-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-4);
		background: rgba(165, 180, 252, 0.15);
		border: 1px solid rgba(165, 180, 252, 0.3);
		border-radius: 20px;
		color: #a5b4fc;
		font-size: var(--text-xs);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.film-icon {
		width: 16px;
		height: 16px;
	}

	.era-title {
		margin: 0;
		font-size: 2rem;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.95);
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
		letter-spacing: -0.02em;
	}

	.prompt-text {
		max-width: 700px;
	}

	.prompt-text p {
		margin: 0;
		font-size: var(--text-sm);
		line-height: 1.7;
		color: rgba(255, 255, 255, 0.6);
		font-weight: 400;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
	}

	@media (min-width: 768px) {
		.prompt-placeholder {
			border-radius: 12px;
			padding: var(--space-7);
			box-shadow:
				inset 0 0 60px rgba(0, 0, 0, 0.3),
				0 4px 20px rgba(0, 0, 0, 0.4);
		}

		.content {
			gap: var(--space-6);
		}

		.preview-badge {
			font-size: 0.8125rem;
			padding: 0.625rem var(--space-5);
		}

		.film-icon {
			width: 18px;
			height: 18px;
		}

		.era-title {
			font-size: 2.5rem;
		}

		.prompt-text p {
			font-size: var(--text-sm);
			line-height: 1.8;
		}
	}

	@media (min-width: 1024px) {
		.era-title {
			font-size: 3rem;
		}

		.prompt-text p {
			font-size: var(--text-base);
		}
	}
</style>
