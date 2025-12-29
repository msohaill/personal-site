<script lang="ts">
  import { ExternalLink } from 'lucide-svelte';
  import { getRandomSong } from '$lib/utils';
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';

  const track: {
    artists: string;
    link: string;
    title: string;
  } = $state({
    artists: '',
    link: '',
    title: '',
  });

  onMount(() =>
    getRandomSong().then(trackResponse => {
      track.artists = trackResponse.artists.map((a: { name: string }) => a.name).join(', ');
      track.link = trackResponse.external_urls.spotify;
      track.title = trackResponse.name;
    }),
  );

  let showMusic = $state(false);
</script>

<footer class="layout mt-10 flex flex-col">
  <p class="mx-auto mt-5 text-xs text-neutral-500">
    montréal • carpe diem • {new Date().getFullYear()} •
    <button onclick={() => (showMusic = !showMusic)}
      ><em class="music cursor-pointer keyword">music!</em></button
    >
  </p>
  {#if showMusic}
    <div
      transition:slide
      class="flex flex-col gap-2 mx-auto mt-3 items-center border-t border-gray-200 py-2 min-w-[60%]"
    >
      <em class="text-sm tracking-wide text-neutral-500 font-serif">Something I'm listening to</em>
      <a href={track.link} target="_blank" rel="noopener noreferrer">
        <p class="text-xs text-neutral-500">
          <strong class="link font-bold">{track.title}</strong>
          {track.artists}
          <ExternalLink size={10} class="inline align-baseline" />
        </p>
      </a>
    </div>
  {/if}
</footer>

<style lang="postcss">
  @reference "tailwindcss";
  @reference "../../app.css";

  .music {
    @apply underline underline-offset-[3px] decoration-neutral-400;
    @apply hover:text-black hover:decoration-black transition-colors;
  }
</style>
