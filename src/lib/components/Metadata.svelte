<script lang="ts">
  import { page } from '$app/stores';

  export let title: string;
  export let description: string;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content="{$page.url.origin}/assets/images/cover.jpeg" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>
