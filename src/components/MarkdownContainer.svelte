<script lang="ts">
    import markdownit from "markdown-it";
    import container from "markdown-it-container";
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

    // add a custom container called "hint"
    md.use(container, "hint", {
        validate: params => {
            return params.trim().match(/^hint$/); // only ::: hint blocks
        },
        render: (tokens, idx) => {
            if (tokens[idx].nesting === 1) {
                // opening tag
                return '<div class="hint">\n';
            } else {
                // closing tag
                return '</div>\n';
            }
        }
    });

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
