import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // NOTE: base path should match your deployment location
  // - Root level:  base: '/'               → https://www.keshavturbotech.com/
  // - Subpath:     base: '/keshav-enterprises/' → https://www.keshavturbotech.com/keshav-enterprises/
  //
  // For www.keshavturbotech.com (root domain), use: base: '/'
  // UNLESS you want the site in a subpath, in which case keep the current setting
  base: '/',  // ← CHANGED: Was '/keshav-enterprises/' — Update if different
  plugins: [
    react(),
    tailwindcss(),
  ],
})
