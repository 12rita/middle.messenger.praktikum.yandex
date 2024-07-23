import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
    root: resolve(__dirname, 'src'),
    build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                index: resolve(__dirname, './src/index.html')

            }
        }
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
    },
    preview: {
        port: 3000
    }
});
