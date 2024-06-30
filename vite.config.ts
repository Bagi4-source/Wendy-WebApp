import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Wendy-WebApp/",
  build: {
    cssMinify: true,
    minify: 'esbuild',
  },
  plugins: [react()],
});
