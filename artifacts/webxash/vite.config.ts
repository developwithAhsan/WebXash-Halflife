import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import path from 'node:path';

const port = Number(process.env.PORT || 3000);
const basePath = process.env.BASE_PATH || '/';

export default defineConfig({
  base: basePath,
  plugins: [vue()],
  resolve: {
    alias: { '/@': path.resolve(import.meta.dirname, 'src') },
  },
  root: path.resolve(import.meta.dirname),
  build: { outDir: path.resolve(import.meta.dirname, 'dist/public'), emptyOutDir: true },
  server: { port, strictPort: true, host: '0.0.0.0', allowedHosts: true },
  preview: { port, host: '0.0.0.0', allowedHosts: true },
});
