import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // FIX: Use '/' for Vercel, not './' (relative base causes blank page on Vercel)
  base: '/',
})
