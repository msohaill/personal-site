<script lang="ts">
  import type { Project } from '$lib/types';

  export let project: Project;
  export let images: Record<string, { default: string }>;
</script>

<h3 class="text-black text-xl font-semibold mb-2">
  <span class="mr-1">{project.title}</span>
  <small class="whitespace-nowrap text-neutral-500 text-base font-normal">
    {project.date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
  </small>
</h3>

<!-- Stars and tags (pill bar) -->
<div class="flex flex-wrap mb-1">
  {#each project.tags as tag}
    <div class="pill">{tag}</div>
  {/each}
</div>

<!-- Description and image -->
<div class="space-y-4">
  <div class="grid grid-cols-3 gap-4 md:gap-8 lg:gap-12">
    <div class="col-span-3 md:col-span-2">
      <p class="text-lg font-light mb-3">{project.tagline}</p>
      <div class="md-output">
        {@html project.body}
      </div>
    </div>
    <div class="col-span-3 md:col-span-1">
      <a rel="external" href={images[`/src/static/images/projects/${project.image}`]?.default}>
        <img
          src={images[`/src/static/images/projects/${project.image}`]?.default}
          alt="{project.title} Preview Image"
        />
      </a>
    </div>
  </div>

  {#if project.additionalImages}
    <div class="grid grid-cols-3 gap-4 md:gap-8 lg:gap-12">
      {#each project.additionalImages as image}
        <div class="col-span-full md:col-span-1">
          <a rel="external" href={images[`/src/static/images/projects/${image}`]?.default}>
            <img
              src={images[`/src/static/images/projects/${image}`]?.default}
              alt="{project.title} Sub-Image"
            />
          </a>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style lang="postcss">
  .md-output :global(p) {
    @apply mb-4;
  }

  .md-output :global(strong) {
    @apply font-semibold;
  }

  .md-output :global(code) {
    @apply text-[95%];
  }

  .pill {
    @apply flex items-center text-sm font-medium;
    @apply px-1.5 py-[1px] mr-1.5 mb-2 bg-neutral-100 rounded-full;
  }
</style>
