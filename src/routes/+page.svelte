<script>
  import Current from "$lib/components/Current.svelte";
  import Hours from "$lib/components/Hours.svelte";
  import Days from "$lib/components/Days.svelte";

  export let data;
  const { weather } = data;
  let days = {},
    hours = {},
    minutes = {},
    current = {},
    alerts = [],
    minutes_of_precip_this_hour;

  $: day_summary = getDaySummary(alerts);

  $: console.log("weather:", data);
  $: {
    current = weather?.current;
    minutes = weather?.minutely;
    hours = weather?.hourly;
    days = weather?.daily;
    // days = weather?.daily.slice(0,5);
    // alerts.length ? (alerts = weather?.alerts) : [];
    // alerts = weather?.alerts.length ? weather?.alerts : [];
    alerts = weather?.alerts ?? [];
  }

  $: minutes_of_precip_this_hour = minutes
    .map((el) => el?.precipitation)
    .filter((el) => el > 0);

  function getDaySummary(arr) {
    const n = arr.length;
    // console.log('Alerts', n );
    let str = 'day_summary';
    if (n > 0) {
      str = `<div style="color:tomato">${alerts[0]?.event}`;
      n > 1 ? str += `<sup> +${n-1}</sup>` : '';
      str += `</div>`;
    } 
    return str;
  }
</script>


<div class="page">
  <Current
    current={{
      high: days[0].temp.max,
      low: days[0].temp.min,
      sunrise: days[0].sunrise,
      sunset: days[0].sunset,
      ...current,
    }}
    {minutes}
  />

  <div class="wrapper" style:max-width="640px">
    <div class="day_summary">{@html day_summary}</div>
    <Hours {hours} />

    <div class="week_summary">week_summary</div>
    <Days {days} />
  </div>
  <!-- wrapper -->
</div>

<!-- page -->

<style lang="postcss">
  .wrapper {
    max-width: 640px;
    margin: 0 auto;
  }
  .day_summary {
    margin-bottom: -0.5rem;
  }
  
</style>
