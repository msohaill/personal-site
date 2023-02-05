<script>
  import { Linkedin, Github, Mail } from 'lucide-svelte';
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
  <p class="mx-auto mt-5 text-xs color text-neutral-500">
    montréal • carpe diem • {new Date().getFullYear()}
  </p>
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
