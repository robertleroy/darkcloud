<script>
  export default {
    name: 'hours',
    props: [
      'hours'
    ],

    data() {
      return {
        title: 'hours',
        tabs: [
          { name: 'Temp', value: 'temperature' },
          { name: 'Precip %', value: 'precipProbability' },
          { name: 'Inches / hr', value: 'precipIntensity' },
          { name: 'Humidity', value: 'humidity' },
          { name: 'Wind', value: 'windSpeed' },
          { name: 'Gusts', value: 'windGust' },
          { name: 'Clouds', value: 'cloudCover' },
          { name: 'Pressure', value: 'pressure' }
        ],
        selectedTab: 0,
      };
    },

    computed: {
      stripes() {
        return this.hours.map(el => {
          const obj = this.makeStripe(el);
          return {color: obj.color, text: obj.text};
        })
      },

      // temps() {
      //   return this.hours.map(el => Math.round(el.temperature));
      // },

      // precips() {
      //   return this.hours.map(el => Math.round(el.precipProbability*100));
      // },

      winds() {
        return this.hours.map(el => Math.round(el.windSpeed));
      },

      clouds() {
        return this.hours.map(el => Math.round(el.cloudCover*100));
      },

      pressures() {
        return this.hours.map(el => el.pressure);
      },

      metric() {
        let arr = [];
        this.selectedTab === 0 ? arr = this.hours.map(el => el.temperature) :
        this.selectedTab === 1 ? arr = this.hours.map(el => el.precipProbability) :
        this.selectedTab === 2 ? arr = this.hours.map(el => el.precipIntensity) :
        this.selectedTab === 3 ? arr = this.hours.map(el => el.humidity) : 
        this.selectedTab === 4 ? arr = this.hours.map(el => el.windSpeed) :
        this.selectedTab === 5 ? arr = this.hours.map(el => el.windGust) :
        this.selectedTab === 6 ? arr = this.hours.map(el => el.cloudCover) :
        this.selectedTab === 7 ? arr = this.hours.map(el => el.pressure) : '';
        return arr; 
      }, // metric //

      domain () {
        return [Math.min.apply(null, this.metric),Math.max.apply(null, this.metric)];
      }, // domain //
    }, // computed //


    methods: {
      makeStripe (d) {
        
        let obj = {
          text: 'clear',
          color: '#ECEFF1'
        }
        
        if (d.icon === "rain") {
          if (d.precipIntensity < 0.03) {
            obj.text = 'light rain';
            obj.color = '#BBDEFB';
          } else if (d.precipIntensity > 0.2) {
            obj.text = 'heavy rain';
            obj.color = '#2196F3';
          } else {
            obj.text = 'rain';
            obj.color = '#64B5F6';
          }
        }
        else if (d.icon === 'thunderstorm') {
          obj.text = 'thunderstorm';
          obj.color = '#2196F3';
        } 
        else if (d.icon === 'snow' || d.icon === 'sleet' || d.icon === 'hail') {
          obj.text = 'snow';
          obj.color = '#B2EBF2';
        } 
        else if (d.icon === 'sleet' || d.icon === 'hail') {
          obj.text = 'snow';
          obj.color = '#E0F7FA';
        } 
        else {
          if (d.cloudCover < 0.2) {
            obj.text = 'clear';
            obj.color = '#ECEFF1';
          } else if (d.cloudCover < 0.6) {
            obj.text = 'partly cloudy';
            obj.color = '#CFD8DC';
          } else if (d.cloudCover < 0.88) {
            obj.text = 'mostly cloudy';
            obj.color = '#B0BEC5';
          } else {
            obj.text = 'overcast';
            obj.color = '#90A4AE';
          }
        }
        return obj;
      }, // makeStripe //

      offset (num) { 
        const leftPadding = (num - this.domain[0]) / (this.domain[1] - this.domain[0]);
        const rightPadding = 1 - leftPadding;
        const width = 100;
        
        return  width * rightPadding + 'px';        
      }, // offset // 
    } // methods //
    
    
  };
</script>

<!-- ➜➔ (these are arrows) -->
<template>
  <section id='hours'>
    <div class="tabs">
      <div class="tab"
        v-for="(tab,i) of tabs" :key="i" 
        :class="{selectedTab: selectedTab === i}"
        @click='selectedTab = i'>
        <div class="text" >{{tab.name}}</div>
      </div>
    </div> <!-- tabs -->

    <div  v-for="(hour,i) of hours"
        :key="i" class="hours">
      <div class="flexbox" v-if="i%2 ">

        <div class="stripe" 
          :style="{background: stripes[i].color}"
          :class="{topCap : i === 1, bottomCap : i >= hours.length-2}"></div>
    
        <div class="time">
          {{hour.time*1000 | date('h tt')}}
        </div>

        <div class="summary">
          <div class="text"> {{ i === 1 ? stripes[i].text :
              stripes[i-2].text === stripes[i].text ? '' : stripes[i].text }}
          </div>
          
          <div class="line"></div>
        </div>

        <div class="metric"  v-if="metric[i]"
            :style="{'margin-right': offset(metric[i])}">

          <transition name="fade" mode="out-in">
            <div :key="selectedTab" class='metricValue'>
                  <div v-if="selectedTab === 0">
                    {{metric[i] | number | suffix('°')}}
                  </div> 
                  <!-- temp -->

                  <div v-if="selectedTab === 1">
                    {{metric[i]*100 | number | suffix('%')}} 
                  </div> <!-- precip -->

                  <div v-if="selectedTab === 2">
                    {{metric[i] | decimal(2)}}
                  </div> <!-- intensity -->

                  <div v-if="selectedTab === 3">
                    {{metric[i]*100 | number | suffix('%')}}
                  </div> <!-- humidity -->            
                                    
                  <div class="wind" v-if="selectedTab === 4">
                    <span>{{metric[i] | number}}</span> 
                    <!-- <small>mph</small> -->
                    <div 
                      :style="{ transform: 'rotate('+ (hour.windBearing + 90 ) + 'deg)'}"
                      class="bearing" >➜</div>
                  </div> <!-- wind -->
                  
                  <div class="wind" v-if="selectedTab === 5">
                    <span>{{metric[i] | number}}</span> 
                    <!-- <small>mph</small> -->
                    <div 
                      :style="{ transform: 'rotate('+ (hour.windBearing + 90 ) + 'deg)'}"
                      class="bearing" >➜</div>
                  </div> <!-- gust -->

                  <div v-if="selectedTab === 6">
                    {{metric[i]*100 | number | suffix('%')}}
                  </div> <!-- clouds -->

                  <div v-if="selectedTab === 7">
                    {{metric[i]}}
                  </div> <!-- pressure -->
            </div>
          </transition>
        </div>
      </div> <!-- flexbox -->
    </div> <!-- hours -->
  </section>
</template>

<style scoped lang='scss'>
  @import '../scss/imports';
  .daySummary {
    padding: 1rem 0;
    font-size: var(--h3);
    text-align: center;
    font-weight: 200;
  }

// region tabs =================================== //
  #hours {
    // margin: 0 auto 4rem;
    padding-bottom: 2rem;
  }
  .tabs {
    display: flex;
    flex-flow: row wrap;
    margin: 0 auto  1.5rem;   
    
    .tab {
      flex: 1 0 25%;
      
      color: #35495E;
      font-size: var(--h9);
      font-weight: bold;
      text-align: center;
      padding: 0 0.3rem;
      background: #ECEFF1;
      border: 1px solid #B0BEC5;
      border-bottom-color: #B0BEC555;
      border-top-left-radius: 0.3rem;
      border-top-right-radius: 0.3rem;    
      &:hover {
        border-color: #41B883;
        cursor: pointer;
      }
      &:active {
        opacity: 0.6;
      }  
      @include media (310px) {
        font-size: var(--h8);
      }
      @include media (500px) {
        flex: 1 1 auto;
      }
    }

    .selectedTab {
      color: #41B883 !important; 
      background: $backgroundColor;
      border-bottom: none;
    }
  }
// endregion tabs =================================== //


// region hours =================================== //
  .flexbox {
    display: flex;
    align-items: center;
    min-height: 3rem;  
    font-size: 1.13rem;

    @include media (400px) {
      font-size: var(--h7);
    }

    .stripe {
      width: 1.5rem;
      align-self: stretch;
      border: 1px solid #B0BEC5;
      border-top-color: transparent;
      border-bottom-color: transparent;
      margin-right: 0.5rem;
    }

    .topCap {
      border-radius: 0.5rem 0.5rem 0 0 ;
      border-top-color: #B0BEC5;
    }

    .bottomCap {
      border-radius: 0 0 0.5rem 0.5rem ;
      border-bottom-color: #B0BEC5;
    }

    .time {
      width: 3.5rem;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      @include media (400px) {
        width: 4rem;
      }
    }
    
    .summary {
      flex: 1;
      font-style: italic;
      color: var(--muted-7);
      font-size: 1rem;
      display: flex;
      gap: 0.5rem;
      align-items: center;
      @include media (400px) {
        font-size: 1.13rem;
      }

      .line {
        flex: 1;
        background-image: linear-gradient(var(--muted-4), transparent);
        height: 1px;
        margin-right: 1.5rem;
      }
    }

    .metric {
      transition: 0.3s;
      border: 1px solid #ccc;
      border-radius: 1rem;
      padding: 0.3rem 0.4rem;
      background: #ECEFF1;
      
      display: grid;
      place-items: center center;
      
      div {
        line-height: 1;
      }

      .wind {
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        gap: 0 0.1rem;
        .bearing {
          font-size: 90%;
          margin-bottom: 0.2rem;
        }
      }
    }
  }
// endregion hours =================================== //
</style>
