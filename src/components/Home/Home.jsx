import React, { useState, useEffect, Suspense, lazy, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// ==========================================
// LAZY IMPORT ROBOT 3D
// ==========================================
const Robot3D = lazy(() => import('./Robot3D'));

// ==========================================
// KONSTANTA WARNA & TEMA
// ==========================================
const THEME = {
  cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/15', border: 'border-cyan-400/40', glow: 'shadow-[0_0_25px_rgba(34,211,238,0.4)]', hex: '#22d3ee' },
  purple: { text: 'text-purple-400', bg: 'bg-purple-500/15', border: 'border-purple-400/40', glow: 'shadow-[0_0_25px_rgba(168,85,247,0.4)]', hex: '#a855f7' },
  yellow: { text: 'text-yellow-400', bg: 'bg-yellow-500/15', border: 'border-yellow-400/40', glow: 'shadow-[0_0_25px_rgba(234,179,8,0.4)]', hex: '#eab308' },
  green: { text: 'text-green-400', bg: 'bg-green-500/15', border: 'border-green-400/40', glow: 'shadow-[0_0_25px_rgba(74,222,128,0.4)]', hex: '#4ade80' },
  pink: { text: 'text-pink-400', bg: 'bg-pink-500/15', border: 'border-pink-400/40', glow: 'shadow-[0_0_25px_rgba(244,114,182,0.4)]', hex: '#f472b6' },
  orange: { text: 'text-orange-400', bg: 'bg-orange-500/15', border: 'border-orange-400/40', glow: 'shadow-[0_0_25px_rgba(251,146,60,0.4)]', hex: '#fb923c' },
};

// ==========================================
// KOMPONEN EFEK MENGETIK
// ==========================================
const TypingText = ({ text, className = "" }) => {
  const characters = Array.from(text);
  return (
    <motion.span
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.035 } } }}
      initial="hidden" animate="visible"
      className={className}
    >
      {characters.map((char, i) => (
        <motion.span key={i} variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}>
          {char}
        </motion.span>
      ))}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="inline-block w-0.5 h-[1em] bg-cyan-400 ml-0.5 align-middle"
      />
    </motion.span>
  );
};

// ==========================================
// BACKGROUND: BINTANG BERKEDIP + DEBU KOSMIK
// ==========================================
const CosmicBackground = () => {
  const [stars, setStars] = useState([]);
  const [dust, setDust] = useState([]);

  useEffect(() => {
    setStars(Array.from({ length: 80 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2.5 + 0.5,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 3,
      color: ['bg-white', 'bg-cyan-200', 'bg-purple-200', 'bg-yellow-200'][Math.floor(Math.random() * 4)],
    })));

    setDust(Array.from({ length: 30 }, (_, i) => {
      const layer = i % 3;
      const size = [1.5, 2, 3][layer];
      const dur = [32, 22, 14][layer];
      return {
        id: i, top: `${Math.random() * 100}%`, size, dur,
        delay: -(Math.random() * dur),
        opacity: [0.25, 0.45, 0.75][layer],
        color: i % 4 === 0 ? 'rgba(168,85,247,0.9)' : i % 4 === 1 ? 'rgba(234,179,8,0.9)' : i % 4 === 2 ? 'rgba(244,114,182,0.9)' : 'rgba(34,211,238,0.9)',
      };
    }));
  }, []);

  return (
    <>
      {/* Bintang statis berkedip */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {stars.map(s => (
          <motion.div
            key={s.id}
            className={`absolute rounded-full ${s.color}`}
            initial={{ opacity: 0.1, scale: 0.8 }}
            animate={{ opacity: [0.1, 1, 0.1], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
            style={{ top: s.top, left: s.left, width: s.size, height: s.size, boxShadow: '0 0 6px rgba(255,255,255,0.7)' }}
          />
        ))}
      </div>

      {/* Debu warna-warni melayang */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {dust.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              top: p.top, width: p.size, height: p.size, opacity: p.opacity,
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
              animation: `floatDust ${p.dur}s ${p.delay}s linear infinite`,
            }}
          />
        ))}
        <style>{`
          @keyframes floatDust { from { transform: translateX(110vw); } to { transform: translateX(-20vw); } }
          @keyframes wiggle { 0%,100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
          @keyframes floatUp { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
          @keyframes orbSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </>
  );
};

// ==========================================
// ORNAMEN LUAR ANGKASA PARALLAX
// ✅ FIX: ditambahkan return, dan wrapper pakai hidden lg:block
// ==========================================
const SpaceOrnaments = () => {
  const { scrollYProgress } = useScroll();
  const s = useSpring(scrollYProgress, { stiffness: 35, damping: 22 });
  const y1 = useTransform(s, [0, 1], [0, -280]);
  const y2 = useTransform(s, [0, 1], [0, 220]);
  const y3 = useTransform(s, [0, 1], [40, -180]);
  const y4 = useTransform(s, [0, 1], [-40, 160]);

  const items = [
    { style: { y: y1 }, cls: 'top-[12%] left-[4%]', em: '🤖', anim: 'wiggle 3s ease-in-out infinite', size: 'text-5xl lg:text-7xl', glow: 'drop-shadow-[0_0_18px_rgba(34,211,238,0.7)]' },
    { style: { y: y2 }, cls: 'top-[38%] right-[5%]', em: '🪐', anim: 'floatUp 5s ease-in-out infinite', size: 'text-4xl lg:text-6xl', glow: 'drop-shadow-[0_0_18px_rgba(168,85,247,0.7)]' },
    { style: { y: y3 }, cls: 'bottom-[18%] left-[7%]', em: '🚀', anim: 'floatUp 4s ease-in-out infinite 1s', size: 'text-5xl lg:text-6xl', glow: 'drop-shadow-[0_0_18px_rgba(251,191,36,0.7)]' },
    { style: { y: y4 }, cls: 'bottom-[28%] right-[10%]', em: '🛰️', anim: 'orbSpin 12s linear infinite', size: 'text-4xl lg:text-5xl', glow: 'drop-shadow-[0_0_18px_rgba(59,130,246,0.7)]' },
  ];

  // ✅ FIX: return ditambahkan, wrapper pakai hidden lg:block agar tidak tampil di mobile
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden hidden lg:block">
      {items.map((item, i) => (
        <motion.div key={i} style={item.style} className={`absolute ${item.cls}`}>
          <span className={`${item.size} ${item.glow}`} style={{ animation: item.anim }}>{item.em}</span>
        </motion.div>
      ))}
    </div>
  );
};

// ==========================================
// BADGE LABEL SECTION
// ==========================================
const SectionBadge = ({ icon, text, color = 'cyan' }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
    className={`inline-flex items-center gap-2 ${THEME[color].bg} ${THEME[color].border} border px-4 py-1.5 rounded-full mb-4 backdrop-blur-sm`}
  >
    <span className="text-base animate-bounce">{icon}</span>
    <span className={`${THEME[color].text} font-mono tracking-[0.2em] uppercase text-[0.6rem] sm:text-xs font-bold`}>{text}</span>
  </motion.div>
);

// ==========================================
// FADE IN HELPER
// ==========================================
function FadeIn({ children, delay = 0, y = 40, x = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
      viewport={{ once: true, amount: 0.12 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ==========================================
// ANIMASI COUNTER
// ==========================================
function Counter({ to, label, color = 'cyan', icon }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !seen) { setSeen(true); } }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [seen]);

  useEffect(() => {
    if (!seen) return;
    let start = 0;
    const step = Math.ceil(to / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); } else setCount(start);
    }, 20);
    return () => clearInterval(timer);
  }, [seen, to]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-5 lg:p-7">
      <span className="text-3xl mb-2">{icon}</span>
      <div className={`text-3xl md:text-4xl lg:text-5xl font-black ${THEME[color].text} font-mono tracking-tighter mb-1`}>
        {count}<span className="text-white text-2xl">+</span>
      </div>
      <p className="text-[0.6rem] sm:text-xs text-gray-300 uppercase tracking-widest font-bold text-center">{label}</p>
    </div>
  );
}

// ==========================================
// SEKSI 1 — HERO
// ==========================================
function HeroSection({ heroRef, robotOpacity, robotY, textOpacity, textY }) {
  const scrollToProgram = () => document.getElementById('siapa-kami')?.scrollIntoView({ behavior: 'smooth' });
  const waLink = `https://wa.me/6285162534164?text=${encodeURIComponent("Halo Stasiun Tbotics! Saya ingin mendaftarkan anak saya belajar robotika.")}`;

  const containerV = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.25 } },
  };
  const itemV = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section ref={heroRef} className="relative z-10 min-h-[100vh] lg:h-[160vh]">
      <div className="lg:sticky lg:top-0 min-h-screen w-full flex flex-col lg:flex-row items-center justify-center pt-24 pb-12 px-5 lg:px-10 overflow-hidden">
        <SpaceOrnaments />

        <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-6 lg:gap-10 items-center justify-between relative z-20">

          {/* ── TEKS HERO ── */}
          <motion.div
            variants={containerV} initial="hidden" animate="visible"
            style={{ opacity: textOpacity, y: textY }}
            className="space-y-4 lg:space-y-5 z-20 w-full text-center lg:text-left will-change-transform"
          >
            {/* Badge */}
            <motion.div variants={itemV} className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 bg-cyan-900/30 border border-cyan-500/30 px-4 py-1.5 rounded-full backdrop-blur-sm">
                <span className="text-base" style={{ animation: 'wiggle 2s infinite' }}>🚀</span>
                <TypingText text="READY: HELLO SPACE EXPLORER!" className="text-cyan-300 font-mono text-[0.6rem] sm:text-xs uppercase font-bold" />
              </div>
            </motion.div>

            {/* Judul */}
            <motion.h1 variants={itemV} className="font-black leading-[1.05] uppercase tracking-tight font-mono">
              <span className="text-gray-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl block drop-shadow-md">
                Lebih Percaya Diri,
              </span>
              <span className="text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl block mt-1 drop-shadow-md">
                Hadapi Masa Depan
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-4xl sm:text-5xl md:text-6xl lg:text-7xl block mt-2 drop-shadow-[0_0_30px_rgba(34,211,238,0.7)]">
                TBOTICS
              </span>
            </motion.h1>

            {/* Deskripsi */}
            <motion.p variants={itemV} className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed border-l-2 border-cyan-400 pl-4 py-1 bg-white/5 rounded-r-xl backdrop-blur-sm">
              Eksplorasi Galaksi Robotika terbaik untuk SD &amp; SMP! Pelajari{' '}
              <span className="text-cyan-400 font-bold">Elektronika · Robotika · Mikrokontroler · IoT</span>{' '}
              dengan cara yang seru dan menyenangkan!
            </motion.p>

            {/* Tags */}
            <motion.div variants={itemV} className="flex flex-wrap justify-center lg:justify-start gap-2">
              {['⚡ Elektronika', '🤖 Robotika', '🎛️ Mikrokontroler', '🌐 IoT'].map((tag, i) => (
                <span key={i} className="text-[0.65rem] sm:text-xs font-bold font-mono px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gray-200 backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Tombol */}
            <motion.div variants={itemV} className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.06, boxShadow: '0 0 30px rgba(34,211,238,0.6)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.open(waLink, '_blank')}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-8 py-3.5 rounded-full font-black uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300"
              >
                🚀 Mulai Ekspedisi
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToProgram}
                className="bg-white/10 border-2 border-white/25 text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-wider text-sm backdrop-blur-md transition-all duration-300"
              >
                🛰️ Lihat Markas
              </motion.button>
            </motion.div>
          </motion.div>

          {/* ── ROBOT 3D ── */}
          {/* ✅ FIX: tambah max-h di mobile agar tidak dorong layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ opacity: robotOpacity, y: robotY }}
            className="z-10 will-change-transform w-full flex justify-center lg:justify-end lg:w-1/2 relative max-h-[220px] sm:max-h-none"
          >
            {/* ✅ FIX: h dikurangi di mobile (h-[200px]), cincin orbit diperkecil */}
            <div className="relative w-full max-w-[260px] sm:max-w-[420px] mx-auto h-[200px] sm:h-[360px] lg:mx-0 lg:max-w-none lg:w-[560px] lg:h-[520px] xl:w-[640px] xl:h-[580px] flex justify-center items-center">

              {/* Cincin orbit dekoratif — ✅ FIX: diperkecil di mobile */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="w-[160px] h-[160px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] rounded-full border-2 border-dashed border-cyan-400/25 shadow-[0_0_40px_rgba(34,211,238,0.08)]"
                  style={{ animation: 'orbSpin 20s linear infinite' }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="w-[120px] h-[120px] sm:w-[220px] sm:h-[220px] lg:w-[300px] lg:h-[300px] rounded-full border border-purple-400/20"
                  style={{ animation: 'orbSpin 14s linear infinite reverse' }}
                />
              </div>

              {/* Dot-dot kecil di cincin — ✅ FIX: diperkecil di mobile */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="w-[160px] h-[160px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px]"
                  style={{ animation: 'orbSpin 20s linear infinite' }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                </div>
              </div>

              <Suspense fallback={
                // ✅ FIX: fallback disembunyikan di mobile xs
                <div className="hidden sm:flex flex-col items-center justify-center gap-3 bg-[#0a0f1d]/80 p-6 rounded-2xl border-2 border-cyan-900/50 backdrop-blur-md">
                  <div className="text-5xl" style={{ animation: 'floatUp 2s ease-in-out infinite' }}>🛸</div>
                  <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase font-bold animate-pulse">SUMMONING MECHA...</span>
                </div>
              }>
                <Robot3D />
              </Suspense>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ==========================================
// SEKSI 2 — STATISTIK STRIP
// ==========================================
function StatsStrip() {
  const stats = [
    { to: 1500, label: 'Peserta Didik', color: 'cyan', icon: '👨‍🚀' },
    { to: 13, label: 'Tahun Berpengalaman', color: 'yellow', icon: '🏆' },
    { to: 100, label: 'Tingkat TK–Lanjut', color: 'purple', icon: '📚' },
    { to: 20, label: 'Sekolah Rekanan', color: 'green', icon: '🏫' },
  ];

  return (
    <FadeIn y={30}>
      <div className="relative z-20 max-w-6xl mx-auto px-5 -mt-6 lg:-mt-16 mb-16 lg:mb-24">
        <div className="w-full bg-[#02050f]/80 backdrop-blur-xl border border-cyan-900/40 rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.12)]">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10">
            {stats.map((s, i) => <Counter key={i} {...s} />)}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

// ==========================================
// SEKSI 3 — KARGO KOMPONEN (INTERACTIVE)
// ==========================================
function CargoSection() {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 45, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 22 });

  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(((clientX - rect.left) / rect.width - 0.5) * 2);
    mouseY.set(((clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const components = [
    { name: 'Mikrokontroler', icon: '🎛️', color: 'green', depth: 45, top: '18%', left: '12%' },
    { name: 'Ultrasonic', icon: '👀', color: 'cyan', depth: -35, top: '22%', left: '68%' },
    { name: 'LED RGB', icon: '💡', color: 'yellow', depth: 60, top: '58%', left: '9%' },
    { name: 'Servo Motor', icon: '⚙️', color: 'orange', depth: -50, top: '52%', left: '64%' },
    { name: 'IoT Module', icon: '🌐', color: 'purple', depth: 25, top: '40%', left: '38%' },
    { name: 'Baterai 9V', icon: '🔋', color: 'pink', depth: -22, top: '72%', left: '42%' },
  ];

  return (
    <section className="relative py-16 lg:py-24 px-5 z-10">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-8 lg:mb-12">
          <SectionBadge icon="🎒" text="Kargo Komponen Antariksa" color="purple" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase font-mono drop-shadow-md">
            <span className="text-purple-400">///</span> Isi Lab Robotika Kami
          </h2>
          <p className="text-gray-400 mt-2 font-mono text-xs sm:text-sm">
            Gerakkan kursor / sentuh untuk menjelajahi komponen station kami!
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div
            className="relative w-full h-[380px] sm:h-[480px] bg-[#080d1e]/90 backdrop-blur-md border-2 border-cyan-900/50 rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.12)]"
          >
            {/* Grid background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />
            <div
              ref={containerRef}
              onMouseMove={handlePointerMove}
              onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
              onTouchMove={handlePointerMove}
              onTouchEnd={() => { mouseX.set(0); mouseY.set(0); }}
              className="absolute inset-0 cursor-crosshair"
            >
              {components.map((item, idx) => {
                const ix = useTransform(springX, [-1, 1], [-item.depth, item.depth]);
                const iy = useTransform(springY, [-1, 1], [-item.depth, item.depth]);
                const t = THEME[item.color];
                return (
                  <motion.div
                    key={idx}
                    style={{ x: ix, y: iy, top: item.top, left: item.left, position: 'absolute' }}
                    whileHover={{ scale: 1.15 }}
                    className="flex flex-col items-center gap-1.5 pointer-events-none"
                  >
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 ${t.bg} ${t.border} border-2 rounded-full flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl backdrop-blur-sm ${t.glow}`}>
                      {item.icon}
                    </div>
                    <span className={`font-mono text-[0.6rem] sm:text-xs font-bold ${t.text} bg-[#02050f]/80 px-2 py-0.5 rounded-full border border-white/10 whitespace-nowrap`}>
                      {item.name}
                    </span>
                  </motion.div>
                );
              })}
              {/* Center label */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                <div className="text-8xl sm:text-9xl font-black text-cyan-400 font-mono select-none">⊕</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ==========================================
// SEKSI 4 — SIAPA KAMI
// ==========================================
function WhoAreWeSection() {
  return (
    <section id="siapa-kami" className="relative py-20 lg:py-32 px-5 z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

          {/* Kiri — Teks */}
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
                  { icon: '⚙️', title: 'Mekanika', desc: 'Merakit pondasi & rangka robotik', color: 'cyan' },
                  { icon: '💻', title: 'Coding', desc: 'Menulis logika ke otak mesin', color: 'purple' },
                  { icon: '⚡', title: 'Elektronika', desc: 'Rangkaian & sensor canggih', color: 'yellow' },
                  { icon: '🌐', title: 'IoT', desc: 'Koneksi robot ke internet', color: 'green' },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4, scale: 1.03 }}
                    className={`bg-[#0a0f1d] border ${THEME[card.color].border} p-4 rounded-2xl ${THEME[card.color].glow} transition-all duration-300`}
                  >
                    <div className="text-2xl mb-2">{card.icon}</div>
                    <h4 className={`${THEME[card.color].text} font-bold text-sm sm:text-base`}>{card.title}</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-snug">{card.desc}</p>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Kanan — Gambar */}
          <div className="w-full lg:w-1/2">
            <FadeIn delay={0.3} x={40}>
              <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden border-2 border-cyan-900/40 shadow-[0_0_50px_rgba(34,211,238,0.15)] group bg-[#0a0f1d]">
                <div className="absolute inset-0 bg-cyan-500/8 mix-blend-overlay z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-500" />
                <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-red-500/50">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_#ef4444]" />
                  <span className="text-red-400 font-mono text-[0.6rem] sm:text-xs tracking-widest font-bold">LIVE FEED</span>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1535303311164-664fc9ce6261?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Anak belajar robotika"
                  className="w-full h-[280px] sm:h-[360px] lg:h-[450px] object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#02050f] via-[#02050f]/70 to-transparent p-5 pt-14 z-20">
                  <h3 className="text-white font-bold text-base sm:text-lg flex items-center gap-2 font-mono">
                    <span className="text-cyan-400 animate-pulse">▹</span> Belajar Sambil Bermain
                  </h3>
                  <p className="text-cyan-200/60 text-xs sm:text-sm mt-1 font-mono tracking-wide">Status: Mengudara menuju masa depan... 🚀</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// SEKSI 5 — DOKUMENTASI MISI
// ==========================================
const docData = [
  { img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', title: 'Juara I Madrasah Robotic Competition 2025', tag: '🥇 Juara 1', color: 'yellow' },
  { img: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', title: 'World Innovation Tech Challenge 2024 — Chonnam National University, Korea', tag: '🌏 Internasional', color: 'cyan' },
  { img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', title: 'Sindo Robotic Olympiad 2017 — Budaya Indonesia', tag: '🏆 Olimpiade', color: 'purple' },
];

function DocumentationSection() {
  return (
    <section className="relative py-20 lg:py-28 px-5 z-10">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-12 lg:mb-16">
          <SectionBadge icon="📂" text="Archive Logs — Misi Berhasil" color="yellow" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-mono">
            <span className="text-cyan-400">Dokumentasi</span> Misi
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm sm:text-base font-medium">
            Rekam jejak para inovator muda Tbotics dalam kompetisi tingkat Nasional & Internasional.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
          {docData.map((doc, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group bg-[#080d1e]/80 backdrop-blur-sm border-2 ${THEME[doc.color].border} rounded-2xl lg:rounded-3xl overflow-hidden hover:${THEME[doc.color].glow} transition-all duration-400 h-full flex flex-col cursor-default`}
              >
                <div className="relative h-44 sm:h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080d1e] to-transparent opacity-70 z-10" />
                  <img src={doc.img} alt={doc.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <span className={`absolute top-3 left-3 z-20 text-xs font-bold font-mono px-3 py-1 rounded-full ${THEME[doc.color].bg} ${THEME[doc.color].text} border ${THEME[doc.color].border}`}>
                    {doc.tag}
                  </span>
                </div>
                <div className="p-5 flex-1">
                  <h3 className={`text-white font-bold text-sm sm:text-base leading-snug group-hover:${THEME[doc.color].text} transition-colors`}>
                    {doc.title}
                  </h3>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// SEKSI 6 — VISI & MISI (ORBIT TIMELINE)
// ==========================================
function VisiMisiSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start center', 'end center'] });
  const lineH = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const items = [
    {
      color: 'cyan', icon: '🔭', label: 'Visi Stasiun',
      content: (
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-medium">
          Menjadi mitra pendidikan terdepan dalam pengembangan Robotika dan STEAM yang inovatif, inklusif, dan berdaya saing global — membentuk generasi kreatif &amp; kritis untuk masa depan.
        </p>
      ),
    },
    {
      color: 'purple', icon: '🚀', label: 'Misi Penjelajahan',
      content: (
        <ul className="space-y-3 text-gray-300 text-sm sm:text-base font-medium">
          {[
            'Hadirkan pembelajaran teknologi yang menyenangkan & bermakna.',
            'Bekali keterampilan abad 21 menuju Indonesia Emas 2045.',
            'Dukung guru dalam transformasi pembelajaran digital.',
            'Bangun ekosistem pendidikan berbasis inovasi.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-cyan-400 text-lg leading-none mt-0.5">✦</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <section ref={sectionRef} id="visi-misi" className="relative py-20 lg:py-32 px-5 z-10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[50%] bg-purple-900/8 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <FadeIn className="text-center mb-14 lg:mb-20">
          <SectionBadge icon="🪐" text="Jalur Orbit — Tujuan Kami" color="cyan" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-mono">Visi &amp; Misi</h2>
        </FadeIn>

        <div className="relative">
          {/* Garis orbit */}
          <div className="absolute left-5 sm:left-8 top-0 bottom-0 w-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div style={{ height: lineH }} className="w-full bg-gradient-to-b from-cyan-400 to-purple-500 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
          </div>

          <div className="space-y-12 lg:space-y-16">
            {items.map((item, i) => {
              const t = THEME[item.color];
              return (
                <FadeIn key={i} delay={i * 0.15} x={30}>
                  <div className="flex items-start gap-5 sm:gap-8 pl-14 sm:pl-20">
                    {/* Node */}
                    <div className={`absolute left-5 sm:left-8 -translate-x-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#04071a] border-4 ${t.border} flex items-center justify-center z-10 ${t.glow}`}>
                      <span className="text-sm sm:text-base">{item.icon}</span>
                    </div>
                    {/* Card */}
                    <motion.div
                      whileHover={{ x: 6 }}
                      className={`w-full bg-[#080d1e]/80 backdrop-blur-md border-2 ${t.border} p-5 sm:p-7 rounded-2xl lg:rounded-3xl transition-all duration-300 hover:${t.glow}`}
                    >
                      <div className={`${t.text} font-mono font-bold text-xs sm:text-sm mb-3 uppercase tracking-wider`}>
                        {item.label}
                      </div>
                      {item.content}
                    </motion.div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// SEKSI 7 — KENAPA PILIH KAMI
// ==========================================
const techSpecs = [
  { icon: '👨‍🚀', title: 'Trainer Berpengalaman', desc: 'Instruktur profesional & ramah, siap membimbing astronot cilik dari level pemula hingga mahir.', color: 'cyan' },
  { icon: '🦿', title: 'Fasilitas Modern', desc: 'Peralatan robotika terkini — mikrokontroler, sensor, komponen mekanikal yang selalu diperbarui.', color: 'green' },
  { icon: '💎', title: 'Harga Terjangkau', desc: 'Biaya eksplorasi yang jelas & terjangkau. Price start from 150K IDR. Tanpa biaya tersembunyi!', color: 'purple' },
  { icon: '🛡️', title: 'Pelayanan Terjamin', desc: 'Komitmen pelayanan maksimal dari pendaftaran hingga selesai program. Kepuasan adalah prioritas!', color: 'yellow' },
];

function WhyChooseUsSection() {
  return (
    <section id="mengapa-kami" className="relative py-20 lg:py-28 px-5 z-10">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-12 lg:mb-16">
          <SectionBadge icon="🏅" text="Spesifikasi Stasiun Tbotics" color="yellow" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-mono">
            Kenapa Pilih <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Kami?</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {techSpecs.map((item, i) => {
            const t = THEME[item.color];
            return (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
                  className={`h-full bg-[#080d1e]/80 backdrop-blur-md border-2 border-slate-700/60 hover:${t.border} rounded-2xl lg:rounded-3xl p-6 lg:p-7 flex flex-col items-center text-center hover:${t.glow} transition-all duration-350 group cursor-default`}
                >
                  <div className={`w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 ${t.bg} ${t.border} border-2 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-400 ${t.glow}`}>
                    {item.icon}
                  </div>
                  <h3 className={`text-white font-black text-sm sm:text-base uppercase tracking-wide mb-3 font-mono group-hover:${t.text} transition-colors`}>
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  <div className={`mt-4 w-0 group-hover:w-16 h-0.5 rounded-full transition-all duration-500`} style={{ background: `linear-gradient(to right, ${t.hex}, transparent)` }} />
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// SEKSI — LAYANAN KAMI
// ==========================================
function LayananSection() {
  const navigate = useNavigate();
  const layanan = [
    {
      icon: '🏫',
      title: 'Ekstrakurikuler / Intrakurikuler',
      desc: 'Kerjasama dengan pihak penyelenggara sekolah untuk program robotika terintegrasi kurikulum.',
      color: 'cyan',
      badge: 'Sekolah',
    },
    {
      icon: '👥',
      title: 'Reguler Class',
      desc: 'Kelas robotik kelompok umum. Belajar bareng, lebih seru dan kolaboratif!',
      color: 'purple',
      badge: 'Kelompok',
    },
    {
      icon: '🎯',
      title: 'Private Class',
      desc: 'Kelas robotik eksklusif 1-on-1. Materi disesuaikan penuh dengan kebutuhan siswa.',
      color: 'yellow',
      badge: 'Eksklusif',
    },
    {
      icon: '🏆',
      title: 'Mentoring Kompetisi',
      desc: 'Pendampingan siswa ke jalur kompetisi robotik dari tingkat Nasional hingga Internasional.',
      color: 'green',
      badge: 'Kompetisi',
    },
  ];

  return (
    <section className="relative py-20 lg:py-28 px-5 z-10">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-12 lg:mb-16">
          <SectionBadge icon="🛰️" text="Program Stasiun Tbotics" color="cyan" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-mono">
            Layanan <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Kami</span>
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm sm:text-base font-medium">
            Tersedia berbagai program untuk semua kebutuhan ekspedisi robotika Anda.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-10">
          {layanan.map((item, i) => {
            const t = THEME[item.color];
            return (
              <FadeIn key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`h-full bg-[#080d1e]/80 backdrop-blur-md border-2 ${t.border} rounded-2xl lg:rounded-3xl p-6 flex flex-col gap-3 group cursor-default transition-all duration-300 hover:${t.glow}`}
                >
                  {/* Badge */}
                  <span className={`self-start text-[0.6rem] font-black font-mono uppercase tracking-widest px-2.5 py-1 rounded-full ${t.bg} ${t.text} border ${t.border}`}>
                    {item.badge}
                  </span>
                  {/* Icon */}
                  <div className={`w-14 h-14 ${t.bg} ${t.border} border-2 rounded-2xl flex items-center justify-center text-3xl ${t.glow} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  {/* Text */}
                  <h3 className={`${t.text} font-black text-sm sm:text-base font-mono uppercase leading-snug`}>
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed flex-1">
                    {item.desc}
                  </p>
                  {/* Bottom line */}
                  <div className={`w-0 group-hover:w-full h-0.5 rounded-full transition-all duration-500`}
                    style={{ background: `linear-gradient(to right, ${t.hex}, transparent)` }} />
                </motion.div>
              </FadeIn>
            );
          })}
        </div>

        {/* CTA ke halaman Akademi & Program */}
        <FadeIn delay={0.3} className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34,211,238,0.5)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              navigate('/program');
              window.scrollTo(0, 0);
            }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-2 border-cyan-400/40 hover:border-cyan-400/80 text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-wider text-sm backdrop-blur-md transition-all duration-300"
          >
            <span className="text-cyan-400">📚</span>
            Lihat Semua Program Lengkap
            <span className="text-cyan-400 text-base">→</span>
          </motion.button>
        </FadeIn>
      </div>
    </section>
  );
}

// ==========================================
// SEKSI — WAKTU & CARA EDUKASI
// ==========================================
function WaktuEdukasiSection() {
  const details = [
    { icon: '📅', label: 'Frekuensi', value: '1× per minggu', color: 'cyan' },
    { icon: '⏱️', label: 'Durasi', value: '±45–60 menit / pertemuan', color: 'purple' },
    { icon: '🌐', label: 'Mode Belajar', value: 'Offline & Online', color: 'green' },
    { icon: '📶', label: 'Level', value: 'TK hingga Tingkat Lanjut', color: 'yellow' },
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
          {/* Kiri — Info Grid */}
          <FadeIn delay={0.1} className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
            {details.map((d, i) => {
              const t = THEME[d.color];
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -4, scale: 1.03 }}
                  className={`bg-[#080d1e]/80 backdrop-blur-md border-2 ${t.border} rounded-2xl p-5 flex flex-col gap-2 ${t.glow} transition-all duration-300`}
                >
                  <span className="text-3xl">{d.icon}</span>
                  <p className="text-gray-400 text-[0.6rem] sm:text-xs font-mono uppercase tracking-widest font-bold">{d.label}</p>
                  <p className={`${t.text} font-black text-sm sm:text-base font-mono leading-snug`}>{d.value}</p>
                </motion.div>
              );
            })}
          </FadeIn>

          {/* Kanan — Highlight Card */}
          <FadeIn delay={0.25} x={40} className="w-full lg:w-1/2">
            <div className="relative bg-[#080d1e]/80 backdrop-blur-md border-2 border-cyan-400/30 rounded-2xl lg:rounded-3xl p-7 sm:p-9 shadow-[0_0_50px_rgba(34,211,238,0.1)] overflow-hidden">
              {/* Glow dekoratif */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none" />

              <div className="relative z-10 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="text-4xl" style={{ animation: 'floatUp 3s ease-in-out infinite' }}>🚀</span>
                  <div>
                    <p className="text-cyan-400 font-mono font-black text-xs uppercase tracking-widest">Sistem Pembelajaran</p>
                    <h3 className="text-white font-black text-lg sm:text-xl font-mono uppercase leading-tight mt-0.5">
                      Fleksibel & Terstruktur
                    </h3>
                  </div>
                </div>

                <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-medium border-l-2 border-cyan-400 pl-4">
                  Pembelajaran dilaksanakan <strong className="text-cyan-400">1 kali per minggu</strong> dengan durasi{' '}
                  <strong className="text-purple-400">±45–60 menit</strong> per pertemuan. Dapat dilakukan secara{' '}
                  <strong className="text-green-400">offline</strong> maupun <strong className="text-green-400">online</strong> sesuai kebutuhan.
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {['🏠 Offline', '💻 Online', '👦 SD–SMP', '🎓 Semua Level'].map((tag, i) => (
                    <span key={i} className="text-[0.65rem] sm:text-xs font-bold font-mono px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gray-200 backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Progress visual */}
                <div className="space-y-2 pt-1">
                  {[
                    { label: 'Teori & Konsep', pct: 30, color: '#22d3ee' },
                    { label: 'Praktik Merakit', pct: 50, color: '#a855f7' },
                    { label: 'Uji & Presentasi', pct: 20, color: '#4ade80' },
                  ].map((bar, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-400 text-[0.6rem] font-mono uppercase tracking-wider">{bar.label}</span>
                        <span className="text-gray-400 text-[0.6rem] font-mono">{bar.pct}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${bar.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded-full"
                          style={{ background: bar.color, boxShadow: `0 0 8px ${bar.color}` }}
                        />
                      </div>
                    </div>
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

// ==========================================
// CTA PENUTUP
// ==========================================
function CtaSection() {
  const waLink = `https://wa.me/6285162534164?text=${encodeURIComponent("Halo Stasiun Tbotics! Saya ingin mendaftarkan anak saya belajar robotika.")}`;
  return (
    <section className="relative py-20 lg:py-28 px-5 z-10 overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/8 rounded-full blur-[80px]" />
      </div>

      <FadeIn className="max-w-3xl mx-auto text-center relative z-10">
        <div className="text-6xl sm:text-7xl mb-6" style={{ animation: 'floatUp 3s ease-in-out infinite' }}>🚀</div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-mono leading-tight mb-4">
          Siap Memulai <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Ekspedisi Robotika?</span>
        </h2>
        <p className="text-gray-300 text-sm sm:text-base lg:text-lg font-medium mb-8 max-w-lg mx-auto">
          Bergabunglah bersama 1.500+ murid robotik yang telah merakit masa depan mereka bersama Tbotics!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.07, boxShadow: '0 0 35px rgba(34,211,238,0.6)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => window.open(waLink, '_blank')}
            className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-9 py-4 rounded-full font-black uppercase tracking-wider text-sm shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all"
          >
            🚀 Daftar Sekarang
          </motion.button>
          {/* <motion.button
            whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.15)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => window.open(waLink, '_blank')}
            className="bg-white/10 border-2 border-white/25 text-white px-9 py-4 rounded-full font-bold uppercase tracking-wider text-sm backdrop-blur-md transition-all"
          >
            💬 Tanya Admin
          </motion.button> */}
        </div>
      </FadeIn>
    </section>
  );
}

// ==========================================
// KOMPONEN UTAMA — HOME
// ==========================================
export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 38, damping: 24, mass: 0.6 });

  const robotOpacity = useTransform(smoothProgress, [0, 0.8], [1, 0]);
  const robotY = useTransform(smoothProgress, [0, 0.8], [0, 90]);
  const textOpacity = useTransform(smoothProgress, [0, 0.55], [1, 0]);
  const textY = useTransform(smoothProgress, [0, 0.55], [0, -55]);

  return (
    <main className="bg-[#02050f] text-white min-h-screen relative selection:bg-cyan-400 selection:text-black font-sans overflow-x-hidden">

      {/* ── GLOBAL BACKGROUND ── */}
      <CosmicBackground />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/8 via-[#02050f]/80 to-black" />

      {/* ── SECTIONS ── */}
      <HeroSection
        heroRef={heroRef}
        robotOpacity={robotOpacity}
        robotY={robotY}
        textOpacity={textOpacity}
        textY={textY}
      />
      <StatsStrip />
      {/* <CargoSection /> */}
      <WhyChooseUsSection />
      <WhoAreWeSection />
      <VisiMisiSection />
      <LayananSection />
      <WaktuEdukasiSection />
      <DocumentationSection />
      <CtaSection />

    </main>
  );
}