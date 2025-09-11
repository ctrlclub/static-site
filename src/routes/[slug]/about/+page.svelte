<script lang="ts">
    import { API_URL } from "$lib/api.ts";

    export let data = {};

    async function signIn() {
        await fetch(API_URL + "/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "username": "hello", "password": "pass"}),
            credentials: "include"
        });
    }

    async function logOut() {
        await fetch(API_URL + "/auth/logout", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });
    }

</script>
{#if data != 0}
    <h1>About: {data.ip} -- {data.slug}</h1>
{/if}
<p>Reload this page. You should see the same content.</p>
<p>View the page source: the HTML is pre-rendered.</p>
<button on:click={() => { signIn(); }}>Sign In</button>
<button on:click={() => { logOut(); }}>Log Out</button>
