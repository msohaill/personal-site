<script lang="ts">
  import { page } from '$app/stores';
  import { Bug } from 'lucide-svelte';
</script>

<div class="layout flex flex-col justify-center items-center gap-10">
  <div class="text-xl flex justify-center items-center">
    <Bug class="mr-2" />
    <span class="font-medium">{$page.status}</span>
    <div class="mx-4 h-8 border-l border-black"></div>
    {$page.error?.message}
  </div>
  <p>
    <a
      href="/"
      class="font-bold text-sm text-pastel-red hover:text-pastel-red-light transition-colors"
      >&lcub; home &rcub;
    </a>
  </p>
</div>
