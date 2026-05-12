import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// Mengambil data yang sudah diexport dari file Programs.jsx
import { programsData } from './Programs'; 

export default function ProgramDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  // Memaksa layar kembali ke atas dengan memberi jeda untuk mengakali ReactLenis
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 50); 

    return () => clearTimeout(timer);
  }, [id]);

  const [activeSyllabusIndex, setActiveSyllabusIndex] = useState(0);

  const program = programsData.find(p => p.id === id);

  if (!program) {
    return (
      <div className="min-h-screen bg-[#020b2d] flex flex-col items-center justify-center text-white p-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4">404</h1>
        <p className="mb-8 text-gray-300">Program tidak ditemukan.</p>
        <button onClick={() => navigate('/')} className="px-6 py-3 bg-blue-600 rounded-xl font-bold cursor-pointer hover:bg-blue-500 transition-colors">
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  const hasMultipleSyllabuses = program.syllabuses && program.syllabuses.length > 0;
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
      className="min-h-screen bg-[#020b2d] pt-24 md:pt-28 pb-12 px-5 md:px-6 relative overflow-hidden"
    >
      {/* Efek Glow Latar Belakang */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-600/10 blur-[90px] md:blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Tombol Kembali */}
        <button 
          onClick={() => navigate('/')}
          className="text-cyan-400 hover:text-white mb-6 md:mb-8 flex items-center gap-2 transition-colors cursor-pointer group w-fit text-sm md:text-base font-medium"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Kembali ke Beranda
        </button>

        {/* ── BAGIAN HERO (JUDUL & GAMBAR) ── */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }}
            className="bg-[#0B0D21]/80 backdrop-blur-md border border-cyan-900/50 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-[0_0_30px_-10px_rgba(34,211,238,0.2)] order-2 lg:order-1"
          >
            <p className="text-cyan-400 font-bold text-xs md:text-sm tracking-widest mb-3 uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              {program.subtitle}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 md:mb-6 leading-tight">
              {program.title}
            </h1>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
              {program.description}
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 md:gap-4">
              <div className="bg-[#020b2d] border border-blue-900/50 p-3 md:p-4 rounded-xl">
                <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider mb-1">Target</p>
                <p className="text-white font-bold text-sm md:text-base">{program.target}</p>
              </div>
              <div className="bg-[#020b2d] border border-blue-900/50 p-3 md:p-4 rounded-xl">
                <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider mb-1">Durasi</p>
                <p className="text-white font-bold text-sm md:text-base">{program.duration}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-56 sm:h-72 lg:h-full min-h-[250px] md:min-h-[300px] w-full rounded-2xl md:rounded-3xl overflow-hidden border-2 border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.15)] group bg-[#0B0D21] order-1 lg:order-2"
          >
            <img 
              src={program.image} 
              alt={program.title} 
              className="absolute inset-0 w-full h-full object-cover rounded-2xl md:rounded-3xl group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020b2d] via-transparent to-transparent pointer-events-none opacity-80 md:opacity-100"></div>
          </motion.div>
        </div>

        {/* ── BAGIAN SILABUS / ROADMAP ── */}
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

            {/* Tab Navigasi Silabus dibuat flex-wrap agar tidak berantakan di mobile */}
            {hasMultipleSyllabuses && program.syllabuses.length > 1 && (
              <div className="flex flex-wrap bg-[#09112A] border border-cyan-900/50 p-1 md:p-1.5 rounded-2xl md:rounded-full w-full md:w-fit gap-1">
                {program.syllabuses.map((syl, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSyllabusIndex(index)}
                    className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-xl md:rounded-full font-bold text-xs md:text-sm transition-all duration-300 cursor-pointer ${
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
          
          {/* Timeline dengan penyesuaian padding mobile */}
          <div className="space-y-6 border-l-2 border-cyan-900/50 ml-3 md:ml-8 pl-6 md:pl-8 relative min-h-[250px]">
            <AnimatePresence mode="wait">
              {hasMultipleSyllabuses ? (
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
                      {/* Posisi titik timeline disesuaikan otomatis untuk mobile (-left-[33px]) dan desktop (-left-[41px]) */}
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
              ) : (
                <p className="text-gray-500 italic text-sm md:text-base">Data silabus belum tersedia.</p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── BAGIAN CALL TO ACTION (CTA) ── */}
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

      </div>
    </motion.div>
  );
}