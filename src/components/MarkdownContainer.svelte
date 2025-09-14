<script lang="ts">
    import markdownit from "markdown-it";
    import hljs from "highlight.js";
    import "highlight.js/styles/github.css"; // this style can be edited as needed

    
    let parameters: {
        text: string,
        inline: boolean,
        highlighting: boolean
    } = $props();


    // initialise md renderer
    let mdParameters = { breaks: true, };
    if(parameters.highlighting) {
        mdParameters["highlight"] = (str, lang) => {
            if (lang && hljs.getLanguage(lang) && parameters.highlighting) {
                try {
                    return hljs.highlight(str, { language: lang }).value;
                } catch (__) {}
            }
            return ""; // use external default escaping
        };
    }
    const md = markdownit(mdParameters);

    // render text to md
    let result;
    if(parameters.inline) {
        result = md.renderInline(parameters.text);
    } else {
        result = md.render(parameters.text);
    }
</script>

{#if result}
    {@html result}
{/if}
