import adapter from '@sveltejs/adapter-vercel'; 
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from "mdsvex";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.svelte.md', '.md', '.svx'],
	kit: {
		adapter: adapter({
      runtime: 'edge',
    })
	},
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.svelte.md', '.md', '.svx'],
      smartypants: { dashes: 'oldschool' }
    })
  ],
};

export default config;
