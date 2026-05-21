import { memo } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../../UI/FadeIn';
import SectionBadge from '../../UI/SectionBadge';
import { TECH_SPECS, THEME } from '../../../data/HomeData';

const WhyChooseUsSection = memo(function WhyChooseUsSection() {
  return (
    <section id="mengapa-kami" className="relative py-20 lg:py-28 px-5 z-10">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-12 lg:mb-16">
          <SectionBadge icon="🏅" text="Spesifikasi Stasiun Tbotics" color="yellow" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-mono">
            Kenapa Pilih <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Kami?</span>
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {TECH_SPECS.map((item, i) => {
            const t = THEME[item.color];
            return (
              <FadeIn key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className={`h-full bg-[#080d1e]/80 border-2 border-slate-700/60 rounded-2xl lg:rounded-3xl p-6 lg:p-7 flex flex-col items-center text-center transition-shadow duration-300 group cursor-default hover:${t.glow}`}
                >
                  <div className={`w-16 h-16 lg:w-20 lg:h-20 ${t.bg} ${t.border} border-2 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 ${t.glow}`}>
                    {item.icon}
                  </div>
                  <h3 className={`text-white font-black text-sm sm:text-base uppercase tracking-wide mb-3 font-mono group-hover:${t.text} transition-colors`}>
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  <div className="mt-4 w-0 group-hover:w-16 h-0.5 rounded-full transition-all duration-500" style={{ background: `linear-gradient(to right,${t.hex},transparent)` }} />
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default WhyChooseUsSection;