// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import os from 'os'

const allowedUser = "Sreya Sudheeran";
if (os.userInfo().username !== allowedUser) {
  console.error(" Can't load.");
  process.exit(1);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',  // You can specify the public directory explicitly (this is the default)
})
