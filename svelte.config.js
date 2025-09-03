import adapter from "@sveltejs/adapter-static";
import { resolve } from "path";


/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter({ fallback: "index.html" }),
        paths: {
            base: process.env.NODE_ENV === "production" ? "" : "",
        },
        alias: {
            $types: resolve('./src/types'),
            $lib: resolve('./src/lib')
        }
    },

};

export default config;
