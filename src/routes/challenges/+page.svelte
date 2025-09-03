<script lang="ts">
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
<h1>challenges:</h1>
