import { motion } from 'framer-motion';

export default function Programs() {
  return (
    <section id="program" className="py-24 px-6 bg-space-card/80 relative z-10 border-y border-white/5">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-16">Program <span className="text-space-secondary">Unggulan</span></h2>
        
        <div className="grid md:grid-cols-2 gap-10">
          {/* Bootcamp Card */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-space-bg to-space-card p-10 rounded-3xl border border-space-primary/30 shadow-[0_0_30px_rgba(0,209,255,0.1)]"
          >
            <h3 className="text-3xl font-bold text-space-primary mb-4">Bootcamp</h3>
            <p className="text-gray-400 mb-8">Program intensif berbulan-bulan untuk mencetak juara robotik masa depan. Siswa akan dibimbing dari nol hingga siap kompetisi.</p>
            <button className="w-full bg-space-primary text-space-bg py-3 rounded-lg font-bold hover:bg-white transition">Daftar Bootcamp</button>
          </motion.div>

          {/* Workshop Card */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-space-bg to-space-card p-10 rounded-3xl border border-space-secondary/30 shadow-[0_0_30px_rgba(250,204,21,0.1)]"
          >
            <h3 className="text-3xl font-bold text-space-secondary mb-4">Workshop</h3>
            <p className="text-gray-400 mb-8">Pelatihan 1-2 hari dengan fokus pada pembuatan satu project nyata (misal: Robot Pembersih, Smart Lamp). Cocok untuk pemula.</p>
            <button className="w-full bg-space-secondary text-space-bg py-3 rounded-lg font-bold hover:bg-white transition">Ikuti Workshop</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}