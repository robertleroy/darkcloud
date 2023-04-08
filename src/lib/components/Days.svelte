<script>
  import Accordion from '$lib/components/Accordion.svelte';
  import RangeBar from '$lib/components/RangeBar.svelte';
  import WeatherIcon from '$lib/components/WeatherIcon.svelte';
  import { titlecase, round, mmToInches } from '$lib/js/filters.js';
  import dateObj from '$lib/js/dateObj.js';
  export let days = [];
  // console.log("Days",days);
  let weekrange = getRange(days);

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
    
  

  function getRange(days) {
    let highs = days.map(el => round(el.temp.max));
    let lows = days.map(el => round(el.temp.min));
    return [Math.min.apply(null, lows), Math.max.apply(null, highs)];
  }
</script>

<div class='days'>
  {#each days as day, i}
  <Accordion >
    <svelte:fragment slot="header">

  <div class="day">
    <WeatherIcon icon={day.weather[0].icon} fontsize="1.75em"/>

    <div class="weekday">
      <div class="date">{i === 0 ? 'Today' : dateObj(day.dt*1000, 'ddd')}</div>
      <div class="precip">
        <div>
          <span>{precipSymbol(day.weather[0].id)}</span>
          <span>{day.pop > 0.01 ? day.pop*100 + '%' : '0%'}</span>
        </div>
      </div>
    </div>

    <!-- <div class="precip">
      <div class="symbol">{precipSymbol(day.weather[0].id)}</div>
      <div class="pop">{day.pop > 0.15 ? day.pop*100 + '%' : ' '}</div>
    </div> -->
    <!-- <div class="date">{dateObj(day.dt*1000, 'ddd')}</div> -->
    <!-- <div class="temp low">{round(day.temp.min)}</div>
    <div class="temp high">{round(day.temp.max)}</div> -->

    <div><RangeBar
      domain={weekrange}
      high="{round(day.temp.max)}"
      low="{round(day.temp.min)}"
    /></div>

  

    <!-- <div class="inch">{
      day.weather[0].main === 'Rain' ?
        'Rain: ' + round(mmToInches(day.rain),2) ?
      day.weather[0].main === 'Snow' ?
        'Snow: ' + round(mmToInches(day.snow),2) : ''
    }
    </div> -->
  </div>
  
</svelte:fragment> 
    
<svelte:fragment>
  {i}
</svelte:fragment>
</Accordion>
  {/each}
</div>

<style lang='postcss'>
  .day {
    /* display: flex; */
    /* justify-content: space-between; */
    /* align-items: center; */
    /* gap: 0 1ch; */
    display: grid;
    grid-template-columns: 5rem 5rem 1fr;
    align-items: center;
    padding-right: 1.1rem;
  }
  /* .precip {
    width: 2.5rem;

    .pop {
      display: inline-block;
      font-size: 0.75rem;
    }
    .symbol {
    display: inline-block;
      font-size: 0.65rem;
    }
  } */
  .weekday {
      .precip {
        color: rgba( 51, 51, 51, 0.7);
        font-size: 0.75rem;
        line-height: 1.3;
        div {
          padding-right: 0.5rem;
        }
        span:first-child {
          font-size: 0.55rem;
          margin-right: 0.2rem;
          vertical-align: 2px;
          -webkit-filter: grayscale(60%);
          filter: grayscale(60%);
        }
      }
    }
</style>