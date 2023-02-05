<script lang="ts">
  import { page } from '$app/stores';

  const pages = [
    { name: 'Projects', href: '/projects' },
    { name: 'Resume', href: '/resume' },
    { name: 'Photos', href: '/photos' }
  ];

  let pageTitle: string | null = null;

  $: {
    const currentPage = pages.find(({ href }) => href === $page.url.pathname);
    pageTitle = currentPage?.name ?? null;
  }
</script>

<header
  class="layout flex justify-between items-start mb-6"
  data-sveltekit-noscroll
  data-sveltekit-preload-code="eager"
>
  <h1 class="font-bold text-black text-2xl">
    <a href="/">Muhammad Sohail</a>
    {#if pageTitle}
      <span class="page-title">
        <span class="text-neutral-400">—</span>
        {pageTitle}
      </span>
    {/if}
  </h1>
  <nav>
    {#each pages as sitePage (sitePage.href)}
      <a
        href={sitePage.href}
        class="hover:text-black transition-colors"
        class:text-black={$page.url.pathname === sitePage.href}
      >
        {sitePage.name.toLowerCase()}
      </a>
    {/each}
  </nav>
</header>

<style lang="postcss">
  nav {
    @apply flex items-start text-neutral-500 justify-end space-x-6 text-lg py-0.5;
  }

  .page-title {
    @apply font-light;
  }

  @media (max-width: 640px) {
    .page-title {
      @apply block text-xl;
    }

    .page-title span {
      @apply hidden;
    }
  }

  @media (max-width: 420px) {
    nav {
      @apply flex-col items-end space-x-0;
    }
  }
</style>
