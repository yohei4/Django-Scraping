import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    resolve: {
        alias: [
            { find: "@/", replacement: path.join(__dirname, './src/')},
        ],
    },
    plugins: [
        react(),
    ],
    server: {
        host: true,
        port: 3000,
        hmr: {
            host: 'localhost',
        },
    },
});
