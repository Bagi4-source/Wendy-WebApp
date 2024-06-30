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
  },
  plugins: [react()],
});
