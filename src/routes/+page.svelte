<script>
  import Current from '$lib/components/Current.svelte';
  import Hours from '$lib/components/Hours.svelte';
  import Days from '$lib/components/Days.svelte';
  import WobbleChart from "$lib/components/WobbleChart.svelte";

  import { round, titlecase, mmToInches } from '$lib/js/filters';
  import dateObj from '$lib/js/dateObj';
   
  export let data;
  const { weather } = data;  
  let days={},hours={},minutes={},current={},alerts=[],precipitating=null;


  $: console.log('weather:', data);
  $: {
    current = weather?.current;
    minutes = weather?.minutely;
    hours = weather?.hourly;
    days = weather?.daily;
    // days = weather?.daily.slice(0,5);
    alerts.length ? alerts = weather?.alerts : [];
  }
  
  $: minutes_of_precip = minutes.map(el => el?.precipitation).filter(el => el > 0);

  $: {
    precipitating = current?.rain || current?.snow;
  }

  // function getHrPrecip(arr) {
  //   let highs = arr.map(el => round(el.precipitation));
  //   let lows = arr.map(el => round(el.temp.min));
  //   return [Math.min.apply(null, lows), Math.max.apply(null, highs)];
  // }
</script>

<div class='page'>
  <Current current={{
    high: days[0].temp.max,
    low: days[0].temp.min,
    sunrise: days[0].sunrise,
    sunset: days[0].sunset, 
    ...current}} />
    
    <div class="test">{minutes_of_precip}</div>
    <div class="test">{Math.max.apply(null, minutes_of_precip)}</div>
    <div class="test">{minutes_of_precip.length}</div>
    
  <!-- #region WobbleChart -->
  {#if minutes_of_precip.length > 5}
  <div class="precipChart">
    <div class="desc">
      {#if current?.snow}
      Snow this hour: <var>{round(mmToInches(current?.snow['1h']), 2) + '"'}</var>
      {:else if current?.rain}
      Rain this hour: <var>{round(mmToInches(current?.rain['1h']), 2) + '"'}</var>
      {:else}
      This hour..  {titlecase(current?.weather[0].description)}
      {/if}
    </div>

    <WobbleChart {minutes} />
  </div>
  {/if}
  <!-- #endregion WobbleChart -->


  <div class="wrapper" style:max-width="640px">

    <div class="day_summary">day_summary</div>
    <Hours {hours}/>   

    <div class="week_summary">week_summary</div>
    <Days {days}/>

  </div> <!-- wrapper -->

</div> <!-- page -->


<style lang='postcss'>
  .wrapper {
    max-width: 640px;
    margin: 0 auto;
  }
  var {
    font-style: unset;
    margin: 0 1ch;
  }
  .desc {
    text-align: center;
    margin-bottom: -1rem;
  }
</style>