<script lang="ts">
  import Metadata from '$lib/components/Metadata.svelte';
  import type { Project as ProjectType } from '$lib/types';
  import Project from '$lib/components/Project.svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { CalendarDays, Book } from 'lucide-svelte';
  import { basename } from '$lib/utils';

  const projects = import.meta.glob('$static/data/projects/*.md', {
    eager: true,
  }) as Record<string, ProjectType>;

  const images = import.meta.glob('$static/images/projects/*.{png,jpg,gif,svg}', {
    eager: true,
  }) as Record<string, { default: string }>;

  let sortOrder: 'name' | 'date' = 'date';

  $: projectsByName = Object.keys(projects).sort((a, b) => {
    const titleA = projects[a].title.toLowerCase();
    const titleB = projects[b].title.toLowerCase();
    return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
  });

  $: projectsByDate = Object.keys(projects).sort((a, b) => +projects[b].date - +projects[a].date);

  onMount(() => {
    const selected = $page.url.hash.slice(1);
    if (selected) {
      setTimeout(() => {
        if ($page.url.hash.slice(1) === selected) {
          document.getElementById(selected)?.scrollIntoView();
        }
      }, 500);
    }
  });
</script>

<Metadata
  title="Muhammad Sohail – Projects"
  description="A collection of software items I have worked on in the past."
/>

<section class="layout py-12 space-y-4">
  <h2 class="section-heading">Open Source Items</h2>

  <p class="text-lg">
    Building applications is something I see as a means of <em class="keyword"
      >creative exploration</em
    >.
  </p>

  <p class="text-lg">
    It allows me to pursue inspiration and delve into novel ideas, all while developing software
    that not only benefits myself, but also others.
  </p>

  <p class="text-lg">
    Have an idea of something you would like to work on?
    <a class="link" href="mailto:muhammad.sohail@mail.mcgill.ca?subject=New%20software%20item"
      >Let me know</a
    >!
  </p>
</section>

<div class="bg-gray-900 text-neutral-200 dark">
  <section class="layout py-12">
    <h2 class="section-heading text-white">Table of Contents</h2>
    <ul class="sm:columns-2">
      {#each projectsByName as id (id)}
        <li>
          <a class="link" href="#{basename(id).slice(0, -3)}">{projects[id].title}</a>
        </li>
      {/each}
    </ul>
  </section>
</div>

<div class="bg-neutral-50 border-b border-neutral-200 py-4">
  <div class="flex justify-center space-x-6">
    <button class:active={sortOrder === 'date'} on:click={() => (sortOrder = 'date')}>
      <CalendarDays size={18} strokeWidth={1.8} class="mr-1.5" /> by Date
    </button>
    <button class:active={sortOrder === 'name'} on:click={() => (sortOrder = 'name')}>
      <Book size={18} strokeWidth={1.8} class="mr-1.5" /> by Name
    </button>
  </div>
</div>

{#each sortOrder === 'date' ? projectsByDate : projectsByName as id (id)}
  <section class="py-10" id={basename(id).slice(0, -3)}>
    <div class="mx-auto max-w-[1152px] px-4 sm:px-6">
      <Project project={projects[id]} {images} />
    </div>
  </section>
{/each}

<style lang="postcss">
  button {
    @apply flex items-center text-neutral-400 transition-colors hover:text-black;
  }

  button.active {
    @apply text-black;
  }
</style>
