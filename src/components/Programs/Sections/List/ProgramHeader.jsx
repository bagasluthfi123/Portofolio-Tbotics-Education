import { motion } from 'framer-motion';

export default function ProgramHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="text-center mb-6 md:mb-10"
    >
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white">
        Akademi
        <span className="text-cyan-400 ml-3 md:ml-4 drop-shadow-[0_0_20px_rgba(0,255,255,0.8)] block sm:inline mt-2 sm:mt-0">
          Tbotics
        </span>
      </h2>
    </motion.div>
  );
}