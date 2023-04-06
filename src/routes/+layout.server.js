import { dev } from "$app/environment";

export async function load({ fetch, url, request }) {
  const currentRoute = await url.pathname;
  let location = {};
  let weather = {};
  if (dev) {
    const locationRes = await fetch("/api/ip");
    location = await locationRes.json();
    weather = getWeather(location.lat, location.lon);
  } else {
    location = {
      ip: decodeURIComponent(request.headers.get("x-real-ip") ?? "unknown"),
      city: decodeURIComponent(request.headers.get("x-vercel-ip-city") ?? "unknown"),
      region: decodeURIComponent(request.headers.get("x-vercel-ip-country-region") ?? "unknown"),
      country: decodeURIComponent(request.headers.get("x-vercel-ip-country") ?? "unknown"),
      lat: decodeURIComponent(request.headers.get("x-vercel-ip-latitude") ?? "unknown"),
      lon: decodeURIComponent(request.headers.get("x-vercel-ip-longitude") ?? "unknown"),
    }
    weather = getWeather(location.lat, location.lon);
  }

  async function getWeather(lat, lon) {
    const weatherRes = await fetch(`/api/weather/lat=${lat}&lon=${lon}`)
    const weatherData = await weatherRes.json();
    return weatherData;
  }

  return {
    currentRoute,
    location,
    weather,
  };
}
