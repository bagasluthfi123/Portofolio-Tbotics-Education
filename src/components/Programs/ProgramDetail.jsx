import { useState } from 'react'; // Untuk handle tab silabus
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// Mengambil data yang sudah kita export dari file Programs
import { programsData } from './Programs'; 

export default function ProgramDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  // State untuk menyimpan index silabus mana yang sedang dilihat (Default: 0 / Tingkat SD jika ada)
  const [activeSyllabusIndex, setActiveSyllabusIndex] = useState(0);

  const program = programsData.find(p => p.id === id);

  if (!program) {
    return (
      <div className="min-h-screen bg-[#020b2d] flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold text-cyan-400 mb-4">404</h1>
        <p className="mb-8">Program tidak ditemukan.</p>
        <button onClick={() => navigate('/')} className="px-6 py-2 bg-blue-600 rounded-lg cursor-pointer">Kembali ke Beranda</button>
      </div>
    );
  }

  // Cek apakah data silabus menggunakan format baru (array syllabuses)
  const hasMultipleSyllabuses = program.syllabuses && program.syllabuses.length > 0;
  
  // Ambil data silabus yang sedang aktif berdasarkan state
  const currentSyllabus = hasMultipleSyllabuses ? program.syllabuses[activeSyllabusIndex] : null;

  const waNumber = "6285162534164"; 
  const waMessage = `Halo Admin Tbotics, saya sudah membaca detail program *${program.title}* dan ingin berdiskusi lebih lanjut untuk pendaftaran.`;
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#020b2d] pt-28 pb-12 px-6 relative overflow-hidden"
    >
      {/* Background Subtle Glowing */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Tombol Kembali */}
        <button 
          onClick={() => navigate('/')}
          className="text-cyan-400 hover:text-white mb-8 flex items-center gap-2 transition-colors cursor-pointer group w-fit"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Kembali ke Beranda
        </button>

        {/* HEADER SECTION (Grid 2 Kolom di Desktop) */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Kiri: Teks Deskripsi */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }}
            className="bg-[#0B0D21]/80 backdrop-blur-md border border-cyan-900/50 rounded-3xl p-8 lg:p-10 shadow-[0_0_30px_-10px_rgba(34,211,238,0.2)]"
          >
            <p className="text-cyan-400 font-bold text-sm tracking-widest mb-3 uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              {program.subtitle}
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              {program.title}
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {program.description}
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-[#020b2d] border border-blue-900/50 p-4 rounded-xl">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Target</p>
                <p className="text-white font-bold">{program.target}</p>
              </div>
              <div className="bg-[#020b2d] border border-blue-900/50 p-4 rounded-xl">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Durasi</p>
                <p className="text-white font-bold">{program.duration}</p>
              </div>
            </div>
          </motion.div>

          {/* Kanan: Visual / Gambar (Animasi entry saja, tidak melayang) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-64 sm:h-80 lg:h-full min-h-[300px] w-full rounded-3xl overflow-hidden border-2 border-cyan-500/30 shadow-[0_0_40px_rgba(34,211,238,0.15)] group bg-[#0B0D21]"
          >
            {/* UPDATE: Menggunakan tag <img> biasa tanpa animasi 'animate' di sumbu Y */}
            <img 
              src={program.image} 
              alt={program.title} 
              className="absolute inset-0 w-full h-full object-cover rounded-3xl group-hover:scale-105 transition-transform duration-700"
            />
            {/* Overlay Gradient agar gambar menyatu dengan background di bagian bawah */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020b2d] via-transparent to-transparent pointer-events-none"></div>
          </motion.div>

        </div>

        {/* ROADMAP TIMELINE SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          {/* Header Silabus & Filter Tab */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
            <h2 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
              <span>⚙️</span> Roadmap Pembelajaran
            </h2>

            {/* TAB JENJANG (Muncul HANYA jika data silabus menggunakan format baru 'syllabuses' & jumlahnya > 1) */}
            {hasMultipleSyllabuses && program.syllabuses.length > 1 && (
              <div className="flex bg-[#09112A] border border-cyan-900/50 p-1 rounded-full w-fit">
                {program.syllabuses.map((syl, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSyllabusIndex(index)}
                    className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 cursor-pointer ${
                      activeSyllabusIndex === index
                        ? 'bg-cyan-500 text-[#09112A] shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {syl.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Container Timeline */}
          <div className="space-y-6 border-l-2 border-cyan-900/50 ml-4 md:ml-8 pl-8 relative min-h-[300px]">
            {/* AnimatePresence untuk animasi transisi saat ganti tab silabus */}
            <AnimatePresence mode="wait">
              {hasMultipleSyllabuses ? (
                <motion.div
                  key={activeSyllabusIndex} // Key berubah, animasi trigger
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {currentSyllabus.items.map((materi, index) => (
                    <div key={index} className="relative group cursor-default">
                      {/* Titik Timeline */}
                      <div className="absolute w-4 h-4 bg-cyan-900 border-2 border-cyan-400 rounded-full -left-[41px] top- group-hover:bg-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.8)] transition-all duration-300"></div>
                      {/* Kotak Materi */}
                      <div className="bg-[#0B0D21] border border-gray-800 p-6 rounded-xl shadow-lg group-hover:scale-[1.01] group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all duration-300">
                        <p className="text-gray-200 text-lg flex items-start gap-3">
                          <span className="text-cyan-400 mt-0.5">🚀</span>
                          {materi}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                // Jaringan pengaman jika ada data program lama yang belum diupdate formatnya
                <p className="text-gray-500 italic">Data silabus belum tersedia.</p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA AKHIR (WhatsApp Link) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
          
          <h3 className="text-3xl font-bold text-white mb-4 relative z-10">Siap Memulai Perjalanan?</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg relative z-10">
            Mari berdiskusi lebih lanjut tentang bagaimana program {program.title} dapat membantu mencetak inovator muda berikutnya.
          </p>
          <button 
            onClick={() => window.open(waLink, '_blank')}
            className="bg-cyan-500 hover:bg-cyan-400 text-gray-900 px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:-translate-y-1 cursor-pointer relative z-10 flex items-center justify-center gap-2 mx-auto"
          >
             Konsultasi Sekarang 💬
          </button>
        </motion.div>

      </div>
    </motion.div>
  );
}