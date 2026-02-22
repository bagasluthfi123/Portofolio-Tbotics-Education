// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const dummyActivities = [
//   { id: 1, title: "Merakit Robot Line Follower Pertama!", date: "22 Februari 2026", category: "Workshop SD/SMP", image: "https://picsum.photos/seed/tbotics1/600/400", description: "Hari ini adik-adik belajar bagaimana menggunakan sensor inframerah agar robot bisa mengikuti garis hitam secara otomatis. Antusiasme mereka luar biasa saat melihat robotnya berjalan sendiri tanpa dikendalikan remot." },
//   { id: 2, title: "Simulasi Smart Home IoT Berbasis ESP32", date: "18 Februari 2026", category: "Bootcamp", image: "https://picsum.photos/seed/tbotics2/600/400", description: "Siswa tingkat SMA berhasil memprogram ESP32 untuk menyalakan lampu dan kipas angin menggunakan perintah suara dari smartphone. Langkah awal yang luar biasa menuju otomatisasi rumah!" },
//   { id: 3, title: "Persiapan Lomba Robotik Tingkat Nasional", date: "05 Februari 2026", category: "Lomba", image: "https://picsum.photos/seed/tbotics4/600/400", description: "Tim elit Tbotics sedang lembur menyempurnakan algoritma PID untuk robot pemadam api mereka. Doakan kami membawa pulang piala juara satu minggu depan!" },
//   { id: 4, title: "Pengenalan Dasar Coding dengan Scratch", date: "28 Januari 2026", category: "Workshop SD/SMP", image: "https://picsum.photos/seed/tbotics5/600/400", description: "Belajar coding tidak pernah seseru ini! Anak-anak SD membuat game animasi sederhana mereka sendiri menggunakan blok-blok visual dari Scratch." },
//   { id: 5, title: "Sertifikasi Lulusan Bootcamp Batch 1", date: "15 Januari 2026", category: "Bootcamp", image: "https://picsum.photos/seed/tbotics6/600/400", description: "Selamat kepada seluruh peserta Bootcamp Batch 1 yang telah menyelesaikan project akhir mereka dengan gemilang. Masa depan ada di tangan kalian!" },
//   { id: 6, title: "Pelatihan IoT untuk Guru SMK", date: "10 Januari 2026", category: "Workshop SD/SMP", image: "https://picsum.photos/seed/tbotics7/600/400", description: "Memberdayakan para pendidik dengan teknologi terbaru agar bisa diteruskan kepada siswa-siswi mereka di sekolah." },
//   { id: 7, title: "Juara 1 Lomba Line Follower Nasional!", date: "02 Januari 2026", category: "Lomba", image: "https://picsum.photos/seed/tbotics8/600/400", description: "Kerja keras terbayar lunas! Tim Tbotics berhasil menyabet juara pertama mengalahkan puluhan sekolah lainnya." }
// ];

// const categories = ['Semua', 'Workshop SD/SMP', 'Bootcamp', 'Lomba'];

// export default function AllActivities({ setCurrentPage }) {
//   const [activeCategory, setActiveCategory] = useState('Semua');

//   useEffect(() => {
//     window.scrollTo(0, 0); // Scroll ke atas saat dibuka
//   }, []);

//   const filteredActivities = activeCategory === 'Semua' 
//     ? dummyActivities 
//     : dummyActivities.filter(item => item.category === activeCategory);

//   return (
//     <div className="min-h-screen py-32 px-6 relative z-10">
//       <div className="max-w-7xl mx-auto">
//         {/* Tombol Kembali (Back Button) */}
//         <button 
//           onClick={() => {
//             setCurrentPage('home');
//             // Tambahkan baris ini agar URL kembali bersih / kembali ke beranda
//             window.history.pushState(null, '', '#beranda');
//           }}
//           className="mb-8 flex items-center gap-2 text-cyan-400 hover:text-white transition-colors duration-300 font-semibold bg-cyan-900/30 px-4 py-2 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/30 w-fit"
//         >
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
//           Kembali ke Beranda
//         </button>

//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-left mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//             Semua <span className="text-cyan-400">Kegiatan Kami</span>
//           </h1>
//           <p className="text-gray-400 max-w-2xl text-lg">
//             Jelajahi seluruh rekam jejak, portofolio, dan momen tak terlupakan dari perjalanan Tbotics Education.
//           </p>
//         </motion.div>

//         <div className="flex flex-wrap gap-3 mb-12">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setActiveCategory(category)}
//               className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
//                 activeCategory === category ? 'bg-cyan-400 text-gray-900 shadow-[0_0_15px_rgba(0,209,255,0.5)]' : 'bg-gray-800/80 text-gray-400 border border-gray-700 hover:border-cyan-400 hover:text-cyan-400'
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           <AnimatePresence mode='popLayout'>
//             {filteredActivities.map((activity) => (
//               <motion.div 
//                 layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}
//                 key={activity.id}
//                 className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,209,255,0.15)] transition-all duration-300 group cursor-pointer flex flex-col"
//               >
//                 <div className="relative h-56 overflow-hidden">
//                   <img src={activity.image} alt={activity.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
//                   <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-md border border-cyan-400/50 text-cyan-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
//                     {activity.category}
//                   </div>
//                 </div>
//                 <div className="p-6 flex flex-col flex-grow">
//                   <p className="text-gray-400 text-sm font-medium mb-3 flex items-center gap-2">
//                     <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
//                     {activity.date}
//                   </p>
//                   <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">{activity.title}</h3>
//                   <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">{activity.description}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>
//       </div>
//     </div>
//   );
// }