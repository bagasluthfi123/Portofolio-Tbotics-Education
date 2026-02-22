import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  // State untuk menangkap inputan user
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fungsi untuk mengirim pesan langsung ke WhatsApp
  const handleWhatsApp = (e) => {
    e.preventDefault();
    
    // GANTI NOMOR INI DENGAN NOMOR WA ADMIN TBOTICS
    const phoneNumber = "6281234567890"; 
    
    // Format pesan yang akan dikirim ke WA
    const text = `Halo Tim Tbotics! 🤖%0A%0APerkenalkan saya *${formData.name}* (${formData.email}).%0A%0A${formData.message}`;
    
    // Buka tab baru ke WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
  };

  return (
    <section id="kontak" className="min-h-screen py-24 px-6 relative z-10 flex items-center justify-center bg-[#020b2d]">
      
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020b2d] to-[#01040f] -z-20" />

      {/* Subtle overlay noise (opsional) */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        // PERUBAHAN DI SINI: Warna kartu diperterang, border dipertegas, dan shadow diperbesar
        className="w-full max-w-3xl bg-[#0c1838] border border-blue-800/60 rounded-3xl p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] relative z-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Hubungi <span className="text-cyan-400">Kami</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Punya pertanyaan tentang kelas atau ingin bekerja sama dengan sekolah Anda?
          </p>
        </div>
        
        <form onSubmit={handleWhatsApp} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Nama Lengkap" 
              // PERUBAHAN DI SINI: Warna input dibuat sangat gelap agar kontras dengan kartu
              className="w-full bg-[#03081a] border border-blue-900/50 p-4 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-white placeholder-gray-500" 
            />
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email Aktif" 
              className="w-full bg-[#03081a] border border-blue-900/50 p-4 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-white placeholder-gray-500" 
            />
          </div>
          <textarea 
            rows="5" 
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Tulis pesan Anda di sini..." 
            className="w-full bg-[#03081a] border border-blue-900/50 p-4 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-white placeholder-gray-500 resize-none"
          ></textarea>
          
          {/* Tombol Cyan */}
          <button 
            type="submit" 
            className="w-full bg-[#00D8FF] text-[#020b2d] font-bold text-lg py-4 rounded-xl hover:bg-cyan-300 transition-colors shadow-[0_0_20px_rgba(0,216,255,0.3)] hover:shadow-[0_0_25px_rgba(0,216,255,0.5)]"
          >
            Kirim Pesan
          </button>
        </form>
      </motion.div>
    </section>
  );
}