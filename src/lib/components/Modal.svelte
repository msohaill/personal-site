<script lang="ts">
  import { X } from 'lucide-svelte';
  import { fade } from 'svelte/transition';

  export let open = false;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') open = false;
  };
</script>

{#if open}
  <!-- svelte-ignore a11y-autofocus -->
  <div
    autofocus
    transition:fade={{ duration: 250 }}
    tabIndex="0"
    class="modal"
    on:click|self={() => (open = false)}
    on:keydown={handleKeyDown}
  >
    <button class="fixed right-5 top-5 text-white" on:click={() => (open = false)}><X /></button>
    <slot />
  </div>
{/if}

<style lang="postcss">
  .modal {
    @apply w-screen h-screen fixed top-0 left-0 bg-black
    bg-opacity-60 z-10 flex justify-center items-center;
  }

  .modal > :global(*) {
    @apply max-w-[90vw] max-h-[90vh];
  }
</style>
