import React, { useState, useEffect } from 'react'; // TAMBAHAN: Import useEffect
import { ReactLenis } from 'lenis/react';
import { AnimatePresence } from 'framer-motion'; // TAMBAHAN: Import AnimatePresence

import Navbar from './components/Navbar/Navbar';
import SpaceBackground from './components/Background/SpaceBackground';
import Home from './components/Home/Home';
import About from './components/About/About';
import Roadmap from './components/Roadmap/Roadmap';
import Programs from './components/Programs/Programs';
// import Activities from './components/Activities/Activities'; 
// import AllActivities from './components/Activities/AllActivities';
import Contact from './components/Contact/Contact';

// TAMBAHAN: Import komponen Loading (Pastikan path folder-nya sesuai dengan letak file kamu)
import Loading from './components/Loading/Loading'; 

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  
  // TAMBAHAN: State untuk mengontrol layar loading
  const [isLoading, setIsLoading] = useState(true);

  // TAMBAHAN: Mengatur timer loading saat website pertama kali dibuka
  useEffect(() => {
    // Layar loading akan tampil selama 2.5 detik (2500 ms)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer); // Membersihkan timer
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <div className="relative w-full">
        
        {/* TAMBAHAN: Render komponen Loading dengan AnimatePresence agar bisa transisi exit */}
        <AnimatePresence mode="wait">
          {isLoading && <Loading key="loading" />}
        </AnimatePresence>

        <SpaceBackground />
        
        {/* INI BAGIAN PALING PENTING! Pastikan ada tulisan setCurrentPage={...} */}
        <Navbar setCurrentPage={setCurrentPage} />

        {currentPage === 'home' ? (
          <main>
            <Home />
            <About />
            <Programs />
            <Roadmap />
            <Contact />
            {/* <Activities setCurrentPage={setCurrentPage} />  */}
          </main>
        ) : (
          <main>
            {/* <AllActivities setCurrentPage={setCurrentPage} /> */}
          </main>
        )}

        <footer className="py-6 text-center text-gray-500 border-t border-white/10 relative z-10 bg-space-bg">
          <p>&copy; {new Date().getFullYear()} Tbotics Education. Memberdayakan Generasi Inovator.</p>
        </footer>
      </div>
    </ReactLenis>
  );
}

export default App;