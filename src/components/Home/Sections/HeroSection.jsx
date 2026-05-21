import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { WA_LINK } from '../../../data/HomeData';
import TypingText from '../../UI/TypingText';

// Lazy load komponen 3D
const Robot3D = lazy(() => import('../../Home/Robot3D')); 

export default function HeroSection({ heroRef }) {
  const scrollToAbout = () => document.getElementById('siapa-kami')?.scrollIntoView({ behavior: 'smooth' });

  const containerV = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const itemV = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section ref={heroRef} className="relative z-10 min-h-[100vh] lg:h-[160vh]">
      <div className="lg:sticky lg:top-0 min-h-screen w-full flex flex-col lg:flex-row items-center justify-center pt-24 pb-12 px-5 lg:px-10 overflow-hidden">
        <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-6 lg:gap-10 items-center justify-between relative z-20">

          {/* Teks hero */}
          <motion.div
            variants={containerV} initial="hidden" animate="visible"
            className="space-y-4 lg:space-y-5 z-20 w-full text-center lg:text-left"
          >
            <motion.div variants={itemV} className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 bg-cyan-900/30 border border-cyan-500/30 px-4 py-1.5 rounded-full">
                <span className="text-base" style={{ animation: 'wiggle 2s infinite' }}>🚀</span>
                <TypingText text="Let's Play & Learn Robotics" className="text-cyan-300 font-mono text-[0.6rem] sm:text-xs uppercase font-bold" />
              </div>
            </motion.div>

            <motion.h1 variants={itemV} className="font-black leading-[1.05] uppercase tracking-tight font-mono">
              <span className="text-gray-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl block drop-shadow-md">Lebih Percaya Diri,</span>
              <span className="text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl block mt-1 drop-shadow-md">Hadapi Masa Depan</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-4xl sm:text-5xl md:text-6xl lg:text-7xl block mt-2 drop-shadow-[0_0_30px_rgba(34,211,238,0.7)]">
                TBOTICS
              </span>
            </motion.h1>

            <motion.p variants={itemV} className="text-gray-300 text-sm sm:text-base lg:text-lg w-full max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed border-l-2 border-cyan-400 pl-4 pr-4 py-2 bg-white/5 rounded-xl">
              Eksplorasi Galaksi Robotika terbaik untuk SD &amp; SMP! Pelajari{' '}
              <span className="text-cyan-400 font-bold">Elektronika · Robotika · Mikrokontroler · IoT</span>{' '}
              dengan cara yang seru dan menyenangkan!
            </motion.p>

            <motion.div variants={itemV} className="flex flex-wrap justify-center lg:justify-start gap-2">
              {['⚡ Elektronika', '🤖 Robotika', '🎛️ Mikrokontroler', '🌐 IoT'].map((tag, i) => (
                <span key={i} className="text-[0.65rem] sm:text-xs font-bold font-mono px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gray-200">
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div variants={itemV} className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                onClick={() => window.open(WA_LINK, '_blank')}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-8 py-3.5 rounded-full font-black uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-shadow duration-300"
              >
                🚀 Mulai Ekspedisi
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={scrollToAbout}
                className="bg-white/10 border-2 border-white/25 text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-wider text-sm transition-colors duration-300 hover:bg-white/15"
              >
                🛰️ Lihat Markas
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Robot 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="z-10 w-full flex justify-center lg:justify-end lg:w-1/2 relative max-h-[220px] sm:max-h-none"
          >
            <div className="relative w-full max-w-[260px] sm:max-w-[420px] mx-auto h-[200px] sm:h-[360px] lg:mx-0 lg:max-w-none lg:w-[560px] lg:h-[520px] xl:w-[640px] xl:h-[580px] flex justify-center items-center">
              {/* Cincin orbit luar */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                <div
                  className="w-[160px] h-[160px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] rounded-full border-2 border-dashed border-cyan-400/25"
                  style={{ animation: 'orbSpin 20s linear infinite', willChange: 'transform' }}
                />
              </div>
              {/* Cincin orbit dalam */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                <div
                  className="w-[120px] h-[120px] sm:w-[220px] sm:h-[220px] lg:w-[300px] lg:h-[300px] rounded-full border border-purple-400/20"
                  style={{ animation: 'orbSpin 14s linear infinite reverse', willChange: 'transform' }}
                />
              </div>
              {/* Dot berputar di cincin */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                <div
                  className="w-[160px] h-[160px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px]"
                  style={{ animation: 'orbSpin 20s linear infinite', willChange: 'transform' }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                </div>
              </div>

              <Suspense fallback={
                <div className="hidden sm:flex flex-col items-center justify-center gap-3 bg-[#0a0f1d]/80 p-6 rounded-2xl border-2 border-cyan-900/50">
                  <div className="text-5xl" style={{ animation: 'floatUp 2s ease-in-out infinite' }}>🛸</div>
                  <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase font-bold animate-pulse">SUMMONING MECHA...</span>
                </div>
              }>
                <Robot3D />
              </Suspense>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}