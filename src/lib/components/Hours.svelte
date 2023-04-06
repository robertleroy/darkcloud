<script>
  import dateObj from '$lib/js/dateObj';
  import { round } from '$lib/js/filters';

  export let hours;
  const tabs = [
    { name: 'Temp', value: 'temp' },
    { name: 'Precip %', value: 'pop' },
    { name: 'Inches / hr', value: 'rain' },
    { name: 'Humidity', value: 'humidity' },
    { name: 'Wind', value: 'wind_speed' },
    { name: 'Gusts', value: 'wind_gust' },
    { name: 'Clouds', value: 'clouds' },
    { name: 'Pressure', value: 'pressure' }
  ];
  let selectedTab = 0;
  let domain = [], metric = [];
  $: metric = selectedTab === 0 ? hours.map(el => round(el?.temp) + '°') :
              selectedTab === 1 ? hours.map(el => el?.pop > 0 ? el?.pop * 100 + '%' : '') :
              selectedTab === 2 ? hours.map(el => el?.rain ? el?.rain['1h'] ?? 0 : '') :
              selectedTab === 3 ? hours.map(el => el?.humidity > 0 ? el?.humidity + '%' : '') : 
              selectedTab === 4 ? hours.map(el => round(el?.wind_speed)) :
              selectedTab === 5 ? hours.map(el => round(el?.wind_gust)) :
              selectedTab === 6 ? hours.map(el => el?.clouds > 10 ? el?.clouds + '%' : '') :
              selectedTab === 7 ? hours.map(el => el?.pressure) : '';

  $: domain = [Math.min.apply(null, metric),Math.max.apply(null, metric)];
  $: stripes = hours.map(el => {
    const obj = makeStripe(el.weather[0].id);
    return {color: obj.color, text: obj.text};
  });
  // $: console.log("stripes",stripes);

  function makeStripe(icon) {
        
    let obj = {
      text: 'clear',
      color: '#ECEFF1'
    }

    if (icon == 801) {
      obj.text = 'clear';
      obj.color = '#ECEFF1';
    } else if (icon == 802) {
      obj.text = 'partly cloudy';
      obj.color = '#CFD8DC';
    } else if (icon == 803) {
      obj.text = 'mostly cloudy';
      obj.color = '#B0BEC5';
    } else if (icon == 804) {
      obj.text = 'overcast';
      obj.color = '#90A4AE';
    } else if (icon > 700 && icon < 800) {
      obj.text = 'overcast';
      obj.color = '#90A4AE';
    }
    else if (icon == 500 || icon == 520) {
      obj.text = 'light rain';
      obj.color = '#BBDEFB';
    } else if (icon == 501 || icon == 521) {
      obj.text = 'rain';
      obj.color = '#64B5F6';
    } else if (icon == 502 || icon == 503 || icon == 504 || icon == 522 || icon == 531) {
      obj.text = 'heavy rain';
      obj.color = '#2196F3';
    }
    else if (icon == 511) {
      obj.text = 'sleet';
      obj.color = '#E0F7FA';
    } 
    else if (icon > 600 && icon < 700) {
      obj.text = 'snow';
      obj.color = '#B2EBF2';
    } 
    return obj;
  }

  function offset (num) { 
    const leftPadding = (num - domain[0]) / (domain[1] - domain[0]);
    const rightPadding = 1 - leftPadding;
    const width = 100;
    
    return  width * rightPadding + 'px';        
  };
</script>

<section id='hours'>
  <div class="tabs">
    {#each tabs as tab,i}
    <div class="tab" on:keydown on:click={() => selectedTab = i} class:selectedTab={selectedTab === i}>
      <div class="text" >{tab.name}</div>
    </div>
    {/each}
  </div> <!-- tabs -->

  <div class="hours">
  {#each hours as hour,i}  
  {#if i%2}
  <div class="hour">      
      <div class="stripe" style:background="{stripes[i].color}"></div>
  
      <div class="time">
        {dateObj(hour?.dt*1000, 'h aa')}
      </div>

      <div class="summary">{i === 1 ? stripes[i].text :
        stripes[i-2].text === stripes[i].text ? '' : stripes[i].text}</div>
        
        <div class="line"></div>

      <div class="metric"  style:margin-right="{offset(metric[i])}">

        <!-- <transition name="fade" mode="out-in"> -->
          <div class='metricValue'> 

            {metric[i]}

            {#if selectedTab === 4 || selectedTab === 5}
            <div class="wind_dir" style="rotate: {hours[i].wind_deg - 90  + 'deg'}; ">&#10140;</div>
            {/if}

          </div>
          <!-- </transition> -->

          <!--  ➜ ➜10140 ➔10132 🡑 🡒 → 🡺 🡢 -->
      </div> 
    <!-- </div> flexbox -->
  </div> <!-- hour -->
  {/if}
  {/each}
</div>
</section> <!-- #hours -->

<style lang='postcss'>
  /* .daySummary {
    padding: 1rem 0;
    font-size: var(--h3);
    text-align: center;
    font-weight: 200;
  } */


  /*##############
.todayHours[data-v-3ce649c2] {

    scroll-snap-align: start;
    width: 90%;
    max-width: 640px;
    margin: 1rem auto 2rem; */

  #hours {
    --h3: 1.125em;
    --backgroundColor: linen;
    padding-bottom: 2rem;

    width: 90%;
    max-width: 640px;
    margin: 1rem auto 2rem;
    
  }
  .tabs {
    display: flex;
    flex-flow: row wrap;
    margin: 0 auto  1.5rem; 
  }  
    
  .tab {
    flex: 1 0 25%;      
    color: #35495E;
    font-size: 0.75em;
    font-weight: bold;
    text-align: center;
    padding: 0 0.3rem;
    background: #ECEFF1;
    border: 1px solid #B0BEC5;
    border-bottom-color: #B0BEC555;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem; 
  }

  .tab:hover {
    /* color: #41B883; */
    background: var(--background-color);
    cursor: pointer;
  }

  .selectedTab {
    color: #41B883 !important; 
    border-color: #B0BEC5 !important; 
    background: var(--background-color);
    border-bottom: none !important;
  }

  .hour {
    display: flex;
    align-items: center;
    gap: 1ch;
    height: 2rem;
  }
  .stripe {
    height: 100%;
    width: 1rem;
    border: 1px none #ccc;
    border-right-style: solid;
    border-left-style: solid;
  }

  .hour:first-of-type .stripe {
    border-radius: 0.4em 0.4em 0 0;
    border-top-style: solid;
  }
  .hour:last-of-type .stripe {
    border-radius: 0 0 0.4em 0.4em;    
    border-bottom-style: solid;
  }

  .metricValue {
    flex: 1;
    position: relative;
  }
  .wind_dir {
    position: absolute;
    top: 0;
    transform-origin: 50% 50%;
    /* top: 0.20rem; */
    right: -1rem;
    /* font-size: 0.75rem; */
    font-size: 90%;
          margin-bottom: 0.2rem;
  }
</style>