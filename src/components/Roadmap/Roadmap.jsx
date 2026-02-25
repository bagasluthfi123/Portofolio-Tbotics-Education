import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const roadmapData = [
  {
    id: 1,
    category: "SD",
    level: "Kelas 1 SD",
    title: "Dasar Robotika & Walk Robot",
    description: "Belajar dasar robotika yang menyenangkan dan mempraktikkan langsung pembuatan project Walk Robot.",
    color: "#00E5FF", // Neon Cyan
    icon: "🚶‍♂️"
  },
  {
    id: 2,
    category: "SD",
    level: "Kelas 2 SD",
    title: "Mengenal Robot & Merakit Tbot",
    description: "Langkah selanjutnya untuk mengenal lebih dalam anatomi robot dan praktik merakit Tbot secara mandiri.",
    color: "#2979FF", // Bright Blue
    icon: "🤖"
  },
  {
    id: 3,
    category: "SD",
    level: "Kelas 3 SD",
    title: "Potensio & Motor Drive",
    description: "Mulai membedah sistem elektronik robot dengan mengenal fungsi Potensio dan Motor Drive pada Tbot.",
    color: "#D500F9", // Neon Purple
    icon: "⚙️"
  },
  {
    id: 4,
    category: "SD",
    level: "Kelas 4 dan 5 SD",
    title: "Mikrokontroler Arduino & ESP32",
    description: "Memasuki tahap coding! Adik-adik bersiap menjadi engineer cilik dengan mengenal dan belajar memprogram mikrokontroler Arduino dan ESP32.",
    color: "#F50057", // Neon Pink
    icon: "🧠"
  },
  {
    id: 5,
    category: "SMP",
    level: "Tingkat SMP",
    title: "Internet of Things (IoT)",
    description: "Misi tingkat lanjut! Eksplorasi pembuatan simulasi Smart Home dan sistem IoT (Internet of Things) berbasis ESP32 yang bisa dikendalikan lewat HP.",
    color: "#00E676", // Neon Green
    icon: "📡"
  },
  {
    id: 6,
    category: "SMP",
    level: "Tingkat SMP",
    title: "Mekanika & Lengan Robot",
    description: "Memahami mekanika yang lebih kompleks dengan merakit, memprogram, dan mengendalikan lengan robot otomatis raksasa.",
    color: "#FFD600", // Bright Yellow
    icon: "🦾"
  }
];

export default function Roadmap() {
  const [activeCategory, setActiveCategory] = useState('SD');
  const filteredRoadmap = roadmapData.filter(item => item.category === activeCategory);

  return (
    <section id="roadmap" className="min-h-screen py-16 md:py-24 px-4 md:px-6 relative z-10 bg-[#020b2d] overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 md:mb-6 tracking-wide uppercase font-mono">
            Jalur Misi <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">Kurikulum</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg font-medium px-4">
            Pilih jenjang misi di bawah ini untuk melihat peta perjalanan belajar inovator muda Tbotics.
          </p>
        </motion.div>

        {/* Tab Filter */}
        <div className="flex justify-center gap-3 md:gap-4 mb-16 md:mb-20">
          {['SD', 'SMP'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 md:px-10 md:py-3 rounded-full font-bold text-sm md:text-lg transition-all duration-300 border-2 
                ${activeCategory === category 
                  ? 'bg-[#00D8FF]/10 border-[#00D8FF] text-[#00D8FF] shadow-[0_0_15px_rgba(0,216,255,0.4)] scale-105' 
                  : 'bg-[#09112A] border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'
                }`}
            >
              Kurikulum {category}
            </button>
          ))}
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Garis Vertikal */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent opacity-30 transform md:-translate-x-1/2 rounded-full" />

          <div className="space-y-12 md:space-y-24 relative z-10">
            <AnimatePresence mode="popLayout">
              {filteredRoadmap.map((item, index) => {
                return (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -30 }}
                    transition={{ duration: 0.4 }} // Dibuat lebih cepat dan ringan
                    className={`relative flex flex-col md:flex-row items-start md:items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                  >
                    
                    {/* Node Tengah (Dibuat statis dengan CSS hover saja, tanpa Framer Motion continuous loop) */}
                    <div 
                      className="absolute left-6 md:left-1/2 w-10 h-10 bg-[#0B0D21] border-4 rounded-full transform -translate-x-1/2 flex items-center justify-center z-20 mt-2 md:mt-0 transition-shadow duration-300"
                      style={{ 
                        borderColor: item.color,
                        boxShadow: `0px 0px 10px ${item.color}80` // Glow statis yang ringan
                      }}
                    >
                      <span className="text-sm">{item.icon}</span>
                    </div>

                    {/* Konten Kartu */}
                    <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pl-12 lg:pl-16' : 'md:pr-12 lg:pr-16'}`}>
                      
                      {/* OPTIMASI: 
                        Alih-alih animasi terus-menerus, kita pakai efek transisi CSS standar untuk hover. 
                        Ini jauh lebih hemat memori dan tidak bikin HP/Laptop panas.
                      */}
                      <div 
                        style={{ border: `2px solid ${item.color}50` }} 
                        className="bg-[#09112A] p-5 md:p-6 rounded-2xl md:rounded-3xl hover:scale-[1.02] transition-all duration-300 group"
                        onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0px 0px 25px ${item.color}60`}
                        onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                      >
                        
                        {/* Badge Kelas */}
                        <span 
                          className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full border text-[10px] md:text-xs font-bold mb-3 md:mb-4 tracking-wider uppercase"
                          style={{ borderColor: item.color, color: item.color, backgroundColor: `${item.color}15` }}
                        >
                          {item.level}
                        </span>
                        
                        <h3 
                          className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 transition-colors duration-300"
                          style={{ '--hover-color': item.color }} 
                        >
                          <span className="group-hover:text-[var(--hover-color)] transition-colors">{item.title}</span>
                        </h3>
                        <p className="text-gray-400 leading-relaxed text-sm md:text-base font-light">
                          {item.description}
                        </p>

                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}