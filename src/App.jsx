import React from 'react';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/Navbar/Navbar';
import SpaceBackground from './components/Background/SpaceBackground';
import Home from './components/Home/Home';
import About from './components/About/About';
import Roadmap from './components/Roadmap/Roadmap';
import Programs from './components/Programs/Programs';
import Contact from './components/Contact/Contact';

function App() {
  return (
    // 2. Bungkus semua komponen dengan ReactLenis
    // Nilai lerp (0.05) mengatur seberapa "licin/lembut" scroll-nya. Semakin kecil, semakin lembut.
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <div className="relative w-full">
        {/* Background Parallax */}
        <SpaceBackground />
        
        {/* Navigasi */}
        <Navbar />

        {/* Konten Halaman */}
        <main>
          <Home />
          <About />
          <Roadmap />
          <Programs />
          <Contact />
        </main>

        {/* Footer */}
        <footer className="py-6 text-center text-gray-500 border-t border-white/10 relative z-10 bg-space-bg">
          <p>&copy; {new Date().getFullYear()} Tbotics Education. Memberdayakan Generasi Inovator.</p>
        </footer>
      </div>
    </ReactLenis>
  );
}

export default App;