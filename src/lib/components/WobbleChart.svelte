<script>
  // import {minutes} from '$lib/stores/store';
  import * as d3 from "d3";
  import {onMount} from 'svelte';

  export let minutes;
  let clientWidth;

  let var_values = minutes.map(el => {
    return { time: el.dt * 1000, value: el.precipitation }
  }).filter((el, i) => {
    return i % 3 === 0;
  });
  let var_height = 150;
  let var_width = 350;
  // let var_height = 165;
  // let var_width = 385;
  let var_margin = {top: 12, right: 3, bottom: 24, left: 3};

  // $: var_height = clientWidth > 610 ? 165 : 150;
  // $:clientWidth > 610 ? var_width = 176 : '';

  // function getMax(arr) {
  //   return arr.reduce((a, b) => Math.max(a, b), -Infinity);
  // }
  function drawChart() {     
    // let self = this;
    const height = var_height, width = var_width,
          margin = var_margin, 
          values = var_values;
          
    // const yMax = d3.max(values,d => d.value*1.2),
    //       dynamicY = yMax < 0.1 ? [0,0.1] : 
    //                 yMax < 0.3 ? [0,0.3] : 
    //                 yMax < 0.6 ? [0,0.6] : 
    //                 yMax < 1 ? [0,1] : [0,yMax];
    
    // const yAxisLabels = yMax < 0.1 ? ["0.03","0.05","drizzle"] : 
    //                     yMax < 0.3 ? ["light","0.2","medium"] : 
    //                     yMax < 0.6 ? ["light","medium","heavy"] : 
    //                     ["light","medium","heavy",""] ;
  
    const yMax = d3.max(values,d => d.value*1.2),
          dynamicY = yMax < 2.5 ? [0,2.5] : 
                    yMax < 7.5 ? [0,7.5] : 
                    yMax < 15 ? [0,15] : 
                    yMax < 50 ? [0,50] : [0,yMax];
    
    const yAxisLabels = yMax < 2.5 ? ["drizzle","","light"] : 
                        yMax < 7.5 ? ["light","","moderate"] : 
                        yMax < 15 ? ["light","moderate","heavy"] : 
                        ["light","moderate","heavy", ""] ;
                        
  
    const x = d3.scaleTime() /* timeline x */
      .domain(d3.extent(values, d => d.time))
      .range([margin.left, width - margin.right])
    
    const y = d3.scaleLinear() /* dynamic y */
      .domain(dynamicY)
      .range([height - margin.bottom, margin.top]);
    
    const xAxis = g => g 
      .attr("transform", `translate(0,${height - margin.bottom + 6})`)
      .call(d3.axisBottom(x)
            .ticks(4).tickSize(0))
      .call(g => g.select(".domain").remove());
    
    const yScale = d3.scaleBand() /* y labels */
      .domain(yAxisLabels)
      .range([height - margin.bottom, margin.top]);
    
    const yAxis = g => g  /* y labels */
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisRight(yScale)
            .tickSize(width - margin.left - margin.right))
      .call(g => g.select(".domain").remove())
      .attr("stroke-dasharray", "2,2")
      .attr("stroke-opacity", 0.5)
      .call(g => g.selectAll(".tick text")
          .attr("x", 8)
          .attr("dy", 12))
          // .attr("dy", -5))
    
    var area = d3.area()
      .curve(d3.curveNatural)
      .x(d => x(d.time))
      .y0(y(0))
      .y1(d => y(d.value));
    
    const svg = d3.select('#chart').append("svg")
    .attr("viewBox", [0, 0, width, height]);
    svg.append("path")
    .datum(updatedValues())
    .attr("fill", "#64B5F6")
    .attr("d", area)
          
      .transition()
      .duration(2000)       
      .attr('d', (area))

      .on("start", function repeat() {
          d3.active(this)        
            .transition()
            .duration(2000)        
            .attr('d', (area(updatedValues()) ))
            .on("start", repeat);  
      });
        
    svg.append('g')
      .call(xAxis); 
    svg.append('g')
      .call(yAxis);
  }; // drawChart //

  function updatedValues() { 
    if (var_values !== undefined ) {
      return var_values.map(el => {
        return {...el, value: randomize(el.value)}
      })
    }
  };
        
  function randomize(x) {
    const abs = Math.random()*2-1;
    const multiplier = x > 0.5 ? 0.3 : 0.2;
    return (x*multiplier) * abs + x;
  };
      
  onMount(() => {
    drawChart();
  });
</script>


<!-- <div>{clientWidth}</div> -->

<div id="chart" bind:clientWidth></div>

<style>
  #chart {
    /* max-width: 640px;
    max-width: 512px; */
    min-width: 300px;
    /* margin: 0 auto 3rem; */
  }
</style>




