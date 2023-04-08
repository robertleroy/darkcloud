import {WEATHER_KEY} from '$env/static/private';
import { json } from '@sveltejs/kit';

import weatherData from '../dry2.json';
const local = true;


export async function GET({params}) {
  try {
    // const key = WEATHER_KEY;
    // const serachterm = params;

    // console.log(params, WEATHER_KEY);

    let weather;

    if (local) {
      weather = weatherData;
    } else {
      const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?${params.search}&units=imperial&appid=${WEATHER_KEY}`);
      weather = await res.json();
    }
    
    return json(weather) 

  } catch (error) {    
    console.log('load error:',error);
  }
}

/* One Call
https://api.openweathermap.org/data/3.0/onecall?lat=35.4662&lon=-97.5168&units=imperial&appid=826b835b9408db50ca70aa7158b06f23
*/
/* 5 day / 3 hour
api.openweathermap.org/data/2.5/forecast?lat=35.4662&lon=-97.5168&units=imperial&appid=826b835b9408db50ca70aa7158b06f23
*/

/* 35.564,-97.633 */
// import weather from '../alerts.json';
// // import weather from '../dry.json';
// export async function GET({params}) {
//   try {
//     // const key = WEATHER_KEY;
//     // const serachterm = params;
//     // console.log(params, WEATHER_KEY);

//     return json(weather) 

//   } catch (error) {    
//     console.log('load error:',error);
//   }
// }