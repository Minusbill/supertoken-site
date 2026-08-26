import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    host: true, // Listen on all addresses, including IPv4 (0.0.0.0) and IPv6 (::)
    port: 5173,
    strictPort: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        models: resolve(__dirname, 'models.html'),
        pricing: resolve(__dirname, 'pricing.html'),
        docs: resolve(__dirname, 'docs.html'),
        status: resolve(__dirname, 'status.html')
      }
    }
  }
});
