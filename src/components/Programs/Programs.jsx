// import { motion } from 'framer-motion';

// export default function Programs() {
//   return (
//     <section id="program" className="py-24 px-6 bg-space-card/80 relative z-10 border-y border-white/5">
//       <div className="max-w-6xl mx-auto text-center">
//         <h2 className="text-4xl font-bold mb-16">Program <span className="text-space-secondary">Unggulan</span></h2>

//         <div className="grid md:grid-cols-2 gap-10">
//           {/* Bootcamp Card */}
//           <motion.div 
//             whileHover={{ scale: 1.02 }}
//             className="bg-gradient-to-br from-space-bg to-space-card p-10 rounded-3xl border border-space-primary/30 shadow-[0_0_30px_rgba(0,209,255,0.1)]"
//           >
//             <h3 className="text-3xl font-bold text-space-primary mb-4">Bootcamp</h3>
//             <p className="text-gray-400 mb-8">Program intensif berbulan-bulan untuk mencetak juara robotik masa depan. Siswa akan dibimbing dari nol hingga siap kompetisi.</p>
//             <button className="w-full bg-space-primary text-space-bg py-3 rounded-lg font-bold hover:bg-white transition">Daftar Bootcamp</button>
//           </motion.div>

//           {/* Workshop Card */}
//           <motion.div 
//             whileHover={{ scale: 1.02 }}
//             className="bg-gradient-to-br from-space-bg to-space-card p-10 rounded-3xl border border-space-secondary/30 shadow-[0_0_30px_rgba(250,204,21,0.1)]"
//           >
//             <h3 className="text-3xl font-bold text-space-secondary mb-4">Workshop</h3>
//             <p className="text-gray-400 mb-8">Pelatihan 1-2 hari dengan fokus pada pembuatan satu project nyata (misal: Robot Pembersih, Smart Lamp). Cocok untuk pemula.</p>
//             <button className="w-full bg-space-secondary text-space-bg py-3 rounded-lg font-bold hover:bg-white transition">Ikuti Workshop</button>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA PROGRAM ---
const programsData = [
  {
    id: 'ekstrakurikuler',
    tabLabel: 'Ekstrakurikuler',
    title: 'Ekstrakurikuler Robotika Sekolah',
    subtitle: 'PROGRAM REGULER',
    description: 'Bawa keseruan eksplorasi teknologi ke sekolah! Program rutin mingguan untuk membimbing inovator muda dari tahap perkenalan komponen hingga mahir memprogram robot secara mandiri.',
    features: [
      'Kurikulum terstruktur selama 1 semester',
      'Modul pembelajaran & project mingguan',
      'Alat dan komponen robotika disediakan',
      'Persiapan seleksi tim lomba sekolah'
    ],
    image: 'https://picsum.photos/seed/tbotics-ekskul/800/600',
    themeColor: 'cyan'
  },
  {
    id: 'workshop',
    tabLabel: 'Workshop',
    title: 'Workshop Singkat & Intensif',
    subtitle: 'PELATIHAN KILAT',
    description: 'Punya waktu luang di akhir pekan? Yuk ikuti sesi pelatihan kilat kami! Cocok untuk pemula yang ingin langsung merasakan keseruan merakit robot pertama mereka dalam hitungan jam.',
    features: [
      'Selesai dalam 1 kali pertemuan (3-4 jam)',
      'Fokus pada 1 project spesifik (misal: Robot Line Follower)',
      'Hasil karya robot bisa dibawa pulang*',
      'Sertifikat keikutsertaan'
    ],
    image: 'https://picsum.photos/seed/tbotics-workshop/800/600',
    themeColor: 'blue'
  },
  {
    id: 'bootcamp',
    tabLabel: 'Bootcamp',
    title: 'Bootcamp Liburan Sekolah',
    subtitle: 'KAMP INOVATOR',
    description: 'Isi waktu liburan dengan kegiatan yang berdampak! Program intensif beberapa hari di mana peserta akan fokus belajar, bekerja sama dalam tim, dan menyelesaikan misi akhir yang menantang.',
    features: [
      'Program intensif 3 sampai 5 hari',
      'Mentoring penuh oleh tutor berpengalaman',
      'Pengembangan soft-skill (Kerjasama & Presentasi)',
      'Demo Day (Presentasi project di depan orang tua)'
    ],
    image: 'https://picsum.photos/seed/tbotics-bootcamp/800/600',
    themeColor: 'purple'
  },
  {
    id: 'privat',
    tabLabel: 'Privat',
    title: 'Bimbingan Privat 1-on-1',
    subtitle: 'FOKUS & EKSKLUSIF',
    description: 'Ingin belajar dengan kecepatan sendiri atau punya target project spesifik? Program privat memberikan perhatian 100% dari mentor untuk memaksimalkan potensi dan ide gila sang inovator.',
    features: [
      'Jadwal belajar yang fleksibel',
      'Materi bisa disesuaikan dengan minat siswa',
      'Fokus tinggi untuk persiapan kompetisi',
      'Laporan perkembangan belajar rutin'
    ],
    image: 'https://picsum.photos/seed/tbotics-privat/800/600',
    themeColor: 'amber'
  }
];

export default function Programs() {
  // State untuk menyimpan tab mana yang sedang aktif
  const [activeTab, setActiveTab] = useState(programsData[0].id);

  // Cari data program yang sedang aktif
  const currentProgram = programsData.find(p => p.id === activeTab);

  // --- KONFIGURASI WHATSAPP ---
  const waNumber = "6285162534164";
  // Pesan otomatis yang akan langsung muncul di WA pengguna
  const waMessage = `Halo Admin Tbotics, saya tertarik untuk konsultasi mengenai program ${currentProgram.title}. Boleh minta informasi lebih detailnya?`;
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <section id="program" className="min-h-screen py-24 px-6 relative z-10 bg-[#02030A]">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-wide uppercase font-mono">
            Akademi <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">Tbotics</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-medium">
            Pilih misi pembelajaran yang paling sesuai. Kami siap mencetak generasi melek teknologi di mana pun mereka berada!
          </p>
        </motion.div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {programsData.map((program) => (
            <button
              key={program.id}
              onClick={() => setActiveTab(program.id)}
              className={`px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 border-2 
                ${activeTab === program.id
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.5)]'
                  : 'bg-[#0B0D21] border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'
                }`}
            >
              {program.tabLabel}
            </button>
          ))}
        </div>

        {/* Content Area (Dengan animasi saat berganti tab) */}
        <div className="bg-[#0B0D21]/80 backdrop-blur-md border-[2px] border-cyan-900/40 rounded-3xl overflow-hidden shadow-[0_0_30px_-10px_rgba(34,211,238,0.2)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col md:flex-row"
            >
              {/* Image Section (Kiri) */}
              <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden relative group">
                <img
                  src={currentProgram.image}
                  alt={currentProgram.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0B0D21] to-transparent pointer-events-none"></div>
              </div>

              {/* Text Section (Kanan) */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <p className="text-cyan-400 font-bold text-sm tracking-widest mb-2 uppercase">
                  {currentProgram.subtitle}
                </p>
                <h3 className="text-3xl font-extrabold text-white mb-4">
                  {currentProgram.title}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-8">
                  {currentProgram.description}
                </p>

                {/* Features List (Checkmarks pakai icon roket) */}
                <ul className="space-y-3 mb-8">
                  {currentProgram.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <span className="text-cyan-400 mt-1">🚀</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button onClick={() => window.open(waLink, '_blank')}
                className="self-start bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-cyan-500/50">
                  Konsultasi Program
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}