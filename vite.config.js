import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
    root: resolve(__dirname, 'src'),
    publicDir: resolve(__dirname, 'static'),
    build: {
        outDir: resolve(__dirname, 'dist'),
        rollupOptions: {
            input: {
                index: resolve(__dirname, './index.html'),
                signIn: resolve(
                    __dirname,
                    './src/pages/signIn/SignInPage.html'
                ),
                signUp: resolve(
                    __dirname,
                    './src/pages/signUp/SignUpPage.html'
                ),
                404: resolve(__dirname, './src/pages/404/404.html'),
                500: resolve(__dirname, './src/pages/500/500.html'),
                profile: resolve(__dirname, './src/pages/profile/Profile.html'),
                changePassword: resolve(
                    __dirname,
                    './src/pages/profile/ChangePassword.html'
                ),
                chats: resolve(__dirname, './src/pages/chats/Chats.html')
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
    }
});
