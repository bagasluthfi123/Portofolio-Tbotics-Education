// src/components/Programs/Sections/ProgramSyllabus.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProgramSyllabus({ program }) {
  const [activeSyllabusIndex, setActiveSyllabusIndex] = useState(0);
  const hasMultipleSyllabuses = program.syllabuses && program.syllabuses.length > 0;
  const currentSyllabus = hasMultipleSyllabuses ? program.syllabuses[activeSyllabusIndex] : null;

  if (!hasMultipleSyllabuses) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mb-16"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-10 gap-5">
        <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 flex items-center gap-3">
          <span>⚙️</span> Roadmap Pembelajaran
        </h2>

        {program.syllabuses.length > 1 && (
          <div className="flex flex-wrap bg-[#09112A] border border-cyan-900/50 p-1 md:p-1.5 rounded-2xl md:rounded-full w-full md:w-fit gap-1">
            {program.syllabuses.map((syl, index) => (
              <button
                key={index}
                onClick={() => setActiveSyllabusIndex(index)}
                className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-xl md:rounded-full font-bold text-xs md:text-sm transition-all duration-300 ${
                  activeSyllabusIndex === index
                    ? 'bg-cyan-500 text-[#09112A] shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {syl.label}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="space-y-6 border-l-2 border-cyan-900/50 ml-3 md:ml-8 pl-6 md:pl-8 relative min-h-[250px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSyllabusIndex}
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: 20 }} 
            transition={{ duration: 0.3 }}
            className="space-y-4 md:space-y-6"
          >
            {currentSyllabus.items.map((materi, index) => (
              <div key={index} className="relative group cursor-default">
                <div className="absolute w-4 h-4 bg-cyan-900 border-2 border-cyan-400 rounded-full -left-[33px] md:-left-[41px] top-4 md:top-5 group-hover:bg-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.8)] transition-all duration-300 z-10"></div>
                <div className="bg-[#0B0D21] border border-gray-800 p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg group-hover:scale-[1.01] group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all duration-300">
                  <p className="text-gray-200 text-sm md:text-lg flex items-start gap-2 md:gap-3 leading-relaxed">
                    <span className="text-cyan-400 mt-0.5 md:mt-1 text-base md:text-lg">🚀</span>
                    {materi}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}