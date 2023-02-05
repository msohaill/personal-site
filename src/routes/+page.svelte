<script lang="ts">
  import Metadata from '$lib/components/Metadata.svelte';
  import { ArrowUpRight } from 'lucide-svelte';

  const mainProjects = [
    {
      name: 'Wrappedify',
      href: '/projects',
      desc: 'discover your Spotify listening habits'
    },
    {
      name: 'NES Emulator',
      href: '/projects',
      desc: 'wip emulator written in Rust'
    },
    {
      name: 'OS Items',
      href: '/projects',
      desc: 'shell, thread scheduler, and filesystem, written in C'
    }
  ];
</script>

<Metadata
  title="Muhammad Sohail"
  description="Software engineer, student, and photographer. Building applications that bring meaning to us."
/>

<p class="layout text-black text-xl leading-tight font-light mb-16" id="bio">
  <span>is a </span>software engineer<span>,</span><br />
  student<span>, and</span><br />
  photographer<span>.</span>
</p>

<div class="layout text-lg space-y-14">
  <div class="space-y-5">
    <p>
      I study computers and the like at McGill, where I am still trying to figure out what I enjoy.
    </p>

    <p>
      I hope to make software that people use, not only as a tool, but as a <em>creative</em>
      and <em>exploratory</em> outlet - something that can be used to bring meaning, whether that is
      through learning, collaboration, or simple fun.
    </p>

    <p>
      As such, I try to remain a generalist so that I can understand the innumerable facets of the <em
        >systems</em
      > that exist today.
    </p>
  </div>

  <div class="leading-snug space-y-4">
    <p class="pb-2">Some items I have worked on:</p>

    {#each mainProjects as project}
      <a class="project" href={project.href}>
        <div class="text-black font-medium">
          {project.name}
          <ArrowUpRight size={18} class="inline text-neutral-400" />
        </div>
        <div>
          <p>{project.desc}</p>
        </div>
      </a>
    {/each}
  </div>

  <div class="space-y-5">
    <p>
      Currently, I am working with data at <a class="link" href="https://coveo.com">Coveo</a>. In
      the past, I worked at <a class="link" href="https://patternjobs.com">Pattern</a>, devloping
      tools to empower the workforce.
    </p>

    <p>
      When I'm not busy, I usually enjoy listening to
      <a class="link" href="https://open.spotify.com/user/solomon123-ca">music</a>, biking in
      <a class="link" href="https://goo.gl/maps/y21867TsVit1S4Ne8">Montreal</a>, or partaking in
      some casual
      <a class="link" href="/photos"> photography </a>. I even won a
      <a
        class="link"
        href="https://globalnews.ca/news/1143458/local-photo-contest-keeps-memory-of-calista-fleming-alive/"
        >contest</a
      > some years ago!
    </p>
  </div>
</div>

<style lang="postcss">
  #bio span {
    @apply text-neutral-400 text-lg leading-tight;
  }

  em {
    @apply font-serif text-[120%] leading-[100%];
  }

  .project {
    @apply grid sm:grid-cols-[1fr,2fr] gap-y-1 -mx-3 px-3 py-2 hover:bg-neutral-100 transition-colors;
  }

  @media (max-width: 420px) {
    #bio {
      @apply -mt-16;
    }
  }
</style>
