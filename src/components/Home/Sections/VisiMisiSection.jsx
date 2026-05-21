import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from '../../UI/FadeIn';
import SectionBadge from '../../UI/SectionBadge';
import { THEME } from '../../../data/HomeData';

export default function VisiMisiSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start center', 'end center'] });
  const lineH = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const items = [
    {
      color: 'cyan', icon: '🔭', label: 'Visi Stasiun',
      content: (
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-medium">
          Menjadi mitra pendidikan terdepan dalam pengembangan Robotika dan STEAM yang inovatif, inklusif, dan berdaya saing global — membentuk generasi kreatif &amp; kritis untuk masa depan.
        </p>
      ),
    },
    {
      color: 'purple', icon: '🚀', label: 'Misi Penjelajahan',
      content: (
        <ul className="space-y-3 text-gray-300 text-sm sm:text-base font-medium">
          {[
            'Hadirkan pembelajaran teknologi yang menyenangkan & bermakna.',
            'Bekali keterampilan abad 21 menuju Indonesia Emas 2045.',
            'Dukung guru dalam transformasi pembelajaran digital.',
            'Bangun ekosistem pendidikan berbasis inovasi.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-cyan-400 text-lg leading-none mt-0.5">✦</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <section ref={sectionRef} id="visi-misi" className="relative py-20 lg:py-32 px-5 z-10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[50%] bg-purple-900/8 rounded-full blur-[130px] pointer-events-none" aria-hidden="true" />
      <div className="max-w-4xl mx-auto relative z-10">
        <FadeIn className="text-center mb-14 lg:mb-20">
          <SectionBadge icon="🪐" text="Jalur Orbit — Tujuan Kami" color="cyan" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-mono">Visi &amp; Misi</h2>
        </FadeIn>
        <div className="relative">
          <div className="absolute left-5 sm:left-8 top-0 bottom-0 w-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div style={{ height: lineH }} className="w-full bg-gradient-to-b from-cyan-400 to-purple-500 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
          </div>
          <div className="space-y-12 lg:space-y-16">
            {items.map((item, i) => {
              const t = THEME[item.color];
              return (
                <FadeIn key={i} delay={i * 0.15} x={30}>
                  <div className="flex items-start gap-5 sm:gap-8 pl-14 sm:pl-20">
                    <div className={`absolute left-5 sm:left-8 -translate-x-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#04071a] border-4 ${t.border} flex items-center justify-center z-10 ${t.glow}`}>
                      <span className="text-sm sm:text-base">{item.icon}</span>
                    </div>
                    <motion.div
                      whileHover={{ x: 6 }}
                      className={`w-full bg-[#080d1e]/80 border-2 ${t.border} p-5 sm:p-7 rounded-2xl lg:rounded-3xl transition-shadow duration-300`}
                    >
                      <div className={`${t.text} font-mono font-bold text-xs sm:text-sm mb-3 uppercase tracking-wider`}>{item.label}</div>
                      {item.content}
                    </motion.div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}