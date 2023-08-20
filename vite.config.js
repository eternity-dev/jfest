import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import svgr from "vite-plugin-svgr";

import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
    build: { sourcemap: true },
    resolve: {
        alias: {
            "@/root": fileURLToPath(new URL("./", import.meta.url)),
            "@": fileURLToPath(new URL("./resources/js", import.meta.url)),
        },
    },
    plugins: [
        laravel({ input: ["resources/js/app.jsx"], refresh: true }),
        react(),
        svgr(),
    ],
});
