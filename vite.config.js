import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: '/src',
    }
  },
  server: {
    proxy: {
      '/auth': 'http://127.0.0.1:3000', // Proxy /auth calls to backend
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTest.js"
  }
})
