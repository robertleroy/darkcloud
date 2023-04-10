<script>
  export let data;
  const lat = data?.location.lat;
  const lon = data?.location.lon;

  $: mapUrl = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=650&height=450&zoom=6&level=surface&overlay=radar&product=radar&menu=&message=true&marker=&calendar=now&pressure=true&type=map&location=coordinates&detail=&metricWind=mph&metricTemp=%C2%B0F&radarRange=-1`;

  let title = "Map by Windy";
</script>

<div class="map">
  <iframe width="100%" height="100%" src={mapUrl} frameborder="0" {title} />
</div>
<!-- map -->


<style lang="postcss">
  .map {
    position: relative;
    top: 0;
    width: 100%;
    height: 100vh;
    padding: 0 0 var(--footer-height);
    z-index: 15;
    background: var(--background-color);
  }
</style>
