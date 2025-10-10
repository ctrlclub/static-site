<script lang="ts">
    import { API_URL } from "$lib/api";
    import ChallengeCard from "$components/ChallengeCard.svelte";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import TeamDialog from "$components/TeamDialog.svelte";


    let { data }: ChallengeListingResponse = $props();
    let teamDialogOpen = $state(false);

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

    function openTeamDialog() {
        teamDialogOpen = true;
    }

    function closeTeamDialog(forceReload: boolean) {
        teamDialogOpen = false;

        if(forceReload) window.location.reload();
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
                    challengeUnlocked={challenge.unlocked && (!challenge.isTeamChallenge) || (challenge.isTeamChallenge && data.myTeam != undefined)}
                    numSubchallenges={challenge.numSubchallenges}
                    completedSubchallenges={challenge.completedSubchallenges}
                    isTeamChallenge={challenge.isTeamChallenge}
                    on:click={() => { openedChallenge(challenge.challengeId, challenge.unlocked); }}
                />
            {/each}
        </div>
    {:else}
    {/if}
</div>

<button on:click={logout} class="cartoon-button logout-button"><svg id="logout-svg" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10 8V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-2"/><path d="M15 12H3l3-3m0 6l-3-3"/></g></svg></button>
{#if data.myTeam != undefined}
    <div id="static-team-panel" class="cartoon-button" on:click={openTeamDialog}>
        Team {data.myTeam.teamId}
        / Players: {data.myTeam.userIds.length}
        <svg id="static-team-svg" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 16 16"><path fill="currentColor" d="M8 2.002a1.998 1.998 0 1 0 0 3.996a1.998 1.998 0 0 0 0-3.996M12.5 3a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3m-9 0a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3M5 7.993A1 1 0 0 1 6 7h4a1 1 0 0 1 1 1v3a3 3 0 0 1-.146.927A3.001 3.001 0 0 1 5 11zM4 8c0-.365.097-.706.268-1H2a1 1 0 0 0-1 1v2.5a2.5 2.5 0 0 0 3.436 2.319A4 4 0 0 1 4 10.999zm8 0v3c0 .655-.157 1.273-.436 1.819A2.5 2.5 0 0 0 15 10.5V8a1 1 0 0 0-1-1h-2.268c.17.294.268.635.268 1"/></svg>
    </div>
{:else}
    <button on:click={openTeamDialog} class="cartoon-button team-button"><svg id="team-svg" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 16 16"><path fill="currentColor" d="M8 2.002a1.998 1.998 0 1 0 0 3.996a1.998 1.998 0 0 0 0-3.996M12.5 3a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3m-9 0a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3M5 7.993A1 1 0 0 1 6 7h4a1 1 0 0 1 1 1v3a3 3 0 0 1-.146.927A3.001 3.001 0 0 1 5 11zM4 8c0-.365.097-.706.268-1H2a1 1 0 0 0-1 1v2.5a2.5 2.5 0 0 0 3.436 2.319A4 4 0 0 1 4 10.999zm8 0v3c0 .655-.157 1.273-.436 1.819A2.5 2.5 0 0 0 15 10.5V8a1 1 0 0 0-1-1h-2.268c.17.294.268.635.268 1"/></svg></button>
{/if}

{#if teamDialogOpen}
    <TeamDialog callback={closeTeamDialog} />
{/if}

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

    .logout-button {
        position: fixed;
        top: 10px;
        left: 10px;
        width: 52px;
        height: 52px;

        padding: 0; margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .team-button {
        position: fixed;
        top: 10px;
        right: 10px;
        width: 52px;
        height: 52px;

        padding: 0; margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #team-svg {
        padding: 6px;
        transition: 0.2s;
        color: #333;
    }

    #team-svg:hover {
        transform: scale(115%);
    }

    #static-team-panel {
        position: fixed;
        right: 10px;
        top: 10px;
        height: 52px;

        padding: 0px 12px 0px 12px; margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    #static-team-svg {
        transition: 0.2s;
        color: #333;
    }

    #logout-svg {
        transform: translateX(-1px);
        padding: 6px;
        transition: 0.2s;
        color: #333;
    }

    #logout-svg:hover {
        transform: translateX(-3px);
        color: #000;
    }
</style>
