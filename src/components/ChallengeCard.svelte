<script lang="ts">
    import CompletenessIndicator from "$components/CompletenessIndicator.svelte";

    import { createEventDispatcher } from "svelte"; // propgate click events to parent
    const dispatch = createEventDispatcher();

    function clicked() {
        dispatch("click");
    }

    let parameters: {
        challengeName: string,
        challengeId: number,
        challengeUnlocked: boolean,
        numSubchallenges: number,
        completedSubchallenges: number,
    } = $props();

    let isHovered = false;
</script>


<div id="container" class:card-locked={!parameters.challengeUnlocked} on:click={clicked}>
    <div id="card-header">
        <a id="challenge-id">Challenge {parameters.challengeId}</a>
        <a id="challenge-unlocked-indicator" class:locked-status={!parameters.challengeUnlocked}>●</a>
    </div>

    <div id="card-body">
        <a id="challenge-name">{parameters.challengeName}</a>
    </div>

    <div id="card-footer">
        <CompletenessIndicator current={parameters.completedSubchallenges} total={parameters.numSubchallenges} />
    </div>
</div>


<style>
    #container {
        background-color: white;
        
        width: 290px;
        height: 110px;

        border: 2px solid #333;
        border-radius: 5px;

        -webkit-box-shadow: 0px 10px 24px -13px rgba(107, 74, 51, 0.65);
        -moz-box-shadow: 0px 10px 24px -13px rgba(107, 74, 51, 0.65);
        box-shadow: 0px 10px 24px -13px rgba(107, 74, 51, 0.65);

        padding: 8px 12px 8px 12px;

        display: flex;
        flex-direction: column;

        transition: 0.2s;
        user-select: none;
    }

    .card-locked {
        filter: brightness(75%) saturate(80%);
    }

    #container:not(.card-locked):hover {
        cursor: pointer;
        transform: translateY(-5px);
    }

    #container.card-locked {
        cursor: not-allowed;
    }

    #container:not(.card-locked):hover #challenge-name {
        color: #000000 !important;
        font-weight: 500;
    }


    #card-header {
        width: 100%;
        height: 22px;
        
        font-size: 0.8em;
        font-weight: 600;

        display: flex;
        justify-content: space-between;
        align-items: center;

    }

    #challenge-id {
        font-size: 0.8em;
        font-weight: 700;
        opacity: 0.4;
    }

    #challenge-unlocked-indicator {
        transform: translateY(-3px);
        color: #5BEB52;
        text-shadow: 0px 0px 5px #5BEB52;
    }

    .locked-status {
        color: red !important;
        text-shadow: 0px 0px 5px #ff000080 !important;
    }

    #card-body {
        flex-grow: 1;

        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    #challenge-name {
        font-size: 1.1em;
        font-weight: 400;

        color: #333333;
        transition: 0.1s;
    }

    #card-footer {
        height: 20px;
        margin-bottom: 5px;
    }
</style>
