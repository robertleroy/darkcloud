import adapter from '@sveltejs/adapter-auto'; 
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from "mdsvex";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.svelte.md', '.md', '.svx'],
	kit: {
		adapter: adapter()
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
