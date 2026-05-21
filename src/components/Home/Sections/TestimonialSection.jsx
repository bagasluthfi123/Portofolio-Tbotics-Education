import { memo } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../../UI/FadeIn';
import SectionBadge from '../../UI/SectionBadge';
import { TESTIMONIALS, THEME } from '../../../data/HomeData';

const TestimonialSection = memo(function TestimonialSection() {
  return (
    <section className="relative py-20 lg:py-28 px-5 z-10">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-12 lg:mb-16">
          <SectionBadge icon="⭐" text="Kesan & Pengalaman" color="yellow" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-mono">
            Kata <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-cyan-400">Mereka</span>
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-7">
          {TESTIMONIALS.map((t, i) => {
            const th = THEME[t.color];
            return (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`bg-[#080d1e]/80 border-2 ${th.border} rounded-2xl lg:rounded-3xl p-6 flex flex-col gap-4 ${th.glow}`}
                >
                  <span className={`text-4xl ${th.text} font-mono leading-none`}>"</span>
                  <p className="text-gray-300 text-sm leading-relaxed flex-1 -mt-3">{t.text}</p>
                  <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                    <div className={`w-12 h-12 rounded-full overflow-hidden border-2 ${th.border} flex-none`}>
                      <img
                        src={t.photo}
                        alt={t.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={e => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-xl">👦</div>';
                        }}
                      />
                    </div>
                    <div>
                      <p className={`${th.text} font-bold text-sm font-mono`}>{t.name}</p>
                      <p className="text-gray-500 text-xs font-mono">{t.school}</p>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default TestimonialSection;