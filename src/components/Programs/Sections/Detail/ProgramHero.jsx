import { motion } from 'framer-motion';

export default function ProgramHero({ program }) {
  return (
    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
      <motion.div 
        initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
        className="bg-[#0B0D21]/80 backdrop-blur-md border border-cyan-900/50 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-[0_0_30px_-10px_rgba(34,211,238,0.2)] order-2 lg:order-1"
      >
        <p className="text-cyan-400 font-bold text-xs md:text-sm tracking-widest mb-3 uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          {program.subtitle}
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 md:mb-6 leading-tight">
          {program.title}
        </h1>
        <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
          {program.description}
        </p>
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div className="bg-[#020b2d] border border-blue-900/50 p-3 md:p-4 rounded-xl">
            <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider mb-1">Target</p>
            <p className="text-white font-bold text-sm md:text-base">{program.target}</p>
          </div>
          <div className="bg-[#020b2d] border border-blue-900/50 p-3 md:p-4 rounded-xl">
            <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider mb-1">Durasi</p>
            <p className="text-white font-bold text-sm md:text-base">{program.duration}</p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
        className="relative h-56 sm:h-72 lg:h-full min-h-[250px] md:min-h-[300px] w-full rounded-2xl md:rounded-3xl overflow-hidden border-2 border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.15)] group bg-[#0B0D21] order-1 lg:order-2"
      >
        <img src={program.image} alt={program.title} className="absolute inset-0 w-full h-full object-cover rounded-2xl md:rounded-3xl group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020b2d] via-transparent to-transparent pointer-events-none opacity-80 md:opacity-100"></div>
      </motion.div>
    </div>
  );
}