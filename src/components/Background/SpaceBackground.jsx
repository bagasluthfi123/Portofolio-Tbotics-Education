import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function SpaceBackground() {
  const { scrollYProgress } = useScroll();
  
  // Tambahkan efek "Pegas" (Spring) agar scroll nilai Y menjadi sangat smooth
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Gunakan smoothProgress, BUKAN scrollYProgress lagi
  const y1 = useTransform(smoothProgress, [0, 1], ['0%', '50%']);
  const y2 = useTransform(smoothProgress, [0, 1], ['0%', '-50%']);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40 will-change-transform"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 bg-[length:200px_200px] will-change-transform"
      />
      {/* Efek gradient biru gelap di bawah */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-space-bg opacity-90" />
    </div>
  );
}