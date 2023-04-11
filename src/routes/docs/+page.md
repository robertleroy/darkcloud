<script>
  
</script>

<div class='page'>  
  Open Weather &nbsp; &nbsp; <a href="https://home.openweathermap.org/"> <small>link</small></a>
    
  <br><br>
  

#### Todo  

- Search
  - form actions
  - tomtom
  - database
- Days
  - add hours to accordion - 5-day / 3-hour call
  - ~~fix media queries / bar width~~
- Page  
  - day_summary  
  - week_summary  
  - ~~remove background color~~  
- Hours
  - rain start & stop
  - ~~fix inch / hr~~
- Map
  - ~~map - windy~~


  <br><br>

  Api Call
  ``` js    
  /*
  https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&units=imperial&appid={API_KEY_} 
  */ 

  ```

  <br><br>

### [Fontsource](https://fontsource.org/docs/getting-started)
install font

``` sh
npm i @fontsource/lato
npm i @fontsource/source-serif-pro
```  

import into `+layout.svelte`
``` svelte
<!-- +layout.svelte -->
import "@fontsource/lato"
import "@fontsource/source-serif-Pro"
```
*QED*
``` css
font-family: 'Lato', sans-serif;
font-family: 'Source Serif Pro', serif;
```

</div>

<style lang='postcss'>

  .page {
    position: relative;
    top: calc(var(--header-height) + 1rem);
    width: 90%;
    max-width: 960px;
    padding: 0 0 calc(var(--footer-height) + 1rem);
    margin: 0 auto;
  }
</style>