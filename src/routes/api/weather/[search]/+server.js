import {WEATHER_KEY} from '$env/static/private';
import { json } from '@sveltejs/kit';


export async function GET({params}) {
  try {

    // console.log(`https://api.openweathermap.org/data/3.0/onecall?${params.search}&units=imperial&appid=${WEATHER_KEY} `);

    // const key = WEATHER_KEY;
    // const serachterm = params;

    // console.log(params, WEATHER_KEY);

    const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?${params.search}&units=imperial&appid=${WEATHER_KEY}`);
    const weather = await res.json();

    return json(weather) 

  } catch (error) {    
    console.log('load error:',error);
  }
}

/*
https://api.openweathermap.org/data/3.0/onecall?lat=35.4662&lon=-97.5168&units=imperial&appid=826b835b9408db50ca70aa7158b06f23
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