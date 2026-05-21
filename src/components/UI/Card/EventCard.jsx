// src/components/UI/Card/EventCard.jsx
import { motion } from 'framer-motion';

export default function EventCard({ event }) {
  // Kita tentukan warna berdasarkan status atau kategori
  const statusColors = {
    Upcoming: "bg-cyan-500/20 text-cyan-400 border-cyan-400/30",
    Ongoing: "bg-green-500/20 text-green-400 border-green-400/30",
    Past: "bg-gray-500/20 text-gray-400 border-gray-400/30",
  };

  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-[#0B0D21]/80 border border-cyan-900/50 rounded-2xl overflow-hidden shadow-lg group hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]"
    >
      {/* Gambar Event */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D21] to-transparent" />
        
        {/* Badge Status */}
        <span className={`absolute top-4 left-4 text-[10px] font-bold uppercase px-3 py-1 rounded-full border ${statusColors[event.status]}`}>
          {event.status}
        </span>
      </div>

      {/* Konten */}
      <div className="p-6">
        <p className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest">{event.category}</p>
        <h3 className="text-lg font-black text-white mt-1 mb-3 leading-snug">{event.title}</h3>
        <p className="text-gray-400 text-sm line-clamp-2">{event.description}</p>
        
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-500 font-mono">
          <span>📅 {event.date}</span>
          <span>📍 {event.location}</span>
        </div>
      </div>
    </motion.div>
  );
}