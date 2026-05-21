import { motion } from 'framer-motion';
import FadeIn from '../../UI/FadeIn';
import SectionBadge from '../../UI/SectionBadge';
import { THEME } from '../../../data/HomeData';

export default function WaktuEdukasiSection() {
  const details = [
    { icon: '📅', label: 'Frekuensi',   value: '1× per minggu',             color: 'cyan'   },
    { icon: '⏱️', label: 'Durasi',      value: '±45–60 menit / pertemuan', color: 'purple' },
    { icon: '🌐', label: 'Mode Belajar', value: 'Offline & Online',          color: 'green'  },
    { icon: '📶', label: 'Level',        value: 'TK hingga Tingkat Lanjut', color: 'yellow' },
  ];

  return (
    <section className="relative py-20 lg:py-28 px-5 z-10">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-12 lg:mb-16">
          <SectionBadge icon="⏰" text="Jadwal & Metode Belajar" color="purple" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-mono">
            Waktu &amp; Cara <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Edukasi</span>
          </h2>
        </FadeIn>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <FadeIn delay={0.1} className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
            {details.map((d, i) => {
              const t = THEME[d.color];
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -4, scale: 1.03 }}
                  className={`bg-[#080d1e]/80 border-2 ${t.border} rounded-2xl p-5 flex flex-col gap-2 transition-shadow duration-300 ${t.glow}`}
                >
                  <span className="text-3xl">{d.icon}</span>
                  <p className="text-gray-400 text-[0.6rem] sm:text-xs font-mono uppercase tracking-widest font-bold">{d.label}</p>
                  <p className={`${t.text} font-black text-sm sm:text-base font-mono leading-snug`}>{d.value}</p>
                </motion.div>
              );
            })}
          </FadeIn>
          <FadeIn delay={0.25} x={40} className="w-full lg:w-1/2">
            <div className="relative bg-[#080d1e]/80 border-2 border-cyan-400/30 rounded-2xl lg:rounded-3xl p-7 sm:p-9 shadow-[0_0_40px_rgba(34,211,238,0.08)] overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none" aria-hidden="true" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none" aria-hidden="true" />
              <div className="relative z-10 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="text-4xl" style={{ animation: 'floatUp 3s ease-in-out infinite' }}>🚀</span>
                  <div>
                    <p className="text-cyan-400 font-mono font-black text-xs uppercase tracking-widest">Sistem Pembelajaran</p>
                    <h3 className="text-white font-black text-lg sm:text-xl font-mono uppercase leading-tight mt-0.5">Fleksibel & Terstruktur</h3>
                  </div>
                </div>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-medium border-l-2 border-cyan-400 pl-4">
                  Pembelajaran dilaksanakan <strong className="text-cyan-400">1 kali per minggu</strong> dengan durasi{' '}
                  <strong className="text-purple-400">±45–60 menit</strong> per pertemuan. Dapat dilakukan secara{' '}
                  <strong className="text-green-400">offline</strong> maupun <strong className="text-green-400">online</strong> sesuai kebutuhan.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['🏠 Offline', '💻 Online', '👦 SD–SMP', '🎓 Semua Level'].map((tag, i) => (
                    <span key={i} className="text-[0.65rem] sm:text-xs font-bold font-mono px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gray-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}