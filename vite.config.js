import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        company: resolve(__dirname, 'company.html'),
        rewards: resolve(__dirname, 'rewards.html'),
        support: resolve(__dirname, 'support.html'),
        download: resolve(__dirname, 'download.html')
      }
    }
  }
});
