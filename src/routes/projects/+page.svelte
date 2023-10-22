<script lang="ts">
  import Metadata from '$lib/components/Metadata.svelte';
  import type { Project as ProjectType } from '$lib/types';
  import Project from '$lib/components/Project.svelte';
  import { onMount } from 'svelte';
  import { flip } from 'svelte/animate';
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
  <h2 class="section-heading">Some of My Projects</h2>

  <p class="text-lg">
    Building things is is definitely an art, and when it comes to technology, one might just be a
    modern day van Gogh!
  </p>

  <p class="text-lg">
    This sort of <em class="keyword">artistic exploration</em> is exciting and allows me to work on interesting
    topics and explore the world of technology at the same time.
  </p>

  <p class="text-lg">
    Have an idea of something you would like to work on?
    <a class="link" href="mailto:muhammad.sohail@mail.mcgill.ca?subject=New%20software%20item"
      >Let me know</a
    >!
  </p>
</section>

<div class="bg-pastel-blue text-neutral-100 dark">
  <section class="layout py-12">
    <h2 class="section-heading text-white">Items</h2>
    <ul class="sm:columns-2">
      {#each projectsByName as id (id)}
        <li>
          <a class="project-listing" href="#{basename(id).slice(0, -3)}">{projects[id].title}</a>
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
  <section class="py-10" id={basename(id).slice(0, -3)} animate:flip={{ duration: 1000 }}>
    <div class="mx-auto max-w-[1152px] px-4 sm:px-6">
      <Project project={projects[id]} {images} />
    </div>
  </section>
{/each}

<style lang="postcss">
  .project-listing {
    @apply underline underline-offset-[3px] decoration-neutral-300 hover:text-white;
    @apply hover:decoration-white transition-colors;
  }

  button {
    @apply flex items-center text-neutral-400 transition-colors hover:text-pastel-blue;
  }

  button.active {
    @apply text-pastel-blue;
  }
</style>
