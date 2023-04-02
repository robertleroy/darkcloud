/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {

  const res  = await fetch('api/ipv4');
  const ipv4 = await res.json()

  return { ipv4 };
};

