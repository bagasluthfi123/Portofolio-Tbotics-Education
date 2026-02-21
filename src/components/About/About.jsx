import { motion } from 'framer-motion';

export default function About() {
    return (
        <section id="tentang" className="py-24 px-6 relative z-10 bg-space-card/50">
            <div className="max-w-5xl mx-auto text-center space-y-12">

                {/* Teks Sejarah */}
                <div className="space-y-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold"
                    >
                        Sejarah <span className="text-space-primary">Robotik Tbotics</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-lg md:text-xl leading-relaxed"
                    >
                        Tbotics Education lahir dari visi untuk memperkenalkan teknologi masa depan sejak usia dini.
                        Berfokus pada anak SD hingga SMP, kami menyederhanakan konsep elektronika, programming, dan mekanika
                        menjadi permainan dan proyek yang menyenangkan.
                    </motion.p>
                </div>

                {/* Video Player */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(0,209,255,0.15)] group"
                >
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/sCJ82fQ_S7A?si=Rvs2DQH_lDtmXQYK"
                        title="Tbotics Video Profile"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>

                    {/* Efek Glow tambahan saat di-hover */}
                    <div className="absolute inset-0 pointer-events-none ring-2 ring-transparent group-hover:ring-space-primary/50 transition duration-300 rounded-2xl"></div>
                </motion.div>

            </div>
        </section>
    );
}