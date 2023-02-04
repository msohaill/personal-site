<script lang="ts">
  import Header from '../lib/components/Header.svelte';
  import Footer from '../lib/components/Footer.svelte';
  import { fly } from 'svelte/transition';
  import type { LayoutData } from './$types';
  import '@fontsource/inter/variable.css';
  import "../app.css";


  export let data: LayoutData;
</script>

<Header/>
{#key data.pathname}
  <main
    in:fly={{ x: -10, duration: 350, delay: 350 }}
    out:fly={{ y: 5, duration: 350 }}
  >
    <slot />
  </main>
{/key}
<Footer />
