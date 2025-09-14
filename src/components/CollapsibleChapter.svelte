<script>
  import { onMount } from 'svelte';
  import { collapse } from 'svelte-collapse';

  export let subheading = '';
  export let openByDefault = false;
  let content;

  onMount(() => {
    if (content) {
      collapse(content, { open: openByDefault });
    }
  });

  const toggle = () => {
    if (content) {
      collapse(content, { open: !openByDefault });
    }
  };
</script>

<div class="collapsible">
  <div class="header" on:click={toggle}>
    <span>{subheading}</span>
    <slot name="arrow"></slot>
  </div>
  <div bind:this={content} class="content">
    <slot></slot>
  </div>
</div>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }

  .content {
    overflow: hidden;
    padding: 0.5rem 0;
  }
</style>

