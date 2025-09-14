<script lang="ts">
    import { API_URL } from "$lib/api.ts";
    import type { ChallengeFetch } from "$types/challenges";
    import { onMount } from 'svelte';
    import MarkdownContainer from "$components/MarkdownContainer.svelte";
    import { CollapsibleCard } from 'svelte-collapsible'


    export let data;

    let challengeObj: ChallengeFetch = {};
    $: challengeId = "null";
    onMount(async () => {
        challengeId = data.id;
        let res = await fetch(`${API_URL}/challenges/${data.id}`, { method: "GET", headers: { "Content-Type": "application/json" }, credentials: "include"});
        let json = await res.json();
        
        data = json as ChallengeFetch;
        if(data["success"]) {
            challengeObj = data["data"];
        }
        console.log(challengeObj)
    });

</script>

<div id="container">
    {#if data["success"] == true}
        <div>Challenge {challengeId}...</div>
        
        {#each challengeObj as sc, index}
            <div class="card">
                <CollapsibleCard open={!sc.completed}>
                    <h2 slot='header' class="card-header" class:completed-header={sc.completed}><span>Part {sc.subchallengeId + 1}<span/><span class="completed-header">{sc.completed ? " (completed)" : ""}</span></h2>
                    <div slot='body' class="card-body">
                        <MarkdownContainer text={sc.content} inline={false} highlighting={true}/>
                    </div>
                </CollapsibleCard>
            </div>
        {/each}

    {:else if Object.keys(challengeObj).length != 0}
        <a>Error loading content: {data["errorReason"]}</a>
    {:else}
        <a>Loading...</a>
    {/if}
</div>




<style>
    #container {
        background-color: #fff1e6;

        width: 100vw;
        height: 100vh;
    }

    .card {
        margin-left: 20px;
        padding-left: 20px;

        margin-top: 10px;

        border-left: 2px solid #333;
    }

    .card-header {
        font-size: 1.1em;

        font-family: "Roboto Mono", monospace;
        font-weight: 500;
        
        margin: 8px 0px 8px 0px;
    }


    .completed-header {
        text-decoration: line-through;
        color: #777;
    }
</style>
