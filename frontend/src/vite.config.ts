import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    resolve: {
        alias: {
            '@assets': path.join(__dirname, './src/assets'),
            '@app': path.join(__dirname, './src/app'),
            '@components': path.join(__dirname, './src/components'),
            '@constants': path.join(__dirname, './src/constants'),
            '@enums': path.join(__dirname, './src/enums'),
            '@features': path.join(__dirname, './src/features'),
            '@hooks': path.join(__dirname, './src/hooks'),
            '@interfaces': path.join(__dirname, './src/interfaces'),
            '@layout': path.join(__dirname, './src/layout'),
            '@theme': path.join(__dirname, './src/theme'),
            '@types': path.join(__dirname, './src/types'),
            '@utils': path.join(__dirname, './src/utils'),
        }
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
