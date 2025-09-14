<script lang="ts">
    let parameters: {
        current: number,
        total: number,
    } = $props();

    console.log(parameters.total)
</script>

<div id="container">
    {#each [...Array(parameters.total).keys()] as i}
        <a class:not-complete={parameters.current <= i}>⭐</a>
    {/each}
</div>

<style>
    #container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .not-complete {
        filter: saturate(0%);
    }
</style>
