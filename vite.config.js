import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Konfigurasi PWA & Caching Otomatis
    VitePWA({
      registerType: 'autoUpdate', // Otomatis mengupdate cache kalau ada versi website baru
      workbox: {
        // Daftar tipe file yang akan disimpan di memori HP/Laptop pengunjung (Cache)
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,mp4,webm,woff,woff2,ttf}']
      },
      manifest: {
        name: 'Tbotics Education',
        short_name: 'Tbotics',
        description: 'Jaringan Edukasi Robotika Masa Depan',
        theme_color: '#020b2d', // Warna biru navy Tbotics
        background_color: '#020b2d',
        display: 'standalone', // Membuatnya terlihat seperti aplikasi asli tanpa address bar Chrome
        icons: [
          // Opsional: Siapkan icon logo Tbotics berukuran 192x192px dan 512x512px di dalam folder "public"
          {
            src: 'Logo Bulet.jpeg',
            sizes: '192x192',
            type: 'image/jpeg'
          },
          {
            src: 'Logo Bulet.jpeg',
            sizes: '512x512',
            type: 'image/jpeg'
          }
        ]
      }
    })
  ],
  // Base path untuk GitHub Pages (JANGAN DIHAPUS)
  base: '/Portofolio-Tbotics-Education/',
})