<script lang="ts">
  import imageData from '$static/data/images.yaml';
  import { shuffleArray } from '$lib/utils';
  import { Diamonds } from 'svelte-loading-spinners';
  import Metadata from '$lib/components/Metadata.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import PhotoInfo from '$lib/components/PhotoInfo.svelte';
  import Select from '$lib/components/Select.svelte';
  import { ArrowDownWideNarrow, Lightbulb, Map } from 'lucide-svelte';
  import { onMount, untrack } from 'svelte';
  import ImageZoom from '$lib/components/ImageZoom.svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { Document } from 'flexsearch';
  import type Macy from 'macy';

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

  const searchIndex = new Document<{ id: number, filename: string; caption: string; location: string }>({
    id: 'id',
    index: ["filename", "caption", "location"],
    tokenize: "full",
    cache: true,
  });
  images.forEach(image => searchIndex.add({
    id: image.id,
    filename: image.filename,
    caption: image.caption,
    location: image.location,
  }));

  const pageState = $state({
    macy: undefined as Macy | undefined,
    gallery: [] as typeof imageFeeder,
    currentKey: 0,
    openModal: false,
    openInfo: false,
    fromShare: (page.url.searchParams.has('id') &&
      Number(page.url.searchParams.get('id')) > 0 &&
      Number(page.url.searchParams.get('id')) <= images.length),
    shareOpened: false,
    imagesLoading: true,
    filters: {
      sort: '',
      location: [] as string[],
      date: {
        years: [] as string[],
        months: [] as string[],
      },
      search: '',
    }
  });

  const imageFeeder = $derived.by(() => {
    let filtered = [...images];

    // Location filter
    if (pageState.filters.location.length > 0) {
      filtered = filtered.filter(img => pageState.filters.location.includes(img.location));
    }

    // Date filters
    if (pageState.filters.date.years.length > 0) {
      filtered = filtered.filter(img => pageState.filters.date.years.includes(img.date.getUTCFullYear().toString()));
    }
    if (pageState.filters.date.months.length > 0) {
      filtered = filtered.filter(img => pageState.filters.date.months.includes((img.date.getUTCMonth() + 1).toString()));
    }

    // Search filter
    if (pageState.filters.search.trim().length > 0) {
      const searchResults = new Set(searchIndex.search(pageState.filters.search.trim(), {
        limit: images.length,
        merge: true
      }).map(res => res.id as number));

      filtered = filtered.filter(img => searchResults.has(img.id));
    }

    // Sort
    if (pageState.filters.sort === 'date-asc') {
      filtered.sort((a, b) => a.date.getTime() - b.date.getTime());
    } else if (pageState.filters.sort === 'date-desc') {
      filtered.sort((a, b) => b.date.getTime() - a.date.getTime());
    } else if (pageState.filters.sort === '') {
      filtered = shuffleArray(filtered);
    }

    return filtered.map(item => ({ ...item, key: item.id - 1 }));
  });

  const sorts = [
    { label: '↑ Date', value: 'date-asc' }, { label: '↓ Date', value: 'date-desc' },
    { label: 'Default', value: 'default' }
  ];
  const locations = Array.from(new Set(images.map(img => img.location))).sort()
    .map(loc => ({ label: loc, value: loc }));
  const years = Array.from(new Set(images.map(img => img.date.getUTCFullYear()))).sort((a, b) => a - b)
    .map(year => ({ label: year.toString(), value: year.toString() }));
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ].map((month, index) => ({ label: month, value: (index + 1).toString() }));

  let loader: HTMLElement;

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
  $effect(() => {
    if (imageFeeder) {
      untrack(async () => {
        pageState.gallery = imageFeeder.slice(0, 9);
        await loadImages(pageState.gallery, pageState.macy);
        pageState.macy?.recalculate(true, true);
      });
    }
  });

  const loadImages = async (items: typeof imageFeeder, macy?: Macy) => {
    await Promise.all(items.map(item => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = item.src;
        img.onload = () => {
          macy?.recalculate(true);
          resolve();
        };
      });
    }));
  };

  const getImages = async () => {
    if (imageFeeder.length === 0) return;

    const newItems = imageFeeder.slice(pageState.gallery.length, pageState.gallery.length + 5);
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

  const resetFilters = () => {
    pageState.filters = {
      sort: '',
      location: [],
      date: {
        years: [],
        months: [],
      },
      search: '',
    };
  }

  onMount(async () => {
    // Dynamically import Macy to prevent SSR issues
    const Macy = (await import('macy')).default;

    const macy = new Macy({
      container: '.gallery',
      columns: 3,
      margin: 8,
      waitForImages: true,
      breakAt: {
        1024: 2,
        640: 1,
      }
    });
    pageState.macy = macy;

    await loadImages(pageState.gallery, macy);
    pageState.imagesLoading = false;

    let observer = new IntersectionObserver(entries => {
      if (pageState.imagesLoading) return;
      if (images.length === pageState.gallery.length) return;

      entries.forEach(async entry => {
        if (entry.isIntersecting) {
          pageState.imagesLoading = true;
          await getImages();
          macy.recalculate(true, true);
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
    I got into photography when I was fifteen. Being able to capture moments in time, exactly as they are, is
    an incredible privilege.
  </p>

  <p>What's truly special is being able to share those moments with others.</p>

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

<form class="flex flex-row gap-2 justify-center items-center pt-10 flex-wrap mx-auto px-4" role="search">
  <Select type="single" items={sorts} placeholder="Sort" SelectIcon={ArrowDownWideNarrow} bind:selected={pageState.filters.sort} />
  <Select type="multiple" items={locations} placeholder="Location" SelectIcon={Map} bind:selected={pageState.filters.location} />
  <Select type="multiple" items={years} placeholder="Year" bind:selected={pageState.filters.date.years} />
  <Select type="multiple" items={months} placeholder="Month" bind:selected={pageState.filters.date.months} />
  <input type="text" placeholder="Search" class="filter" bind:value={pageState.filters.search} autocomplete="off" />
  <button class="reset" type="reset" onclick={resetFilters}>Reset</button>
</form>

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

  .reset {
    @apply h-8 p-3 flex items-center text-sm cursor-pointer
    bg-pastel-blue text-white  hover:bg-pastel-blue-light;
  }
</style>
