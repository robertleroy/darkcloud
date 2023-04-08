<script>
	import { slide } from "svelte/transition";
	// import { cubicInOut } from 'svelte/easing';	
	let isOpen = false;
</script>


<div class="accordion" >
	<div class="header" on:keypress on:click={() => isOpen = !isOpen}>
		<slot name="header"/>
	</div>
	
	{#if isOpen}
	<div class="body" transition:slide={{ duration: 300}}>
		<slot/>
	</div>
	{/if}
</div>


<style lang='postcss'>
	.accordion { 
    --radius: 0;
    --header-font-size: inherit;
    --body-font-size: inherit;
    --seperator: none;     
    &:not(:last-of-type) { border-bottom: 1px solid #cccccc55; }
  }

	.header {
    padding: 0.5rem 0;
		cursor: pointer; 
	}
  
	.body {
		padding: 0.5rem 2rem 1rem;
	}
</style>