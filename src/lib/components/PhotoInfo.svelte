<script lang="ts">
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { ArrowRight, CheckCheck, Send } from 'lucide-svelte';
  import exifr from 'exifr';

  let {
    open = $bindable(false),
    id,
    src,
    filename,
    caption,
    location,
    date,
  }: {
    open: boolean;
    id: number;
    src: string;
    filename: string;
    caption: string;
    location: string;
    date: Date;
  } = $props();

  let metadata = $state({
    camera: null as null | string,
    coords: null as null | { latitude: number; longitude: number },
    dimensions: null as null | { height: number; width: number },
  });

  let shareText = $state('Share');
  let ShareIcon = $state(Send);

  $effect(() => {
    exifr
      .gps(src)
      .then(output => {
        if (output) metadata.coords = output;
        else metadata.coords = null;
      })
      .catch(() => (metadata.coords = null));
    exifr
      .parse(src, true)
      .then(output => {
        if (output.Model) metadata.camera = output.Model;
        else metadata.camera = null;
        if (output.ExifImageHeight && output.ExifImageWidth)
          metadata.dimensions = { height: output.ExifImageHeight, width: output.ExifImageWidth };
        else metadata.dimensions = null;
      })
      .catch(() => {
        metadata.camera = null;
        metadata.dimensions = null;
      });
  });

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
    class="dark fixed inset-y-0 right-0 bg-pastel-blue overflow-y-auto max-h-screen! max-w-[100vw]! w-screen sm:w-80"
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
        <dd>
          <a
            target="_blank"
            rel="noopener noreferrer"
            class="photo-link"
            href="https://www.google.com/maps/place/{location}">{location}</a
          >
        </dd>

        {#if metadata.coords}
          <dt>Coordinates</dt>
          <dd>
            <a
              target="_blank"
              rel="noopener noreferrer"
              class="photo-link"
              href="https://www.google.com/maps/place/{metadata.coords.latitude},{metadata.coords.longitude}/@{metadata.coords.latitude},{metadata.coords.longitude},13z"
              >{metadata.coords.latitude.toFixed(2)}, {metadata.coords.longitude.toFixed(2)}</a
            >
          </dd>
        {/if}

        {#if metadata.camera}
          <dt>Camera</dt>
          <dd>{metadata.camera}</dd>
        {/if}

        {#if metadata.dimensions}
          <dt>Dimensions</dt>
          <dd class="whitespace-pre-wrap">{metadata.dimensions.height}px ⨉ {metadata.dimensions.width}px</dd>
        {/if}
      </dl>

      <div class="absolute top-5 right-5">
        <button onclick={() => (open = false)} class="p-1 rounded-md hover:bg-gray-800 cursor-pointer"
          ><ArrowRight /></button
        >
      </div>
      <div class="absolute bottom-5 left-5">
        <button
          class="photo-link text-sm font-semibold flex items-center gap-1 cursor-pointer"
          onclick={copyLink}
        >
          <ShareIcon size="15" />
          {shareText}
        </button>
      </div>
    </div>
  </aside>
{/if}

<style lang="postcss">
  @reference "tailwindcss";
  @reference "../../app.css";

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
