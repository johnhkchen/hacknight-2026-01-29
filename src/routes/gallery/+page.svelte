<script lang="ts">
	import VideoGallery from '$lib/components/VideoGallery.svelte';
</script>

<svelte:head>
	<title>Video Gallery - TimeLens</title>
	<meta
		name="description"
		content="Browse AI-generated historical videos from San Francisco landmarks"
	/>
</svelte:head>

<VideoGallery />

<style>
	:global(body) {
		background: #0a0a0a;
		color: #fff;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		margin: 0;
		padding: 0;
	}
</style>
