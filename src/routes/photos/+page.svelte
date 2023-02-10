<script lang="ts">
  import { MasonryInfiniteGrid } from '@egjs/svelte-infinitegrid';
  import { shuffleArray } from '$lib/utils';
  import Metadata from '$lib/components/Metadata.svelte';

  const imageImports: Record<string, { default: string }> = import.meta.glob(
    '$static/images/gallery/*',
    {
      eager: true,
    }
  );

  const images = shuffleArray(
    Object.values(imageImports).map((src, i) => ({ key: i, img: src.default }))
  );

  let items = images.splice(0, 9);

  const getImages = () => {
    items = [...items, ...images.splice(0, 5)];
  };

  let innerWidth = 0;

  $: cols = innerWidth < 640 ? 1 : innerWidth < 1024 ? 2 : 3;
</script>

<svelte:window bind:innerWidth />

<Metadata title="Muhammad Sohail – Photos" description="A gallery of photos I've captured." />

<div class="flex flex-col items-center max-w-screen-lg mx-auto pt-10 px-5">
  <MasonryInfiniteGrid
    class="w-full h-full"
    gap={8}
    column={cols}
    resizeDebounce={0}
    {items}
    useRecycle={false}
    on:requestAppend={getImages}
    let:visibleItems
  >
    {#each visibleItems as item (item.key)}
      <div class="item">
        <img src={item.data.img} alt="egjs" />
      </div>
    {/each}
  </MasonryInfiniteGrid>
</div>

<style lang="postcss">
  .item {
    @apply w-full sm:w-1/2 lg:w-1/3;
  }
</style>
