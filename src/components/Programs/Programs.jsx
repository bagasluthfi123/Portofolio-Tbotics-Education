import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 

// ==========================================
// KOMPONEN BACKGROUND: Matahari Neon & Partikel
// ==========================================
const NeonCosmicBackground = () => {
  // Membuat 20 partikel acak
  const particles = [...Array(20)].map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2, // Ukuran 2px - 6px
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animDuration: Math.random() * 8 + 5, // Durasi terbang
    animDelay: Math.random() * 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
      {/* 1. Aura Gelap Terluar (Memberi dimensi 3D) */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-blue-900 rounded-full blur-[100px] md:blur-[150px]"
      />

      {/* 2. Inti Matahari Neon (Bersinar & Berdenyut) */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-cyan-500 rounded-full blur-[80px] md:blur-[100px]"
      />
      
      {/* 3. Pusat Inti Paling Terang */}
      <div className="absolute w-[100px] md:w-[150px] h-[100px] md:h-[150px] bg-white rounded-full blur-[50px] opacity-30" />

      {/* 4. Partikel Bintang / Ruang Angkasa Melayang */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-cyan-300 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)]"
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: p.animDuration,
            delay: p.animDelay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};


// --- DATA PROGRAM ---
export const programsData = [
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
    target: 'SD Kelas 4 - 6 & SMP',
    duration: '1 Semester (16 Pertemuan)',
    syllabuses: [
      {
        label: "Tingkat SD",
        items: [
          'Bulan 1: Pengenalan Logika Pemrograman via Roblox Studio',
          'Bulan 2: Dasar Elektronika & Merakit Rangkaian Listrik Dasar',
          'Bulan 3: Memprogram Robot Line Follower Sederhana',
          'Bulan 4: Sensor Ultrasonik & Obstacle Avoidance',
          'Bulan 5: Persiapan Proyek Akhir (Mini Project)',
          'Bulan 6: Demo Day & Pameran Karya Siswa'
        ]
      },
      {
        label: "Tingkat SMP",
        items: [
          'Bulan 1: Logika Pemrograman Lanjutan & C++',
          'Bulan 2: Pengenalan Mikrokontroler Arduino',
          'Bulan 3: Memprogram Mekanika Robot & Sensor Kompleks',
          'Bulan 4: Pengenalan ESP32 & Dasar Internet of Things (IoT)',
          'Bulan 5: Persiapan Proyek Sistem Smart Home',
          'Bulan 6: Demo Day & Pameran Karya Siswa'
        ]
      }
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
      'Fokus pada 1 project spesifik',
      'Hasil karya robot bisa dibawa pulang*',
      'Sertifikat keikutsertaan'
    ],
    target: 'Umum (Siswa SD - SMP)',
    duration: '1 Hari (3 - 4 Jam)',
    syllabuses: [
      {
        label: "Kurikulum Standar",
        items: [
          'Sesi 1: Pengenalan Komponen & Keamanan Alat',
          'Sesi 2: Merakit Mekanik Robot Dasar',
          'Sesi 3: Coding Sederhana (Block-based)',
          'Sesi 4: Uji Coba Lintasan & Mini Kompetisi'
        ]
      }
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
    target: 'Siswa SMP / Pemula Lanjutan',
    duration: 'Liburan Sekolah (5 Hari)',
    syllabuses: [
      {
        label: "Kurikulum Standar",
        items: [
          'Hari 1-2: Logika Dasar & Pengenalan Python',
          'Hari 3: Pengenalan Mikrokontroler (ESP32) & IoT Dasar',
          'Hari 4: Merancang Sistem Smart Home Sederhana',
          'Hari 5: Presentasi Proyek Kelompok'
        ]
      }
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
    target: 'Personal / Sesuai Permintaan',
    duration: 'Fleksibel',
    syllabuses: [
      {
        label: "Kurikulum Kustom",
        items: [
          'Eksplorasi topik bebas (misal: AI Klasifikasi Sampah, Game Desktop, dll)',
          'Mentoring intensif 1-on-1 bersama pakar',
          'Fokus pada pembuatan purwarupa (prototype)',
          'Persiapan perlombaan atau portofolio pribadi'
        ]
      }
    ],
    image: 'https://picsum.photos/seed/tbotics-privat/800/600',
    themeColor: 'amber'
  }
];

export default function Programs() {
  const [activeTab, setActiveTab] = useState(programsData[0].id);
  const currentProgram = programsData.find(p => p.id === activeTab);
  
  const navigate = useNavigate();

  const waNumber = "6285162534164"; 
  const waMessage = `Halo Admin Tbotics, saya tertarik untuk konsultasi mengenai program *${currentProgram.title}*. Boleh minta informasi lebih detailnya?`;
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    // TAMBAHAN: overflow-hidden agar matahari/partikel tidak keluar dari batas section
    <section id="program" className="min-h-screen py-24 px-6 relative z-10 bg-[#02030A] overflow-hidden">
      
      {/* RENDER BACKGROUND NEON MATAHARI DI SINI */}
      <NeonCosmicBackground />

      {/* Konten Utama (Harus z-10 agar berada di atas background) */}
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-wide uppercase font-mono">
            Akademi <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">Tbotics</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-medium">
            Pilih misi pembelajaran yang paling sesuai. Kami siap mencetak generasi melek teknologi di mana pun mereka berada!
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {programsData.map((program) => (
            <button
              key={program.id}
              onClick={() => setActiveTab(program.id)}
              className={`px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 border-2 cursor-pointer
                ${activeTab === program.id 
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.5)]' 
                  : 'bg-[#0B0D21] border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'
                }`}
            >
              {program.tabLabel}
            </button>
          ))}
        </div>

        {/* Backdrop dibikin sedikit lebih transparan (bg-[#0B0D21]/60) agar matahari di belakang tembus pandang */}
        <div className="bg-[#0B0D21]/60 backdrop-blur-md border-[2px] border-cyan-900/40 rounded-3xl overflow-hidden shadow-[0_0_30px_-10px_rgba(34,211,238,0.2)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col md:flex-row"
            >
              <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden relative group bg-[#0B0D21]">
                <img src={currentProgram.image} alt={currentProgram.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0B0D21] to-transparent pointer-events-none"></div>
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <p className="text-cyan-400 font-bold text-sm tracking-widest mb-2 uppercase">{currentProgram.subtitle}</p>
                <h3 className="text-3xl font-extrabold text-white mb-4">{currentProgram.title}</h3>
                <p className="text-gray-300 leading-relaxed mb-8">{currentProgram.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {currentProgram.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <span className="text-cyan-400 mt-1">🚀</span><span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-4 mt-auto">
                  <button 
                    onClick={() => navigate(`/program/${currentProgram.id}`)}
                    className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 px-6 py-3 rounded-xl font-bold transition-all cursor-pointer shadow-[0_0_10px_rgba(0,209,255,0.2)] bg-[#0B0D21]/50 backdrop-blur-sm"
                  >
                    Lihat Detail
                  </button>
                  <button 
                    onClick={() => window.open(waLink, '_blank')}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(0,216,255,0.3)] hover:shadow-[0_0_25px_rgba(0,216,255,0.5)] cursor-pointer"
                  >
                    Konsultasi WA
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}