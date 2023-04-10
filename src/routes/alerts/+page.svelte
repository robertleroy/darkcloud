<script>
  import Accordion from "$lib/components/Accordion.svelte";
  import dateObj from "$lib/js/dateObj.js";

  export let data,
    isOpen = false;
  let title = "Alerts";

  function humanize(str) {
    const res = str
      .replace(/(HAZARD)/, "<br>HAZARD&nbsp;")
      .replace(/(SOURCE)/, "SOURCE&nbsp;")
      .replace(/(IMPACT)/, "IMPACT&nbsp;")
      .replace(/(IMPACTS)/, "IMPACTS&nbsp;")
      .replace(/(HAIL)/, "<br>HAIL&nbsp;")
      .replace(/(WIND)/, "WIND&nbsp;")
      .replace(/(Locations impacted)/, "<br>Locations impacted")
      .replace(/(Forecast)/, "<br>Forecast&nbsp;")
      .replace(/(Flood History)/, "<br>Flood History&nbsp;")
      .replace(/(ADDITIONAL DETAILS)/, "<br>ADDITIONAL DETAILS&nbsp;")
      .replace(/(PRECAUTIONARY)/, "<br>PRECAUTIONARY")
      .replace(/(NEXT UPDATE)/, "<br>NEXT UPDATE")
      .replace(/(SITUATION OVERVIEW)/, "<br>SITUATION OVERVIEW")
      .replace(/(POTENTIAL IMPACTS)/, "<br>POTENTIAL IMPACTS")
      .replace(/(THREAT TO LIFE)/, "<br>THREAT TO LIFE")
      .replace(/(PLAN:)/, "<br>PLAN:")
      .replace(/(PREPARE:)/, "<br>PREPARE:")
      .replace(/\n/g, "<br>")
      .trim();
    return res;
  }
</script>

<div class="page">
  <div class="alerts">
    {#each data?.weather.alerts as alert, i}
      <Accordion {isOpen}>
        <div class="header" slot="header">
          <div class="event">{alert.event}</div>
          <div class="start param">
            <div class="label">Start:</div>
            {dateObj(alert.start * 1000, "ddd h:mm aa")}
          </div>
          <div class="end param">
            <div class="label">End:</div>
            {dateObj(alert.end * 1000, "ddd h:mm aa")}
          </div>
        </div>

        <pre class="desc">{@html humanize(alert?.description)}</pre>
      </Accordion>
    {/each}
  </div>
</div>
<!-- page -->


<style lang="postcss">
  .alerts {
    max-width: calc(672px + 2rem);
    margin: 0 auto;
    font-family: var(--serif);
  }
  .alerts pre {
    font-family: var(--serif);
    margin: 0 0 1rem;
  }

  .event {
    font-size: 1.1em;
    font-weight: bold;
    margin-bottom: 0.3em;
  }
  .param {
    font-size: 0.875em;
  }
  .label {
    display: inline-block;
    width: 6ch;
  }
</style>
