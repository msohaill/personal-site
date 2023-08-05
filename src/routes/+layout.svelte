<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { fly } from 'svelte/transition';
  import { dev, browser } from '$app/environment';
  import type { LayoutData } from './$types';
  import '@fontsource-variable/inter';
  import '@fontsource/cormorant-garamond/500-italic.css';
  import '@fontsource/karla/300.css';
  import '../app.css';

  export let data: LayoutData;

  const isReducedMotion = browser && matchMedia('(prefers-reduced-motion: reduce)').matches;
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

<Header />
{#if isReducedMotion}
  <main>
    <slot />
  </main>
{:else}
  {#key data.pathname}
    <main in:fly={{ x: -10, duration: 350, delay: 350 }} out:fly={{ y: 5, duration: 350 }}>
      <slot />
    </main>
  {/key}
{/if}
<Footer />
