import { json } from "@sveltejs/kit";
import { dev } from "$app/environment";

export async function load({ fetch, url, request }) {
  const currentRoute = await url.pathname;
  let location = {};
  let weather = {};

  // const result  = await fetch('/api/ipv4', {method: 'get'})
  // const result  = await fetch('/api/geolocate', {method: 'get'})

  // if (dev) {
  //   const locationRes = await fetch('/api/ipapi');
  //   location = await locationRes.json();
  //   getWeather();
  // } else {
  //   location = {
  //     ip: decodeURIComponent(request.headers.get('x-real-ip') ?? 'unknown'),
  //     city: decodeURIComponent(request.headers.get('x-vercel-ip-city') ?? 'unknown'),
  //     region: decodeURIComponent(request.headers.get('x-vercel-ip-country-region') ?? 'unknown'),
  //     country: decodeURIComponent(request.headers.get('x-vercel-ip-country') ?? 'unknown'),
  //     lat: decodeURIComponent(request.headers.get('x-vercel-ip-latitude') ?? 'unknown'),
  //     lon: decodeURIComponent(request.headers.get('x-vercel-ip-longitude') ?? 'unknown'),
  //   };
  //   getWeather();
  // }

  // async function result() {
  // if (dev) {
  //   const locationRes = await fetch("/api/ipapi");
  //   location = await locationRes.json();

  //   getWeather();
  // } else {
  //   location = await {
  //   ip: decodeURIComponent(request.headers.get("x-real-ip") ?? "unknown"),
  //   city: decodeURIComponent(request.headers.get("x-vercel-ip-city") ?? "unknown"),
  //   region: decodeURIComponent(request.headers.get("x-vercel-ip-country-region") ?? "unknown"),
  //   country: decodeURIComponent(request.headers.get("x-vercel-ip-country") ?? "unknown"),
  //   lat: decodeURIComponent(request.headers.get("x-vercel-ip-latitude") ?? "unknown"),
  //   lon: decodeURIComponent(request.headers.get("x-vercel-ip-longitude") ?? "unknown"),
  // };

  //   getWeather();
  // }

  // const getWeather = async () => {
  //   const weatherRes = await fetch(
  //     `/api/weather/lat=${location.lat}&lon=${location.lon}`
  //   );
  //   weather = await weatherRes.json();
  // };

  if (dev) {
    const locationRes = await fetch("/api/ip");
    location = await locationRes.json();
    // location = locationData;

    weather = getWeather(location.lat, location.lon);
  } else {
    location = json({
      ip: decodeURIComponent(request.headers.get("x-real-ip") ?? "unknown"),
      city: decodeURIComponent(request.headers.get("x-vercel-ip-city") ?? "unknown"),
      region: decodeURIComponent(request.headers.get("x-vercel-ip-country-region") ?? "unknown"),
      country: decodeURIComponent(request.headers.get("x-vercel-ip-country") ?? "unknown"),
      lat: decodeURIComponent(request.headers.get("x-vercel-ip-latitude") ?? "unknown"),
      lon: decodeURIComponent(request.headers.get("x-vercel-ip-longitude") ?? "unknown"),
    })

    weather = getWeather(location.lat, location.lon);
  }


  async function getWeather(lat, lon) {
    const weatherRes = await fetch(`/api/weather/lat=${lat}&lon=${lon}`)
    const weatherData = await weatherRes.json();
    return weatherData;
  }

  // const result = await fetch("/api/ip", { method: "get" })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     location = data;
  //     return fetch(`/api/weather/lat=${location.lat}&lon=${location.lon}`);
  //   })
  //   .then((response) => (weather = response.json()))
  //   .catch((err) => {
  //     console.error("Request failed", err);
  //   });

  return {
    currentRoute,
    location,
    weather,
  };
}
