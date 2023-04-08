<script>
  export let high, low, domain;
  let hi, lo;
  $: {
    hi = scale(high);
    lo = scale(low);
  }

  // $: console.log(lo);

  function scale(n) {
    return (n - domain[0]) / (domain[1] - domain[0])*100;
  }
</script>

<section class='RangeBar'>
  <div class="range">
    <div class="shell"
      style:left={`${lo}%`}
      style:width={`${hi-lo}%`}>
        <!-- style="left: {lo} + '%', width: {hi} - {lo} + '%'"> -->
         
      <div class="bar">
        <div class="low">{low}</div>
        <div class="high">{high}</div>
      </div>

    </div>
  </div>    
</section>

<style lang='postcss'>
  .range {
    height: 100%;
    position: relative;
    padding: 0 1.5rem 0 1rem;   
    display: grid;
    justify-content: stretch;
    /* align-items: center; */
    /* @include media(500px) {
      padding: 0 3rem;
    } */
  }
  .shell {
    display: grid;
    align-items: center;
    position: relative;
    /* margin-left: -0.75rem; */
  }
  .bar {
    position: relative;
    /* background: var(--blueGray-100); */
    background: gainsboro;
    border: 1px solid #808080;
    height: 0.75rem;
    border-radius: 0.375rem;
    box-shadow: 0 -2px 4px inset rgba(0,0,0,0.1);
    
    /* @include media (500px) {
      border-radius: 1rem;      
      height: 1.5rem;
    } */
  }
  .low, .high {
    position: absolute;
    /* font-size: 16px; */
    top: -0.5rem;
    &:after {
      content: "°";
    }
    /* @include media (500px) {
      font-size: inherit;
      top: -0.3rem;
    } */
  }
  .low { left: -2rem; }
  .high { right: -2.2rem; }
  /* @include media(500px) {
    .low { left: -2.7rem; }
    .high { right: -3rem; }
  } */
</style>