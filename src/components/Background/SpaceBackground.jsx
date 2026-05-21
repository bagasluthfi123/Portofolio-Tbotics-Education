import { useEffect, useState } from 'react';

export default function SpaceBackground() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generatedParticles = [...Array(15)].map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animDuration: `${Math.random() * 8 + 10}s`, // Format string detik 's' untuk CSS
      animDelay: `${Math.random() * 2}s`, // Format string detik 's' untuk CSS
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#010410] pointer-events-none">
      
      {/* 🚀 INJECT CSS KEYFRAMES LANGSUNG 🚀 */}
      {/* Ini jauh lebih ringan dari JavaScript. will-change memastikan browser pakai hardware acceleration. */}
      <style>
        {`
          @keyframes float-particle {
            0%, 100% { transform: translateY(0); opacity: 0.1; }
            50% { transform: translateY(-40px); opacity: 0.7; }
          }
          .animate-particle {
            animation-name: float-particle;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
            will-change: transform, opacity; 
          }
        `}
      </style>

      {/* 1. MATAHARI NEON (VERSI RINGAN) */}
      <div className="absolute top-[-30%] right-[-20%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(6,182,212,0.12)_0%,transparent_60%)]" />

      {/* 2. NEBULA UNGU/BIRU TUA (VERSI RINGAN) */}
      <div className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(29,78,216,0.15)_0%,transparent_60%)]" />

      {/* 3. PARTIKEL BINTANG (Sekarang pakai tag div biasa + CSS Animasi) */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bg-cyan-200 rounded-full animate-particle"
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
            animationDuration: p.animDuration,
            animationDelay: p.animDelay,
          }}
        />
      ))}
      
      {/* 4. OVERLAY NOISE (mix-blend-overlay dihapus agar HP kentang tidak lag) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
    </div>
  );
}