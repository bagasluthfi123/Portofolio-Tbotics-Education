import { motion } from 'framer-motion';
import FadeIn from '../../UI/FadeIn';
import SectionBadge from '../../UI/SectionBadge';
import VideoPlayer from '../VideoPlayer';
import { THEME } from '../../../data/HomeData';

export default function WhoAreWeSection() {
  return (
    <section id="siapa-kami" className="relative py-20 lg:py-32 px-5 z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          <div className="w-full lg:w-1/2 space-y-6">
            <FadeIn>
              <SectionBadge icon="📡" text="Database Stasiun Tbotics" color="cyan" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-mono leading-tight">
                Siapa <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">Kami?</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="border-l-4 border-cyan-500 pl-5 bg-gradient-to-r from-cyan-900/15 to-transparent rounded-r-2xl p-4 space-y-3">
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base font-medium">
                  Kami hadir sebagai penyedia pendidikan Robotika sejak{' '}
                  <strong className="text-cyan-400 text-lg">2011</strong>. Program kami mencakup perakitan mekanika, elektronika, dan{' '}
                  <span className="text-cyan-400 font-mono bg-cyan-900/30 px-2 py-0.5 rounded">coding</span>{' '}
                  dalam <em>problem solving</em> terstruktur dari TK hingga tingkat lanjut.
                </p>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Kami membuka kerja sama dengan sekolah &amp; kelas eksklusif. Hingga kini lebih dari{' '}
                  <strong className="text-white">1.500+ peserta didik</strong> aktif belajar bersama kami.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.25}>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  { icon: '⚙️', title: 'Mekanika',    desc: 'Merakit pondasi & rangka robotik', color: 'cyan'   },
                  { icon: '💻', title: 'Coding',       desc: 'Menulis logika ke otak mesin',    color: 'purple' },
                  { icon: '⚡', title: 'Elektronika',  desc: 'Rangkaian & sensor canggih',      color: 'yellow' },
                  { icon: '🌐', title: 'IoT',          desc: 'Koneksi robot ke internet',       color: 'green'  },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4, scale: 1.03 }}
                    className={`bg-[#0a0f1d] border ${THEME[card.color].border} p-4 rounded-2xl transition-shadow duration-300 ${THEME[card.color].glow}`}
                  >
                    <div className="text-2xl mb-2">{card.icon}</div>
                    <h4 className={`${THEME[card.color].text} font-bold text-sm sm:text-base`}>{card.title}</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-snug">{card.desc}</p>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
          <div className="w-full lg:w-1/2">
            <FadeIn delay={0.3} x={40}>
              <VideoPlayer />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}