import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: 'dashboard.html',
    },
  },
  server: {
    port: 3000,
    open: '/dashboard.html'
  }
})
