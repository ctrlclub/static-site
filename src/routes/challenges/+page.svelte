<script lang="ts">
    export let data: ChallengeListingResponse = {};

    async function logout() {
        await fetch("https://ctrlclub.mqlvin.dev/auth/logout", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        window.location.href = "/login";
    }
</script>

<button on:click={() => { logout(); }}> Logout </button>
<h1>Challenges:</h1>
{#if data.challenges.length == 0}
    Loading...
{:else}
    
    {#each data.challenges as challenge}
        <div>Challenge:</div>
        <a>{challenge.name}</a>
        <br>
        <a>Stars attainable: {challenge.numSubchallenges}</a>
        <br>
        <br>
    {/each}

{/if}
