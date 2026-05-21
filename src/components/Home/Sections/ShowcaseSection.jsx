import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '../../UI/FadeIn';
import SectionBadge from '../../UI/SectionBadge';
import TiltPhoto from '../../UI/TiltPhoto';
import AnimatedConnector from '../../UI/AnimatedConnector';
import { SHOWCASE_STEPS, LEVEL_TABS, THEME } from '../../../data/HomeData';

const ShowcaseSection = memo(function ShowcaseSection() {
  const [activeLevel, setActiveLevel] = useState('sd');

  const filtered = activeLevel === 'semua'
    ? SHOWCASE_STEPS
    : SHOWCASE_STEPS.filter(s => s.levels.includes(activeLevel));

  return (
    <section className="relative py-16 lg:py-28 px-4 sm:px-6 z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-8 lg:mb-12">
          <SectionBadge icon="📸" text="Momen di Stasiun Tbotics" color="cyan" />
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white uppercase font-mono">
            Lihat <span className="text-cyan-400">Aksi Nyata</span> Mereka
          </h2>
          <p className="text-gray-400 mt-2 text-xs sm:text-sm lg:text-base font-medium max-w-lg mx-auto">
            Gerakkan foto untuk efek 3D — 1.500+ siswa sudah membuktikan serunya belajar robotika!
          </p>
        </FadeIn>

        {/* Filter tabs */}
        <FadeIn delay={0.1} className="flex justify-center mb-8 lg:mb-14">
          <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl">
            {LEVEL_TABS.map(tab => {
              const isActive = activeLevel === tab.id;
              const t = THEME[tab.color];
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveLevel(tab.id)}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                  className={`px-4 py-1.5 sm:py-2 rounded-xl font-mono font-black text-xs uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? `${t.bg} ${t.border} border-2 ${t.text} ${t.glow}`
                      : 'text-gray-400 hover:text-gray-200 border-2 border-transparent hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </motion.button>
              );
            })}
          </div>
        </FadeIn>

        {/* Konten per level */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLevel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4" style={{ animation: 'floatUp 3s ease-in-out infinite' }}>🚧</div>
                <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">Konten untuk level ini segera hadir!</p>
                <p className="text-gray-600 font-mono text-xs mt-2">Coming soon...</p>
              </div>
            ) : (
              <div className="space-y-12 sm:space-y-16 lg:space-y-32">
                {filtered.map((step, i) => {
                  const t = THEME[step.color];
                  return (
                    <div key={step.tag}>
                      <div className={`flex flex-col ${step.imgLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-5 md:gap-6 lg:gap-16 items-center`}>
                        <div className="w-full md:w-[38%] lg:w-[46%] flex-shrink-0">
                          <TiltPhoto img={step.img} tag={step.tag} hex={step.hex} color={step.color} />
                        </div>
                        <div className="w-full sm:flex-1 space-y-3 relative min-w-0">
                          {/* Nomor dekoratif */}
                          <div
                            className="absolute -top-5 -left-2 text-[3.5rem] sm:text-[4rem] lg:text-[8rem] font-black font-mono leading-none select-none pointer-events-none"
                            style={{ color: step.hex, opacity: 0.07 }}
                          >
                            0{i + 1}
                          </div>
                          <div className={`inline-flex items-center gap-1.5 ${t.bg} border ${t.border} px-2.5 py-0.5 rounded-full`}>
                            <span className={`${t.text} font-mono text-[0.55rem] font-black tracking-widest uppercase`}>{step.tag}</span>
                          </div>
                          <h3 className="text-white font-black text-lg sm:text-xl lg:text-[2.2rem] font-mono uppercase leading-tight">
                            {step.title}<br /><span style={{ color: step.hex }}>{step.titleAccent}</span>
                          </h3>
                          <p className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed font-medium pl-3" style={{ borderLeft: `2px solid ${step.hex}` }}>
                            {step.desc}
                          </p>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {step.chips.map((chip, j) => {
                              const ct = THEME[chip.color];
                              return (
                                <span key={j} className={`inline-flex items-center gap-1 text-[0.6rem] font-bold font-mono px-2.5 py-1 rounded-full ${ct.bg} border ${ct.border} ${ct.text}`}>
                                  {chip.label}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      {i < filtered.length - 1 && <AnimatedConnector color={step.hex} />}
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
});

export default ShowcaseSection;