import { json } from '@sveltejs/kit';



export async function GET() {
  try {
    const getIp = await fetch('http://ip-api.com/json?fields=57855');
    const ipData = await getIp.json();
    
    const location = {
      city: ipData?.city,
      region: ipData?.region,
      regionName: ipData?.regionName,
      postalCode: ipData?.zip,
      countryCode: ipData?.countryCode,
      countryName: ipData?.country,
      lat: ipData?.lat,
      lon: ipData?.lon,
    }
    
    return json(location);

  } catch (error) {    
    console.log('load error:',error);
  }
};




// export function GET() {

//   const location = {
//     city: "Oklahoma City",
//     region: "OK",
//     regionName: "Oklahoma",
//     postalCode: "73142",
//     countryCode: "US",
//     countryName: "United States",
//     timezone: "America/Chicago",
//     lat: 35.5999,
//     lon: -97.6243
//   } 
  
// 	return json(location);
// };