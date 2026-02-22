import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate
} from "framer-motion";
import { useRef, useEffect, useState } from "react";

// ==========================================
// Komponen Counter untuk angka statistik yang berjalan
// ==========================================
function Counter({ from = 0, to = 1000 }) {
  const ref = useRef();
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration: 2,
        onUpdate(value) {
          setCount(Math.floor(value));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, from, to]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
      {count}+
    </div>
  );
}

// ==========================================
// Komponen Floating Symbol untuk Background
// ==========================================
function FloatingSymbol({ scrollYProgress, symbol, top, left, yRange, size, rotate, opacity }) {
  const yParallax = useTransform(scrollYProgress, [0, 1], yRange);

  return (
    <motion.div
      style={{ y: yParallax, top, left }}
      className="absolute z-0 font-mono text-cyan-500 pointer-events-none select-none"
      animate={{
        rotate: [rotate, rotate + 15, rotate],
        opacity: [opacity, opacity * 1.5, opacity],
        scale: [1, 1.1, 1]
      }}
      transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <span style={{ fontSize: size }} className="drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
        {symbol}
      </span>
    </motion.div>
  );
}

// ==========================================
// Main Component: About
// ==========================================
export default function About() {
  const ref = useRef(null);

  // Mengambil progress scroll untuk efek parallax utama
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // ===== EFEK PARALLAX KUSTOM =====
  const yBgGlow = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yVideo = useTransform(scrollYProgress, [0, 1], [0, -80]); // Parallax untuk video

  // Data simbol-simbol yang akan ditebar di background
  const symbolsData = [
    { symbol: "</>", top: "15%", left: "5%", yRange: [0, -200], size: "4rem", rotate: -10, opacity: 0.15 },
    { symbol: "{ }", top: "60%", left: "85%", yRange: [0, -300], size: "5rem", rotate: 15, opacity: 0.1 },
    { symbol: "!@#", top: "80%", left: "10%", yRange: [0, -150], size: "3rem", rotate: -20, opacity: 0.2 },
    { symbol: "()_", top: "25%", left: "75%", yRange: [0, -250], size: "6rem", rotate: 5, opacity: 0.08 },
    { symbol: "&&", top: "50%", left: "15%", yRange: [0, -100], size: "3.5rem", rotate: 25, opacity: 0.12 },
    { symbol: "%^&*", top: "85%", left: "70%", yRange: [0, -350], size: "2.5rem", rotate: -15, opacity: 0.15 },
  ];

  return (
    <section
      id="tentang"
      ref={ref}
      className="relative bg-[#020b2d] text-white py-32 px-6 overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_1px,transparent_1px)] [background-size:40px_40px]" />

      {/* Light Beam */}
      <motion.div
        animate={{ x: ["-30%", "130%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-blue-500/5 to-transparent blur-3xl -z-10"
      />

      {/* Parallax Glow Cyan */}
      <motion.div
        style={{ y: yBgGlow }}
        className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10"
      />

      {/* RENDER SIMBOL-SIMBOL MELAYANG */}
      {symbolsData.map((data, index) => (
        <FloatingSymbol
          key={index}
          scrollYProgress={scrollYProgress}
          symbol={data.symbol}
          top={data.top}
          left={data.left}
          yRange={data.yRange}
          size={data.size}
          rotate={data.rotate}
          opacity={data.opacity}
        />
      ))}

      <div className="max-w-6xl mx-auto space-y-32 relative z-10">

        {/* ===== HERO TEXT & VIDEO ===== */}
        <div className="text-center space-y-12 relative">
          
          <div className="space-y-8">
            <motion.h2
              style={{ y: yText }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight relative z-10"
            >
              Jaringan Global Robotik
              <span className="text-cyan-400 block mt-4 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">
                Tbotics Education
              </span>
            </motion.h2>

            <motion.p
              style={{ y: yText }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-blue-100/70 text-lg max-w-3xl mx-auto leading-relaxed font-medium relative z-10"
            >
              Jaringan Global Robotik (Tbotics Education) merupakan jaringan edukasi robotika yang menerapkan konsep
              <span className="text-cyan-300 italic font-bold ml-1"> Learn & Play </span> melalui pendekatan
              Creative Building, Electrical Connectivity, dan Advanced Programming.
              Program dirancang untuk membangun fondasi keterampilan robotika secara terstruktur, aplikatif, dan berkelanjutan.
            </motion.p>
          </div>

          {/* ===== VIDEO DENGAN NEON BORDER ===== */}
          <motion.div
            style={{ y: yVideo }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-4xl mx-auto aspect-video rounded-3xl overflow-hidden border-2 border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] group z-10 bg-[#0B0D21]"
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full transform group-hover:scale-105 transition-transform duration-700"
              src="https://www.youtube.com/embed/sCJ82fQ_S7A"
              title="Tbotics Video Profile"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>

        {/* ===== DATA SECTION (STATISTIK) ===== */}
        <div className="grid md:grid-cols-3 gap-12 text-center bg-[#0B0D21]/40 py-12 rounded-3xl border border-blue-900/30 backdrop-blur-sm relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Counter from={0} to={1000} />
            <p className="text-blue-200/50 font-bold mt-4 tracking-widest uppercase text-sm">Peserta Terlatih</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Counter from={0} to={50} />
            <p className="text-blue-200/50 font-bold mt-4 tracking-widest uppercase text-sm">Program Dilaksanakan</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
            <Counter from={0} to={20} />
            <p className="text-blue-200/50 font-bold mt-4 tracking-widest uppercase text-sm">Institusi Bermitra</p>
          </motion.div>
        </div>

        {/* ===== VISI & MISI ===== */}
        <div className="grid md:grid-cols-2 gap-8 relative z-10">
          {/* Kartu Visi */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0B0D21]/80 backdrop-blur-md border border-cyan-900/40 p-10 rounded-3xl shadow-[0_0_30px_-10px_rgba(34,211,238,0.2)]"
          >
            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center text-2xl mb-6 border border-cyan-400/50">
              🔭
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Visi <span className="text-cyan-400">Kami</span></h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              Menjadi ekosistem edukasi terdepan yang menyediakan ruang berbagi pengetahuan secara bebas dan terbuka, di mana setiap anak memiliki kesempatan yang sama untuk merancang, merakit, dan memprogram masa depannya melalui teknologi.
            </p>
          </motion.div>

          {/* Kartu Misi */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#0B0D21]/80 backdrop-blur-md border border-purple-900/40 p-10 rounded-3xl shadow-[0_0_30px_-10px_rgba(168,85,247,0.2)]"
          >
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-2xl mb-6 border border-purple-400/50">
              🚀
            </div>
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}