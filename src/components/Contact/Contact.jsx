import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const phoneNumber = "6285162534164";

    // 1. Susun pesan dengan rapi menggunakan enter asli (template literal)
    const messageTemplate = `Halo Tim Tbotics, 
Saya mengunjungi website Tbotics dan ingin berdiskusi lebih lanjut. 
Berikut adalah data diri saya:
*Nama:* ${formData.name}
*Email:* ${formData.email}

*Pesan:*
"${formData.message}"

Terima kasih.`;

    // 2. Encode seluruh pesan agar aman dan terbaca sempurna oleh WhatsApp
    const encodedMessage = encodeURIComponent(messageTemplate);

    // 3. Buka link WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <section id="kontak" className="min-h-screen py-24 px-6 relative z-10 flex items-center justify-center bg-[#020b2d]">

      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020b2d] to-[#01040f] -z-20" />
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none -z-10" />

      <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">

        {/* KOLOM KIRI: Informasi Kontak & Maps */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Header Section */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Mari <span className="text-[#00D8FF] drop-shadow-[0_0_10px_rgba(0,216,255,0.4)]">Berkolaborasi</span>
            </h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-lg">
              Punya pertanyaan tentang kelas atau tertarik membawa kurikulum robotika ke sekolah Anda? Kunjungi markas kami atau hubungi kami langsung!
            </p>
          </div>

          {/* Grid Kartu Info Kontak - Sekarang hanya 2 kartu (Alamat & Email) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Kartu Alamat */}
            <a
              href="https://share.google/fhC5PXxCzmOXhpK2v"
              target="_blank"
              rel="noreferrer"
              className="bg-[#09112A] border border-blue-900/40 p-6 rounded-[20px] flex flex-col gap-4 hover:border-red-500/50 transition-colors group cursor-pointer"
            >
              <span className="text-3xl text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] group-hover:scale-110 transition-transform origin-left">📍</span>
              <div>
                <h4 className="text-white font-bold text-lg mb-1">Alamat Kami</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Jakarta Selatan, DKI Jakarta<br />Indonesia
                </p>
              </div>
            </a>

            {/* Kartu Email */}
            <a href="mailto:hello@tbotics.id" className="bg-[#09112A] border border-blue-900/40 p-6 rounded-[20px] flex flex-col gap-4 hover:border-blue-500/50 transition-colors group">
              <span className="text-3xl text-blue-200 group-hover:scale-110 transition-transform origin-left">✉️</span>
              <div>
                <h4 className="text-white font-bold text-lg mb-1">Email</h4>
                <p className="text-gray-400 text-sm">hello@tbotics.id</p>
              </div>
            </a>
          </div>

          {/* GOOGLE MAPS EMBED */}
          <div className="w-full h-64 sm:h-72 rounded-[20px] overflow-hidden border border-blue-900/40 shadow-lg relative group">
            <div className="absolute inset-0 pointer-events-none border border-cyan-500/0 rounded-[20px] z-10 group-hover:border-cyan-500/50 transition-colors duration-300"></div>
            <iframe
              title="Peta Lokasi Tbotics"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0012970823777!2d106.80605997591441!3d-6.263557793725052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1e348f926eb%3A0xb6128b79a49355c!2sAntasari%20Park!5e0!3m2!1sid!2sid!4v1771766774013!5m2!1sid!2sid"
              className="w-full h-full"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(100%)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </motion.div>

        {/* KOLOM KANAN: Form Kontak */}
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
            <p className="text-gray-400 text-sm">Isi form di bawah ini dan kami akan merespon secepatnya via WhatsApp.</p>
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
            ></textarea>

            <button
              type="submit"
              className="w-full bg-[#00D8FF] text-[#020b2d] font-bold text-lg py-4 rounded-xl hover:bg-cyan-300 transition-colors shadow-[0_0_20px_rgba(0,216,255,0.3)] hover:shadow-[0_0_25px_rgba(0,216,255,0.5)] flex items-center justify-center gap-2 cursor-pointer"
            >
              Kirim via WhatsApp 🚀
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}