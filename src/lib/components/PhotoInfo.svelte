<script lang="ts">
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { ArrowRight, CheckCheck, Send } from 'lucide-svelte';
  import exifr from 'exifr';

  export let open = false;
  export let id = 0;
  export let src = '';
  export let filename = '';
  export let caption = '';
  export let location = '';
  export let date = new Date();

  let camera: null | string = null;
  let coords: null | { latitude: number; longitude: number } = null;
  let dimensions: null | { height: number; width: number } = null;
  let shareText = 'Share';
  let ShareIcon = Send;

  $: {
    exifr
      .gps(src)
      .then(output => {
        if (output) coords = output;
        else coords = null;
      })
      .catch(() => (coords = null));
    exifr
      .parse(src, true)
      .then(output => {
        if (output.Model) camera = output.Model;
        else camera = null;
        if (output.ExifImageHeight && output.ExifImageWidth)
          dimensions = { height: output.ExifImageHeight, width: output.ExifImageWidth };
        else dimensions = null;
      })
      .catch(() => {
        camera = null;
        dimensions = null;
      });
  }

  const truncateFilename = (filename: string) =>
    filename.length > 25 ? filename.slice(0, 25) + '...' : filename;

  const copyLink = () => {
    navigator.clipboard.writeText(
      `${window.location.protocol}//${window.location.host}/photos?id=${id}`,
    );
    shareText = 'Link copied!';
    ShareIcon = CheckCheck;
  };
</script>

{#if open}
  <aside
    class="absolute inset-y-0 right-0 bg-pastel-blue overflow-y-auto !max-h-screen !max-w-[100vw] w-screen sm:w-80"
    transition:fly={{ x: 320, y: 0, duration: 300, easing: cubicOut }}
  >
    <div class="text-gray-200 p-6 z-50">
      <div class="mb-8">
        <h2 class="text-2xl fontvar-heading mb-1">No. {id}</h2>
        <a class="text-gray-200 text-xs" target="_blank" rel="noopener noreferrer" href={src}>
          {truncateFilename(filename)}
        </a>
      </div>

      <dl>
        <dt>Caption</dt>
        <dd><em>{caption}</em></dd>

        <dt>Date</dt>
        <dd>
          {date.toLocaleDateString('en-CA', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            timeZone: 'UTC',
          })}
        </dd>

        <dt>Location</dt>
        <dd class="dark">
          <a
            target="_blank"
            rel="noopener noreferrer"
            class="photo-link"
            href="https://www.google.com/maps/place/{location}">{location}</a
          >
        </dd>

        {#if coords}
          <dt>Coordinates</dt>
          <dd class="dark">
            <a
              target="_blank"
              rel="noopener noreferrer"
              class="photo-link"
              href="https://www.google.com/maps/place/{coords.latitude},{coords.longitude}/@{coords.latitude},{coords.longitude},13z"
              >{coords.latitude.toFixed(2)}, {coords.longitude.toFixed(2)}</a
            >
          </dd>
        {/if}

        {#if camera}
          <dt>Camera</dt>
          <dd>{camera}</dd>
        {/if}

        {#if dimensions}
          <dt>Dimensions</dt>
          <dd class="whitespace-pre-wrap">{dimensions.height}px ⨉ {dimensions.width}px</dd>
        {/if}
      </dl>

      <div class="absolute top-5 right-5">
        <button on:click={() => (open = false)} class="p-1 rounded-md hover:bg-gray-800"
          ><ArrowRight /></button
        >
      </div>
      <div class="dark absolute bottom-5 left-5">
        <button
          class="photo-link text-sm font-semibold flex items-center gap-1"
          on:click={copyLink}
        >
          <svelte:component this={ShareIcon} size="15" />
          {shareText}
        </button>
      </div>
    </div>
  </aside>
{/if}

<style lang="postcss">
  .photo-link {
    @apply text-neutral-300 underline underline-offset-[3px] decoration-neutral-400 hover:text-white;
    @apply transition-colors hover:decoration-white;
  }

  dt {
    @apply text-xs font-semibold uppercase text-gray-300;
  }
  dd {
    @apply text-gray-200 text-sm;
  }
  dd:not(:last-of-type) {
    @apply mb-5;
  }
</style>
