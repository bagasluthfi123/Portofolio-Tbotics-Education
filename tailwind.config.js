/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          // Ubah warna latar belakang utama di sini
          bg: '#031f4b', // Warna biru tua dari referensi gambar
          card: '#0A1526', // Warna kartu bisa sedikit berbeda agar kontras
          primary: '#00D1FF',
          secondary: '#FACC15',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}