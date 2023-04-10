<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  let timeout, timer;
  let countdown = 3;
  let delay = countdown * 1000;

  onMount(() => {
    timer = setInterval(() => {
      countdown -= 1;
    }, 1000);

    timeout = setTimeout(() => {
      goto("/");
    }, delay);
  });
</script>

<div class="page">
  <div>{$page.status}: {$page.error.message} <q>{$page.url.pathname}</q>.</div>
  <div>redirecting in {countdown}</div>
</div>

<style lang="postcss">
</style>
