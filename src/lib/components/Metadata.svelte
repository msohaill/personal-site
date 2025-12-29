<script lang="ts">
  let {
    title,
    description,
    cover = '/assets/images/cover.jpeg'
   }: { title: string; description: string; cover?: string } = $props();
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content="https://msohail.vercel.app{cover}" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>
