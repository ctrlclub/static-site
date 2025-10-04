<script lang="ts">
    import { API_URL } from "$lib/api";
    import type { ChallengeFetch, SubmissionPopup } from "$types/challenges";
    import { onMount, mount } from 'svelte';
    import MarkdownContainer from "$components/MarkdownContainer.svelte";
    import CompletenessIndicator from "$components/CompletenessIndicator.svelte";
    import SubmissionResult from "$components/SubmissionResult.svelte";
    import HintContainer from "$components/HintContainer.svelte";
    import { CollapsibleCard } from 'svelte-collapsible';
    import { goto } from "$app/navigation";

    import "$components/Globals.css";


    export let data;
    export let subchallengeResponse = "";
    export let popupData: SubmissionPopup | null = null; /*{ answerCorrect: true, feedback: "THAT IS CORRECT!", callback: handleSubmitContinue };*/

    let challengeObj: ChallengeFetch = { success: false, data: []};
    $: challengeId = "null";
    onMount(async () => {
        challengeId = data.id - 1;
        let res = await fetch(`${API_URL}/challenges/${challengeId}`, { method: "GET", headers: { "Content-Type": "application/json" }, credentials: "include"});
        let json = await res.json();
        console.log(json)
        
        data = json as ChallengeFetch;
        if(data["success"]) {
            challengeObj = data["data"];
            console.log(challengeObj)
        }

        document.addEventListener("click", (event) => {
            if(event.target.classList.contains("copy-btn")) {
                let code = event.target.previousElementSibling.querySelector("code").innerText;
                navigator.clipboard.writeText(code).then(() => {
                    event.target.innerText = "Copied!";
                    event.target.classList.add("success");
                    setTimeout(() => { event.target.innerText = "Copy Dataset"; event.target.classList.remove("success"); }, 1500);
                });
            }

            const closest = event.target.closest(".hint");
            if(event.target.classList.contains("hint") || closest) {
                closest.classList.toggle("hint-blurred");
            }
        });
    });

    async function submitAnswer(scId: number) {
        let answer = document.getElementById("answerbox-" + scId).value;
        let payload = { challengeId: challengeId, subchallengeId: scId, answer: answer };

        let res = await fetch(`${API_URL}/challenges/submit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            credentials: "include"
        });

        let result = await res.json();


        if(result.success == false) {
            let popup: SubmissionPopup = { answerCorrect: false, feedback: `Error submitting answer: ${result.errorReason}` };
            popupData = popup;
        }

        if(result.data.correct == false) {
            let popup: SubmissionPopup = { answerCorrect: false, feedback: `That's not quite right... ${result.data.userFeedback}` };
            popupData = popup;
        }

        if(result.data.correct) {
            let popup: SubmissionPopup = { answerCorrect: true, feedback: `Amazing! That's the correct answer.` };
            popupData = popup;
        }
    }


    function handleSubmitContinue() {
        window.location.reload();
    }



</script>


<div id="container">
    {#if data["success"] == true}
        <div id="card-container">
            <div id="challenge-title">
                {challengeObj["challengeName"]}
                <CompletenessIndicator current={challengeObj["subchallenges"].length - (challengeObj["subchallenges"][challengeObj["subchallenges"].length - 1].completed ? 0 : 1)} total={challengeObj["totalSubchallenges"]} />
            </div>
            {#each challengeObj["subchallenges"] as sc, index}
                <div class="card cartoon-border">
                    <CollapsibleCard open={!sc.completed || challengeObj["subchallenges"].length - 1 == sc.subchallengeId}>
                        <h2 slot='header' class="card-header" class:completed-header={sc.completed}><span>Part {sc.subchallengeId + 1}<span/><span class="completed-header">{sc.completed ? " (complete 🎉)" : ""}</span></h2>
                        <div slot='body' class="card-body">
                            <MarkdownContainer text={sc.content} inline={false} highlighting={true}/>

                            {#if !sc.completed}
                                <form class="answer-form" on:submit|preventDefault={() => submitAnswer(index) }>
                                    <input class="answer-box" id={"answerbox-" + index} type="text" name="answer" placeholder="Answer" required>
                                    <button class="cartoon-button" type="submit">Submit</button>
                                </form>
                                {subchallengeResponse}
                            {:else}
                                <form class="answer-form" on:submit|preventDefault={() => submitAnswer(index) }>
                                    <input class="answer-box success" type="text" name="answer" value={sc.answer} disabled>
                                    <button class="cartoon-button cartoon-button-disabled success" type="submit" disabled>Submitted</button>
                                </form>
                            {/if}

                            <div style="margin-bottom: 23px;"></div> <!-- spacer element -->

                        </div>
                    </CollapsibleCard>
                </div>
            {/each}
        </div>
    {:else if challengeObj["subchallenges"] && Object.keys(challengeObj["subchallenges"]).length != 0}
        <a>Error loading content: {data["errorReason"]}</a>
    {:else}
    {/if}

    <div id="back">
        <button id="back-button" class="cartoon-button" on:click={() => { goto("/challenges"); }}><svg id="back-svg" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path fill="currentColor" d="M6.325 12.85q-.225-.15-.337-.375T5.874 12t.113-.475t.337-.375l8.15-5.175q.125-.075.263-.112T15 5.825q.4 0 .7.288t.3.712v10.35q0 .425-.3.713t-.7.287q-.125 0-.262-.038t-.263-.112z"/></svg></button>
    </div>
</div>

{#if popupData}
    <SubmissionResult {...popupData} callback={handleSubmitContinue} />
{/if}


<style>
#container {
    background-color: #fff1e6;

    max-width: 100vw;
    min-height: 100vh;

    overflow-x: hidden;
}

#card-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    max-width: 100vw;

    overflow-x: hidden;
}

#challenge-title {
    font-weight: 600;
    font-size: 2em;

    margin-top: 50px;
    margin-bottom: 20px;
}

#back {
    position: fixed;
    top: 10px;
    left: 10px;
    width: 52px;
    height: 52px;
}

#back-button {
    width: 100%;
    height: 100%;

    padding: 0; margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

#back-svg {
    transform: translateX(1px);
    padding: 6px;
    transition: 0.2s;
    color: #333;
}

#back-svg:hover {
    transform: translateX(-3px);
    color: #000;
}

.card {
    margin-left: 20px;
    padding-left: 20px;
    padding-right: 20px;

    box-sizing: border-box;

    margin-top: 30px;

    border-left: 2px solid #666;

    width: 70vw;
    overflow: auto;
}

.card:last-child {
    margin-bottom: 40px;
}


.card:hover {
    border-left: 2px solid #000;
}

.card-header {
    font-size: 1.1em;

    font-family: "Roboto Mono", monospace;
    font-weight: 500;

    margin: 2px 400px 0px 0px;

    height: 60px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    outline: none;
}


.completed-header {
    color: #777;
}

.answer-form {
    padding: 5px;
}

.answer-box {
    background-color: #fafafa;

    font-family: "Roboto Mono", monospace;
    font-weight: 400;

    padding: 10px;

    border: 2px solid #111;
    border-radius: 5px;

    box-shadow:         5px 5px 0px -1px rgba(0,0,0,0.68);
    -webkit-box-shadow: 5px 5px 0px -1px rgba(0,0,0,0.68);
    -moz-box-shadow:    5px 5px 0px -1px rgba(0,0,0,0.68);

    outline: none;
    transition: 0.2s;

    cursor: pointer;
}

:global(.card-header) { transition: 0.2s; padding-bottom: 2px; }
:global(.card.open .card-header) {
    margin-bottom: -6px;
}



:global(.hint.hint-blurred > *) {
    filter: blur(8px);
}

:global(.hint) {
    cursor: pointer;
    position: relative;
    border-radius: 5px;
    border: 2px solid #999;

    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 15px;
}

:global(.hint.hint-blurred)::after {
    content: "Hint 🔓";
    background-color: #0003;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 1.3rem;
    font-weight: 600;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    pointer-events: none;
}

:global(.code-block) {
    display: flex;
    align-items: center;

    overflow-x: auto;
    overflow-y: hidden;

    width: 100%;
}

:global(.code-section) {
    width: 80%;
}

:global(.hljs) {
    border-radius: 6px;
    border: 1px solid #cacaca;
    box-shadow:
        0px 6px 16px -4px rgba(0, 0, 0, 0.06),
        0px 4px 6px -4px rgba(0, 0, 0, 0.08);
}

:global(code) {
    width: 105%;
}

:global(pre:not(.inner-code-wrapper)) {
    margin-top: -10px;
    margin-bottom: -10px;
}

:global(.inner-code-wrapper) {
    min-width: 70%;
    box-sizing: border-box;
    padding-right: 100px;
}
</style>

