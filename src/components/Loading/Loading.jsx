import { motion } from 'framer-motion';

export default function Loading() {
  return (
    // Memenuhi seluruh layar (fixed inset-0) dengan z-index paling tinggi (z-50)
    <motion.div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020b2d]"
      // Animasi saat komponen ini dihilangkan (Exit)
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center">
        {/* Ikon Robot Berkedip */}
        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1, 0.9] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-6xl mb-6 drop-shadow-[0_0_15px_rgba(0,216,255,0.8)]"
        >
          🤖
        </motion.div>

        {/* Teks Loading */}
        <h1 className="text-white font-mono text-xl md:text-2xl tracking-widest mb-8">
          INITIALIZING <span className="text-cyan-400 font-bold">TBOTICS</span>...
        </h1>

        {/* Loading Bar Container */}
        <div className="w-64 md:w-80 h-1.5 bg-blue-900/50 rounded-full overflow-hidden relative">
          {/* Animasi Garis Loading (Berjalan dari 0 ke 100%) */}
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }} // Durasi loading 2.5 detik
            className="absolute top-0 left-0 h-full bg-cyan-400 shadow-[0_0_10px_rgba(0,216,255,0.8)] rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
}