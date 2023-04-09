<script>
  import Accordion from '$lib/components/Accordion.svelte';
  import dateObj from '$lib/js/dateObj.js';

  export let data;

  // let alerts = data.weather.alerts;
  // $: console.log('alerts', data.weather.alerts.length);
  
  let title = 'Alerts';

  function humanize(str) {
    const res = str.replace(/(WHAT\.\.\.)/, 'WHAT: &nbsp;').replace(/(WHEN\.\.\.)/, 'WHEN: &nbsp;').replace(/(WHERE\.\.\.)/, 'WHERE: &nbsp;').replace(/\.{3}\s\*/g, '<br/><br/>').replace(/\*/g, '<br/>').replace(/\.{3}\s|\*/g, '<br/>').replace(/(HAZARD\.\.\.)/, '<br>HAZARD: &nbsp;').replace(/(SOURCE\.\.\.)/, '<br>SOURCE: &nbsp;').replace(/(IMPACT\.\.\.)/, '<br>IMPACT: &nbsp;').replace(/(IMPACTS\.\.\.)/, 'IMPACTS: &nbsp;').replace(/(HAIL\.\.\.)/, '<br>HAIL: &nbsp;').replace(/(WIND\.\.\.)/, '<br>WIND: &nbsp;').replace(/(Locations impacted)/, '<br>Locations impacted: &nbsp;').replace(/(Forecast\.\.\.)/, '<br>Forecast: &nbsp;').replace(/(Flood History\.\.\.)/, '<br>Flood History: &nbsp;').replace(/(ADDITIONAL DETAILS\.\.\.)/, '<br>ADDITIONAL DETAILS: &nbsp;').replace(/(PRECAUTIONARY\.\.\.)/, '<br>PRECAUTIONARY').replace(/(NEXT UPDATE)/, '<br>NEXT UPDATE').replace(/(SITUATION OVERVIEW)/, '<br>SITUATION OVERVIEW').replace(/(POTENTIAL IMPACTS)/, '<br>POTENTIAL IMPACTS').replace(/(THREAT TO LIFE)/, '<br>THREAT TO LIFE').replace(/(PLAN:)/, '<br>PLAN:').replace(/(PREPARE:)/, '<br>PREPARE:').replace(/\.{3}|\*/g, '&nbsp;&nbsp;').replace(/\n/g, '<br>').trim()
    return res;
  }
</script>

<div class='page'>
  

  <div class="alerts">
    {#each data?.weather.alerts as alert, i}
    
    
    <Accordion >
      <!-- class:opened="{alerts.length > 1 ? false : true}" -->
      
      <svelte:fragment slot="header">
        <div class="event">{alert.event}</div>
        <div class="start"> <div class="label">Start:</div> {dateObj(alert.start*1000, 'ddd h:mm aa')}</div>
        <div class="ende"> <div class="label">End:</div> {dateObj(alert.end*1000, 'ddd h:mm aa')}</div>
      </svelte:fragment> 

      <!-- <svelte:fragment> -->
        <!-- <div class="description"> -->
          <!-- <div v-html="alert.description" /> -->
          <!-- <div>{@html alert?.description}</div> -->

        
          <!-- <div class="desc">{@html humanize(alert?.description)}</div> -->
          
          <pre class="desc" >{@html alert?.description}</pre>

        
        <!-- </div> -->
      <!-- </svelte:fragment> -->
      
    </Accordion>
    {/each}
  </div>


</div> <!-- page -->

<style lang='postcss'>
  .alerts {
    max-width: 640px;
    margin: 0 auto;
    font-family: var(--serif);
  }
  pre {
    font-family: var(--serif);
  }
  .event {
    font-weight: bold;
    font-family: var(--serif);
  }
  .label {
    display: inline-block;
    width: 6ch;
  }
</style>