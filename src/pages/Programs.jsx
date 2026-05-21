import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import PlanetBackground from '../components/Background/PlanetBackground';
import ProgramCard from '../components/UI/Card/ProgramCard';
import { programsData } from '../data/ProgramData';
import { useLocation } from 'react-router-dom'; 
import { useLenis } from 'lenis/react'; 

// Import Section baru
import ProgramHeader from '../components/Programs/Sections/List/ProgramHeader';
import ProgramTabs from '../components/Programs/Sections/List/ProgramTabs';

export default function Programs() {
  const [activeTab, setActiveTab] = useState(programsData[0].id);
  const currentProgram = programsData.find((p) => p.id === activeTab) || programsData[0];
  const location = useLocation(); // ✅
  const lenis = useLenis();       // ✅

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [location]); 

  return (
    <section id="program" className="relative min-h-screen overflow-hidden py-16 md:py-24 px-5 md:px-6 bg-[#02030A]">
      <PlanetBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-[#02030A] via-transparent to-[#02030A] z-[1]" />

      <div className="relative z-10 max-w-5xl mx-auto mt-6 md:mt-0">
        
        <ProgramHeader />
        
        <ProgramTabs 
          programsData={programsData} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 rounded-2xl md:rounded-3xl p-[1px] bg-[linear-gradient(130deg,#00ffff,#0066ff,#8b5cf6,#00ffff)] bg-[length:300%_300%] animate-[rgbMove_8s_linear_infinite] opacity-40" />
          <div className="absolute inset-[1px] rounded-2xl md:rounded-3xl bg-[#0B0D21]/85 backdrop-blur-2xl" />

          <AnimatePresence mode="wait">
            <ProgramCard key={activeTab} program={currentProgram} />
          </AnimatePresence>
        </div>
      </div>

      <style>
        {`@keyframes rgbMove { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }`}
      </style>
    </section>
  );
}