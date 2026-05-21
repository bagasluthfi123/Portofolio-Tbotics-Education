import { memo } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../../UI/FadeIn';
import { WA_LINK } from '../../../data/HomeData';

const CtaSection = memo(function CtaSection() {
  return (
    <section className="relative py-20 lg:py-28 px-5 z-10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-purple-500/8 rounded-full blur-[80px]" />
      </div>
      <FadeIn className="max-w-3xl mx-auto text-center relative z-10">
        <div className="text-6xl sm:text-7xl mb-6" style={{ animation: 'floatUp 3s ease-in-out infinite' }}>🚀</div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-mono leading-tight mb-4">
          Siap Memulai <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Ekspedisi Robotika?</span>
        </h2>
        <p className="text-gray-300 text-sm sm:text-base lg:text-lg font-medium mb-8 max-w-lg mx-auto">
          Bergabunglah bersama 1.500+ murid robotik yang telah merakit masa depan mereka bersama Tbotics!
        </p>
        <motion.button
          whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}
          onClick={() => window.open(WA_LINK, '_blank')}
          className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-9 py-4 rounded-full font-black uppercase tracking-wider text-sm shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-shadow"
        >
          🚀 Daftar Sekarang
        </motion.button>
      </FadeIn>
    </section>
  );
});

export default CtaSection;