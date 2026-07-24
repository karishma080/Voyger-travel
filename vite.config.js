import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        destination: 'destination.html',
        planner: 'trip-planner.html',
        hotels: 'hotels.html',
        flights: 'flights.html',
        about: 'about.html',
        contact: 'contact.html',
        profile: 'profile.html',
        dashboard: 'dashboard.html'
      }
    }
  },
  server: {
    port: 3000,
    open: '/index.html'
  }
})

