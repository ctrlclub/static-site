<script lang="ts">
    import { CollapsibleCard } from 'svelte-collapsible';
    import MarkdownContainer from "$components/MarkdownContainer.svelte";

    export let text;
</script>




<CollapsibleCard open={false}>
    <h2 slot='header' class="card-header"><span>Hint<span/></h2>
    <div slot='body' class="card-body">
        <MarkdownContainer text={text} inline={false} highlighting={true}/>
    </div>
</CollapsibleCard>

