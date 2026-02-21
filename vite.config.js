import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ganti 'tbotics-web' dengan nama repository GitHub Anda persis!
  base: '/Portofolio-Tbotics-Education/',
})
