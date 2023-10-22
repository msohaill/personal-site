<script lang="ts">
  import Metadata from '$lib/components/Metadata.svelte';
  import { Cpu, Joystick, Music } from 'lucide-svelte';

  const mainProjects = [
    {
      name: 'Wrappedify',
      href: '/projects#wrappedify',
      desc: 'discover your Spotify listening habits',
      icon: Music,
    },
    {
      name: 'NES Emulator',
      href: '/projects#nes-emulator',
      desc: 'wip emulator written in Rust',
      icon: Joystick,
    },
    {
      name: 'OS Items',
      href: '/projects#os-items',
      desc: 'shell, thread scheduler, and filesystem, written in C',
      icon: Cpu,
    },
  ];
</script>

<Metadata
  title="Muhammad Sohail"
  description="Software engineer, student, and photographer. Building applications that bring meaning to us."
/>

<div class="layout text-lg space-y-14 mt-16">
  <div class="space-y-5">
    <p>
      Hey there 👋! I study computers and the like at McGill! I am still trying to figure out what I
      enjoy the most, but I hope you can learn more about me regardless.
    </p>

    <p>
      I enjoy making software that people use, not only as tools, but as a <em class="keyword"
        >creative</em
      >
      and <em class="keyword">exploratory</em> outlets — anything that helps learning, collaboration,
      or even fun!
    </p>

    <p>
      It's always fun learn, so I keep my mind open to the innumerable facets of the <em
        class="keyword">systems</em
      > that exist today. You never know where you can find something new 🕵️‍♂️
    </p>
  </div>

  <div class="leading-snug space-y-4">
    <p class="pb-2">
      For those curious, these are some interesting things I've worked on in the past:
    </p>

    {#each mainProjects as project}
      <a class="project" href={project.href}>
        <div class="text-pastel-red font-medium">
          {project.name}
          <svelte:component this={project.icon} size={18} class="inline text-neutral" />
        </div>
        <div>
          <p>{project.desc}</p>
        </div>
      </a>
    {/each}
  </div>

  <div class="space-y-5">
    <p>
      Currently, I am back in school fighting procrastination and midterms. Previously, I worked
      with data systems and operations at <a class="link" href="https://autodesk.com">Autodesk</a>.
      Before that, I worked on data observability at
      <a class="link" href="https://coveo.com">Coveo </a>
      and at <a class="link" href="https://patternjobs.com">Pattern</a>, developing tools to empower
      the workforce!
    </p>

    <p>
      When I'm not busy, I usually enjoy listening to
      <a class="link" href="https://open.spotify.com/user/solomon123-ca">music</a>, biking around
      <a class="link" href="https://goo.gl/maps/y21867TsVit1S4Ne8">Montreal</a>, or partaking in
      some casual
      <a class="link" href="/photos"> photography</a>. I even won a
      <a
        class="link"
        href="https://globalnews.ca/news/1143458/local-photo-contest-keeps-memory-of-calista-fleming-alive/"
        >contest</a
      > some years ago!
    </p>
  </div>
</div>

<style lang="postcss">
  .project {
    @apply grid sm:grid-cols-[1fr,2fr] gap-y-1 -mx-3 px-3 py-2 hover:bg-neutral-100 transition-colors;
  }
</style>
