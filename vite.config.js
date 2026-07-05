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
  base: '/keshav-enterprises/',  // ← Must match your GitHub Pages repo name (keshav2169.github.io/keshav-enterprises/)
              // If you later move to a custom domain (root deploy), change this back to '/'
  plugins: [
    react(),
    tailwindcss(),
  ],
})
