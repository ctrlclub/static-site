<script lang="ts">
    import type { SubmissionPopup } from "$types/challenges";
    import { emojiBlast } from "emoji-blast";
    import { onMount } from "svelte";
    import "$components/Globals.css";

    const CORRECT = ["Correct!", "That's right!", "Great job!"];
    const INCORRECT = ["Uh oh!", "Almost...", "So close..."];

    const CORRECT_SUB = ["Wow...", "Amazing!", "Perfect.", "Wonderful!"];
    const CORRECT_MSG = ["That's exactly right.", "That's the right answer.", "That sounds about right!"];

    const emojiConfig = {
        position: () => ({
            x: innerWidth / 2,
            y: innerHeight / 2 - 50
        }),
        physics: {
            fontSize: { 
                min: 10,
                max: 50
            },
            gravity: 0.6,
            rotationDeceleration: 0.15,
            initialVelocities: {
                rotation: {
                    max: 14,
                    min: -14
                },
                x: {
                    max: 12,
                    min: -12
                },
                y: {
                    max: -10,
                    min: -32
                }
            }
        }
    };
    
    let props: SubmissionPopup = $props();

    onMount(() => {
        if(!props.answerCorrect) {
            emojiBlast({
                emojiCount: 10,
                emojis: ["🧠", "🤔", "❌"],
                ...emojiConfig
            });
        } else {
            emojiBlast({
                emojiCount: 30,
                emojis: ["🥳", "🤯", "🧠", "⚡", "💯", "🎉", "🎈", "✨", "⭐", "✅", "🔥"],
                ...emojiConfig
            });
        }

    });

    function randomChoice(arr) {
        return arr[Math.floor(arr.length * Math.random())];
    }
</script>


<div id="background-overlay">
    <div id="container" class="cartoon-border">
        <div class="header center">
            {#if props.answerCorrect}
                <span style="font-size: 0.75em !important;">{"✅"}</span>&nbsp;<span>{randomChoice(CORRECT)}</span>
            {:else}
                <span style="font-size: 0.75em !important;">{"❌"}</span>&nbsp;<span>{randomChoice(INCORRECT)}</span>
            {/if}
        </div>

        <div class="feedback center">
            {#if props.answerCorrect}
                {randomChoice(CORRECT_SUB) + " " + randomChoice(CORRECT_MSG)}
            {:else}
                {props.feedback}
            {/if}
        </div>
        <div class="button center"><button on:click={props.callback} class="cartoon-button continue" class:gold={props.answerCorrect}>{props.answerCorrect ? "Continue" : "Try Again"}</button></div>
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

    .gold {
        background: linear-gradient(146deg,rgba(171, 95, 32, 1) 0%, rgba(171, 95, 32, 1) 41%, rgba(180, 126, 17, 1) 45%, rgba(230, 214, 110, 1) 51%, rgba(188, 136, 27, 1) 57%, rgba(171, 95, 32, 1) 62%, rgba(171, 95, 32, 1) 100%);

        background-size: 400% 400%;
        animation: scrollGradient 1.5s ease-in-out infinite;

        color: white;
    }

    @keyframes scrollGradient {
        0% {
            background-position: 0% 50%;
        }
        100% {
            background-position: 100% 50%;
        }
    }

    :global(.emoji-styles) {
        pointer-events: none;
    }
</style>

