<script lang="ts">
  export let title: string;
  export let company: string;
  export let url: string;
  export let dates: string;
  export let location: string;
</script>

<div class="mb-8">
  <h3 class="text-black text-lg leading-tight mb-1">
    {title} at <a class="link" href={url}>{company}</a>
  </h3>
  <p class="font-light mb-2">
    <span class="whitespace-nowrap">{dates}</span>
    <span class="px-0.5 text-gray-500">•</span>
    <span class="whitespace-nowrap">{location}</span>
  </p>
  <ul class="list-disc pl-7 marker:text-neutral-400">
    <slot />
  </ul>
</div>
