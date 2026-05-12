import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Catatan: Sebaiknya hindari spasi pada nama file gambar, misalnya ubah menjadi 'Earth-Tbotics.png'
import earthBg from '../../assets/Earth Tbotics.png';

// ==========================================
// BACKGROUND PLANET (Dioptimalkan)
// ==========================================
const PlanetBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const move = (e) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 20);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 20);
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">

      {/* Base Background */}
      <div className="absolute inset-0 bg-[#02030A]" />

      {/* Stars */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />

      {/* Aurora Glow */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.12),transparent_40%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.12),transparent_40%)]" />

      {/* Planet - Disesuaikan ukurannya untuk mobile */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[750px] md:h-[750px] 
          opacity-30 md:opacity-40
        "
      >
        <div className="relative w-full h-full rounded-full overflow-hidden border border-cyan-400/20 shadow-[0_0_80px_rgba(0,255,255,0.15)] md:shadow-[0_0_120px_rgba(0,255,255,0.2)]">
          
          <img
            src={earthBg}
            alt="Earth"
            className="w-full h-full object-cover rounded-full animate-[spinEarth_180s_linear_infinite] scale-110 opacity-90"
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent via-transparent to-[#02030A] opacity-60" />

          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-xl md:blur-2xl animate-pulse" />

          {/* Atmosphere */}
          <div className="absolute inset-[-10px] rounded-full border border-cyan-300/20 shadow-[0_0_40px_rgba(0,255,255,0.2)] md:shadow-[0_0_60px_rgba(0,255,255,0.3)]" />
        </div>
      </motion.div>

      {/* Floating Glow */}
      <div className="absolute top-[10%] left-[5%] md:left-[10%] w-20 h-20 md:w-32 md:h-32 bg-cyan-400/20 rounded-full blur-2xl md:blur-3xl animate-pulse" />
      <div className="absolute bottom-[10%] right-[5%] md:right-[10%] w-24 h-24 md:w-40 md:h-40 bg-blue-500/20 rounded-full blur-2xl md:blur-3xl animate-pulse" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03] md:opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:80px_80px]" />

      {/* Fade Top & Bottom */}
      <div className="absolute top-0 left-0 w-full h-24 md:h-40 bg-gradient-to-b from-[#02030A] to-transparent z-[1]" />
      <div className="absolute bottom-0 left-0 w-full h-24 md:h-40 bg-gradient-to-t from-[#02030A] to-transparent z-[1]" />

      <style>
        {`
          @keyframes spinEarth {
            0% { transform: rotate(0deg) scale(1.08); }
            50% { transform: rotate(180deg) scale(1.1); }
            100% { transform: rotate(360deg) scale(1.08); }
          }
        `}
      </style>
    </div>
  );
};

// ==========================================
// DATA
// ==========================================
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

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function Programs() {
  const [activeTab, setActiveTab] = useState(programsData[0].id);

  const currentProgram = programsData.find((p) => p.id === activeTab) || programsData[0];
  const navigate = useNavigate();

  const waNumber = '6285162534164';
  const waMessage = `Halo Admin Tbotics, saya tertarik dengan program ${currentProgram.title}`;
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <section id="program" className="relative min-h-screen overflow-hidden py-16 md:py-24 px-5 md:px-6 bg-[#02030A]">

      {/* BACKGROUND */}
      <PlanetBackground />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#02030A] via-transparent to-[#02030A] z-[1]" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-5xl mx-auto mt-6 md:mt-0"> {/* Max-width dikecilkan dari 6xl ke 5xl agar card lebih ramping */}

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6 md:mb-10" /* Margin bottom dikurangi agar naik */
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white">
            Akademi
            <span className="text-cyan-400 ml-3 md:ml-4 drop-shadow-[0_0_20px_rgba(0,255,255,0.8)] block sm:inline mt-2 sm:mt-0">
              Tbotics
            </span>
          </h2>
          {/* Teks paragraf dihapus sesuai permintaan */}
        </motion.div>

        {/* TABS - Penyesuaian ukuran dan jarak untuk mobile */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-10"> {/* Margin bottom dikurangi agar card naik */}
          {programsData.map((program) => (
            <button
              key={program.id}
              onClick={() => setActiveTab(program.id)}
              className={`
                px-4 py-2 md:px-6 md:py-2.5 rounded-full font-bold text-sm md:text-base transition-all duration-300 border
                ${
                  activeTab === program.id
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,255,255,0.4)]'
                    : 'bg-[#0B0D21]/70 border-gray-700 text-gray-400 hover:border-cyan-400/50 hover:text-white'
                }
              `}
            >
              {program.tabLabel}
            </button>
          ))}
        </div>

        {/* CARD - Diperkecil */}
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">

          {/* RGB BORDER */}
          <div className="absolute inset-0 rounded-2xl md:rounded-3xl p-[1px] bg-[linear-gradient(130deg,#00ffff,#0066ff,#8b5cf6,#00ffff)] bg-[length:300%_300%] animate-[rgbMove_8s_linear_infinite] opacity-40" />

          {/* INNER */}
          <div className="absolute inset-[1px] rounded-2xl md:rounded-3xl bg-[#0B0D21]/85 backdrop-blur-2xl" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 flex flex-col md:flex-row"
            >

              {/* IMAGE - Tinggi jauh dikecilkan (h-40) di mobile, lebar dikecilkan (w-5/12) di desktop */}
              <div className="w-full md:w-5/12 h-40 sm:h-56 md:h-auto overflow-hidden relative group">
                <img
                  src={currentProgram.image}
                  alt={currentProgram.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0B0D21] to-transparent opacity-90 md:opacity-100" />
              </div>

              {/* CONTENT - Padding dan spasi diperkecil agar lebih compact */}
              <div className="w-full md:w-7/12 p-5 sm:p-6 md:p-8 flex flex-col justify-center">
                <p className="text-cyan-400 text-xs md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-1 md:mb-2">
                  {currentProgram.subtitle}
                </p>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2 md:mb-4 leading-tight">
                  {currentProgram.title}
                </h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4 md:mb-6">
                  {currentProgram.description}
                </p>

                <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                  {currentProgram.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 md:gap-3 text-gray-300 text-sm md:text-base">
                      <span className="text-cyan-400 mt-0.5">✦</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* BUTTONS - Berjejer ke bawah di HP, sedikit lebih kecil */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-3">
                  <button
                    onClick={() => navigate(`/program/${currentProgram.id}`)}
                    className="w-full sm:w-auto px-4 py-2.5 md:px-6 md:py-3 rounded-xl border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 font-bold text-sm text-center"
                  >
                    Lihat Detail
                  </button>
                  <button
                    onClick={() => window.open(waLink, '_blank')}
                    className="w-full sm:w-auto px-4 py-2.5 md:px-6 md:py-3 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(0,255,255,0.3)] text-sm text-center"
                  >
                    Konsultasi WA
                  </button>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* RGB Animation */}
      <style>
        {`
          @keyframes rgbMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

    </section>
  );
}