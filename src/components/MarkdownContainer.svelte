<script lang="ts">
    import markdownit from "markdown-it";
    import container from "markdown-it-container";
    import hljs from "highlight.js";
    import "highlight.js/styles/atom-one-light.css"; // this style can be edited as needed

    
    let parameters: {
        text: string,
        inline: boolean,
        highlighting: boolean
    } = $props();


    // initialise md renderer
    let mdParameters = { breaks: true, };
    if(parameters.highlighting) {
        mdParameters["highlight"] = (str, lang) => {
            let showCopy = (lang.replace(" ", "").endsWith("+copy"));
            let realLang = showCopy ? lang.substring(0, lang.indexOf("+")) : lang;

            if (realLang && hljs.getLanguage(realLang) && parameters.highlighting) {
                try {
                    const highlighted = hljs.highlight(str, { language: realLang }).value;
                    // wrap code block with copy button
                    return showCopy ? `
                        <div class="code-block">
                        <div class="code-section"><pre class="inner-code-wrapper"><code class="hljs ${realLang}">${highlighted}</code></pre></div>
                        <button class="copy-btn cartoon-button">Copy Dataset</button>
                        </div>
                    ` : `<div class="code-block"><pre class="inner-code-wrapper"><code class="hljs ${realLang}">${highlighted}</code></pre></div>`;
                } catch (__) {}
            }
            return ""; // use external default escaping
        };
    }
    const md = markdownit(mdParameters);

    md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
        const content = tokens[idx].content;
        // wrap in a span with your class
        return `<code class="inline-code">${content}</code>`;
    };

    // add a custom container called "hint"
    md.use(container, "hint", {
        validate: params => {
            return params.trim().match(/^hint$/); // only ::: hint blocks
        },
        render: (tokens, idx) => {
            if (tokens[idx].nesting === 1) {
                // opening tag
                return '<div class="hint hint-blurred">\n';
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
        result = md.render("---\n" + parameters.text);
    }
</script>

{#if result}
    {@html result}
{/if}


<style>
    :global(code) {
        font-family: "JetBrains Mono", monospace;
        font-weight: 300;
        font-size: 0.95em;
    }

    :global(.inline-code) {
        background-color: #e7e7e7;
        padding: 2px 5px 2px 5px;
        border-radius: 4px;
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
