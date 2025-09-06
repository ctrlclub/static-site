<script lang="ts">
    export let data = {};
</script>

{#if data["success"] == true}
    <div>Challenge {data.id}</div>
{:else}
    You must sign in to access challenges.
{/if}
