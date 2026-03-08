// import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// export default function SpaceBackground() {
//   const { scrollYProgress } = useScroll();
  
//   // Tambahkan efek "Pegas" (Spring) agar scroll nilai Y menjadi sangat smooth
//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001
//   });

//   // Gunakan smoothProgress, BUKAN scrollYProgress lagi
//   const y1 = useTransform(smoothProgress, [0, 1], ['0%', '50%']);
//   const y2 = useTransform(smoothProgress, [0, 1], ['0%', '-50%']);

//   return (
//     <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
//       <motion.div 
//         style={{ y: y1 }}
//         className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40 will-change-transform"
//       />
//       <motion.div 
//         style={{ y: y2 }}
//         className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 bg-[length:200px_200px] will-change-transform"
//       />
//       {/* Efek gradient biru gelap di bawah */}
//       <div className="absolute inset-0 bg-gradient-to-b from-transparent to-space-bg opacity-90" />
//     </div>
//   );
// }

// import { motion } from 'framer-motion';
// import { useEffect, useState } from 'react';

// export default function SpaceBackground() {
//   const [particles, setParticles] = useState([]);

//   // Generate partikel hanya sekali saat komponen dimuat (menghindari error SSR/Hydration)
//   useEffect(() => {
//     const generatedParticles = [...Array(40)].map((_, i) => ({
//       id: i,
//       size: Math.random() * 3 + 1, // Ukuran bintang antara 1px - 4px
//       top: `${Math.random() * 100}%`,
//       left: `${Math.random() * 100}%`,
//       animDuration: Math.random() * 10 + 10, // Kecepatan melayang lambat
//       animDelay: Math.random() * 5,
//     }));
//     setParticles(generatedParticles);
//   }, []);

//   return (
//     // fixed inset-0 dan z-[-1] memastikan ini selalu ada di paling belakang layar
//     <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#010410] pointer-events-none">
      
//       {/* 1. MATAHARI NEON UTAMA (Kanan Atas) */}
//       <motion.div
//         animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
//         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//         className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-cyan-500 rounded-full blur-[150px] md:blur-[200px]"
//       />

//       {/* 2. NEBULA UNGU/BIRU TUA (Kiri Bawah) */}
//       <motion.div
//         animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
//         transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
//         className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-blue-700 rounded-full blur-[120px] md:blur-[180px]"
//       />

//       {/* 3. INTI MATAHARI (Lebih Terang, Tepat di Sudut) */}
//       <div className="absolute top-[-5%] right-[-5%] w-[200px] h-[200px] bg-white rounded-full blur-[80px] opacity-20" />

//       {/* 4. PARTIKEL BINTANG / DEBU KOSMIK MELAYANG */}
//       {particles.map((p) => (
//         <motion.div
//           key={p.id}
//           className="absolute bg-cyan-200 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"
//           style={{
//             width: p.size,
//             height: p.size,
//             top: p.top,
//             left: p.left,
//           }}
//           animate={{
//             y: [0, -60, 0], // Melayang naik turun sedikit
//             x: [0, Math.random() * 30 - 15, 0], // Bergeser kiri kanan sedikit
//             opacity: [0.1, 0.8, 0.1], // Efek kedap-kedip (twinkle)
//             scale: [0.8, 1.5, 0.8],
//           }}
//           transition={{
//             duration: p.animDuration,
//             delay: p.animDelay,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />
//       ))}
      
//       {/* Overlay noise tipis agar teksturnya lebih terasa seperti luar angkasa */}
//       <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
//     </div>
//   );
// }

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function SpaceBackground() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Partikel dikurangi jadi 15 saja supaya super enteng
    const generatedParticles = [...Array(15)].map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1, // Ukuran diperkecil (1px - 3px)
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animDuration: Math.random() * 8 + 10,
      animDelay: Math.random() * 2,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#010410] pointer-events-none">
      
      {/* 1. MATAHARI NEON (VERSI RINGAN) */}
      {/* Pakai radial-gradient bawaan Tailwind, BUKAN filter blur yang bikin berat */}
      <div className="absolute top-[-30%] right-[-20%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(6,182,212,0.12)_0%,transparent_60%)]" />

      {/* 2. NEBULA UNGU/BIRU TUA (VERSI RINGAN) */}
      <div className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(29,78,216,0.15)_0%,transparent_60%)]" />

      {/* 3. PARTIKEL BINTANG (Animasi Disederhanakan) */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-cyan-200 rounded-full"
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
          }}
          // Animasi dikurangi: cuma geser Y (atas-bawah) dan kedap-kedip opacity
          animate={{
            y: [0, -40, 0],
            opacity: [0.1, 0.7, 0.1],
          }}
          transition={{
            duration: p.animDuration,
            delay: p.animDelay,
            repeat: Infinity,
            ease: "linear", // linear lebih enteng di-render daripada easeInOut
          }}
        />
      ))}
      
      {/* Overlay noise tipis */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
    </div>
  );
}