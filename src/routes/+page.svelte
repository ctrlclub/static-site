<script lang="ts">
    import { goto } from "$app/navigation";

    let { data }: {success: boolean, redirect: string, errorReason: string} = $props();
    if(data.success) {
        goto(data.redirect);
    }
</script>

<div>
    {#if data}
        {#if !data.success}
            <a>{data.errorReason}</a>
        {/if}
    {/if}
</div>

<style>
    div {
        background-color: #222;
        color: white;

        display: flex;
        justify-content: center;
        align-items: center;

        width: 100vw;
        height: 100vh;
    }
</style>

