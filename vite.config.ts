import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    cssMinify: true,
    minify: 'esbuild',
  },
  preview: {
    port: 80,
    host: '0.0.0.0'
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        rewrite: (path) => path.replace(/^\/api/, ''),
        changeOrigin: true,
        target: 'http://localhost:3000/',
      },
    },
  },
});
