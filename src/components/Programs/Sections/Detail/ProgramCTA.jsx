// src/components/Programs/Sections/ProgramCTA.jsx
import { motion } from 'framer-motion';
import { WA_NUMBER_PROGRAM } from "../../../../data/ProgramData";

export default function ProgramCTA({ program }) {
  const waMessage = `Halo Admin Tbotics, saya sudah membaca detail program *${program.title}* dan ingin berdiskusi lebih lanjut untuk pendaftaran.`;
  const waLink = `https://wa.me/${WA_NUMBER_PROGRAM}?text=${encodeURIComponent(waMessage)}`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6, delay: 0.6 }}
      className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 rounded-2xl md:rounded-3xl p-6 md:p-10 text-center shadow-2xl relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
      
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 relative z-10">
        Siap Memulai Perjalanan?
      </h3>
      <p className="text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-lg relative z-10 px-2">
        Mari berdiskusi lebih lanjut tentang bagaimana program <span className="text-white font-semibold">{program.title}</span> dapat membantu mencetak inovator muda berikutnya.
      </p>
      <button 
        onClick={() => window.open(waLink, '_blank')}
        className="w-full md:w-auto bg-cyan-500 hover:bg-cyan-400 text-gray-900 px-6 md:px-10 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:-translate-y-1 cursor-pointer relative z-10 flex items-center justify-center gap-2 mx-auto"
      >
          Konsultasi Sekarang 💬
      </button>
    </motion.div>
  );
}