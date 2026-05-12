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
    <div className="text-4xl lg:text-5xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
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
      className="absolute z-0 font-mono text-cyan-500 pointer-events-none select-none hidden lg:block"
    >
      <span style={{ fontSize: size }} className="drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
        {symbol}
      </span>
    </motion.div>
  );
}

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
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 40, damping: 22, mass: 0.6 });

  const orbY1 = useTransform(smooth, [0, 1], [80,  -80]);
  const orbY2 = useTransform(smooth, [0, 1], [-60, 100]);
  const orbX1 = useTransform(smooth, [0, 1], [-30,  30]);
  const orbX2 = useTransform(smooth, [0, 1], [30,  -30]);

  const headerScale  = useTransform(smooth, [0, 0.3, 0.7], [0.7, 1, 1.08]);
  const headerOpacity = useTransform(smooth, [0, 0.15, 0.75, 1], [0, 1, 1, 0]);
  const headerY      = useTransform(smooth, [0, 0.5], [60, -40]);
  const subtitleX    = useTransform(smooth, [0.1, 0.4], [-80, 0]);
  const lineScale    = useTransform(smooth, [0.15, 0.45], [0, 1]);

  return (
    <section ref={sectionRef} id="mengapa-kami" className="relative py-20 lg:py-32 px-6 z-10 overflow-hidden">
      <motion.div style={{ y: orbY1, x: orbX1 }} className="absolute top-10 left-[-80px] w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] rounded-full pointer-events-none will-change-transform" aria-hidden>
        <div className="w-full h-full rounded-full bg-cyan-500/10 blur-[80px] lg:blur-[120px]" />
      </motion.div>
      <motion.div style={{ y: orbY2, x: orbX2 }} className="absolute bottom-0 right-[-80px] w-[250px] lg:w-[400px] h-[250px] lg:h-[400px] rounded-full pointer-events-none will-change-transform" aria-hidden>
        <div className="w-full h-full rounded-full bg-blue-600/12 blur-[80px] lg:blur-[120px]" />
      </motion.div>
      <motion.div style={{ y: orbY1 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] lg:w-[600px] h-[150px] lg:h-[250px] rounded-full pointer-events-none will-change-transform" aria-hidden>
        <div className="w-full h-full rounded-full bg-purple-600/6 blur-[100px] lg:blur-[140px]" />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div style={{ scale: headerScale, opacity: headerOpacity, y: headerY }} className="text-center mb-16 lg:mb-24 will-change-transform origin-center">
          <motion.p style={{ x: subtitleX }} className="text-cyan-400 font-mono tracking-[0.3em] uppercase text-xs lg:text-sm mb-4 will-change-transform">
            Keunggulan Kami
          </motion.p>
          <h2 className="text-3xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Kenapa Harus Pilih
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 block mt-2 lg:mt-3 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)] lg:drop-shadow-[0_0_30px_rgba(34,211,238,0.6)]">
              Tbotics?
            </span>
          </h2>
          <div className="relative mx-auto mt-6 lg:mt-8 w-32 lg:w-48 h-1 overflow-visible flex items-center justify-center">
            <motion.div style={{ scaleX: lineScale }} className="absolute w-full h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full origin-center will-change-transform" />
            <motion.div style={{ scale: lineScale }} className="relative w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] will-change-transform" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {whyData.map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 50, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, amount: 0.3 }} 
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              className="h-full"
            >
              <motion.div whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }} className={`group bg-[#0B0D21]/80 backdrop-blur-md border ${item.border} p-8 lg:p-10 rounded-3xl ${item.glow} h-full cursor-default relative overflow-hidden`}>
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 50% 0%, ${item.color === 'cyan' ? 'rgba(34,211,238,0.1)' : item.color === 'blue' ? 'rgba(59,130,246,0.1)' : item.color === 'purple' ? 'rgba(168,85,247,0.1)' : 'rgba(234,179,8,0.1)'} 0%, transparent 65%)` }} />
                <div className={`w-12 h-12 lg:w-14 lg:h-14 ${item.iconBg} rounded-2xl flex items-center justify-center text-2xl lg:text-3xl mb-5 lg:mb-6 border ${item.iconBorder} group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 relative z-10`}>
                  {item.icon}
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 lg:mb-3 transition-colors duration-300 relative z-10">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm lg:text-base relative z-10">
                  {item.desc}
                </p>
                <div className="mt-5 lg:mt-6 w-0 group-hover:w-20 lg:group-hover:w-24 h-0.5 rounded-full transition-all duration-700 relative z-10" style={{ background: `linear-gradient(to right, ${item.color === 'cyan' ? '#22d3ee' : item.color === 'blue' ? '#60a5fa' : item.color === 'purple' ? '#c084fc' : '#facc15'}, transparent)` }} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// KOMPONEN ABOUT SECTION
// ==========================================
function AboutSection() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(true);
  const [videoSrc, setVideoSrc] = useState(navigator.onLine ? "https://www.youtube.com/embed/sCJ82fQ_S7A" : "");

  useEffect(() => {
    let timer;
    const handleOnline = () => {
      setIsOnline(true);
      setIsLoading(true);
      setVideoSrc("");
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
    <section id="tentang" className="relative py-20 lg:py-32 px-6 z-10 overflow-hidden">
      {symbolsData.map((data, index) => (
        <FloatingSymbol key={index} {...data} className="hidden lg:block" />
      ))}
      <div className="max-w-6xl mx-auto space-y-20 lg:space-y-32 relative z-10">
        <div className="text-center space-y-8 lg:space-y-12 relative">
          <FadeIn delay={0}>
            <h2 className="text-3xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Jaringan Global Robotik
              <span className="text-cyan-400 block mt-2 lg:mt-4 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)] text-4xl lg:text-6xl">
                Tbotics Education
              </span>
            </h2>
            <p className="text-blue-100/70 text-base lg:text-lg max-w-3xl mx-auto leading-relaxed font-medium mt-6 lg:mt-8">
              Jaringan Global Robotik (Tbotics Education) merupakan jaringan edukasi robotika yang menerapkan konsep
              <span className="text-cyan-300 italic font-bold ml-1"> Learn & Play </span> melalui pendekatan
              Creative Building, Electrical Connectivity, dan Advanced Programming.
              Program dirancang untuk membangun fondasi keterampilan robotika secara terstruktur, aplikatif, dan berkelanjutan.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} y={30}>
            <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-2xl lg:rounded-3xl overflow-hidden border-2 border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)] lg:shadow-[0_0_50px_rgba(6,182,212,0.15)] group bg-[#0B0D21] flex items-center justify-center">
              {isOnline ? (
                <>
                  {isLoading && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0B0D21]">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 border-4 border-cyan-900 border-t-cyan-400 rounded-full animate-spin shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                      <p className="text-cyan-400 mt-4 animate-pulse font-mono text-xs lg:text-sm tracking-widest">MEMUAT VIDEO...</p>
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
                  <span className="text-4xl lg:text-5xl block mb-4 opacity-80">📶🚫</span>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-300">Anda sedang Offline</h3>
                  <p className="text-gray-500 text-sm lg:text-base mt-2">
                    Hubungkan perangkat ke internet untuk memutar video profil Tbotics.
                  </p>
                </div>
              )}
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0} y={30}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 text-center bg-[#0B0D21]/40 py-8 lg:py-12 rounded-3xl border border-blue-900/30 backdrop-blur-sm">
            <div>
              <Counter to={1000} />
              <p className="text-blue-200/50 font-bold mt-2 lg:mt-4 tracking-widest uppercase text-xs lg:text-sm">Peserta Terlatih</p>
            </div>
            <div>
              <Counter to={50} />
              <p className="text-blue-200/50 font-bold mt-2 lg:mt-4 tracking-widest uppercase text-xs lg:text-sm">Program Dilaksanakan</p>
            </div>
            <div>
              <Counter to={20} />
              <p className="text-blue-200/50 font-bold mt-2 lg:mt-4 tracking-widest uppercase text-xs lg:text-sm">Institusi Bermitra</p>
            </div>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          <FadeIn delay={0} y={40}>
            <div className="bg-[#0B0D21]/80 backdrop-blur-md border border-cyan-900/40 p-8 lg:p-10 rounded-3xl shadow-[0_0_30px_-10px_rgba(34,211,238,0.2)] h-full">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center text-2xl mb-6 border border-cyan-400/50">🔭</div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">Visi <span className="text-cyan-400">Kami</span></h3>
              <p className="text-gray-300 leading-relaxed text-base lg:text-lg">
                Menjadi mitra pendidikan terdepan dalam pengembangan pembelajaran robotika dan pendekatan pembelajaran berbasis STEAM yang inovatif, inklusif, dan berdaya saing global, guna membentuk generasi kreatif, kritis, dan siap menghadapi tantangan masa depan.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.12} y={40}>
            <div className="bg-[#0B0D21]/80 backdrop-blur-md border border-purple-900/40 p-8 lg:p-10 rounded-3xl shadow-[0_0_30px_-10px_rgba(168,85,247,0.2)] h-full">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-2xl mb-6 border border-purple-400/50">🚀</div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">Misi <span className="text-purple-400">Kami</span></h3>
              <ul className="space-y-3 lg:space-y-4 text-gray-300 text-base lg:text-lg">
                <li className="flex gap-3">
                  <span className="text-purple-400 mt-1">✓</span>
                  Menghadirkan pembelajaran teknologi yang menyenangkan dan bermakna.
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 mt-1">✓</span>
                  Membekali siswa dengan keterampilan abad 21 demi menyongsong Indonesia Emas 2045.
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 mt-1">✓</span>
                  Mendukung guru dalam transformasi pembelajaran digital.
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 mt-1">✓</span>
                  Membangun ekosistem pendidikan berbasis inovasi.
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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 35,
    damping: 20,
    mass: 0.8,
    restDelta: 0.001
  });

  const robotOpacity = useTransform(smoothProgress, [0, 0.75], [1, 0]);
  const robotY       = useTransform(smoothProgress, [0, 0.75], [0, 80]);
  const robotScale   = useTransform(smoothProgress, [0, 0.75], [0.8, 0.68]);
  const robotRotate  = useTransform(smoothProgress, [0, 0.75], [0, 12]);

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
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at 10% 10%, rgba(6,182,212,0.08) 0%, transparent 40%), radial-gradient(circle at 90% 90%, rgba(59,130,246,0.05) 0%, transparent 40%)'
      }} />

      <SpaceDustParallax />

      {/* ── HERO SECTION ── */}
      <section ref={heroRef} className="relative z-10 min-h-[100vh] lg:h-[180vh] flex lg:block items-center">
        {/* 👇 PERUBAHAN: Kelas khusus tablet landscape `tall:max-lg:flex-row` dan tinggi 100vh diganti min-h-screen di mobile 👇 */}
        <div className="lg:sticky lg:top-0 min-h-screen lg:h-screen w-full flex flex-col lg:flex-row items-center justify-center pt-24 pb-12 lg:pt-28 lg:pb-0 px-5 lg:px-8 overflow-hidden">
          
          <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-8 lg:gap-10 items-center justify-between h-auto">

            {/* Teks */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ opacity: textOpacity, y: textY }}
              className="space-y-4 lg:space-y-6 z-10 will-change-transform w-full text-center lg:text-left" 
            >
              <motion.h1 variants={itemVariants} className="font-bold leading-tight relative z-20">
                <span className="text-gray-200 text-3xl sm:text-4xl md:text-5xl lg:text-6xl block">
                  <TypingText text="Lebih Percaya Diri, Hadapi Masa Depan" />
                </span>
                <span className="hidden lg:inline text-gray-200 text-2xl sm:text-4xl lg:text-4xl">bersama <br /></span>
                <span className="lg:hidden block text-xl sm:text-2xl text-gray-400 mt-2 sm:mt-4">bersama</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 font-black uppercase tracking-widest text-5xl sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-[0_0_15px_rgba(0,209,255,0.5)] leading-none mt-1 block lg:inline">
                  TBOTICS
                </span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-gray-400 text-sm sm:text-lg lg:text-xl max-w-lg mx-auto lg:mx-0 hidden sm:block">
                Memberdayakan generasi inovator berikutnya melalui pendidikan robotika praktis untuk SD hingga SMP. Kuasai mesin masa depan, hari ini.
              </motion.p>

              <motion.div variants={itemVariants} className="flex justify-center lg:justify-start gap-3 sm:gap-4 pt-3 lg:pt-4">
                <button
                  onClick={() => window.open(waLink, '_blank')}
                  className="border border-cyan-400 text-cyan-400 px-5 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-cyan-400 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(0,209,255,0.3)] cursor-pointer"
                >
                  Mulai Sekarang
                </button>
                <button
                  onClick={scrollToProgram}
                  className="text-white hover:text-cyan-400 transition-colors duration-300 font-semibold text-sm sm:text-base cursor-pointer px-2"
                >
                  Lihat Kursus →
                </button>
              </motion.div>
            </motion.div>

            {/* Robot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 0.8 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ opacity: robotOpacity, y: robotY, scale: robotScale, rotate: robotRotate }}
              className="z-10 will-change-transform w-full flex justify-center lg:justify-end lg:w-1/2 relative"
            >
              {/* 👇 PERUBAHAN: Memperkecil tinggi di iPad Landscape agar tidak tumpang tindih 👇 */}
              <div className="w-[110vw] h-[320px] sm:h-[400px] relative left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:left-auto lg:w-[600px] lg:h-[500px] xl:w-[700px] xl:h-[600px] flex justify-center items-center">
                <Suspense fallback={
                  <div className="h-full flex items-center justify-center text-cyan-400 animate-pulse font-mono text-xs sm:text-base">
                    Memuat...
                  </div>
                }>
                  <Robot3D />
                </Suspense>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <AboutSection />
      <WhyChooseUsSection />

    </main>
  );
}