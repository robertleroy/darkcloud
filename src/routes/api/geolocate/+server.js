import { json } from '@sveltejs/kit';
export async function GET(event) {
	const city = event.getClientAddress();
	// const city = decodeURIComponent(event.request.headers.get('x-vercel-ip-city') ?? 'unknown');
	const regionName = decodeURIComponent(event.request.headers.get('x-vercel-ip-country-region') ?? 'unknown');
	const countryCode = decodeURIComponent(event.request.headers.get('x-vercel-ip-country') ?? 'unknown');
	const lat = decodeURIComponent(event.request.headers.get('x-vercel-ip-latitude') ?? 'unknown');
	const lon = decodeURIComponent(event.request.headers.get('x-vercel-ip-longitude') ?? 'unknown');
	const query = event.getClientAddress();

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
}

