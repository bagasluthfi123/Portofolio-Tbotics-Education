// src/components/Contact/Sections/ContactForm.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const phoneNumber = '6285155232513';
    const messageTemplate = `Halo Tim Tbotics, 
Saya mengunjungi website Tbotics dan ingin berdiskusi lebih lanjut. 
Berikut adalah data diri saya:
*Nama:* ${formData.name}
*Email:* ${formData.email}

*Pesan:*
"${formData.message}"

Terima kasih.`;

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageTemplate)}`,
      '_blank'
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="w-full bg-[#0c1838] border border-blue-800/60 rounded-[32px] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] relative z-10"
    >
      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">
          Kirim <span className="text-cyan-400">Pesan</span>
        </h3>
        <p className="text-gray-400 text-sm">
          Isi form di bawah ini dan kami akan merespon secepatnya via WhatsApp.
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
        />
        <button
          type="submit"
          className="w-full bg-[#00D8FF] text-[#020b2d] font-bold text-lg py-4 rounded-xl hover:bg-cyan-300 transition-colors shadow-[0_0_20px_rgba(0,216,255,0.3)] hover:shadow-[0_0_25px_rgba(0,216,255,0.5)] flex items-center justify-center gap-2 cursor-pointer"
        >
          Kirim via WhatsApp 🚀
        </button>
      </form>
    </motion.div>
  );
}