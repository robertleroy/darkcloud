<script>
  import WeatherIcon from '$lib/components/WeatherIcon.svelte';
  import { titlecase, round } from '$lib/js/filters.js';
  import dateObj from '$lib/js/dateObj.js';

  export let current;
</script>

<div class='current'>
  <div class="current_time">
    <span>{dateObj(current?.dt*1000, "dddd")}</span>
    <span>{dateObj(current?.dt*1000, "MMMM do")}</span>
    <span>{dateObj(current?.dt*1000, "h:mm aa")}</span>
  </div> <!-- current_time -->

  <div class="current_conditions">
    <div class="snapshot">
      <WeatherIcon icon={current?.weather[0].icon} fontsize="3.5rem"/>
      <div class="temp">{round(current?.temp)}</div>
    </div>
    <div class="conditions"><div class="icon">{titlecase(current?.weather[0].description)}</div></div>
  </div> <!-- current_conditions -->
</div> <!-- current -->


<div class="day_stats">
  <div class="hilo">
    <div class="label">High:</div>
    <div class="high temp">{round(current?.high)}</div>
    <div class="label">Low:</div>
    <div class="low temp">{round(current?.low)}</div>
  </div>
  <div class="sun_times">
    <div class="label">Sunrise:</div>
    <div class="sunrise">{dateObj(current?.sunrise*1000, 'h:mm aa')}</div>
    <div class="label">Sunset:</div>
    <div class="sunset">{dateObj(current?.sunset*1000, 'h:mm aa')}</div>
  </div>
</div> <!-- day_stats -->

<style lang='postcss'>
  .current_time {
    display: flex;
    justify-content: center;
    gap: 0 1rem;
    font-size: 0.875rem;
  }
    .current_conditions {
      margin: 2rem 0 3rem;
    
    .snapshot {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0;

      .temp {
        font-size: 2.5rem;
      }
    }
    .conditions {
      text-align: center;
      margin-top: -1rem;
      /* font-size: 1.25rem; */
      font-size: 1.375rem;
    }
  }
  .day_stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0 2rem;
    max-width: 320px;
    margin: 0 auto 3rem;
  }
  .hilo, .sun_times {
    display: grid;
    grid-template-columns: max-content max-content;
    align-items: center;
    gap: 0 1rem;
  }
</style>