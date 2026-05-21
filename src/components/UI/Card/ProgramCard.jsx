import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { WA_NUMBER_PROGRAM } from '../../../data/ProgramData';

export default function ProgramCard({ program }) {
  const navigate = useNavigate();

  const handleWA = () => {
    const waMessage = `Halo Admin Tbotics, saya tertarik dengan program ${program.title}`;
    const waLink = `https://wa.me/${WA_NUMBER_PROGRAM}?text=${encodeURIComponent(waMessage)}`;
    window.open(waLink, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="relative z-10 flex flex-col md:flex-row"
    >
      {/* IMAGE */}
      <div className="w-full md:w-5/12 h-40 sm:h-56 md:h-auto overflow-hidden relative group">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0B0D21] to-transparent opacity-90 md:opacity-100" />
      </div>

      {/* CONTENT */}
      <div className="w-full md:w-7/12 p-5 sm:p-6 md:p-8 flex flex-col justify-center">
        <p className="text-cyan-400 text-xs md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-1 md:mb-2">
          {program.subtitle}
        </p>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2 md:mb-4 leading-tight">
          {program.title}
        </h3>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4 md:mb-6">
          {program.description}
        </p>

        <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
          {program.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 md:gap-3 text-gray-300 text-sm md:text-base">
              <span className="text-cyan-400 mt-0.5">✦</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-3">
          <button
            onClick={() => navigate(`/program/${program.id}`)}
            className="w-full sm:w-auto px-4 py-2.5 md:px-6 md:py-3 rounded-xl border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 font-bold text-sm text-center"
          >
            Lihat Detail
          </button>
          <button
            onClick={handleWA}
            className="w-full sm:w-auto px-4 py-2.5 md:px-6 md:py-3 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(0,255,255,0.3)] text-sm text-center"
          >
            Konsultasi WA
          </button>
        </div>
      </div>
    </motion.div>
  );
}