import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";
import eslint from "vite-plugin-eslint";
export default defineConfig({
  build: {
    outDir: resolve(__dirname, "dist"),
  },
  plugins: [eslint(), handlebars()],
  server: {
    port: 3000,
  },
});
