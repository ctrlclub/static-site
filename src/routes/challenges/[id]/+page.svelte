<script lang="ts">
    import { API_URL } from "$lib/api";
    import type { ChallengeFetch } from "$types/challenges";
    import { onMount } from 'svelte';
    import MarkdownContainer from "$components/MarkdownContainer.svelte";
    import { CollapsibleCard } from 'svelte-collapsible';
    import { goto } from "$app/navigation";


    export let data;
    export let subchallengeResponse = "";

    let challengeObj: ChallengeFetch = {};
    $: challengeId = "null";
    onMount(async () => {
        challengeId = data.id - 1;
        let res = await fetch(`${API_URL}/challenges/${challengeId}`, { method: "GET", headers: { "Content-Type": "application/json" }, credentials: "include"});
        let json = await res.json();
        
        data = json as ChallengeFetch;
        if(data["success"]) {
            challengeObj = data["data"];
        }

        console.log(challengeObj)
    });

    async function submitAnswer(scId: number) {
        let answer = document.getElementById("answerbox-" + scId).value;
        let payload = { challengeId: challengeId, subchallengeId: scId, answer: answer };

        let res = await fetch(`${API_URL}/challenges/submit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            credentials: "include"
        });

        let result = await res.json();
        console.log(result)
        if(result.success == false) {
            subchallengeResponse = "Error submitting answer: " + result.errorReason;
            return;
        }

        if(result.data.correct == false) {
            subchallengeResponse = "That's not quite right: " + result.data.userFeedback;
            return;
        }

        if(result.data.correct) {
            // refresh page? maybe

        }
    }

</script>

<div id="container">
    {#if data["success"] == true}
        <div>Challenge {challengeId + 1}...</div>
        
        {#each challengeObj as sc, index}
            <div class="card">
                <CollapsibleCard open={!sc.completed || challengeObj.length - 1 == sc.subchallengeId}>
                    <h2 slot='header' class="card-header" class:completed-header={sc.completed}><span>Part {sc.subchallengeId + 1}<span/><span class="completed-header">{sc.completed ? " (complete 🎉)" : ""}</span></h2>
                    <div slot='body' class="card-body">
                        <MarkdownContainer text={sc.content} inline={false} highlighting={true}/>

                        {#if !sc.completed}
                            <form on:submit|preventDefault={() => submitAnswer(index) }>
                                <input id={"answerbox-" + index} type="text" name="answer" placeholder="Answer" required>
                                <button type="submit">Submit</button>
                            </form>
                            {subchallengeResponse}
                        {/if}

                    </div>
                </CollapsibleCard>
            </div>
        {/each}

    {:else if Object.keys(challengeObj).length != 0}
        <a>Error loading content: {data["errorReason"]}</a>
    {:else}
        <!-- <a>Loading...</a> -->
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

        border-left: 2px solid #666;

        max-width: 60vw;
        overflow: auto;
    }

    .card:hover {
        border-left: 2px solid #000;
    }

    .card-header {
        font-size: 1.1em;

        font-family: "Roboto Mono", monospace;
        font-weight: 500;
        
        margin: 8px 0px 8px 0px;
    }


    .completed-header {
        color: #777;
    }

    :global(.hint) {
        filter: blur(4px);
        cursor: pointer;
    }
    :global(.hint:hover) {
        filter: none;
    }
</style>
