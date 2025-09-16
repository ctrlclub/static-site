<script lang="ts">
    import { API_URL } from "$lib/api.ts";
    import ChallengeCard from "$components/ChallengeCard.svelte";
    import { goto } from "$app/navigation";


    export let data: ChallengeListingResponse = {};

    async function logout() {
        await fetch(API_URL + "/auth/logout", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        goto("/login");
    }

    function openedChallenge(id: string, unlocked: boolean) {
        if(!unlocked) return;

        // opening challenge
        console.log("opened challenge");
        
        goto(`/challenges/${id + 1}`);
    }
</script>

<div id="container">
    <button on:click={() => { logout(); }}> Logout </button>

    {#if data.challenges.length == 0}
        <!-- <a>Loading...</a> -->
    {:else}
        <h1>Challenges:</h1>
        <div id="card-container">
            {#each data.challenges as challenge, idx}
                <ChallengeCard
                    challengeName={challenge.name}
                    challengeId={challenge.challengeId + 1}
                    challengeUnlocked={challenge.unlocked}
                    numSubchallenges={challenge.numSubchallenges}
                    completedSubchallenges={challenge.completedSubchallenges}
                    on:click={() => { openedChallenge(challenge.challengeId, challenge.unlocked); }}
                />
            {/each}
        </div>
    {/if}
</div>

<style>
    #container {
        background-color: #fff1e6;

        width: 100vw;
        height: 100vh;

        padding-top: 100px;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #card-container {
        width: 50vw;

        display: flex;
        flex-wrap: wrap;
        flex-direction: row-reverse;
        justify-content: center;   /* horizontal centering */
        align-content: flex-start;

        gap: 15px;
    }
</style>
