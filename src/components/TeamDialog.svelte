<script lang="ts">
    import { API_URL } from "$lib/api";
    import type { MyTeamRequest, MyTeam } from "$types/teams";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import "$components/Globals.css";

    import { slide, fade, fly } from "svelte/transition";
    import { cubicInOut } from "svelte/easing";

    let props: { callback: (() => {}) } = $props();
    let inTeam: boolean = $state(false);
    let teamData: MyTeam | undefined = $state(undefined);

    let userResponse = $state("");

    (async () => { let teamRes = await fetch(`${API_URL}/teams/myteam`, { method: "GET", headers: { "Content-Type": "application/json" }, credentials: "include"});
        let teamResponse: MyTeamRequest = await teamRes.json();
        if(teamResponse.success == false && teamResponse.errorReason == "Not in team") {
            inTeam = false;
            teamData = undefined;
        } else if(teamResponse.success) {
            inTeam = true;
            teamData = teamResponse.data;
        }
    })();

    
    async function confirmAction() {
        if(inTeam) {
            let leaveReq = await fetch(`${API_URL}/teams/leave`, { method: "GET", headers: { "Content-Type": "application/json" }, credentials: "include"});
            props.callback(true);
            return;
        }

        // otherwise, they're joining a team
        let teamCode = document.getElementById("team-code").value;
        if(!teamCode) return;

        try {
            teamCode = parseInt(teamCode);
        } catch(ex) {
            userResponse = "Invalid team code";
            return;
        }

        let joinReq = await fetch(`${API_URL}/teams/register`, { method: "POST", body: JSON.stringify({ teamCode }), headers: { "Content-Type": "application/json" }, credentials: "include"});
        let joinRes = await joinReq.json();

        if(!joinRes.success) {
            userResponse = joinRes.errorReason;
            return;
        }

        props.callback(true);
    }
</script>


<div id="background-overlay" transition:fade={{easing: cubicInOut, timing: 100}}>
    <div id="container" class="cartoon-border" transition:fly={{easing: cubicInOut, timing:125, y:300}}>
        <div class="button close-button"><button on:click={() => { props.callback(false); }} class="cartoon-button" style="font-weight: 600;">X</button></div>
        <div class="header center">
            <span>Team Manager</span>
        </div>

        <div class="feedback center">
            {#if inTeam}
                <a>Would you like to leave your current team?</a>
            {:else}
                <div>
                    <a>Enter your team code: </a>
                    <br>
                    <input type="number" id="team-code" placeholder="Team Code" class="cartoon-input input-spacer">
                </div>
            {/if}
        </div>
        <a style="display: block; width: 100%; text-align: center; color: red; font-size: 0.8em;">{userResponse}</a>
        <div class="button center"><button on:click={confirmAction} class="cartoon-button continue">{inTeam ? "Leave Team" : "Join Team"}</button></div>
    </div>
</div>



<style>
    #background-overlay {
        background-color: #000000a0;
        width: 100vw;
        height: 100vh;

        position: fixed;
        top: 0; 
        left: 0;

        z-index: 98;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    #container {
        width: 500px;
        height: 320px;

        padding: 10px;

        position: relative;
    }

    .header {
        font-size: 1.7em;
        font-weight: 600;
    }

    .center {
        width: 100%;
        height: 33%;

        text-align: center;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .continue {
        width: 130px;
        height: 40px;

        color: black;
        font-weight: 600;

        padding-bottom: 28px;
    }

    .input-spacer {
        padding: 6px;
        margin-top: 5px;
    }

    .close-button {
        width: 5px;
        height: 5px;

        position: absolute;
        right: 50px;
    }
</style>

