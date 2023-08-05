<script lang="ts">
  import { Linkedin, Github, Mail, ExternalLink } from 'lucide-svelte';
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

<footer class="layout mt-20 flex flex-col">
  <div class="text-lg space-y-2">
    <div class="item">
      <span>
        <Linkedin />
      </span>
      <hr />
      <a class="link" href="https://linkedin.com/in/msohaill">@msohaill</a>
    </div>
    <div class="item">
      <span>
        <Github />
      </span>
      <hr />
      <a class="link" href="https://github.com/msohaill">@msohaill</a>
    </div>
    <div class="item">
      <span>
        <Mail />
      </span>
      <hr />
      <a class="link" href="mailto:muhammad.sohail@mail.mcgill.ca">
        muhammad.sohail@mail.mcgill.ca
      </a>
    </div>
  </div>
  <p class="mx-auto mt-5 text-xs text-neutral-500">
    montréal • carpe diem • {new Date().getFullYear()} •
    <span class="link cursor-pointer" on:click={handleClick} on:keydown={() => {}}>music!</span>
  </p>
  {#if showMusic}
    <div
      transition:slide
      class="flex flex-col gap-2 mx-auto mt-3 items-center border-t py-2 min-w-[60%]"
    >
      <em class="text-sm tracking-wide text-neutral-500 font-serif">Something I'm listening to</em>
      <a href={track.link} target="_blank" rel="noopener noreferrer">
        <p class="text-xs text-neutral-500">
          <strong>{track.title}</strong>
          {track.artists}
          <ExternalLink size={10} class="inline align-baseline" />
        </p>
      </a>
    </div>
  {/if}
</footer>

<style lang="postcss">
  .item {
    @apply flex items-center space-x-2;
  }

  .item span {
    @apply h-6 w-6 shrink-0;
  }

  .item hr {
    @apply w-full mt-0.5 border-neutral-300;
  }
</style>
