<script lang="ts">
  import imageData from '$static/data/images.yaml';
  import { MasonryInfiniteGrid } from '@egjs/svelte-infinitegrid';
  import { basename, shuffleArray } from '$lib/utils';
  import Metadata from '$lib/components/Metadata.svelte';
  import Modal from '$lib/components/Modal.svelte';

  const imageImports: Record<string, { default: string }> = import.meta.glob(
    '$static/images/gallery/*',
    {
      eager: true,
    }
  );

  const images = shuffleArray(Object.entries(imageImports)).map(
    ([filename, { default: src }], i) => ({
      key: i,
      img: src,
      caption: imageData[basename(filename)].caption,
      location: imageData[basename(filename)].location,
      date: imageData[basename(filename)].date.toLocaleDateString('en-CA'),
    })
  );

  let items = images.splice(0, 9);
  let innerWidth = 0;
  let openModal = false;
  let currentKey = 0;

  $: column = innerWidth < 640 ? 1 : innerWidth < 1024 ? 2 : 3;
  $: src = items[currentKey].img;
  $: alt = items[currentKey].caption;

  const getImages = () => {
    items = [...items, ...images.splice(0, 5)];
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
</script>

<svelte:window bind:innerWidth on:keyup={switchIamge} />

<Metadata title="Muhammad Sohail – Photos" description="A gallery of photos I've captured." />

<Modal bind:open={openModal}>
  <img {src} {alt} loading="eager" />
</Modal>

<div class="flex flex-col items-center max-w-screen-2xl pt-10 px-5">
  <MasonryInfiniteGrid
    class="w-full h-full"
    gap={8}
    {column}
    resizeDebounce={0}
    {items}
    useRecycle={false}
    on:requestAppend={getImages}
    let:visibleItems
  >
    {#each visibleItems as item (item.key)}
      <div class="item">
        <img
          src={item.data.img}
          alt={item.data.caption}
          on:click={() => openImage(item.key)}
          on:keydown={(e) => e.key === 'Enter' && openImage(item.key)}
          loading="eager"
        />
        <p class="image-desc">
          {item.data.caption}&nbsp; • &nbsp;{item.data.location}&nbsp; • &nbsp;{item.data.date}
        </p>
      </div>
    {/each}
  </MasonryInfiniteGrid>
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
