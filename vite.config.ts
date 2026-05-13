import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        rewards: resolve(__dirname, 'rewards.html'),
        support: resolve(__dirname, 'support.html'),
        download: resolve(__dirname, 'download.html'),
        company: resolve(__dirname, 'company.html'),
      }
    }
  }
});
