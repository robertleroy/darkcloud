<script>
  import SearchIcon from "$lib/components/SearchIcon.svelte";
  import "@fontsource/source-serif-4"
  import "@fontsource/lato"
  import "./app.css";

  export let data;
  // $: console.log("currentRoute", data.currentRoute);

  let innerWidth,
    online,
    title = "Dev Open_Weather";
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>
<svelte:window bind:innerWidth bind:online />

<div class="innerWidth">{innerWidth}</div>
<header class="">
  <div class="flex">
    <a class="search_bar" href="/search">
      <div class="location">{data?.location.city}, {data?.location.region}</div>
      <!-- <div class="location">{location?.city}</div> -->
      <SearchIcon fontsize="0.8em" />
    </a>
  </div>
</header>

<main>
  <div class="router"><slot /></div>
</main>

<footer>
  <div class="flex">
    <nav>
      <div class="route" class:active={data.currentRoute === "/"}>
        <a href="/">Home</a>
      </div>

      <div class="spacer">|</div>

      <div class="route" class:active={data.currentRoute === "/map"}>
        <a href="/map">Map</a>
      </div>

      {#if data.weather.alerts}
        <div class="spacer">|</div>

        <div
          class="route alerts"
          class:active={data.currentRoute === "/alerts"}
        >
          <a href="/alerts">Alerts</a>
        </div>
      {/if}

      <div class="spacer">|</div>

      <div class="route" class:active={data.currentRoute.includes("/docs")}>
        <a href="/docs">Docs</a>
      </div>
    </nav>
  </div>
</footer>

<style lang="postcss">
  .search_bar {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0 1rem;
    text-decoration: underline !important;

    font-size: 1.25rem;
  }
  .alerts:not(.active) {
    color: tomato;
  }

  .innerWidth {
    position: fixed;
    top: 0.75rem;
    left: 0.75rem;
    z-index: 100;
  }
</style>
