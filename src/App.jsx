import React, { useState } from 'react';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/Navbar/Navbar';
import SpaceBackground from './components/Background/SpaceBackground';
import Home from './components/Home/Home';
import About from './components/About/About';
import Roadmap from './components/Roadmap/Roadmap';
import Programs from './components/Programs/Programs';
// import Activities from './components/Activities/Activities'; 
// import AllActivities from './components/Activities/AllActivities';
import Contact from './components/Contact/Contact';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <div className="relative w-full">
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