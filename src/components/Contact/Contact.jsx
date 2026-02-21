import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="kontak" className="py-24 px-6 relative z-10">
      <div className="max-w-3xl mx-auto bg-space-card border border-white/10 rounded-3xl p-8 md:p-12">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4">Hubungi <span className="text-space-primary">Kami</span></h2>
          <p className="text-gray-400">Punya pertanyaan tentang kelas atau ingin bekerja sama dengan sekolah Anda?</p>
        </div>
        
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input type="text" placeholder="Nama Lengkap" className="w-full bg-space-bg border border-white/10 p-4 rounded-xl focus:outline-none focus:border-space-primary transition text-white" />
            <input type="email" placeholder="Email Aktif" className="w-full bg-space-bg border border-white/10 p-4 rounded-xl focus:outline-none focus:border-space-primary transition text-white" />
          </div>
          <textarea rows="5" placeholder="Tulis pesan Anda di sini..." className="w-full bg-space-bg border border-white/10 p-4 rounded-xl focus:outline-none focus:border-space-primary transition text-white"></textarea>
          <button type="button" className="w-full bg-space-primary text-space-bg font-bold py-4 rounded-xl hover:bg-white transition">
            Kirim Pesan
          </button>
        </form>
      </div>
    </section>
  );
}