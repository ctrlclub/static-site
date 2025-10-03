<script lang="ts">
    import type { SubmissionPopup } from "$types/challenges";
    import { emojiBlast } from "emoji-blast";
    import { onMount } from "svelte";

    const CORRECT = ["Correct!", "That's right!", "Great job!"];
    const INCORRECT = ["Uh oh!", "Almost...", "So close..."];
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
                emojiCount: 50,
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
    <div id="container">
        <div class="header center">
            {#if props.answerCorrect}
                <span style="font-size: 0.85em !important;">{"✅"}</span>&nbsp;<span>{randomChoice(CORRECT)}</span>
            {:else}
                <span style="font-size: 0.85em !important;">{"❌"}</span>&nbsp;<span>{randomChoice(INCORRECT)}</span>
            {/if}
        </div>

        <div class="feedback center">
            {props.feedback}
        </div>
        <div class="button center"><button on:click={props.callback} class="continue">{props.answerCorrect ? "Continue" : "Try Again"}</button></div>
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

        background: repeating-linear-gradient(
            45deg,
            #f0f0f0,
            #f0f0f0 20px,
            #f4f4f4 20px,
            #f4f4f4 40px
        );

        padding: 10px;

        border-radius: 5px;
        border: 2px solid #222;
        box-shadow:
            0px 9px 21px -7px rgba(0, 0, 0, 0.19),
            0px 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .header {
        font-size: 1.5em;
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

    button:hover {
        cursor: pointer;
        background-color: #00000020;
    }

    .continue {
        width: 100px;
        height: 40px;

        border-radius: 5px;
        transition: 0.2s;
    }
</style>
