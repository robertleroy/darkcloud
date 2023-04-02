/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch, url }) {

  const currentRoute = await url.pathname;
  let location = {}, weather = {};

  const result  = await fetch('/api/ipv4', {method: 'get'})
    .then(response  => response .json())
    .then(data => {
      location = data;
      return fetch(`/api/weather/lat=${location.lat}&lon=${location.lon}`)
    })
    .then(response  => weather = response .json())
    .catch(err => {
      console.error('Request failed', err)
    })

    return {
      currentRoute, location, weather
    };
}