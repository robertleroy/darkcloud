<!-- $lib/components/icon/Icon.svelte -->
<!-- <WeatherIcon icon="thunderstorm" fontsize="2em"/> -->
<script>
	import {icons} from './weatherIcons.js';
	export let icon = icons[0].tag;
	export let fontsize = '1.5em';	
	$: svg = icons.find(el => el.tag.includes(icon)) ?? icons[0].tag;
</script>

<svg class="weatherIcon" style="font-size: {fontsize}"
		 xmlns="http://www.w3.org/2000/svg"
		 viewBox="0 0 24 24">
	<defs>{@html svg.defs}</defs>
	<g>{@html svg.path}</g>
	<slot /> 
</svg>

<style lang='postcss'>
	svg {
		display: inline-grid;
		place-items: center center;
		height: 2em; width: 2em;
		font-size: 1rem; user-select: none;
    vertical-align: top;
		/* 		filter: drop-shadow(0.05em 0.05em 0.05em hsla(211, 0%, 10%, 0.2)); */
	}
</style>
