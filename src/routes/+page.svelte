<script>
  import Current from '$lib/components/Current.svelte';
  import Hours from '$lib/components/Hours.svelte';
  import Days from '$lib/components/Days.svelte';
  import WobbleChart from "$lib/components/WobbleChart.svelte";

  import { round, mmToInches } from '$lib/js/filters';
  import dateObj from '$lib/js/dateObj';
   
  export let data;
  // $: {
  //   console.log('\n@: ', dateObj(data.weather.current.dt*1000,'M/d h:mm:ss aa'));
  //   console.log('data.location', data.location);
  //   console.log('data.weather.current', data.weather.current);
  //   // console.log('data.weather.minutely', data.weather.minutely);
  //   // console.log('data.weather.hourly', data.weather.hourly);
  //   // console.log('data.weather.daily', data.weather.daily);
  // }

  const { weather } = data;
  
  let days={},hours={},minutes={},current={},alerts=[],precipitating=null;

  $: console.log('weather:', data);
  $: {
    current = weather?.current;
    minutes = weather?.minutely;
    hours = weather?.hourly;
    days = weather?.daily;
    alerts.length ? alerts = weather?.alerts : [];
    // console.log('minutes:', minutes.length);
    // console.log('hours:', hours.length);
    // console.log('days:', days.length);
  }

  $: {
    precipitating = current?.rain || current?.snow;
    // snowing = current?.snow;
  }

</script>

<div class='page'>


  <Current current={{
    high: days[0].temp.max,
    low: days[0].temp.min,
    sunrise: days[0].sunrise,
    sunset: days[0].sunset, 
    ...current}} />


    
    {#if precipitating}
    <div class="precipChart">
      <div class="desc">
        {#if current?.snow}
        Snow this hour: <var>{round(mmToInches(current?.snow['1h']), 2) + '"'}</var>
        {:else if current?.rain}
        Rain this hour <var>{round(mmToInches(current?.rain['1h']), 2) + '"'}</var>
        {:else}
        precip this hour
        {/if}
      </div>

      <WobbleChart {minutes} />
    </div>
    {/if}
   

  <Hours {hours}/>

  <Days {days}/>




</div> <!-- page -->


<style lang='postcss'>
  var {
    font-style: unset;
    font-family:serif;
    margin: 0 1ch;
  }
  .desc {
    font-size: 0.9em;
    text-align: center;
    margin-bottom: -1rem;
  }
</style>