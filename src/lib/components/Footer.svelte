<script lang="ts">
  import { Linkedin, Github, Mail, ExternalLink } from 'lucide-svelte';
  import { page } from '$app/stores';
  import { getRandomSong } from '$lib/utils';
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';

  const track: {
    artists: string;
    audio: HTMLAudioElement | null;
    link: string;
    title: string;
  } = {
    artists: '',
    audio: null,
    link: '',
    title: '',
  };

  onMount(() =>
    getRandomSong().then(trackResponse => {
      track.artists = trackResponse.artists.map((a: { name: string }) => a.name).join(', ');
      track.audio = new Audio(trackResponse.preview_url);
      track.audio.volume = 0.25;
      track.link = trackResponse.external_urls.spotify;
      track.title = trackResponse.name;
    }),
  );

  $: showMusic = track.audio && !track.audio.paused;

  const handleClick = () => {
    track.audio?.paused && !showMusic ? track.audio.play() : track.audio?.pause();
    track.audio = track.audio;
  };
</script>

<footer class="layout mt-10 flex flex-col">
  <div class="social-links {$page.url.pathname === '/' ? 'social-links-home' : null}">
    <a class="link" href="https://linkedin.com/in/msohaill"><Linkedin /></a>
    <a class="link" href="https://github.com/msohaill"><Github /></a>
    <a class="link" href="mailto:muhammad.sohail@mail.mcgill.ca"><Mail /></a>
  </div>
  <p class="mx-auto mt-5 text-xs text-neutral-500">
    montréal • carpe diem • {new Date().getFullYear()} •
    <button on:click={handleClick}><em class="music cursor-pointer keyword">music!</em></button>
  </p>
  {#if showMusic}
    <div
      transition:slide
      class="flex flex-col gap-2 mx-auto mt-3 items-center border-t py-2 min-w-[60%]"
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
  .social-links {
    @apply space-y-0 space-x-2 flex flex-row justify-center items-center;
  }

  .music {
    @apply underline underline-offset-[3px] decoration-neutral-400;
    @apply hover:text-black hover:decoration-black transition-colors;
  }

  .social-links-home {
    @apply lg:fixed lg:right-10 lg:top-1/2 lg:-translate-y-1/2 lg:flex-col lg:space-y-10;
  }
</style>
