<script lang="ts">
    import { API_URL } from "$lib/api";
    import ChallengeCard from "$components/ChallengeCard.svelte";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";


    let { data }: ChallengeListingResponse = $props();

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
        goto(`/challenges/${id + 1}`);
    }
</script>

<div id="container">
    {#if data.success}
        <div id="header">
            <h1>Challenges</h1>
            <a id="description">Test your knowledge with code challenges, designed to teach your skills related to your NEA. Dive into easy, medium or hard challenges based on your preference.</a>
        </div>
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
    {:else}
    {/if}
</div>

<style>
    #container {
        background-color: #fff1e6;
        background-image: radial-gradient(#00000030 1px, transparent 1px);
        background-size: 26px 26px;

        width: 100vw;
        height: 100vh;

        padding-top: 100px;
        box-sizing: border-box;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #card-container {
        width: 50vw;
        margin-top: 20px;

        display: flex;
        flex-wrap: wrap;
        flex-direction: row-reverse;
        justify-content: center;   /* horizontal centering */
        align-content: flex-start;

        gap: 15px;
    }

    #header {
        font-weight: 600;
        font-size: 1.3em;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        max-width: 600px;

        background-color: #fff1e6;
        padding: 10px 60px 30px 60px;
    }

    #description {
        font-weight: 400;
        font-size: 0.8em;

        text-align: center;
    }
</style>
