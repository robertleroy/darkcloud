<script>

  export let data;
  const lat = data?.location.lat;
  const lon = data?.location.lon;

  $: mapUrl = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=650&height=450&zoom=6&level=surface&overlay=radar&product=radar&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=mph&metricTemp=%C2%B0F&radarRange=-1`;

  $: mapUrl2 = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=650&height=450&zoom=6&level=surface&overlay=radar&product=radar&menu=&message=true&marker=&calendar=now&pressure=true&type=map&location=coordinates&detail=&metricWind=mph&metricTemp=%C2%B0F&radarRange=-1`

  let title = 'Map';
</script>

<div class='map page'>
  <!-- <div>{title}</div>

  <p center><em>insert map here</em></p>

  <div class="loc">{lat},{lon}</div> -->

  <iframe width="100%" height="100%" src={mapUrl2} frameborder="0" {title}/>

</div> <!-- page -->

<style lang='postcss'>
  .map {
    top: 0;
    width: 100%;
    height: 100vh;
    z-index: 15;
    background: var(--background-color);
  }

</style>