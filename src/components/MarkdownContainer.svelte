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
            let showCopy = (lang.replace(" ", "").endsWith("+copy"));
            console.log(showCopy)
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
