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
        console.log("opened cha;llenge");
        
        goto(`/challenges/${id + 1}`);
    }
</script>

<div id="container">
{#if data.challenges.length == 0}
    <!-- <a>Loading...</a> -->
{:else}
    <button on:click={() => { logout(); }}> Logout </button>
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
    }

    #card-container {
        width: 50vw;
        margin-left: 200px;

        border: 1px solid #efe1d6;
        
        display: flex;
        flex-wrap: wrap;
        flex-direction: row-reverse;
        justify-content: center;   /* horizontal centering */
        align-content: flex-start;

        gap: 15px;
    }
</style>
