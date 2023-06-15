<script lang="ts">
  export let src = '';
  export let alt = '';

  let zoomed = false;
  let position = '50% 50%';

  const zoomInPosition = (e: MouseEvent & { currentTarget: EventTarget & HTMLElement }) => {
    const bound = e.currentTarget.getBoundingClientRect();
    let x = ((e.clientX - bound.x) / bound.width) * 100;
    let y = ((e.clientY - bound.y) / bound.height) * 100;
    position = `${x}% ${y}%`;
  };

  const zoomInPositionTouch = (e: TouchEvent & { currentTarget: EventTarget & HTMLElement }) => {
    const bound = e.currentTarget.getBoundingClientRect();
    // Prevent zooming out of bounds
    let x = Math.min(Math.max(((e.touches[0].clientX - bound.x) / bound.width) * 100, 0), 100);
    let y = Math.min(Math.max(((e.touches[0].clientY - bound.y) / bound.height) * 100, 0), 100);
    position = `${x}% ${y}%`;
  };

  const toggleZoomImage = (e: MouseEvent & { currentTarget: EventTarget & HTMLElement }) => {
    zoomed = !zoomed;
    zoomed && zoomInPosition(e);
  };
</script>

<figure
  on:mousemove={e => zoomed && zoomInPosition(e)}
  on:touchmove|preventDefault={e => zoomed && zoomInPositionTouch(e)}
  on:click={toggleZoomImage}
  on:keydown={() => {}}
  on:mouseleave={() => {
    zoomed = false;
  }}
  style="background-size: 200%; background-position: {position}; background-image: url('{src}')"
>
  <img style="opacity: {zoomed ? 0 : 1}" {src} {alt} />
</figure>

<style lang="postcss">
  figure {
    @apply cursor-zoom-in;
  }

  img {
    @apply transition-opacity duration-300;
  }
</style>
