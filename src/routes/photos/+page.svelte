<script lang="ts">
  import imageData from '$static/data/images.yaml';
  import { shuffleArray } from '$lib/utils';
  import { Diamonds } from 'svelte-loading-spinners';
  import Metadata from '$lib/components/Metadata.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import PhotoInfo from '$lib/components/PhotoInfo.svelte';
  import { Lightbulb } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import ImageZoom from '$lib/components/ImageZoom.svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';

  const imageImports: Record<string, { default: string }> = import.meta.glob(
    '$static/images/gallery/*',
    {
      eager: true,
    },
  );

  const images = Object.entries(imageData).map(([filename, { caption, location, date }], i) => ({
    id: i + 1,
    src: imageImports[`/src/static/images/gallery/${filename}`].default,
    filename,
    caption,
    location,
    date,
  }));

  const imageFeeder = shuffleArray([...images]).map(item => ({ ...item, key: item.id - 1 }));

  let loader: HTMLElement;

  const pageState = $state({
    gallery: [] as typeof imageFeeder,
    currentKey: 0,
    openModal: false,
    openInfo: false,
    fromShare: (page.url.searchParams.has('id') &&
      Number(page.url.searchParams.get('id')) > 0 &&
      Number(page.url.searchParams.get('id')) <= images.length),
    shareOpened: false,
    imagesLoading: true,
  });

  const shareId = $derived(pageState.fromShare ? Number(page.url.searchParams.get('id')) - 1 : -1);
  const src = $derived(images[pageState.currentKey].src);
  const alt = $derived(images[pageState.currentKey].caption);

  $effect(() => {
    if (!pageState.openModal) pageState.openInfo = false;
  });
  $effect(() => {
    if (pageState.shareOpened && !pageState.openModal) {
      pageState.fromShare = false;
      pageState.shareOpened = false;
      goto('/photos');
    }
  });

  const loadImages = async (items: typeof imageFeeder) => {
    await Promise.all(items.map(item => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = item.src;
        img.onload = () => resolve();
      });
    }));
  };

  const getImages = async () => {
    if (imageFeeder.length === 0) return;

    const newItems = imageFeeder.splice(0, 5);
    await loadImages(newItems);
    pageState.gallery = [...pageState.gallery, ...newItems];
  };

  const openImage = (key: number) => {
    pageState.openModal = true;
    pageState.currentKey = key;
  };

  const switchIamge = (e: KeyboardEvent) => {
    if (!pageState.openModal || !['ArrowLeft', 'ArrowRight', 'KeyI'].includes(e.code)) return;

    if (e.code === 'ArrowLeft') pageState.currentKey = Math.max(pageState.currentKey - 1, 0);
    else if (e.code === 'ArrowRight') pageState.currentKey = Math.min(pageState.currentKey + 1, images.length - 1);
    else if (e.code === 'KeyI') pageState.openInfo = !pageState.openInfo;
  };

  onMount(async () => {
    // Dynamically import Macy to prevent SSR issues
    const Macy = (await import('macy')).default;

    pageState.gallery = imageFeeder.splice(0, 9);

    let macyInstance = new Macy({
      container: '.gallery',
      columns: 3,
      margin: 8,
      waitForImages: true,
      breakAt: {
        1024: 2,
        640: 1,
      }
    });

    await loadImages(pageState.gallery);
    macyInstance.recalculate(true, true);
    pageState.imagesLoading = false;

    let observer = new IntersectionObserver(entries => {
      if (pageState.imagesLoading) return;
      if (imageFeeder.length === 0) {
        observer.disconnect();
        return;
      }

      entries.forEach(async entry => {
        if (entry.isIntersecting) {
          pageState.imagesLoading = true;
          await getImages();
          macyInstance.recalculate(true, true);
          pageState.imagesLoading = false;
        }
      });
    });

    observer.observe(loader);

    // Handling shared URL
    if (pageState.fromShare) {
      openImage(shareId);
      pageState.shareOpened = true;
    } else if (page.url.searchParams.has('id')) {
      // Incorrect ID
      goto('/photos');
    }
  });
</script>

<svelte:window onkeyup={switchIamge} />

<Metadata
  title="Muhammad Sohail – {pageState.fromShare ? images[shareId].caption : 'Photos'}"
  description="A gallery of photos I've captured."
  cover={pageState.fromShare ? images[shareId].src : undefined}
/>

<Modal bind:opened={pageState.openModal}>
  <ImageZoom {src} {alt} />
  <button
    class="fixed right-5 bottom-5 p-2 text-stone-200 hover:text-stone-300 cursor-pointer"
    onclick={() => (pageState.openInfo = true)}><Lightbulb /></button
  >
  <PhotoInfo bind:open={pageState.openInfo} {...images[pageState.currentKey]} />
</Modal>

<section class="layout space-y-4">
  <h1 class=" font-[orpheuspro] font-bold text-pastel-blue text-4xl">A Small Gallery 📸</h1>

  <p>
    I got into photography when I was fifteen. Capturing moments in time, exactly as they are, is
    something I consider quite important.
  </p>

  <p>What's beautiful is being able to share these moments with others.</p>

  <p>
    And so, here is a collection of some moments I've captured over the years. I hope that you enjoy
    them as well!
  </p>

  <p>
    <a
      class="font-bold text-sm text-pastel-red hover:text-pastel-red-light transition-colors"
      href="/">&lcub; home &rcub;</a
    >
  </p>
</section>

<div class="flex flex-col items-center max-w-(--breakpoint-2xl) pt-10 px-3 mx-auto">
  <div class="gallery w-full h-full">
    {#each pageState.gallery as item (item.key)}
      <div class="item">
        <button
          class="w-full p-0 m-0 block relative"
          onclick={() => openImage(item.key)}
        >
          <img
            src={item.src}
            alt={item.caption}
            loading="eager"
          />
        </button>
        <p class="image-desc">
          {item.caption}&nbsp; • &nbsp;{item.location}&nbsp; • &nbsp;{item.date.toLocaleDateString(
            'en-CA',
            { timeZone: 'UTC' },
          )}
        </p>
      </div>
      {/each}
  </div>
  <div class="pt-12 {pageState.imagesLoading ? '' : 'opacity-0'}" bind:this={loader}>
    <Diamonds color="black" size={30} />
  </div>
</div>

<style lang="postcss">
  @reference "tailwindcss";
  @reference "../../app.css";

  .item {
    @apply w-full bg-white;
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
