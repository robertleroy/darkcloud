<script>
  import List from '$lib/components/List.svelte';
  import { enhance } from '$app/forms';
  export let data;

  let title = 'Search';
  $: console.log('geoData', data);

  let saved_items, recent_items, form, saved_itemsNames, recent_itemsNames;
  let debug = true;

  function selectItem(e) {
    // const selectedItem = e.detail.item;
    // console.log('selectedItem',selectedItem);
  }
  function deleteItem(e) {
    // const list = e.detail.list;
    // const item = e.detail.item;
    // if (list === 'list_1') {
    //   saved_items = saved_items.filter(el => el !== item);
    //   $darkStore.saved_items = [...saved_items];
    // } 
    // if (list === 'list_2') {
    //   recent_items = recent_items.filter(el => el !== item);
    //   $darkStore.recent_items = [...recent_items];
    // } 
    // console.log('deleteItem', e.detail);
  };
</script>

<div class='page search_page'>
  <!-- <div class="row">
    <div class="title">{title}</div>
    <a href="/">back</a>
  </div>
  <p center><em>insert search here</em></p> -->

  <div class='header'>
    <div class="location_group">
      <div class="btn" on:keypress
          on:click={() => console.log('click')}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
          <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
        </svg>

        <!-- <Icon icon="gps" fontsize="0.875em" style="vertical-align: middle;"/> -->

      </div>
      <!-- <form on:submit|preventDefault> -->
      <form method="POST" action="?/tomtom" use:enhance>
        <input type="text" placeholder="Search" name='searchTerm'>
               <!-- on:change={addNewItem}> -->
        <input type="submit" hidden>
      </form>
      <div class="btn search" on:keypress
          on:click={() => console.log('click')}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <!-- <Icon icon="search" fontsize="0.875em" style="vertical-align: middle;"/> -->

      </div>
    </div> <!-- location_group -->
  </div> <!-- header -->
    
    {#if form?.error}
    <div class="error">{form?.message}</div>
    {/if}
 
  <!-- {#if form?.error}
    <p class="error">{form.error}</p>
  {/if} -->

<section class="lists">
  <div class="comment">Saved Locations:</div>
  <List id="list_1" bind:items={saved_items} type='dnd'
        on:deleteItem={deleteItem}
        on:selectedItem={selectItem}/>

  <div class="comment center">
    ~ drag recent searches here to save location ~    
  </div>
  <div class="comment">Recent Searches:</div>
  <List id="list_2" bind:items={recent_items} type='dnd'
        on:deleteItem={deleteItem}
        on:selectedItem={selectItem}/>

  {#if debug}
  <div class="flex">
    <span style:padding="0 1rem">
      <div>
        store.saved_items: &emsp; {saved_itemsNames}
      </div>
      <br>
      <div>
        store.recent_items: &emsp; {recent_itemsNames}
      </div>	
    </span>
  </div> <!-- flex -->
  {/if}
  
</section>

</div>

<style lang='postcss'>
  .search_page {
    top: 0;
    width: 100%;
    height: 100vh;
    z-index: 15;
    background: var(--background-color);
  }

  .error { text-align: center; }
  .page {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 20;
  }
  .header {
    padding: 0.75rem;
    box-shadow: 
    0 1px 0 var(--umbra),
    0 1px 5px var(--penumbra);
    z-index: 10;
  }
  .location_group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0 0.75em;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    
    form { flex: 1; }
    input { 
      text-align: center;
      width: 100%;
      background: #fff;
      &:focus {
        outline: 1px solid var(--active-color);
      }
    }
    svg {
      width: 1.25em;
      height: 1.25em;
      font-size: 1em; 
      line-height: 1;
      opacity: 0.6;
    }
    .btn { display: grid; plaace-items: center center; }
  }
  .lists {
    max-width: 500px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  .flex {
		display: flex;
    align-items: baseline;
    gap: 0 1ch;
    margin-top: 4rem;
	}
  .comment {
    margin-top: 1em;
    font-size: 0.75em;
    color: #999;
		padding: 0 1em;
  }
  .center {
    text-align: center;
    font-style: italic;
  }

  @media (min-width: 500px) {
    .lists { padding: 0; }
  }
</style>