<script>
  export let data;
  $: console.log('IPV4', data);
  let title = 'Search';
</script>

<div class='page center'>
  <div class="row">
    <div class="title">{title}</div>
    <a href="/">back</a>
  </div>
  <p center><em>insert search here</em></p>

  <!-- <form method="POST">
    <input type="text" name='search' >
  </form> -->
</div>

<style lang='postcss'>
  .row {
    /* max-width: 30em; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0 1rem;
  }
</style>