// src/pages/Home.jsx
import React, { useRef } from 'react';
import { useScroll, useSpring } from 'framer-motion';

// Background
import CosmicBackground from '../components/Background/CosmicBackground'; 

// Sections
import HeroSection from '../components/Home/Sections/HeroSection';
import StatsStrip from '../components/Home/Sections/StatsStrip';
import ShowcaseSection from '../components/Home/Sections/ShowcaseSection';
import WhyChooseUsSection from '../components/Home/Sections/WhyChooseUsSection';
import WhoAreWeSection from '../components/Home/Sections/WhoAreWeSection';
import VisiMisiSection from '../components/Home/Sections/VisiMisiSection';
import LayananSection from '../components/Home/Sections/LayananSection';
import WaktuEdukasiSection from '../components/Home/Sections/WaktuEdukasiSection';
import DocumentationSection from '../components/Home/Sections/DocumentationSection';
import TestimonialSection from '../components/Home/Sections/TestimonialSection';
import CtaSection from '../components/Home/Sections/CtaSection';

export default function Home() {
  const heroRef = useRef(null);

  // Parallax scroll untuk efek halaman hero
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  useSpring(scrollYProgress, { stiffness: 38, damping: 24, mass: 0.6 }); 

  return (
    <main id="beranda" className="bg-[#02050f] text-white min-h-screen relative selection:bg-cyan-400 selection:text-black font-sans overflow-x-hidden">
      
      {/* Background System */}
      <CosmicBackground />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/8 via-[#02050f]/80 to-black" aria-hidden="true" />

      {/* Page Sections Assembly */}
      <HeroSection heroRef={heroRef} />
      <StatsStrip />
      <ShowcaseSection />
      <WhyChooseUsSection />
      <WhoAreWeSection />
      <VisiMisiSection />
      <LayananSection />
      <WaktuEdukasiSection />
      <DocumentationSection />
      <TestimonialSection />
      <CtaSection />
      
    </main>
  );
}