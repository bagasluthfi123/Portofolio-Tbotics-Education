import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
// Pastikan nama file gambar tidak menggunakan spasi
import earthBg from '../../assets/Earth Tbotics.png'; 

export default function PlanetBackground() {
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

      {/* Planet */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[750px] md:h-[750px] opacity-30 md:opacity-40"
      >
        <div className="relative w-full h-full rounded-full overflow-hidden border border-cyan-400/20 shadow-[0_0_80px_rgba(0,255,255,0.15)] md:shadow-[0_0_120px_rgba(0,255,255,0.2)]">
          <img
            src={earthBg}
            alt="Earth"
            className="w-full h-full object-cover rounded-full animate-[spinEarth_180s_linear_infinite] scale-110 opacity-90"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent via-transparent to-[#02030A] opacity-60" />
          <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-xl md:blur-2xl animate-pulse" />
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
}