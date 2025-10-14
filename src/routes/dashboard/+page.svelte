<script lang="ts">
    import type { LoadDashboard } from "$types/dashboard";
    import { API_URL } from "$lib/api";

    let { data }: LoadDashboard = $props();
    let challenges: ChallengeEntry[] = $state(data.content.challenges);

    let newTeamCodes = $state({});

    function addChallenge() {
        let newId = parseInt(document.getElementById("challenge-id").value);
            
        challenges.push({ challengeId: newId, visible: false, unlocked: false });
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

    async function resetUserChallenge() {
        let userId = document.getElementById("user-id-reset").value;
        let challengeId = parseInt(document.getElementById("challenge-id-reset").value);

        await fetch(`${API_URL}/dashboard/reset-challenge`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, challengeId }),
            credentials: "include"
        });
    }

    async function setUserPassword() {
        let userId = document.getElementById("user-id-password").value;
        let newPassword = document.getElementById("new-password").value;

        await fetch(`${API_URL}/dashboard/set-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, newPassword }),
            credentials: "include"
        });
    }

    async function clearTeams() {
        await fetch(`${API_URL}/dashboard/clear-teams`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });
    }

    async function genTeamCodes() {
        let number = parseInt(document.getElementById("new-team-count").value);
        let req = await fetch(`${API_URL}/dashboard/gen-team-codes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ number }),
            credentials: "include"
        });

        let res = await req.json();
        if(res.success) {
            newTeamCodes = res.data;
        }
    }

    async function testReq() {
        let number = parseInt(document.getElementById("new-team-count").value);
        let req = await fetch(`${API_URL}/dashboard/leaderboard/4`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        let res = await req.json();
        console.log(res)
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
            Submit Changes (be careful)
        </button>

        <br><br><br><br>
        <h1>Challenge Reset</h1>
        <b>REMEMBER!! Subtracting 1 from the challenge ID, they are 0-indexed</b>
        <br>
        <input id="user-id-reset" type="email" placeholder="User ID">
        <input id="challenge-id-reset" type="email" placeholder="Challenge ID">
        <button on:click={resetUserChallenge} class="">
            Reset (be careful)
        </button>

        <br><br><br><br>
        <h1>Password Reset</h1>
        <br>
        <input id="user-id-password" type="email" placeholder="User ID">
        <input id="new-password" type="text" placeholder="New Password">
        <button on:click={setUserPassword} class="">
            Update password (be careful)
        </button>

        <br><br><br><br>
        <h1>Clear Teams</h1>
        <a>Removes all team member registers, but not the team codes</a>
        <br>
        <button on:click={clearTeams} class="">
            Clear ALL teams (be careful)
        </button>
        <h1>Gen Teams</h1>
        <b>REMOVES all team member registers AND codes</b><a>, and makes new codes</a>
        <br>
        <input id="new-team-count" type="text" placeholder="Count of teams">
        <button on:click={genTeamCodes} class="">
            Clear ALL teams and gen new codes (be careful)
        </button>
        <br>
        <b>Result:</b><br>
        {#each newTeamCodes as teamCode}
            Team {teamCode.teamId} {":"} {teamCode.teamCode}<br>
        {/each}

        <button on:click={testReq} class="">
            TEST REQ
        </button>


    {:else}
        <a>Couldn't access dashboard: {data.errorReason}</a>
    {/if}

{/if}
