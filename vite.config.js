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
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTest.js"
  }
})
