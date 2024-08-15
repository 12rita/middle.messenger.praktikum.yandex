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
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@components': resolve(__dirname, './src/components'),
            '@pages': resolve(__dirname, './src/pages'),
            '@api': resolve(__dirname, './src/api'),
            '@shared': resolve(__dirname, './src/shared'),
            '@global': resolve(__dirname, './globalStyles.module.css')
        }
    },
    plugins: [eslint(), handlebars()],
    server: {
        port: 3000
    },
    preview: {
        port: 3000
    }
});
