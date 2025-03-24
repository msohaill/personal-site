<script lang="ts">
  import Metadata from '$lib/components/Metadata.svelte';
  import mcgill from '$static/images/mcgill.svg';
  import mtl from '$static/images/mtl.svg';
  import { onMount } from 'svelte';

  const images: Record<string, () => Promise<any>> = import.meta.glob('$static/images/gallery/*');

  let coverSrc: string;

  onMount(async () => {
    coverSrc = (
      await images[Object.keys(images)[Math.floor(Math.random() * Object.keys(images).length)]]()
    ).default;
  });
</script>

<Metadata title="Muhammad Sohail" description="Software engineer, student, and photographer." />

<div class="layout flex flex-col-reverse lg:flex-row justify-center items-center gap-5">
  <div class="space-y-5 flex flex-col justify-start items-start">
    <h1 class=" font-[orpheuspro] font-bold text-pastel-red text-4xl">Muhammad Sohail</h1>
    <p>
      Hey there 👋 I am a software developer and a computer science graduate from McGill University <img
        class="coat"
        src={mcgill}
        alt="McGill Logo"
      /> Over my time at school, I dabbled with distributed systems, machine learning, and compilers.
    </p>

    <p>
      Currently, I am building scalable data systems at <a class="link" href="https://autodesk.com"
        >Autodesk</a
      >.
    </p>

    <p>
      I'm from <a class="link" href="https://www.google.com/maps/place/Regina,+SK+S4S">Regina</a>
      &#127806;, mais je vis maintenant à
      <a class="link" href="https://www.google.ca/maps/place/Montreal,+QC+H3H/">Montréal</a>
      <img class="rosette" src={mtl} alt="Montréal Logo" />
    </p>

    <p>
      When I'm not busy, I usually enjoy listening to
      <a class="link" href="https://open.spotify.com/user/solomon123-ca">music</a>, biking around
      town, or partaking in some casual
      <a class="link" href="/photos"> photography</a>. I even won a
      <a
        class="link"
        href="https://globalnews.ca/news/1143458/local-photo-contest-keeps-memory-of-calista-fleming-alive/"
        >contest</a
      > some years ago!
    </p>

    <div class="links font-bold text-sm">
      <a href="https://linkedin.com/in/msohaill">&lcub; linkedin &rcub;</a>
      <a href="https://github.com/msohaill">&lcub; github &rcub;</a>
      <a href="mailto:muhammad.sohail@mail.mcgill.ca">&lcub; mail &rcub;</a>
      <a href="/photos">&lcub; photography &rcub;</a>
      <a data-sveltekit-reload href="/assets/Muhammad_Sohail_Resume.pdf">&lcub; resume &rcub;</a>
    </div>
  </div>

  {#if coverSrc}
    <img class="cover" src={coverSrc} alt="A random sample from my gallery." />
  {/if}
</div>

<style lang="postcss">
  .coat {
    @apply inline h-6 w-6;
  }

  .rosette {
    @apply inline h-5 w-5;
  }

  .cover {
    @apply w-full h-64 lg:w-[20vw] lg:h-96 object-cover border-pastel-blue border-4;
  }

  .links {
    @apply gap-x-2 flex flex-row justify-start items-center flex-wrap;
  }

  .links > a {
    @apply text-pastel-blue hover:text-pastel-blue-light transition-colors;
  }
</style>
