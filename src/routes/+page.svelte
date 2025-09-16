<script lang="ts">
    import { base } from "$app/paths";
    import { goto } from "$app/navigation";
    import { onMount } from 'svelte';

    import { API_URL } from "$lib/api.ts";

    onMount(async () => {
        if(await isLoggedIn()) {
            goto("/challenges");
        } else {
            goto("/login");
        }
    });

    // move this to an auth "GROUP" or something, please
    async function isLoggedIn() {
        let response = await fetch(API_URL + "/auth/testsession", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        // this needs a custom entity, maybe all http requests + entities in separate lib area?
        let result = await response.json();
        return result["data"]["isLoggedIn"];
    }
</script>

<div>
</div>

<style>
    div {
        background-color: #222;

        width: 100vw;
        height: 100vh;
    }
</style>

