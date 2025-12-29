<script lang="ts">
  let { src, alt }: { src: string; alt: string } = $props();

  let zoomed = $state(false);
  let position = $state('50% 50%');

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

<button
  onmousemove={e => zoomed && zoomInPosition(e)}
  ontouchmove={e => { e.preventDefault(); zoomed && zoomInPositionTouch(e); }}
  onclick={toggleZoomImage}
  onmouseleave={() => zoomed = false}
  style="background-size: 200%; background-position: {position}; background-image: url('{src}')"
>
  <img style="opacity: {zoomed ? 0 : 1}" {src} {alt} />
</button>

<style lang="postcss">
  @reference "tailwindcss";
  @reference "../../app.css";

  button {
    @apply cursor-zoom-in;
  }

  img {
    @apply transition-opacity duration-200;
  }
</style>
