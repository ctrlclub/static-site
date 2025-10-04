<script lang="ts">
    import type { LoadDashboard } from "$types/dashboard";
    import { API_URL } from "$lib/api";

    let { data }: LoadDashboard = $props();
    let challenges: ChallengeEntry[] = $state(data.content.challenges);

    function addChallenge() {
        let newId = parseInt(document.getElementById("challenge-id").value);
            
        challenges.push({ challengeId: newId, visible: false, unlocked: false });

        console.log(challenges)
    }

    function removeChallenge(challengeId: number) {
        challenges = challenges.filter(c => c.challengeId != challengeId);
    }

    async function submitChallengeChanges() {
        await fetch(`${API_URL}/dashboard/challenges`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(challenges),
            credentials: "include"
        });
    }
</script>

<!-- Use the data in template -->
{#if data}

    {#if data.success}

        
        <h1>Challenge Manager</h1>
        {#each challenges as challenge}
            <div>
                <span>ID: {challenge.challengeId}</span>

                <label>
                    <input type="checkbox" bind:checked={challenge.visible} />
                    Visible
                </label>

                <label>
                    <input type="checkbox" bind:checked={challenge.unlocked} />
                    Unlocked
                </label>

                <button on:click={() => { removeChallenge(challenge.challengeId) }}>x</button>
            </div>
        {/each}
        <input id="challenge-id" type="number" placeholder="New ID">
        <button on:click={addChallenge} class="">
            + Add Challenge
        </button>
        <button on:click={submitChallengeChanges} class="">
            SUBMIT CHANGES
        </button>


    {:else}
        <a>Couldn't access dashboard: {data.errorReason}</a>
    {/if}

{/if}
