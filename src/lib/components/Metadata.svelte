<script lang="ts">
  export let title: string;
  export let description: string;
  export let cover: string = '/assets/images/cover.jpeg';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content="https://msohail.vercel.app{cover}" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>
