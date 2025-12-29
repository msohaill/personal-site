<script lang="ts">
  import Footer from '$lib/components/Footer.svelte';
  import { dev } from '$app/environment';
  import '@fontsource-variable/inter';
  import '@fontsource/cormorant-garamond/500-italic.css';
  import '@fontsource/karla/300.css';
  import '../app.css';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
  {#if !dev}
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-VXV78TSSFG"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'G-VXV78TSSFG');
    </script>
  {/if}
</svelte:head>

<main>
  {@render children?.()}
</main>
<Footer />
