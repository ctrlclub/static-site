<script lang="ts">
    import { API_URL } from "$lib/api";
    import { onMount } from "svelte";

    import CompletenessIndicator from "$components/CompletenessIndicator.svelte";

    let { data }: number | undefined = $props();
    let challengeLeaderboard = $state(undefined);
    let ignoredIds = $state([]); // contains list of hidden IDs


    async function updateStatus() {
        let req = await fetch(`${API_URL}/dashboard/leaderboard/${data.id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        let res = await req.json();
        console.log(res)
        
        if(res.success) {
            challengeLeaderboard = res.data;
        }
    }

    if(data.id != undefined) {
        updateStatus();
        setInterval(() => {
            updateStatus();
        }, 5000);
    }

</script>


<div id="container">

    <h1>Leaderboard</h1>

    {#if challengeLeaderboard}
        
        {#each challengeLeaderboard as i, idx}
            {#if !ignoredIds.includes(idx)}
                <div class="entry">
                    <a on:click={() => { ignoredIds.push(idx); }} class="remove">{i.teamName}</a>
                    <CompletenessIndicator current={i.complete} total={i.total} />
                </div>
            {/if}
        {/each}

    {:else}
        No leaderboard data
    {/if}
</div>





<style>
    #container {
        background-color: #fff1e6;
        background-image: radial-gradient(#00000030 1px, transparent 1px);
        background-size: 26px 26px;

        width: 100vw;
        min-height: 100vh;

        padding-top: 100px;
        padding-bottom: 100px;
        box-sizing: border-box;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h1 {
        font-weight: 600;
        font-size: 2em;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        max-width: 600px;

        background-color: #fff1e6;
        padding: 40px 80px 40px 80px;
    }

    .entry {
        display: flex;
        padding: 12px;
        gap: 15px;

        font-size: 1.5em;
        font-weight: 500;

        background-color: #fff1e6;
    }

    .remove:hover {
        cursor: pointer;
        color: #aa0000;
        transition: 0.15s;
    }
</style>
