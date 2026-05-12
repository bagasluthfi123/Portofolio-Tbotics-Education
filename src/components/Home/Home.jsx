import React, { useState, useEffect, Suspense, lazy, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, animate } from 'framer-motion';

// ==========================================
// LAZY IMPORT ROBOT 3D
// ==========================================
const Robot3D = lazy(() => import('./Robot3D'));

// ==========================================
// KOMPONEN EFEK MENGETIK
// ==========================================
const TypingText = ({ text }) => {
  const characters = Array.from(text);
  const typingVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
  };
  const charVariants = {
    hidden: { opacity: 0, display: "none" },
    visible: { opacity: 1, display: "inline" },
  };

  return (
    <motion.span variants={typingVariants} initial="hidden" animate="visible">
      {characters.map((char, index) => (
        <motion.span key={index} variants={charVariants}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// ==========================================
// KOMPONEN DEBU GALAKSI — CSS-only, ringan
// ==========================================
const SpaceDustParallax = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const dust = Array.from({ length: 35 }).map((_, i) => {
      const layer = i % 3;
      const size = layer === 0 ? 1.5 : layer === 1 ? 2 : 3;
      const duration = layer === 0 ? 28 : layer === 1 ? 18 : 10;
      return {
        id: i,
        top: `${Math.random() * 100}%`,
        size,
        duration,
        delay: -(Math.random() * duration),
        opacity: layer === 0 ? 0.25 : layer === 1 ? 0.5 : 0.85,
      };
    });
    setParticles(dust);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            backgroundColor: 'white',
            boxShadow: `0 0 ${p.size * 3}px rgba(0,209,255,0.9), 0 0 ${p.size * 8}px rgba(0,209,255,0.4)`,
            animation: `floatDust ${p.duration}s ${p.delay}s linear infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes floatDust {
          from { transform: translateX(110vw); }
          to   { transform: translateX(-20vw); }
        }
      `}</style>
    </div>
  );
};

// ==========================================
// KOMPONEN PENDUKUNG
// ==========================================
function Counter({ to }) {
  return (
    <div className="text-4xl md:text-5xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
      {to}+
    </div>
  );
}

function FloatingSymbol({ symbol, top, left, size, rotate, opacity }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: opacity, scale: 1 }}
      transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
      viewport={{ once: true, amount: 0.1 }}
      style={{ top, left, transform: `rotate(${rotate}deg)` }}
      className="absolute z-0 font-mono text-cyan-500 pointer-events-none select-none"
    >
      <span style={{ fontSize: size }} className="drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
        {symbol}
      </span>
    </motion.div>
  );
}

// ==========================================
// FADE-IN WRAPPER — lebih bersih dari whileInView berulang
// ==========================================
function FadeIn({ children, delay = 0, y = 40, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      viewport={{ once: true, amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ==========================================
// KOMPONEN WHY CHOOSE US
// ==========================================
const whyData = [
  {
    icon: "🎓",
    title: "Tenaga Trainer Berpengalaman",
    desc: "Instruktur kami adalah praktisi robotika berpengalaman yang terlatih secara profesional, siap membimbing peserta dari level pemula hingga mahir.",
    color: "cyan",
    border: "border-cyan-900/40",
    glow: "shadow-[0_0_30px_-10px_rgba(34,211,238,0.2)]",
    iconBg: "bg-cyan-500/20",
    iconBorder: "border-cyan-400/50",
    accent: "text-cyan-400",
  },
  {
    icon: "🔧",
    title: "Fasilitas Alat Lengkap & Modern",
    desc: "Peserta belajar menggunakan peralatan robotika terkini — dari mikrokontroler, sensor, hingga komponen mekanikal yang selalu diperbarui.",
    color: "blue",
    border: "border-blue-900/40",
    glow: "shadow-[0_0_30px_-10px_rgba(59,130,246,0.2)]",
    iconBg: "bg-blue-500/20",
    iconBorder: "border-blue-400/50",
    accent: "text-blue-400",
  },
  {
    icon: "💰",
    title: "Harga Transparan & Terjangkau",
    desc: "Tidak ada biaya tersembunyi. Setiap program memiliki rincian harga yang jelas dan terjangkau agar semua kalangan dapat mengakses pendidikan robotika.",
    color: "purple",
    border: "border-purple-900/40",
    glow: "shadow-[0_0_30px_-10px_rgba(168,85,247,0.2)]",
    iconBg: "bg-purple-500/20",
    iconBorder: "border-purple-400/50",
    accent: "text-purple-400",
  },
  {
    icon: "⭐",
    title: "Pelayanan Maksimal & Terjamin",
    desc: "Kami berkomitmen memberikan pelayanan terbaik — dari pendaftaran, proses belajar, hingga purna program. Kepuasan peserta adalah prioritas utama kami.",
    color: "yellow",
    border: "border-yellow-900/40",
    glow: "shadow-[0_0_30px_-10px_rgba(234,179,8,0.2)]",
    iconBg: "bg-yellow-500/20",
    iconBorder: "border-yellow-400/50",
    accent: "text-yellow-400",
  },
];

function WhyChooseUsSection() {
  return (
    <section id="mengapa-kami" className="relative py-32 px-6 z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <FadeIn delay={0} y={30}>
          <div className="text-center mb-20">
            <p className="text-cyan-400 font-mono tracking-[0.3em] uppercase text-sm mb-4">
              Keunggulan Kami
            </p>
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Kenapa Harus Pilih
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 block mt-3 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                Tbotics?
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mt-8 opacity-60" />
          </div>
        </FadeIn>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {whyData.map((item, index) => (
            <FadeIn key={index} delay={index * 0.1} y={40}>
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
                className={`group bg-[#0B0D21]/80 backdrop-blur-md border ${item.border} p-10 rounded-3xl ${item.glow} h-full cursor-default`}
              >
                <div className={`w-14 h-14 ${item.iconBg} rounded-2xl flex items-center justify-center text-3xl mb-6 border ${item.iconBorder} group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h3 className={`text-2xl font-bold text-white mb-3 group-hover:${item.accent} transition-colors duration-300`}>
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-base">
                  {item.desc}
                </p>
                {/* Garis aksen bawah */}
                <div className={`mt-6 w-0 group-hover:w-16 h-0.5 bg-gradient-to-r from-${item.color}-400 to-transparent rounded-full transition-all duration-500`} />
              </motion.div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}

// ==========================================
// KOMPONEN ABOUT SECTION (merged dari About.jsx)
// ==========================================
function AboutSection() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(true);
  const [videoSrc, setVideoSrc] = useState(
    navigator.onLine ? "https://www.youtube.com/embed/sCJ82fQ_S7A" : ""
  );

  useEffect(() => {
    let timer;
    const handleOnline = () => {
      setIsOnline(true);
      setIsLoading(true);
      setVideoSrc("");
      // Tunggu 4 detik sampai DNS komputer benar-benar jalan
      timer = setTimeout(() => setVideoSrc("https://www.youtube.com/embed/sCJ82fQ_S7A"), 4000);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setVideoSrc("");
      clearTimeout(timer);
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearTimeout(timer);
    };
  }, []);

  const symbolsData = [
    { symbol: "</>", top: "15%", left: "5%", size: "4rem", rotate: -10, opacity: 0.15 },
    { symbol: "{ }", top: "60%", left: "85%", size: "5rem", rotate: 15, opacity: 0.1 }
  ];

  return (
    <section id="tentang" className="relative py-32 px-6 z-10 overflow-hidden">

      {symbolsData.map((data, index) => (
        <FloatingSymbol key={index} {...data} />
      ))}

      <div className="max-w-6xl mx-auto space-y-32 relative z-10">

        {/* ── Judul & Video ── */}
        <div className="text-center space-y-12 relative">
          <FadeIn delay={0}>
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Jaringan Global Robotik
              <span className="text-cyan-400 block mt-4 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">
                Tbotics Education
              </span>
            </h2>
            <p className="text-blue-100/70 text-lg max-w-3xl mx-auto leading-relaxed font-medium mt-8">
              Jaringan Global Robotik (Tbotics Education) merupakan jaringan edukasi robotika yang menerapkan konsep
              <span className="text-cyan-300 italic font-bold ml-1"> Learn & Play </span> melalui pendekatan
              Creative Building, Electrical Connectivity, dan Advanced Programming.
              Program dirancang untuk membangun fondasi keterampilan robotika secara terstruktur, aplikatif, dan berkelanjutan.
            </p>
          </FadeIn>

          <FadeIn delay={0.1} y={30}>
            <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-3xl overflow-hidden border-2 border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] group bg-[#0B0D21] flex items-center justify-center">
              {isOnline ? (
                <>
                  {isLoading && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0B0D21]">
                      <div className="w-12 h-12 border-4 border-cyan-900 border-t-cyan-400 rounded-full animate-spin shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                      <p className="text-cyan-400 mt-4 animate-pulse font-mono text-sm tracking-widest">MEMUAT VIDEO...</p>
                    </div>
                  )}
                  {videoSrc && (
                    <iframe
                      onLoad={() => setIsLoading(false)}
                      className={`absolute top-0 left-0 w-full h-full transform group-hover:scale-105 transition-all duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                      src={videoSrc}
                      title="Tbotics Video Profile"
                      frameBorder="0"
                      allowFullScreen
                    />
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-6 w-full h-full bg-[#0B0D21]">
                  <span className="text-5xl block mb-4 opacity-80">📶🚫</span>
                  <h3 className="text-2xl font-bold text-gray-300">Anda sedang Offline</h3>
                  <p className="text-gray-500 text-base mt-2">
                    Hubungkan perangkat ke internet untuk memutar video profil Tbotics.
                  </p>
                </div>
              )}
            </div>
          </FadeIn>
        </div>

        {/* ── Statistik ── */}
        <FadeIn delay={0} y={30}>
          <div className="grid md:grid-cols-3 gap-12 text-center bg-[#0B0D21]/40 py-12 rounded-3xl border border-blue-900/30 backdrop-blur-sm">
            <div>
              <Counter to={1000} />
              <p className="text-blue-200/50 font-bold mt-4 tracking-widest uppercase text-sm">Peserta Terlatih</p>
            </div>
            <div>
              <Counter to={50} />
              <p className="text-blue-200/50 font-bold mt-4 tracking-widest uppercase text-sm">Program Dilaksanakan</p>
            </div>
            <div>
              <Counter to={20} />
              <p className="text-blue-200/50 font-bold mt-4 tracking-widest uppercase text-sm">Institusi Bermitra</p>
            </div>
          </div>
        </FadeIn>

        {/* ── Visi & Misi ── */}
        <div className="grid md:grid-cols-2 gap-8">
          <FadeIn delay={0} y={40}>
            <div className="bg-[#0B0D21]/80 backdrop-blur-md border border-cyan-900/40 p-10 rounded-3xl shadow-[0_0_30px_-10px_rgba(34,211,238,0.2)] h-full">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center text-2xl mb-6 border border-cyan-400/50">🔭</div>
              <h3 className="text-3xl font-bold text-white mb-4">Visi <span className="text-cyan-400">Kami</span></h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Menjadi ekosistem edukasi terdepan yang menyediakan ruang berbagi pengetahuan secara bebas dan terbuka, di mana setiap anak memiliki kesempatan yang sama untuk merancang, merakit, dan memprogram masa depannya melalui teknologi.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.12} y={40}>
            <div className="bg-[#0B0D21]/80 backdrop-blur-md border border-purple-900/40 p-10 rounded-3xl shadow-[0_0_30px_-10px_rgba(168,85,247,0.2)] h-full">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-2xl mb-6 border border-purple-400/50">🚀</div>
              <h3 className="text-3xl font-bold text-white mb-4">Misi <span className="text-purple-400">Kami</span></h3>
              <ul className="space-y-4 text-gray-300 text-lg">
                <li className="flex gap-3">
                  <span className="text-purple-400 mt-1">✓</span>
                  Menyediakan kurikulum robotika yang menyenangkan (Learn & Play) dan mudah dipahami.
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 mt-1">✓</span>
                  Mendorong pemikiran kritis dan kemampuan pemecahan masalah (problem solving) melalui proyek nyata.
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 mt-1">✓</span>
                  Membangun komunitas inovator muda yang saling berkolaborasi dan berbagi wawasan teknologi.
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
}

// ==========================================
// KOMPONEN UTAMA
// ==========================================
export default function Home() {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Spring yang sangat lembut — ini kunci smooth scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 35,   // lebih rendah = lebih lambat & smooth
    damping: 20,     // lebih tinggi = tidak terlalu "bouncy"
    mass: 0.8,       // sedikit lebih berat = terasa natural
    restDelta: 0.001
  });

  // Robot: fade + slide bawah + mengecil — range lebih panjang biar tidak tiba-tiba
  const robotOpacity = useTransform(smoothProgress, [0, 0.75], [1, 0]);
  const robotY       = useTransform(smoothProgress, [0, 0.75], [0, 80]);
  const robotScale   = useTransform(smoothProgress, [0, 0.75], [0.8, 0.68]);
  const robotRotate  = useTransform(smoothProgress, [0, 0.75], [0, 12]);

  // Teks hero: fade + naik — sedikit lebih awal supaya feel paralaks
  const textOpacity  = useTransform(smoothProgress, [0, 0.6], [1, 0]);
  const textY        = useTransform(smoothProgress, [0, 0.6], [0, -60]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
  };

  const scrollToProgram = () => {
    document.getElementById('program')?.scrollIntoView({ behavior: 'smooth' });
  };

  const waNumber = "6285162534164";
  const waMessage = "Halo Admin Tbotics, saya tertarik dengan program robotikanya.";
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <main className="bg-[#02050f] text-white min-h-screen relative">

      {/* Ambient glow background */}
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at 10% 10%, rgba(6,182,212,0.08) 0%, transparent 40%), radial-gradient(circle at 90% 90%, rgba(59,130,246,0.05) 0%, transparent 40%)'
      }} />

      <SpaceDustParallax />

      {/* ── HERO SECTION ── */}
      <section ref={heroRef} className="relative h-[180vh] z-10">
        {/* sticky canvas */}
        <div className="sticky top-0 h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
          <div className="max-w-7xl w-full grid md:grid-cols-2 gap-10 items-center">

            {/* Teks — bergerak ke atas saat scroll */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ opacity: textOpacity, y: textY }}
              className="space-y-6 z-10 will-change-transform"
            >
              <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-bold leading-tight relative z-20">
                <span className="text-gray-200">
                  <TypingText text="Lebih Percaya Diri, Hadapi Masa Depan" />
                </span>
                <br />
                bersama <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 font-black uppercase tracking-widest text-6xl md:text-8xl drop-shadow-[0_0_15px_rgba(0,209,255,0.5)]">
                  TBOTICS
                </span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-gray-400 text-lg md:text-xl max-w-lg">
                Memberdayakan generasi inovator berikutnya melalui pendidikan robotika praktis untuk SD hingga SMP. Kuasai mesin masa depan, hari ini.
              </motion.p>

              <motion.div variants={itemVariants} className="flex gap-4 pt-4">
                <button
                  onClick={() => window.open(waLink, '_blank')}
                  className="border border-cyan-400 text-cyan-400 px-8 py-3 rounded-lg font-semibold hover:bg-cyan-400 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(0,209,255,0.3)] cursor-pointer"
                >
                  Mulai Sekarang
                </button>
                <button
                  onClick={scrollToProgram}
                  className="text-white hover:text-cyan-400 transition-colors duration-300 font-semibold cursor-pointer"
                >
                  Lihat Kursus →
                </button>
              </motion.div>
            </motion.div>

            {/* Robot — fade + melorot saat scroll */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 0.8 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                opacity: robotOpacity,
                y: robotY,
                scale: robotScale,
                rotate: robotRotate,
              }}
              className="z-10 will-change-transform"
            >
              <Suspense fallback={
                <div className="h-[400px] flex items-center justify-center text-cyan-400 animate-pulse font-mono">
                  Memuat Robot...
                </div>
              }>
                <Robot3D />
              </Suspense>
            </motion.div>

          </div>
        </div>
      </section>

      <AboutSection />
      <WhyChooseUsSection />

    </main>
  );
}