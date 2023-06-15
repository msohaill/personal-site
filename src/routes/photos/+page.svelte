<script lang="ts">
  import imageData from '$static/data/images.yaml';
  import { MasonryInfiniteGrid } from '@egjs/svelte-infinitegrid';
  import { ITEM_TYPE } from '@egjs/infinitegrid';
  import type { OnRequestAppend } from '@egjs/infinitegrid';
  import { basename, shuffleArray } from '$lib/utils';
  import { Diamonds } from 'svelte-loading-spinners';
  import Metadata from '$lib/components/Metadata.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import PhotoInfo from '$lib/components/PhotoInfo.svelte';
  import { Lightbulb } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import ImageZoom from '$lib/components/ImageZoom.svelte';

  const imageImports: Record<string, { default: string }> = import.meta.glob(
    '$static/images/gallery/*',
    {
      eager: true,
    }
  );

  const images = shuffleArray(
    Object.entries(imageImports).map(([filename, { default: src }], i) => ({
      id: i + 1,
      src,
      filename: basename(filename),
      caption: imageData[basename(filename)].caption,
      location: imageData[basename(filename)].location,
      date: imageData[basename(filename)].date,
    }))
  ).map((item, i) => ({ ...item, key: i }));

  let items = images.splice(0, 9);
  let innerWidth = 0;
  let currentKey = 0;
  let openModal = false;
  let openInfo = false;

  $: column = innerWidth < 640 ? 1 : innerWidth < 1024 ? 2 : 3;
  $: src = items[currentKey].src;
  $: alt = items[currentKey].caption;
  $: if (!openModal) openInfo = false;

  const getImages = ({ detail: e }: { detail: OnRequestAppend }) => {
    if (images.length === 0) return;

    e.wait();
    const newItems = images.splice(0, 5);

    newItems.forEach((item, i) => {
      const img = new Image();
      img.onload = () => {
        if (i === newItems.length - 1) {
          e.ready();
          items = [...items, ...newItems];
        }
      };
      img.src = item.src;
    });
  };

  const openImage = (key: number) => {
    openModal = true;
    currentKey = key;
  };

  const switchIamge = (e: KeyboardEvent) => {
    if (!openModal || !['ArrowLeft', 'ArrowRight'].includes(e.key)) return;

    if (e.key === 'ArrowLeft') currentKey = Math.max(currentKey - 1, 0);
    else if (e.key === 'ArrowRight') currentKey = Math.min(currentKey + 1, items.length - 1);
  };

  // Fix for observer glitch (Infinite Grid)
  let fix = 0;
  onMount(() => setTimeout(() => fix++ && setTimeout(() => fix++, 1), 350));
</script>

<svelte:window bind:innerWidth on:keyup={switchIamge} />

<Metadata title="Muhammad Sohail – Photos" description="A gallery of photos I've captured." />

<Modal bind:open={openModal}>
  <ImageZoom {src} {alt} />
  <button
    class="absolute right-5 bottom-5 p-2 text-stone-200 hover:text-stone-300"
    on:click={() => (openInfo = true)}><Lightbulb /></button
  >
  <PhotoInfo bind:open={openInfo} {...items[currentKey]} />
</Modal>

<section class="layout py-12 space-y-4">
  <h2 class="section-heading">A Casual Gallery</h2>

  <p class="text-lg">
    I got into photography when I was fifteen. Capturing moments in time, exactly as they are, is
    something I consider quite important.
  </p>

  <p class="text-lg">What's beautiful is being able to share these moments with others.</p>

  <p class="text-lg">
    And so, here is a collection of some moments I've captured over the years. I hope that you enjoy
    them as well.
  </p>
</section>

<div class="flex flex-col items-center max-w-screen-2xl pt-10 px-5 mx-auto">
  {#key fix}
    <MasonryInfiniteGrid
      class="w-full h-full"
      gap={8}
      {column}
      resizeDebounce={0}
      {items}
      useRecycle={false}
      useLoading={true}
      on:requestAppend={getImages}
      let:visibleItems
    >
      {#each visibleItems as item (item.key)}
        {#if item.type === ITEM_TYPE.NORMAL}
          <div class="item">
            <img
              src={item.data.src}
              alt={item.data.caption}
              on:click={() => openImage(item.key)}
              on:keydown={e => e.key === 'Enter' && openImage(item.key)}
              loading="eager"
            />
            <p class="image-desc">
              {item.data.caption}&nbsp; • &nbsp;{item.data.location}&nbsp; • &nbsp;{item.data.date.toLocaleDateString(
                'en-CA',
                { timeZone: 'UTC' }
              )}
            </p>
          </div>
        {:else if item.type === ITEM_TYPE.LOADING}
          <div class="pt-12">
            <Diamonds color="black" size={30} />
          </div>
        {/if}
      {/each}
    </MasonryInfiniteGrid>
  {/key}
</div>

<style lang="postcss">
  .item {
    @apply w-full sm:w-1/2 lg:w-1/3 bg-white;
  }

  .item * {
    @apply transition-opacity ease-in duration-200;
  }

  .item img {
    @apply cursor-pointer;
  }

  .image-desc {
    @apply text-white absolute bottom-0 left-0 p-2 text-base w-full opacity-0;
    font-family: 'Karla', sans-serif;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.75) 0%, transparent 80%);
  }

  .item:hover img {
    @apply opacity-90;
  }

  .item:hover .image-desc {
    @apply opacity-100;
  }
</style>
