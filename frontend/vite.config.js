// vite.config.js
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',  // You can specify the public directory explicitly (this is the default)
  server: {
    proxy: {
      '/api': {
        target: 'https://prachiti24-nyayadeep.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})
