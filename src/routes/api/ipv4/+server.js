import { json } from '@sveltejs/kit';
import { publicIpv4 } from 'public-ip';

export async function GET() {
  try {  
    const ipv4 = await publicIpv4();

    const res = await fetch(`http://ip-api.com/json/${ipv4}?fields=57823`);
    const ipv4Data = await res.json();
    // console.log('IPV4', ipv4Data);

    const location = {
      city: ipv4Data?.city,
      region: ipv4Data?.region,
      regionName: ipv4Data?.regionName,
      countryCode: ipv4Data?.countryCode,
      countryName: ipv4Data?.country,
      lat: ipv4Data?.lat,
      lon: ipv4Data?.lon,
      query: ipv4Data?.query
    }

    return json(location);

  } catch (error) {
    console.log("ERROR", error);
  }

}
/*
city: "Oklahoma City"
country: "United States"
countryCode: "US"
lat: 35.42
lon: -97.5561
query: "68.15.253.59"
region: "OK"
regionName: "Oklahoma"
status: "success"
timezone: "America/Chicago"
*/