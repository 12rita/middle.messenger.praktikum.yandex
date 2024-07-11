import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import eslint from 'vite-plugin-eslint';
// import handlebars from "./vite-precompile.js";

export default defineConfig({
    build: {
        outDir: resolve(__dirname, 'dist')
    },
    plugins: [
        eslint(),
        handlebars({
            context: {},
            partialDirectory: resolve(__dirname, 'src/partials')
        })
    ],
    server: {
        port: 3000
    }
});
