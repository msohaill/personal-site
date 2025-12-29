<script lang="ts">
  import { X } from 'lucide-svelte';
  import { onMount, type Snippet } from 'svelte';

  let { opened = $bindable(), children }: { opened: boolean, children: Snippet } = $props();

  let dialog: HTMLDialogElement;

  $effect(() => {
    if (opened) {
      dialog.showModal();
      requestAnimationFrame(() => dialog.querySelector('button')?.focus());
    } else {
      dialog.close();
    }
  });

  onMount(() => {
    dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      opened = false;
    });
  });
</script>

<dialog bind:this={dialog} onclick={e => e.target === e.currentTarget && (opened = false)} class="m-auto">
  <div class="modal">
    <button class="fixed right-5 top-5 text-white cursor-pointer" onclick={() => opened = false}><X /></button>
    {@render children?.()}
  </div>
</dialog>

<style lang="postcss">
  @reference "tailwindcss";
  @reference "../../app.css";

  .modal {
    @apply m-auto flex justify-center items-center;
  }

  dialog::backdrop {
    @apply bg-black/60;
  }

  .modal :global(*) {
    @apply max-w-[90vw] max-h-[90vh];
  }
</style>
