import { json } from "@sveltejs/kit";

export async function GET() {
  try {
    const getIp = await fetch("http://ip-api.com/json?fields=57855");
    const ipData = await getIp.json();

    const location = await {
      ip: ipData?.query,
      city: ipData?.city,
      region: ipData?.region,
      country: ipData?.countryCode,
      lat: ipData?.lat,
      lon: ipData?.lon,
    };

    return json(location);
  } catch (error) {
    console.log("load error:", error);
  }
}

// 35.4662,-97.5168
// 35.4662,-97.5168

// const location = {
//   ip: "107.207.41.105"
//   city: "Oklahoma City"
//   region: "OK"
//   country: "US"
//   lat: 35.4662
//   lon: -97.5168
// } 