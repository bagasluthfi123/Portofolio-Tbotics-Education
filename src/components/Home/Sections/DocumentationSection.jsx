import { memo } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../../UI/FadeIn';
import SectionBadge from '../../UI/SectionBadge';
import { DOC_DATA, THEME } from '../../../data/HomeData';

const DocumentationSection = memo(function DocumentationSection() {
  return (
    <section className="relative py-20 lg:py-28 px-5 z-10">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-12 lg:mb-16">
          <SectionBadge icon="📂" text="Archive Logs — Misi Berhasil" color="yellow" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-mono">
            <span className="text-cyan-400">Dokumentasi</span> Misi
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm sm:text-base font-medium">
            Rekam jejak para inovator muda Tbotics dalam kompetisi tingkat Nasional &amp; Internasional.
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
          {DOC_DATA.map((doc, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                className={`group bg-[#080d1e]/80 border-2 ${THEME[doc.color].border} rounded-2xl lg:rounded-3xl overflow-hidden transition-shadow duration-300 ${THEME[doc.color].glow} h-full flex flex-col cursor-default`}
              >
                <div className="relative h-44 sm:h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080d1e] to-transparent opacity-70 z-10" />
                  <img src={doc.img} alt={doc.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <span className={`absolute top-3 left-3 z-20 text-xs font-bold font-mono px-3 py-1 rounded-full ${THEME[doc.color].bg} ${THEME[doc.color].text} border ${THEME[doc.color].border}`}>
                    {doc.tag}
                  </span>
                </div>
                <div className="p-5 flex-1">
                  <h3 className="text-white font-bold text-sm sm:text-base leading-snug">{doc.title}</h3>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
});

export default DocumentationSection;