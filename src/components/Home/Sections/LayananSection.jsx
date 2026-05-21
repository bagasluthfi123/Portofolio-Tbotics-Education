import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FadeIn from '../../UI/FadeIn';
import SectionBadge from '../../UI/SectionBadge';
import { LAYANAN, THEME } from '../../../data/HomeData';
import { useLenis } from 'lenis/react';

export default function LayananSection() {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 lg:py-28 px-5 z-10">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-12 lg:mb-16">
          <SectionBadge icon="🛰️" text="Program Stasiun Tbotics" color="cyan" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-mono">
            Layanan <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Kami</span>
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm sm:text-base font-medium">
            Tersedia berbagai program untuk semua kebutuhan ekspedisi robotika Anda.
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-10">
          {LAYANAN.map((item, i) => {
            const t = THEME[item.color];
            return (
              <FadeIn key={i} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`h-full bg-[#080d1e]/80 border-2 ${t.border} rounded-2xl lg:rounded-3xl p-6 flex flex-col gap-3 group cursor-default transition-shadow duration-300 hover:${t.glow}`}
                >
                  <span className={`self-start text-[0.6rem] font-black font-mono uppercase tracking-widest px-2.5 py-1 rounded-full ${t.bg} ${t.text} border ${t.border}`}>
                    {item.badge}
                  </span>
                  <div className={`w-14 h-14 ${t.bg} ${t.border} border-2 rounded-2xl flex items-center justify-center text-3xl ${t.glow} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <h3 className={`${t.text} font-black text-sm sm:text-base font-mono uppercase leading-snug`}>{item.title}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed flex-1">{item.desc}</p>
                  <div className="w-0 group-hover:w-full h-0.5 rounded-full transition-all duration-500" style={{ background: `linear-gradient(to right,${t.hex},transparent)` }} />
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
        <FadeIn delay={0.25} className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            // Jadi ini:
            onClick={() => {
              const sudahDiProgram = window.location.hash.includes('/program');

              const forceScrollTop = () => {
                lenis?.stop();
                lenis?.scrollTo(0, { immediate: true });
                // Double insurance
                window.scrollTo({ top: 0, behavior: 'instant' });
                document.documentElement.scrollTop = 0;
                requestAnimationFrame(() => {
                  lenis?.start();
                });
              };

              if (sudahDiProgram) {
                forceScrollTop();
              } else {
                navigate('/program');
                setTimeout(forceScrollTop, 100);
              }
            }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-2 border-cyan-400/40 hover:border-cyan-400/80 text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-wider text-sm transition-colors duration-300"
          >
            <span className="text-cyan-400">📚</span>
            Lihat Semua Program Lengkap
            <span className="text-cyan-400 text-base">→</span>
          </motion.button>
        </FadeIn>
      </div>
    </section>
  );
}