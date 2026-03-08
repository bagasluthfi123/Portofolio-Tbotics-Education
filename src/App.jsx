import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar/Navbar';
import SpaceBackground from './components/Background/SpaceBackground';
import Home from './components/Home/Home';
import About from './components/About/About';
import Roadmap from './components/Roadmap/Roadmap';
import Programs from './components/Programs/Programs';
import Contact from './components/Contact/Contact';
import Loading from './components/Loading/Loading';

// TAMBAHAN: Import halaman detail yang baru saja kita buat
// (Pastikan path foldernya sesuai dengan letak file ProgramDetail.jsx kamu)
import ProgramDetail from './components/Programs/ProgramDetail';

// Membuat komponen wrapper untuk Halaman Utama (Landing Page)
const LandingPage = () => (
  <main>
    <Home />
    <About />
    <Programs />
    {/* <Roadmap /> */}
    <Contact />
  </main>
);

function App() {
  // State untuk mengontrol layar loading
  const [isLoading, setIsLoading] = useState(true);

  // Mengatur timer loading saat website pertama kali dibuka
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <div className="relative w-full">

        {/* Render komponen Loading dengan AnimatePresence */}
        <AnimatePresence mode="wait">
          {isLoading && <Loading key="loading" />}
        </AnimatePresence>

        <SpaceBackground />

        <Navbar />

        {/* --- INI BAGIAN PALING PENTING: PENGATURAN ROUTER --- */}
        <Routes>

          {/* Rute untuk halaman utama (gabungan semua section) */}
          <Route path="/" element={<LandingPage />} />

          {/* Rute dinamis untuk halaman detail program (menangkap ID) */}
          <Route path="/program/:id" element={<ProgramDetail />} />

          {/* --- TAMBAHKAN BARIS INI (RUTE PENYELAMAT) --- */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <footer className="py-6 text-center text-gray-500 border-t border-white/10 relative z-10 bg-space-bg">
          <p>&copy; {new Date().getFullYear()} Tbotics Education. Memberdayakan Generasi Inovator.</p>
        </footer>
      </div>
    </ReactLenis>
  );
}

export default App;