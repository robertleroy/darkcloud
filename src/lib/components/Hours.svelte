<script>
  import dateObj from "$lib/js/dateObj";
  import { round, mmToInches } from "$lib/js/filters";
  import { fade } from 'svelte/transition';

  export let hours;
  const max_hours = 24;
  hours = hours.slice(0,max_hours);
  const tabs = [
    { name: "Temp", value: "temp" },
    { name: "Precip %", value: "pop" },
    { name: "Inches / hr", value: "rain" },
    { name: "Humidity", value: "humidity" },
    { name: "Wind", value: "wind_speed" },
    { name: "Gusts", value: "wind_gust" },
    { name: "Clouds", value: "clouds" },
    { name: "Pressure", value: "pressure" },
  ];

  let selectedTab = 0;
  let domain = [],
    metric = [];
  $: metric =
    selectedTab === 0
      ? hours.map((el) => round(el?.temp))
      : selectedTab === 1
      ? hours.map((el) => round(el?.pop * 100) ?? 0)
      : selectedTab === 2
      ? hours.map((el) => (el?.rain ? round(mmToInches(el?.rain["1h"]),2) ?? 0 : 0))
      : selectedTab === 3
      ? hours.map((el) => el?.humidity)
      : selectedTab === 4
      ? hours.map((el) => round(el?.wind_speed))
      : selectedTab === 5
      ? hours.map((el) => round(el?.wind_gust))
      : selectedTab === 6
      ? hours.map((el) => el?.clouds)
      : selectedTab === 7
      ? hours.map((el) => el?.pressure)
      : "";

  $: domain = [Math.min.apply(null, metric), Math.max.apply(null, metric)];
  $: stripes = hours.map((el) => {
    const obj = makeStripe(el.weather[0].id);
    return { color: obj.color, text: obj.text };
  });

  function offset(num) {
    const leftPadding = (num - domain[0]) / (domain[1] - domain[0]) || 0;
    const rightPadding = 1 - leftPadding;
    const width = 100;

    return width * rightPadding + "px";
  }

  function makeStripe(icon) {
    let obj = {
      text: "clear",
      color: "#ECEFF1",
    };

    if (icon == 801) {
      obj.text = "clear";
      obj.color = "#ECEFF1";
    } else if (icon == 802) {
      obj.text = "partly cloudy";
      obj.color = "#CFD8DC";
    } else if (icon == 803) {
      obj.text = "mostly cloudy";
      obj.color = "#B0BEC5";
    } else if (icon == 804) {
      obj.text = "overcast";
      obj.color = "#90A4AE";
    } else if (icon > 700 && icon < 800) {
      obj.text = "overcast";
      obj.color = "#90A4AE";
    } else if (icon == 500 || icon == 520) {
      obj.text = "light rain";
      obj.color = "#BBDEFB";
    } else if (icon == 501 || icon == 521) {
      obj.text = "rain";
      obj.color = "#64B5F6";
    } else if (
      icon == 502 ||
      icon == 503 ||
      icon == 504 ||
      icon == 522 ||
      icon == 531
    ) {
      obj.text = "heavy rain";
      obj.color = "#2196F3";
    } else if (icon == 511) {
      obj.text = "sleet";
      obj.color = "#E0F7FA";
    } else if (icon > 600 && icon < 700) {
      obj.text = "snow";
      obj.color = "#B2EBF2";
    }
    return obj;
  }
</script>


<section class="hours">
  <!-- #region tabs -->
  <div class="tabs"> 
    {#each tabs as tab, i}
      <div class="tab" on:keydown
        on:click={() => selectedTab = i}
        class:selectedTab={selectedTab === i}>
        <div class="text">{tab.name}</div>
      </div>
    {/each}
  </div>
  <!-- #endregion tabs -->
  
  <!-- #region hours -->
  {#each hours as hour, i}
    {#if i % 2}
      <div class="hour">
        <div class="stripe" 
        style:background={stripes[i].color} 
        class:topcap={ i === 1 } 
        class:bottomcap={ i === 23 } />

        <div class="time">
          {dateObj(hour?.dt * 1000, "h aa")}
        </div> <!-- time -->
        
        <div class="summary">
          {i === 1 ? stripes[i].text : 
            stripes[i - 2].text === stripes[i].text ? "" : 
            stripes[i].text}

          <div class="line" />
        </div> <!-- summary -->
      
        {#if 
          (selectedTab != 1 ||
          selectedTab != 2) &&
          metric[i] > 0
        }
        <div class="metric" 
        transition:fade="{{duration: 200}}"
            style="margin-right: {offset(metric[i])}"
            class:pressure={selectedTab === 7}
        > 
          <div class="metricValue"
            class:temp={selectedTab === 0}
            class:percent={selectedTab === 1 ||
              selectedTab === 3 ||
              selectedTab === 6}
            class:wind={selectedTab === 4 || 
              selectedTab === 5}
          >
            {metric[i]}

            {#if selectedTab === 4 || selectedTab === 5}
            <div
              class="wind_dir"
              style="rotate: {hours[i].wind_deg - 90 + 'deg'} "
            > &#10140; 
            </div>
            {/if}
          </div> <!-- metricValue -->
        </div> <!-- metric -->  
        {/if}  

      </div> <!-- hour -->        
    {/if}
  {/each} <!-- hours as hour -->
  <!-- #endregion hours -->
</section> <!-- hours component -->

<style lang="postcss">
  .hours {
    padding-bottom: 2rem;
    margin: 1rem auto 2rem;
  }
  .tabs {
    display: flex;
    flex-flow: row wrap;
    margin: 0 auto 1.5rem;
  
    .tab {
      flex: 1 0 25%;
      color: #35495e;
      font-size: 0.75em;
      font-weight: bold;
      text-align: center;
      padding: 0 0.3rem;
      background: #eceff1;
      border: 1px solid #b0bec5;
      border-bottom-color: #b0bec555;
      border-top-left-radius: 0.3rem;
      border-top-right-radius: 0.3rem;

      @media (min-width: 768px) {
        flex: 1 1 auto;
      }
    }
    .tab:hover {
      background: var(--background-color);
      cursor: pointer;
    }
    .tab.selectedTab {
      color: #41b883;
      background: var(--background-color);
      border-bottom: none;
    }
  }

  .hour {
    display: flex;
    align-items: center;
    gap: 1ch;
    min-height: 2.25rem;

    @media (min-width: 500px) {
      gap: 2ch;
    }
  }
  .stripe {
    /* height: 100%; */
    align-self: stretch;
    min-width: 1rem;
    border: 1px none #ccc;
    border-right-style: solid;
    border-left-style: solid;
  }

  .topcap {
    border-radius: 0.4em 0.4em 0 0 ;
    border-top-style: solid;
  }
  .bottomcap {
    border-radius: 0 0 0.4em 0.4em;
    border-bottom-style: solid;
  }

  .metric {
    border: 1px solid #ccc;
    border-radius: 0.75rem;
    padding: 0.275rem 0.3rem 0.25rem 0.4rem ;
    background: #eceff1;

    display: grid;
    place-items: center center;
    transition: 0.3s;

    .metricValue {
      line-height: 1;
    }
  }

  .wind {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
  }
  .wind_dir {
    font-size: 0.675rem;
    margin: 0 0 0.075rem 0.075rem;
  }

  .summary {
    --muted-7: #999;
    --muted-4: #999;
    flex: 1;
    font-style: italic;
    color: var(--muted-7);
    font-size: 0.75rem;
    display: flex;
    gap: 0.5rem;
    justify-content: stretch;
    align-items: center;

    .line {
      flex: 1;
      background-image: linear-gradient(var(--muted-4), transparent);
      height: 1px;
    }
      
    @media (min-width: 400px) {
      gap: 1.5rem;
      .line {
        margin-right: 1rem;
      }
    }
  }

  .temp::after { content: "\00b0"; }
  .percent::after { content: "%"; }
  .metric.pressure { padding: 0.2rem 0.3rem 0.3rem;}

</style>
