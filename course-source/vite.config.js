import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' produces relative asset paths so the build works regardless of
// what subfolder it's served from on GitHub Pages.
export default defineConfig({
  plugins: [react()],
  base: './',
})
