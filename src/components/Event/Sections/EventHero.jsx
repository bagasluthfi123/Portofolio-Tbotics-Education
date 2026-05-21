import { motion } from 'framer-motion';

export default function EventHero() {
    return (
        <section className="relative z-10 text-center py-10">
            <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(0,209,255,0.5)] uppercase font-mono"
            >
                Stasiun Event Tbotics
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 mt-4 text-lg font-medium"
            >
                Jelajahi misi, kompetisi, dan petualangan teknologi terbaru kami!
            </motion.p>
        </section>
    );
}