import { motion } from 'framer-motion';
import { Target, Cpu, Code } from 'lucide-react';

const roadmapData = [
  { title: "Fase 1: SD (Pemula)", desc: "Pengenalan logika dasar, merakit balok robotik, dan pengenalan komponen elektronik sederhana.", icon: <Target className="w-8 h-8 text-space-primary"/> },
  { title: "Fase 2: SD (Lanjutan)", desc: "Mulai memprogram robot dengan block-programming (Scratch/Mblock) untuk menggerakkan motor.", icon: <Code className="w-8 h-8 text-space-primary"/> },
  { title: "Fase 3: SMP", desc: "Pemrograman teks (C++/Python), penggunaan sensor kompleks (Ultrasonic, Line Follower), dan mikrokontroler Arduino.", icon: <Cpu className="w-8 h-8 text-space-primary"/> }
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Roadmap <span className="text-space-primary">Pembelajaran</span></h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {roadmapData.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-space-card p-8 rounded-2xl border border-white/10 hover:border-space-primary/50 transition relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-space-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"/>
              <div className="mb-6 bg-space-bg p-4 rounded-full inline-block border border-white/5">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}