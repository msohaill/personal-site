<script lang="ts">
  import imageData from '$static/data/images.yaml';
  import { MasonryInfiniteGrid } from '@egjs/svelte-infinitegrid';
  import { shuffleArray, unhasedBasename } from '$lib/utils';
  import Metadata from '$lib/components/Metadata.svelte';
  import Modal from '$lib/components/Modal.svelte';

  const imageImports: Record<string, { default: string }> = import.meta.glob(
    '$static/images/gallery/*',
    {
      eager: true,
    }
  );

  const images = shuffleArray(
    Object.values(imageImports).map((src, i) => ({
      key: i,
      img: src.default,
      caption: imageData[unhasedBasename(src.default)].caption,
      location: imageData[unhasedBasename(src.default)].location,
      date: imageData[unhasedBasename(src.default)].date.toLocaleDateString("en-CA"),
    }))
  );

  let items = images.splice(0, 9);

  const getImages = () => {
    items = [...items, ...images.splice(0, 5)];
  };

  let innerWidth = 0;
  $: column = innerWidth < 640 ? 1 : innerWidth < 1024 ? 2 : 3;

  let openModal = false;
  let src = '';

  const openImage = (e: Event) => {
    openModal = true;
    src = (e.target as HTMLImageElement).src;
  };
</script>

<svelte:window bind:innerWidth />

<Metadata title="Muhammad Sohail – Photos" description="A gallery of photos I've captured." />

<Modal bind:open={openModal}>
  <img {src} alt="test" loading="eager" />
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
          on:click={openImage}
          on:keydown={(e) => e.key === 'Enter' && openImage(e)}
          loading="eager"
        />
        <p class="image-desc">{item.data.caption} • {item.data.location} • {item.data.date}</p>
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
