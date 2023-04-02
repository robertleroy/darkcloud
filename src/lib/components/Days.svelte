<script>
  import WeatherIcon from '$lib/components/WeatherIcon.svelte';
  import { titlecase, round, mmToInches } from '$lib/js/filters.js';
  import dateObj from '$lib/js/dateObj.js';
  export let days = [];
  // console.log("Days",days);

  function precipSymbol(code) {
    /*
    rain: 200 300 500
    snow: 600
    sleet: 611 - 616, 511
    */
      let symbol = '';
      if(code === 781) {
        symbol = `🌪️`;
      // } else if(code === 511 || code > 610 && code < 617) {
      //   symbol = `🧊`;
      } else if (code >= 600 && code < 700) {
        symbol = `❄️`;
      } else if (code >= 200 && code < 600) {
        symbol = `💧`;
      }
      return symbol;
    }
</script>

<div class='days'>
  {#each days as day}
  <div class="day">
    <WeatherIcon icon={day.weather[0].icon} fontsize="1.75em"/>
    <div class="precip">
      <div class="symbol">{precipSymbol(day.weather[0].id)}</div>
      <div class="pop">{day.pop > 0.15 ? day.pop*100 + '%' : ' '}</div>
    </div>
    <div class="date">{dateObj(day.dt*1000, 'ddd')}</div>
    <div class="temp low">{round(day.temp.min)}</div>
    <div class="temp high">{round(day.temp.max)}</div>

  

    <!-- <div class="inch">{
      day.weather[0].main === 'Rain' ?
        'Rain: ' + round(mmToInches(day.rain),2) ?
      day.weather[0].main === 'Snow' ?
        'Snow: ' + round(mmToInches(day.snow),2) : ''
    }
    </div> -->
  </div>
  {/each}
</div>

<style lang='postcss'>
  .day {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    gap: 0 1ch;
  }
  .precip {
    width: 2.5rem;
    /* display: flex; */
    /* justify-content: space-between; */
    /* align-items: baseline; */
    /* gap: 0 0.2rem; */

    .pop {
      display: inline-block;
      font-size: 0.75rem;
      /* margin-top: 5px; */
    }
    .symbol {
    display: inline-block;
      font-size: 0.65rem;
      /* padding-bottom: 6px; */
    }
  }
</style>