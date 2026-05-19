// ============================================================
// Home.jsx — Tbotics Education Landing Page
// Terakhir diperbarui: 2026
//
// STRUKTUR HALAMAN:
//   1. HeroSection        — Banner utama + Robot 3D
//   2. StatsStrip         — Statistik angka (counter animasi)
//   3. ShowcaseSection    — Foto aksi siswa + filter level
//   4. WhyChooseUsSection — Keunggulan Tbotics
//   5. WhoAreWeSection    — Tentang kami + VideoPlayer
//   6. VisiMisiSection    — Visi & Misi (scroll timeline)
//   7. LayananSection     — Program yang tersedia
//   8. WaktuEdukasiSection— Jadwal & metode belajar
//   9. DocumentationSection— Dokumentasi kompetisi
//  10. TestimonialSection — Kata mereka
//  11. CtaSection         — Call to action penutup
// ============================================================

import React, {
  useState, useEffect, Suspense, lazy, useRef, memo,
} from 'react';
import {
  motion, useScroll, useTransform, useSpring,
  useMotionValue, AnimatePresence,
} from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// ── Asset imports ──────────────────────────────────────────
const Robot3D = lazy(() => import('./Robot3D'));
import videoLokal from '/src/assets/video-lokal-tbotics-2026.mp4';
import foto1 from '/src/assets/gambar-anak-penabur-02.jpeg';
import foto2 from '/src/assets/gambar-anak-penabur-13.jpeg';

// ============================================================
// KONFIGURASI — ubah di sini untuk update konten
// ============================================================

/** ID video YouTube fallback */
const YOUTUBE_ID = 'sCJ82fQ_S7A';

/** Nomor WhatsApp & pesan default */
const WA_LINK = `https://wa.me/6285162534164?text=${encodeURIComponent(
  'Halo Stasiun Tbotics! Saya ingin mendaftarkan anak saya belajar robotika.'
)}`;

// ============================================================
// TEMA WARNA — tambah warna baru di sini jika perlu
// ============================================================
const THEME = {
  cyan:   { text: 'text-cyan-400',   bg: 'bg-cyan-500/15',   border: 'border-cyan-400/40',   glow: 'shadow-[0_0_25px_rgba(34,211,238,0.4)]',   hex: '#22d3ee' },
  purple: { text: 'text-purple-400', bg: 'bg-purple-500/15', border: 'border-purple-400/40', glow: 'shadow-[0_0_25px_rgba(168,85,247,0.4)]',   hex: '#a855f7' },
  yellow: { text: 'text-yellow-400', bg: 'bg-yellow-500/15', border: 'border-yellow-400/40', glow: 'shadow-[0_0_25px_rgba(234,179,8,0.4)]',    hex: '#eab308' },
  green:  { text: 'text-green-400',  bg: 'bg-green-500/15',  border: 'border-green-400/40',  glow: 'shadow-[0_0_25px_rgba(74,222,128,0.4)]',   hex: '#4ade80' },
  pink:   { text: 'text-pink-400',   bg: 'bg-pink-500/15',   border: 'border-pink-400/40',   glow: 'shadow-[0_0_25px_rgba(244,114,182,0.4)]',  hex: '#f472b6' },
  orange: { text: 'text-orange-400', bg: 'bg-orange-500/15', border: 'border-orange-400/40', glow: 'shadow-[0_0_25px_rgba(251,146,60,0.4)]',   hex: '#fb923c' },
};

// ============================================================
// KONTEN — edit di sini tanpa perlu menyentuh JSX
// ============================================================

const STATS = [
  { to: 1500, label: 'Peserta Didik',        color: 'cyan',   icon: '👨‍🚀' },
  { to: 13,   label: 'Tahun Berpengalaman',  color: 'yellow', icon: '🏆'  },
  { to: 100,  label: 'Tingkat TK–Lanjut',   color: 'purple', icon: '📚'  },
  { to: 20,   label: 'Sekolah Rekanan',      color: 'green',  icon: '🏫'  },
];

const CARGO_COMPONENTS = [
  { name: 'Mikrokontroler', icon: '🎛️', color: 'green',  depth: 45,  top: '18%', left: '12%' },
  { name: 'Ultrasonic',     icon: '👀', color: 'cyan',   depth: -35, top: '22%', left: '68%' },
  { name: 'LED RGB',        icon: '💡', color: 'yellow', depth: 60,  top: '58%', left: '9%'  },
  { name: 'Servo Motor',    icon: '⚙️', color: 'orange', depth: -50, top: '52%', left: '64%' },
  { name: 'IoT Module',     icon: '🌐', color: 'purple', depth: 25,  top: '40%', left: '38%' },
  { name: 'Baterai 9V',     icon: '🔋', color: 'pink',   depth: -22, top: '72%', left: '42%' },
];

/**
 * Tab filter level.
 * Tambah level baru? Cukup tambah objek { id, label, color } di sini.
 */
const LEVEL_TABS = [
  { id: 'sd',  label: '🚀 SD',  color: 'cyan'   },
  { id: 'smp', label: '🤖 SMP', color: 'purple' },
  // { id: 'sma', label: '🏆 SMA', color: 'yellow' },
];

/**
 * Konten showcase.
 * Tambah step baru? Tambah objek di bawah dan isi `levels` sesuai jenjang.
 */
const SHOWCASE_STEPS = [
  {
    img: foto1,
    tag: '🔧 Step 01',
    title: 'Merakit Robot',
    titleAccent: 'Itu Mudah!',
    desc: 'Di Tbotics, anak-anak diajarkan merakit robot dari nol menggunakan komponen yang sederhana dan aman. Trainer kami memandu setiap langkah — dari pasang roda, sambung kabel, hingga robot pertama mereka bergerak sendiri!',
    chips: [
      { label: '🤖 Robotika', color: 'cyan'   },
      { label: '🔩 Mekanik',  color: 'purple' },
      { label: '✓ Ramah Anak', color: 'green' },
    ],
    levels: ['sd'],
    color: 'cyan',
    hex: '#22d3ee',
    imgLeft: true,
  },
  {
    img: foto2,
    tag: '💡 Step 02',
    title: 'Elektronika',
    titleAccent: 'Lewat LED!',
    desc: 'Menyalakan lampu LED pertama adalah momen paling berkesan! Siswa belajar arus, tegangan, dan resistor sambil langsung praktek.',
    chips: [
      { label: '💡 LED RGB',  color: 'yellow' },
      { label: '⚡ Resistor', color: 'orange' },
      { label: '🔌 Saklar',   color: 'cyan'   },
    ],
    levels: ['sd'],
    color: 'yellow',
    hex: '#eab308',
    imgLeft: false,
  },
  {
    img: foto1,
    tag: '🎛️ Step 03',
    title: 'Coding dengan',
    titleAccent: 'Mikrokontroler!',
    desc: 'Saatnya robot "dihidupkan" dengan kode! Siswa belajar memprogram Arduino — robot yang tadinya diam kini bisa bergerak dan menghindar rintangan.',
    chips: [
      { label: '🎛️ Arduino',    color: 'purple' },
      { label: '🚗 Robot Mobil', color: 'cyan'   },
      { label: '🔘 Pushbutton', color: 'green'  },
    ],
    levels: ['sd'],
    color: 'purple',
    hex: '#a855f7',
    imgLeft: true,
  },
];

const LAYANAN = [
  { icon: '🏫', title: 'Ekstrakurikuler / Intrakurikuler', desc: 'Kerjasama dengan pihak penyelenggara sekolah untuk program robotika terintegrasi kurikulum.', color: 'cyan',   badge: 'Sekolah'   },
  { icon: '👥', title: 'Reguler Class',                   desc: 'Kelas robotik kelompok umum. Belajar bareng, lebih seru dan kolaboratif!',                      color: 'purple', badge: 'Kelompok'  },
  { icon: '🎯', title: 'Private Class',                   desc: 'Kelas robotik eksklusif 1-on-1. Materi disesuaikan penuh dengan kebutuhan siswa.',               color: 'yellow', badge: 'Eksklusif' },
  { icon: '🏆', title: 'Mentoring Kompetisi',             desc: 'Pendampingan siswa ke jalur kompetisi robotik dari tingkat Nasional hingga Internasional.',       color: 'green',  badge: 'Kompetisi' },
];

const TECH_SPECS = [
  { icon: '👨‍🚀', title: 'Trainer Berpengalaman', desc: 'Instruktur profesional & ramah, siap membimbing dari level pemula hingga mahir.',               color: 'cyan'   },
  { icon: '🦿', title: 'Fasilitas Modern',        desc: 'Peralatan robotika terkini — mikrokontroler, sensor, komponen mekanikal yang selalu diperbarui.', color: 'green'  },
  { icon: '💎', title: 'Harga Terjangkau',         desc: 'Biaya eksplorasi yang jelas & terjangkau. Price start from 150K IDR. Tanpa biaya tersembunyi!',  color: 'purple' },
  { icon: '🛡️', title: 'Pelayanan Terjamin',       desc: 'Komitmen pelayanan maksimal dari pendaftaran hingga selesai program.',                           color: 'yellow' },
];

const DOC_DATA = [
  { img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80', title: 'Juara I Madrasah Robotic Competition 2025',                          tag: '🥇 Juara 1',      color: 'yellow' },
  { img: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=600&q=80', title: 'World Innovation Tech Challenge 2024 — Chonnam National University, Korea', tag: '🌏 Internasional', color: 'cyan'   },
  { img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=600&q=80', title: 'Sindo Robotic Olympiad 2017 — Budaya Indonesia',                     tag: '🏆 Olimpiade',    color: 'purple' },
];

const TESTIMONIALS = [
  { photo: '/images/students/siswa1.jpg', name: 'Arjuna, 12 thn', school: 'SDN 5 Bandung', text: 'Seru banget! Aku bisa bikin robot sendiri dan menang kompetisi pertamaku!',                   color: 'cyan'   },
  { photo: '/images/students/siswa2.jpg', name: 'Zahra, 11 thn',  school: 'SD Al-Azhar',   text: 'Awalnya takut sama kabel-kabel, sekarang udah bisa bikin lampu LED berkedip sendiri!',       color: 'purple' },
  { photo: '/images/students/siswa3.jpg', name: 'Budi, 13 thn',   school: 'SMP Negeri 2',  text: 'Trainernya sabar banget, materi coding jadi mudah dipahami!',                                color: 'yellow' },
];

// ============================================================
// CUSTOM HOOKS
// ============================================================

/** Deteksi mobile untuk menonaktifkan efek berat */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () =>
      setIsMobile(window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent));
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

// ============================================================
// KOMPONEN ATOM — kecil, reusable
// ============================================================

/** Teks efek ketik dengan kursor berkedip */
const TypingText = memo(({ text, className = '' }) => (
  <motion.span
    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.035 } } }}
    initial="hidden"
    animate="visible"
    className={className}
  >
    {Array.from(text).map((char, i) => (
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
));

/** Badge label di atas heading setiap section */
const SectionBadge = memo(({ icon, text, color = 'cyan' }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
    className={`inline-flex items-center gap-2 ${THEME[color].bg} ${THEME[color].border} border px-4 py-1.5 rounded-full mb-4`}
  >
    <span className="text-base animate-bounce">{icon}</span>
    <span className={`${THEME[color].text} font-mono tracking-[0.2em] uppercase text-[0.6rem] sm:text-xs font-bold`}>
      {text}
    </span>
  </motion.div>
));

/** Wrapper animasi fade-in saat scroll */
function FadeIn({ children, delay = 0, y = 30, x = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      viewport={{ once: true, amount: 0.08 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// BACKGROUND KOSMIK — bintang + debu melayang (desktop only)
// ============================================================
const CosmicBackground = memo(() => {
  const isMobile = useIsMobile();

  const [stars] = useState(() =>
    Array.from({ length: isMobile ? 0 : 60 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 0.5,
      duration: (Math.random() * 4 + 2).toFixed(1),
      delay: (Math.random() * 3).toFixed(1),
      color: ['255,255,255', '103,232,249', '216,180,254', '253,224,71'][Math.floor(Math.random() * 4)],
    }))
  );

  const [dust] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return [];
    return Array.from({ length: 18 }, (_, i) => {
      const layer = i % 3;
      return {
        id: i,
        top: `${Math.random() * 100}%`,
        size: [1.5, 2, 3][layer],
        dur: [32, 22, 14][layer],
        delay: -(Math.random() * [32, 22, 14][layer]).toFixed(1),
        opacity: [0.25, 0.4, 0.7][layer],
        color: ['rgba(168,85,247,0.9)', 'rgba(234,179,8,0.9)', 'rgba(244,114,182,0.9)', 'rgba(34,211,238,0.9)'][i % 4],
      };
    });
  });

  return (
    <>
      <style>{`
        @keyframes twinkle  { 0%,100%{opacity:0.1;transform:scale(0.8)} 50%{opacity:1;transform:scale(1.3)} }
        @keyframes floatDust{ from{transform:translateX(110vw)} to{transform:translateX(-20vw)} }
        @keyframes wiggle   { 0%,100%{transform:rotate(-3deg)} 50%{transform:rotate(3deg)} }
        @keyframes floatUp  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
        @keyframes orbSpin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>

      {stars.length > 0 && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {stars.map(s => (
            <div
              key={s.id}
              className="absolute rounded-full"
              style={{
                top: s.top, left: s.left,
                width: s.size, height: s.size,
                background: `rgba(${s.color},1)`,
                boxShadow: `0 0 6px rgba(${s.color},0.7)`,
                animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
                willChange: 'opacity, transform',
              }}
            />
          ))}
        </div>
      )}

      {dust.length > 0 && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {dust.map(p => (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                top: p.top, width: p.size, height: p.size, opacity: p.opacity,
                backgroundColor: p.color,
                boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
                animation: `floatDust ${p.dur}s ${p.delay}s linear infinite`,
                willChange: 'transform',
              }}
            />
          ))}
        </div>
      )}
    </>
  );
});

// ============================================================
// COUNTER ANIMASI — angka naik saat masuk viewport
// ============================================================
const Counter = memo(function Counter({ to, label, color = 'cyan', icon }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasRun.current) return;
      hasRun.current = true;
      const startTime = performance.now();
      const duration = 1200;
      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        setCount(Math.floor(progress * to));
        if (progress < 1) requestAnimationFrame(tick);
        else setCount(to);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-5 lg:p-7">
      <span className="text-3xl mb-2">{icon}</span>
      <div className={`text-3xl md:text-4xl lg:text-5xl font-black ${THEME[color].text} font-mono tracking-tighter mb-1`}>
        {count}<span className="text-white text-2xl">+</span>
      </div>
      <p className="text-[0.6rem] sm:text-xs text-gray-300 uppercase tracking-widest font-bold text-center">{label}</p>
    </div>
  );
});

// ============================================================
// CARGO ITEM — komponen parallax (dipakai di CargoSection)
// ============================================================
function CargoItem({ item, springX, springY }) {
  const ix = useTransform(springX, [-1, 1], [-item.depth, item.depth]);
  const iy = useTransform(springY, [-1, 1], [-item.depth, item.depth]);
  const t = THEME[item.color];
  return (
    <motion.div
      style={{ x: ix, y: iy, top: item.top, left: item.left, position: 'absolute' }}
      className="flex flex-col items-center gap-1.5 pointer-events-none"
    >
      <div className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 ${t.bg} ${t.border} border-2 rounded-full flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl ${t.glow}`}>
        {item.icon}
      </div>
      <span className={`font-mono text-[0.6rem] sm:text-xs font-bold ${t.text} bg-[#02050f]/80 px-2 py-0.5 rounded-full border border-white/10 whitespace-nowrap`}>
        {item.name}
      </span>
    </motion.div>
  );
}

// ============================================================
// VIDEO PLAYER — lokal dengan fallback YouTube
// ============================================================
function VideoPlayer() {
  const [mode, setMode] = useState('local');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [ytMuted, setYtMuted] = useState(false); // YouTube default TIDAK mute
  const [hasError, setHasError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  const iframeRef = useRef(null);

  // ── Kontrol video lokal ──────────────────────────────────
  const togglePlay = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
  };

  const toggleMuteLocal = () => {
    if (!videoRef.current) return;
    const next = !isMuted;
    videoRef.current.muted = next;
    setIsMuted(next);
  };

  const handleSkip = (sec) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime + sec);
  };

  const handleSeek = (e) => {
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    videoRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 0;
    setCurrentTime(cur);
    setDuration(dur);
    setProgress(dur ? (cur / dur) * 100 : 0);
  };

  // ── Kontrol YouTube via postMessage API ─────────────────
  const toggleMuteYoutube = () => {
    if (!iframeRef.current) return;
    const next = !ytMuted;
    // YouTube iframe API: perintah mute/unMute lewat postMessage
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func: next ? 'mute' : 'unMute', args: [] }),
      '*'
    );
    setYtMuted(next);
  };

  const formatTime = (sec) => {
    if (isNaN(sec)) return '0:00';
    return `${Math.floor(sec / 60)}:${Math.floor(sec % 60).toString().padStart(2, '0')}`;
  };

  // URL YouTube — enablejsapi=1 wajib agar postMessage bekerja
  // mute=0 agar default ada suara
  const ytSrc = `https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&mute=0&loop=1&playlist=${YOUTUBE_ID}&rel=0&modestbranding=1&controls=1&enablejsapi=1`;

  return (
    <div
      className="relative rounded-2xl lg:rounded-3xl overflow-hidden border-2 border-cyan-900/30 bg-[#080d1e]"
      style={{ boxShadow: '0 0 40px rgba(34,211,238,0.08), 0 0 80px rgba(34,211,238,0.04)' }}
    >
      {/* Sudut dekorasi */}
      {[
        'top-2.5 left-2.5 border-t-2 border-l-2 border-cyan-400/60',
        'top-2.5 right-2.5 border-t-2 border-r-2 border-cyan-400/60',
        'bottom-2.5 left-2.5 border-b-2 border-l-2 border-cyan-400/25',
        'bottom-2.5 right-2.5 border-b-2 border-r-2 border-cyan-400/25',
      ].map((cls, i) => (
        <div key={i} className={`absolute w-4 h-4 z-20 pointer-events-none ${cls}`} />
      ))}

      {/* Scanline */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(34,211,238,0.025) 3px,rgba(34,211,238,0.025) 4px)' }}
      />

      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 pt-3 pb-6"
        style={{ background: 'linear-gradient(to bottom,rgba(8,13,30,0.95),transparent)' }}
      >
        <div className="flex items-center gap-1 p-1 rounded-full bg-black/60 border border-white/10">
          {[
            { id: 'local',   icon: '📁', label: 'Lokal',   activeClass: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' },
            { id: 'youtube', icon: '▶',  label: 'YouTube', activeClass: 'bg-red-500/20 text-red-400 border border-red-500/50'   },
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setMode(btn.id)}
              className={`px-3 py-1 rounded-full font-mono text-[0.55rem] font-black uppercase tracking-wider transition-all duration-200 ${
                mode === btn.id ? btn.activeClass : 'text-gray-500 hover:text-gray-300 border border-transparent'
              }`}
            >
              {btn.icon} {btn.label}
            </button>
          ))}
        </div>

        {/* Tombol mute YouTube — tampil hanya saat mode youtube */}
        {mode === 'youtube' && (
          <motion.button
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
            onClick={toggleMuteYoutube}
            className="flex items-center gap-1.5 bg-black/65 border border-white/20 rounded-full px-3 py-1.5 text-white/70 hover:text-white hover:border-white/40 transition-all"
            title={ytMuted ? 'Unmute' : 'Mute'}
          >
            <span className="text-sm">{ytMuted ? '🔇' : '🔊'}</span>
            <span className="font-mono text-[0.5rem] font-black uppercase tracking-wider">
              {ytMuted ? 'Muted' : 'Sound On'}
            </span>
          </motion.button>
        )}

        {/* LIVE badge — tampil saat mode lokal */}
        {mode === 'local' && (
          <div className="flex items-center gap-1.5 bg-black/65 border border-red-500/45 rounded-full px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
            <span className="text-red-400 font-mono text-[0.55rem] tracking-[0.15em] font-black">LIVE FEED</span>
          </div>
        )}
      </div>

      {/* Video / YouTube */}
      <AnimatePresence mode="wait">
        {mode === 'local' && (
          <motion.div key="local" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <video
              ref={videoRef}
              src={videoLokal}
              muted loop playsInline
              onError={() => { setHasError(true); setMode('youtube'); }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onTimeUpdate={handleTimeUpdate}
              className="w-full h-[280px] sm:h-[360px] lg:h-[420px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
              style={{ background: 'linear-gradient(to top,#080d1e,transparent)' }} />
            {hasError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0f1d]/90 z-20 gap-3">
                <span className="text-4xl">⚠️</span>
                <p className="text-gray-400 font-mono text-xs text-center px-6">
                  Video lokal tidak ditemukan.<br />Beralih ke YouTube.
                </p>
                <motion.button whileHover={{ scale: 1.05 }} onClick={() => setMode('youtube')}
                  className="px-4 py-2 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 font-mono text-xs font-bold">
                  ▶ Tonton di YouTube
                </motion.button>
              </div>
            )}
          </motion.div>
        )}

        {mode === 'youtube' && (
          <motion.div
            key="youtube"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="w-full h-[280px] sm:h-[360px] lg:h-[420px]"
          >
            <iframe
              ref={iframeRef}
              src={ytSrc}
              title="Tbotics Education Video"
              allow="autoplay; fullscreen"
              allowFullScreen
              className="w-full h-full"
              style={{ border: 'none' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kontrol lokal */}
      {mode === 'local' && (
        <div className="relative z-30 px-4 pt-3 pb-4 bg-[#080d1e] border-t border-cyan-900/20">
          {/* Progress bar */}
          <div className="flex items-center gap-2.5 mb-3">
            <span className="text-[0.6rem] text-white/30 font-mono w-8 shrink-0">{formatTime(currentTime)}</span>
            <div onClick={handleSeek} className="flex-1 h-1 bg-white/10 rounded-full cursor-pointer relative group/bar">
              <div
                className="h-full rounded-full relative transition-all"
                style={{ width: `${progress}%`, background: 'linear-gradient(to right,#22d3ee,#818cf8)' }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] opacity-0 group-hover/bar:opacity-100 transition-opacity" />
              </div>
            </div>
            <span className="text-[0.6rem] text-white/30 font-mono w-8 shrink-0 text-right">{formatTime(duration)}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
                onClick={() => handleSkip(-10)}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-all text-xs font-mono font-bold"
                title="Mundur 10 detik">↺10</motion.button>

              <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
                onClick={togglePlay}
                className="w-9 h-9 rounded-xl bg-cyan-400/15 border border-cyan-400/40 flex items-center justify-center text-cyan-400 hover:bg-cyan-400/25 transition-all"
                style={{ boxShadow: isPlaying ? '0 0 16px rgba(34,211,238,0.2)' : 'none' }}
                title={isPlaying ? 'Pause' : 'Play'}>
                <span className="text-sm">{isPlaying ? '⏸' : '▶'}</span>
              </motion.button>

              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
                onClick={() => handleSkip(10)}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-all text-xs font-mono font-bold"
                title="Maju 10 detik">10↻</motion.button>

              <div className="w-px h-5 bg-white/10 mx-1" />

              {/* Mute lokal — sekarang benar-benar mengubah state */}
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
                onClick={toggleMuteLocal}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                title={isMuted ? 'Unmute' : 'Mute'}>
                <span className="text-sm">{isMuted ? '🔇' : '🔊'}</span>
              </motion.button>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:flex items-center gap-1.5 bg-cyan-400/8 border border-cyan-400/20 rounded-full px-2.5 py-1 text-[0.55rem] text-cyan-400/70 font-mono tracking-wider">HD</span>
              <button onClick={() => setMode('youtube')}
                className="text-[0.55rem] text-gray-600 hover:text-red-400 font-mono uppercase tracking-widest transition-colors">
                YT ↗
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Caption */}
      <div className="px-4 py-3 bg-[#080d1e] border-t border-white/5 relative z-20">
        <h3 className="text-white font-bold text-sm sm:text-base flex items-center gap-2 font-mono">
          <span className="text-cyan-400 animate-pulse text-xs">▹</span>
          Belajar Sambil Bermain
        </h3>
        <p className="text-cyan-200/45 text-xs mt-0.5 font-mono tracking-wide">
          Status: Mengudara menuju masa depan... 🚀
        </p>
      </div>
    </div>
  );
}

// ============================================================
// TILT PHOTO — foto dengan efek 3D tilt saat hover
// ============================================================
function TiltPhoto({ img, tag, hex, color }) {
  const frameRef = useRef(null);
  const innerRef = useRef(null);
  const t = THEME[color];

  const handleMouseMove = (e) => {
    if (!frameRef.current || !innerRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    innerRef.current.style.transform =
      `perspective(700px) rotateY(${dx * 14}deg) rotateX(${-dy * 10}deg) scale(1.04)`;
  };

  const handleMouseLeave = () => {
    if (innerRef.current)
      innerRef.current.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) scale(1)';
  };

  return (
    <div
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full cursor-grab active:cursor-grabbing select-none"
      style={{ perspective: '700px' }}
    >
      {/* Border glow frame */}
      <div
        className="absolute inset-0 rounded-xl sm:rounded-2xl lg:rounded-3xl pointer-events-none z-10"
        style={{ border: `2px solid ${hex}80`, boxShadow: `0 0 32px ${hex}30, inset 0 0 20px ${hex}10` }}
      />

      <div
        ref={innerRef}
        className="relative rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden"
        style={{ transition: 'transform 0.12s ease', transformStyle: 'preserve-3d' }}
      >
        {/* Container gambar dengan rasio portrait */}
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: '3/4', maxHeight: '400px', backgroundColor: '#02050f' }}
        >
          <img
            src={img}
            alt={tag}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>

        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `repeating-linear-gradient(0deg,transparent,transparent 3px,${hex}06 3px,${hex}06 4px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#02050f] via-transparent to-transparent pointer-events-none" />

        {/* Tag label */}
        <div
          className={`absolute top-3 left-3 z-20 flex items-center gap-1.5 ${t.bg} border ${t.border} px-2.5 py-1 rounded-full`}
          style={{ backdropFilter: 'blur(8px)' }}
        >
          <span className={`${t.text} font-mono text-[0.55rem] font-black tracking-widest uppercase`}>{tag}</span>
        </div>

        {/* Corner dekorasi */}
        <div className="absolute top-3 right-3 w-4 h-4 pointer-events-none"
          style={{ borderTop: `2px solid ${hex}`, borderRight: `2px solid ${hex}` }} />
        <div className="absolute bottom-3 left-3 w-4 h-4 pointer-events-none"
          style={{ borderBottom: `2px solid ${hex}`, borderLeft: `2px solid ${hex}` }} />
      </div>
    </div>
  );
}

// ============================================================
// ANIMATED CONNECTOR — garis scroll-driven antar step showcase
// ============================================================
function AnimatedConnector({ color = '#22d3ee' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const scaleY  = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.05, 0.15, 0.85, 0.95], [0, 1, 1, 0]);
  const dotY    = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);
  const dotOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="flex flex-col items-center my-16 lg:my-20" style={{ height: '120px', position: 'relative' }}>
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
      <motion.div
        style={{
          scaleY, opacity, transformOrigin: 'top',
          position: 'absolute', top: 0, left: '50%', translateX: '-50%',
          width: '2px', height: '100%',
          background: `linear-gradient(to bottom,${color},${color}80)`,
          boxShadow: `0 0 8px ${color}60`, borderRadius: '999px',
        }}
      />
      <motion.div
        style={{
          top: dotY, opacity: dotOpacity,
          position: 'absolute', left: '50%', translateX: '-50%', translateY: '-50%',
          width: '10px', height: '10px', borderRadius: '50%',
          background: color, boxShadow: `0 0 16px ${color}, 0 0 6px ${color}`,
        }}
      />
      <motion.div style={{ opacity }} className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
        {[0, 1, 2].map(n => (
          <motion.div
            key={n}
            animate={{ opacity: [0.2, 1, 0.2], y: [0, 4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: n * 0.18 }}
            style={{
              width: 0, height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: `6px solid ${color}`,
              marginBottom: '2px',
              filter: `drop-shadow(0 0 4px ${color})`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

// ============================================================
// SECTION 1 — HERO
// ============================================================
function HeroSection({ heroRef }) {
  const scrollToAbout = () => document.getElementById('siapa-kami')?.scrollIntoView({ behavior: 'smooth' });

  const containerV = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const itemV = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section ref={heroRef} className="relative z-10 min-h-[100vh] lg:h-[160vh]">
      <div className="lg:sticky lg:top-0 min-h-screen w-full flex flex-col lg:flex-row items-center justify-center pt-24 pb-12 px-5 lg:px-10 overflow-hidden">
        <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-6 lg:gap-10 items-center justify-between relative z-20">

          {/* Teks hero */}
          <motion.div
            variants={containerV} initial="hidden" animate="visible"
            className="space-y-4 lg:space-y-5 z-20 w-full text-center lg:text-left"
          >
            <motion.div variants={itemV} className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 bg-cyan-900/30 border border-cyan-500/30 px-4 py-1.5 rounded-full">
                <span className="text-base" style={{ animation: 'wiggle 2s infinite' }}>🚀</span>
                <TypingText text="Let's Play & Learn Robotics" className="text-cyan-300 font-mono text-[0.6rem] sm:text-xs uppercase font-bold" />
              </div>
            </motion.div>

            <motion.h1 variants={itemV} className="font-black leading-[1.05] uppercase tracking-tight font-mono">
              <span className="text-gray-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl block drop-shadow-md">Lebih Percaya Diri,</span>
              <span className="text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl block mt-1 drop-shadow-md">Hadapi Masa Depan</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-4xl sm:text-5xl md:text-6xl lg:text-7xl block mt-2 drop-shadow-[0_0_30px_rgba(34,211,238,0.7)]">
                TBOTICS
              </span>
            </motion.h1>

            <motion.p variants={itemV} className="text-gray-300 text-sm sm:text-base lg:text-lg w-full max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed border-l-2 border-cyan-400 pl-4 pr-4 py-2 bg-white/5 rounded-xl">
              Eksplorasi Galaksi Robotika terbaik untuk SD &amp; SMP! Pelajari{' '}
              <span className="text-cyan-400 font-bold">Elektronika · Robotika · Mikrokontroler · IoT</span>{' '}
              dengan cara yang seru dan menyenangkan!
            </motion.p>

            <motion.div variants={itemV} className="flex flex-wrap justify-center lg:justify-start gap-2">
              {['⚡ Elektronika', '🤖 Robotika', '🎛️ Mikrokontroler', '🌐 IoT'].map((tag, i) => (
                <span key={i} className="text-[0.65rem] sm:text-xs font-bold font-mono px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gray-200">
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div variants={itemV} className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                onClick={() => window.open(WA_LINK, '_blank')}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-8 py-3.5 rounded-full font-black uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-shadow duration-300"
              >
                🚀 Mulai Ekspedisi
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={scrollToAbout}
                className="bg-white/10 border-2 border-white/25 text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-wider text-sm transition-colors duration-300 hover:bg-white/15"
              >
                🛰️ Lihat Markas
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Robot 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="z-10 w-full flex justify-center lg:justify-end lg:w-1/2 relative max-h-[220px] sm:max-h-none"
          >
            <div className="relative w-full max-w-[260px] sm:max-w-[420px] mx-auto h-[200px] sm:h-[360px] lg:mx-0 lg:max-w-none lg:w-[560px] lg:h-[520px] xl:w-[640px] xl:h-[580px] flex justify-center items-center">
              {/* Cincin orbit luar */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                <div
                  className="w-[160px] h-[160px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] rounded-full border-2 border-dashed border-cyan-400/25"
                  style={{ animation: 'orbSpin 20s linear infinite', willChange: 'transform' }}
                />
              </div>
              {/* Cincin orbit dalam */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                <div
                  className="w-[120px] h-[120px] sm:w-[220px] sm:h-[220px] lg:w-[300px] lg:h-[300px] rounded-full border border-purple-400/20"
                  style={{ animation: 'orbSpin 14s linear infinite reverse', willChange: 'transform' }}
                />
              </div>
              {/* Dot berputar di cincin */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                <div
                  className="w-[160px] h-[160px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px]"
                  style={{ animation: 'orbSpin 20s linear infinite', willChange: 'transform' }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                </div>
              </div>

              <Suspense fallback={
                <div className="hidden sm:flex flex-col items-center justify-center gap-3 bg-[#0a0f1d]/80 p-6 rounded-2xl border-2 border-cyan-900/50">
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

// ============================================================
// SECTION 2 — STATISTIK STRIP
// ============================================================
const StatsStrip = memo(function StatsStrip() {
  return (
    <FadeIn y={30}>
      <div className="relative z-20 max-w-6xl mx-auto px-5 -mt-6 lg:-mt-16 mb-16 lg:mb-24">
        <div className="w-full bg-[#02050f]/80 border border-cyan-900/40 rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.12)]">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10">
            {STATS.map((s, i) => <Counter key={i} {...s} />)}
          </div>
        </div>
      </div>
    </FadeIn>
  );
});

// ============================================================
// SECTION 3 — CARGO (parallax interaktif mouse/touch)
// ============================================================
function CargoSection() {
  const isMobile = useIsMobile();
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

  const resetPointer = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <section className="relative py-16 lg:py-24 px-5 z-10">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-8 lg:mb-12">
          <SectionBadge icon="🎒" text="Kargo Komponen Antariksa" color="purple" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase font-mono drop-shadow-md">
            <span className="text-purple-400">///</span> Isi Lab Robotika Kami
          </h2>
          <p className="text-gray-400 mt-2 font-mono text-xs sm:text-sm">
            {isMobile ? 'Komponen di stasiun kami' : 'Gerakkan kursor / sentuh untuk menjelajahi komponen station kami!'}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="relative w-full h-[380px] sm:h-[480px] bg-[#080d1e]/90 border-2 border-cyan-900/50 rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.12)]">
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.5) 1px,transparent 1px)', backgroundSize: '40px 40px' }}
            />
            <div
              ref={containerRef}
              onMouseMove={isMobile ? undefined : handlePointerMove}
              onMouseLeave={isMobile ? undefined : resetPointer}
              onTouchMove={handlePointerMove}
              onTouchEnd={resetPointer}
              className="absolute inset-0 cursor-crosshair"
            >
              {CARGO_COMPONENTS.map((item, idx) => (
                <CargoItem key={idx} item={item} springX={springX} springY={springY} />
              ))}
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

// ============================================================
// SECTION 4 — SHOWCASE (foto siswa + filter level)
// ============================================================
const ShowcaseSection = memo(function ShowcaseSection() {
  const [activeLevel, setActiveLevel] = useState('sd');

  const filtered = activeLevel === 'semua'
    ? SHOWCASE_STEPS
    : SHOWCASE_STEPS.filter(s => s.levels.includes(activeLevel));

  return (
    <section className="relative py-16 lg:py-28 px-4 sm:px-6 z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-8 lg:mb-12">
          <SectionBadge icon="📸" text="Momen di Stasiun Tbotics" color="cyan" />
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white uppercase font-mono">
            Lihat <span className="text-cyan-400">Aksi Nyata</span> Mereka
          </h2>
          <p className="text-gray-400 mt-2 text-xs sm:text-sm lg:text-base font-medium max-w-lg mx-auto">
            Gerakkan foto untuk efek 3D — 1.500+ siswa sudah membuktikan serunya belajar robotika!
          </p>
        </FadeIn>

        {/* Filter tabs */}
        <FadeIn delay={0.1} className="flex justify-center mb-8 lg:mb-14">
          <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl">
            {LEVEL_TABS.map(tab => {
              const isActive = activeLevel === tab.id;
              const t = THEME[tab.color];
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveLevel(tab.id)}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                  className={`px-4 py-1.5 sm:py-2 rounded-xl font-mono font-black text-xs uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? `${t.bg} ${t.border} border-2 ${t.text} ${t.glow}`
                      : 'text-gray-400 hover:text-gray-200 border-2 border-transparent hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </motion.button>
              );
            })}
          </div>
        </FadeIn>

        {/* Konten per level */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLevel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4" style={{ animation: 'floatUp 3s ease-in-out infinite' }}>🚧</div>
                <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">Konten untuk level ini segera hadir!</p>
                <p className="text-gray-600 font-mono text-xs mt-2">Coming soon...</p>
              </div>
            ) : (
              <div className="space-y-12 sm:space-y-16 lg:space-y-32">
                {filtered.map((step, i) => {
                  const t = THEME[step.color];
                  return (
                    <div key={step.tag}>
                      <div className={`flex flex-col ${step.imgLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-5 md:gap-6 lg:gap-16 items-center`}>
                        <div className="w-full md:w-[38%] lg:w-[46%] flex-shrink-0">
                          <TiltPhoto img={step.img} tag={step.tag} hex={step.hex} color={step.color} />
                        </div>
                        <div className="w-full sm:flex-1 space-y-3 relative min-w-0">
                          {/* Nomor dekoratif */}
                          <div
                            className="absolute -top-5 -left-2 text-[3.5rem] sm:text-[4rem] lg:text-[8rem] font-black font-mono leading-none select-none pointer-events-none"
                            style={{ color: step.hex, opacity: 0.07 }}
                          >
                            0{i + 1}
                          </div>
                          <div className={`inline-flex items-center gap-1.5 ${t.bg} border ${t.border} px-2.5 py-0.5 rounded-full`}>
                            <span className={`${t.text} font-mono text-[0.55rem] font-black tracking-widest uppercase`}>{step.tag}</span>
                          </div>
                          <h3 className="text-white font-black text-lg sm:text-xl lg:text-[2.2rem] font-mono uppercase leading-tight">
                            {step.title}<br /><span style={{ color: step.hex }}>{step.titleAccent}</span>
                          </h3>
                          <p className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed font-medium pl-3" style={{ borderLeft: `2px solid ${step.hex}` }}>
                            {step.desc}
                          </p>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {step.chips.map((chip, j) => {
                              const ct = THEME[chip.color];
                              return (
                                <span key={j} className={`inline-flex items-center gap-1 text-[0.6rem] font-bold font-mono px-2.5 py-1 rounded-full ${ct.bg} border ${ct.border} ${ct.text}`}>
                                  {chip.label}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      {i < filtered.length - 1 && <AnimatedConnector color={step.hex} />}
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
});

// ============================================================
// SECTION 5 — KENAPA PILIH KAMI
// ============================================================
const WhyChooseUsSection = memo(function WhyChooseUsSection() {
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
          {TECH_SPECS.map((item, i) => {
            const t = THEME[item.color];
            return (
              <FadeIn key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className={`h-full bg-[#080d1e]/80 border-2 border-slate-700/60 rounded-2xl lg:rounded-3xl p-6 lg:p-7 flex flex-col items-center text-center transition-shadow duration-300 group cursor-default hover:${t.glow}`}
                >
                  <div className={`w-16 h-16 lg:w-20 lg:h-20 ${t.bg} ${t.border} border-2 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 ${t.glow}`}>
                    {item.icon}
                  </div>
                  <h3 className={`text-white font-black text-sm sm:text-base uppercase tracking-wide mb-3 font-mono group-hover:${t.text} transition-colors`}>
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  <div className="mt-4 w-0 group-hover:w-16 h-0.5 rounded-full transition-all duration-500" style={{ background: `linear-gradient(to right,${t.hex},transparent)` }} />
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
});

// ============================================================
// SECTION 6 — SIAPA KAMI (dengan VideoPlayer)
// ============================================================
function WhoAreWeSection() {
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

// ============================================================
// SECTION 7 — VISI & MISI (scroll timeline)
// ============================================================
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[50%] bg-purple-900/8 rounded-full blur-[130px] pointer-events-none" aria-hidden="true" />
      <div className="max-w-4xl mx-auto relative z-10">
        <FadeIn className="text-center mb-14 lg:mb-20">
          <SectionBadge icon="🪐" text="Jalur Orbit — Tujuan Kami" color="cyan" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-mono">Visi &amp; Misi</h2>
        </FadeIn>
        <div className="relative">
          <div className="absolute left-5 sm:left-8 top-0 bottom-0 w-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div style={{ height: lineH }} className="w-full bg-gradient-to-b from-cyan-400 to-purple-500 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
          </div>
          <div className="space-y-12 lg:space-y-16">
            {items.map((item, i) => {
              const t = THEME[item.color];
              return (
                <FadeIn key={i} delay={i * 0.15} x={30}>
                  <div className="flex items-start gap-5 sm:gap-8 pl-14 sm:pl-20">
                    <div className={`absolute left-5 sm:left-8 -translate-x-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#04071a] border-4 ${t.border} flex items-center justify-center z-10 ${t.glow}`}>
                      <span className="text-sm sm:text-base">{item.icon}</span>
                    </div>
                    <motion.div
                      whileHover={{ x: 6 }}
                      className={`w-full bg-[#080d1e]/80 border-2 ${t.border} p-5 sm:p-7 rounded-2xl lg:rounded-3xl transition-shadow duration-300`}
                    >
                      <div className={`${t.text} font-mono font-bold text-xs sm:text-sm mb-3 uppercase tracking-wider`}>{item.label}</div>
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

// ============================================================
// SECTION 8 — LAYANAN KAMI
// ============================================================
function LayananSection() {
  const navigate = useNavigate();
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
          {LAYANAN.map((item, i) => {
            const t = THEME[item.color];
            return (
              <FadeIn key={i} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`h-full bg-[#080d1e]/80 border-2 ${t.border} rounded-2xl lg:rounded-3xl p-6 flex flex-col gap-3 group cursor-default transition-shadow duration-300 hover:${t.glow}`}
                >
                  <span className={`self-start text-[0.6rem] font-black font-mono uppercase tracking-widest px-2.5 py-1 rounded-full ${t.bg} ${t.text} border ${t.border}`}>
                    {item.badge}
                  </span>
                  <div className={`w-14 h-14 ${t.bg} ${t.border} border-2 rounded-2xl flex items-center justify-center text-3xl ${t.glow} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <h3 className={`${t.text} font-black text-sm sm:text-base font-mono uppercase leading-snug`}>{item.title}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed flex-1">{item.desc}</p>
                  <div className="w-0 group-hover:w-full h-0.5 rounded-full transition-all duration-500" style={{ background: `linear-gradient(to right,${t.hex},transparent)` }} />
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
        <FadeIn delay={0.25} className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            onClick={() => { navigate('/program'); window.scrollTo(0, 0); }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-2 border-cyan-400/40 hover:border-cyan-400/80 text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-wider text-sm transition-colors duration-300"
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

// ============================================================
// SECTION 9 — WAKTU & CARA EDUKASI
// ============================================================
function WaktuEdukasiSection() {
  const details = [
    { icon: '📅', label: 'Frekuensi',   value: '1× per minggu',            color: 'cyan'   },
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

// ============================================================
// SECTION 10 — DOKUMENTASI MISI
// ============================================================
const DocumentationSection = memo(function DocumentationSection() {
  return (
    <section className="relative py-20 lg:py-28 px-5 z-10">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-12 lg:mb-16">
          <SectionBadge icon="📂" text="Archive Logs — Misi Berhasil" color="yellow" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-mono">
            <span className="text-cyan-400">Dokumentasi</span> Misi
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm sm:text-base font-medium">
            Rekam jejak para inovator muda Tbotics dalam kompetisi tingkat Nasional &amp; Internasional.
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
          {DOC_DATA.map((doc, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                className={`group bg-[#080d1e]/80 border-2 ${THEME[doc.color].border} rounded-2xl lg:rounded-3xl overflow-hidden transition-shadow duration-300 ${THEME[doc.color].glow} h-full flex flex-col cursor-default`}
              >
                <div className="relative h-44 sm:h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080d1e] to-transparent opacity-70 z-10" />
                  <img src={doc.img} alt={doc.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <span className={`absolute top-3 left-3 z-20 text-xs font-bold font-mono px-3 py-1 rounded-full ${THEME[doc.color].bg} ${THEME[doc.color].text} border ${THEME[doc.color].border}`}>
                    {doc.tag}
                  </span>
                </div>
                <div className="p-5 flex-1">
                  <h3 className="text-white font-bold text-sm sm:text-base leading-snug">{doc.title}</h3>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
});

// ============================================================
// SECTION 11 — TESTIMONI
// ============================================================
const TestimonialSection = memo(function TestimonialSection() {
  return (
    <section className="relative py-20 lg:py-28 px-5 z-10">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-12 lg:mb-16">
          <SectionBadge icon="⭐" text="Kesan & Pengalaman" color="yellow" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-mono">
            Kata <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-cyan-400">Mereka</span>
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-7">
          {TESTIMONIALS.map((t, i) => {
            const th = THEME[t.color];
            return (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`bg-[#080d1e]/80 border-2 ${th.border} rounded-2xl lg:rounded-3xl p-6 flex flex-col gap-4 ${th.glow}`}
                >
                  <span className={`text-4xl ${th.text} font-mono leading-none`}>"</span>
                  <p className="text-gray-300 text-sm leading-relaxed flex-1 -mt-3">{t.text}</p>
                  <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                    <div className={`w-12 h-12 rounded-full overflow-hidden border-2 ${th.border} flex-none`}>
                      <img
                        src={t.photo}
                        alt={t.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={e => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-xl">👦</div>';
                        }}
                      />
                    </div>
                    <div>
                      <p className={`${th.text} font-bold text-sm font-mono`}>{t.name}</p>
                      <p className="text-gray-500 text-xs font-mono">{t.school}</p>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
});

// ============================================================
// SECTION 12 — CTA PENUTUP
// ============================================================
const CtaSection = memo(function CtaSection() {
  return (
    <section className="relative py-20 lg:py-28 px-5 z-10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-purple-500/8 rounded-full blur-[80px]" />
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
        <motion.button
          whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}
          onClick={() => window.open(WA_LINK, '_blank')}
          className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-9 py-4 rounded-full font-black uppercase tracking-wider text-sm shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-shadow"
        >
          🚀 Daftar Sekarang
        </motion.button>
      </FadeIn>
    </section>
  );
});

// ============================================================
// ROOT COMPONENT — Home
// ============================================================
export default function Home() {
  const heroRef = useRef(null);

  // Parallax scroll untuk efek halaman hero (hanya referensi, tidak dipakai di mobile)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  useSpring(scrollYProgress, { stiffness: 38, damping: 24, mass: 0.6 }); // tetap aktif untuk smooth scroll

  return (
    <main className="bg-[#02050f] text-white min-h-screen relative selection:bg-cyan-400 selection:text-black font-sans overflow-x-hidden">
      <CosmicBackground />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/8 via-[#02050f]/80 to-black" aria-hidden="true" />

      <HeroSection heroRef={heroRef} />
      <StatsStrip />
      <ShowcaseSection />
      <WhyChooseUsSection />
      <WhoAreWeSection />
      <VisiMisiSection />
      <LayananSection />
      <WaktuEdukasiSection />
      <DocumentationSection />
      <TestimonialSection />
      <CtaSection />
    </main>
  );
}