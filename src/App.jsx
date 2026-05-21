// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { AnimatePresence } from 'framer-motion';

// 1. Layouts (Pindah ke folder Layout)
import Navbar from './components/Layouts/Navbar'; 

// 2. Pages (Pindah ke folder Pages)
import Home from './pages/Home';
import Programs from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import Event from './pages/Event';
import Contact from './pages/Contact';

// 3. Components & Data
import SpaceBackground from './components/Background/SpaceBackground';
import Chatbot from './components/Chatbot/Chatbot';
import Loading from './components/Loading/Loading';
import { programsData } from './data/ProgramData'; // Data terpusat

// Import Logo
import logoWhite from './assets/Logo Tbotics White.png';

const LandingPage = () => (
  <main>
    <Home />
    <Contact />
  </main>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const imagesToCache = [logoWhite, ...programsData.map(p => p.image)];
    const preloadImage = (src) => new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = resolve;
    });

    const initApp = async () => {
      const startTime = Date.now();
      await Promise.all(imagesToCache.map(src => preloadImage(src)));
      const timeElapsed = Date.now() - startTime;
      const minLoadingTime = 2500; 

      if (timeElapsed < minLoadingTime) {
        setTimeout(() => setIsLoading(false), minLoadingTime - timeElapsed);
      } else {
        setIsLoading(false);
      }
    };
    initApp();
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <div className="relative w-full">
        <AnimatePresence mode="wait">
          {isLoading && <Loading key="loading" />}
        </AnimatePresence>

        <SpaceBackground />
        <Navbar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/program" element={<Programs />} />
          <Route path="/program/:id" element={<ProgramDetail />} />
          <Route path="/event" element={<Event />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <footer className="py-6 text-center text-gray-400 border-t border-white/5 relative z-10 bg-[#02030A]">
          <p>&copy; {new Date().getFullYear()} Tbotics Education. Memberdayakan Generasi Inovator.</p>
        </footer>

        <Chatbot />
      </div>
    </ReactLenis>
  );
}

export default App;