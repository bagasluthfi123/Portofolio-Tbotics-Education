import { motion } from 'framer-motion';
import Robot3D from './Robot3D';

export default function Home() {
  // --- KONFIGURASI ANIMASI MUNCUL ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <section id="beranda" className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-10 items-center">
        
        {/* Kontainer Animasi */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6 z-10"
        >
          {/* Teks Judul: Hasil Rombak Saran Mas Izuru! */}
          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-bold leading-tight relative z-20">
            Bangun <span className="text-gray-300">Masa Depan</span> <br/>
            bersama <br/>
            {/* Ini bagian yang dibikin mencolok, tebel, dan gede semua */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 font-black uppercase tracking-widest text-6xl md:text-8xl drop-shadow-[0_0_15px_rgba(0,209,255,0.5)]">
              TBOTICS
            </span>
          </motion.h1>
          
          {/* Deskripsi */}
          <motion.p variants={itemVariants} className="text-gray-400 text-lg md:text-xl max-w-lg">
            Memberdayakan generasi inovator berikutnya melalui pendidikan robotika praktis untuk SD hingga SMP. Kuasai mesin masa depan, hari ini.
          </motion.p>
          
          {/* Tombol Aksi */}
          <motion.div variants={itemVariants} className="flex gap-4 pt-4">
            <button className="border border-cyan-400 text-cyan-400 px-8 py-3 rounded-lg font-semibold hover:bg-cyan-400 hover:text-gray-900 transition shadow-[0_0_15px_rgba(0,209,255,0.3)]">
              Mulai Sekarang
            </button>
            <button className="text-white hover:text-cyan-400 transition font-semibold">
              Lihat Kursus
            </button>
          </motion.div>
        </motion.div>

        {/* Robot 3D */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="z-10"
        >
          <Robot3D />
        </motion.div>

      </div>
    </section>
  );
}