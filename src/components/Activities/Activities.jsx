// import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";

// // --- DATA UTAMA ---
// const stories = [
//   {
//     id: 1,
//     title: "Workshop Robotika Dasar",
//     category: "Workshop",
//     image: "https://picsum.photos/seed/tbotics-ws/1000/700",
//     description: "Sesi intensif pemahaman dasar mikrokontroler dan sistem kendali untuk inovator masa depan.",
//     details: ["Alat & Bahan Disediakan", "Sertifikat Digital", "Modul Praktis"],
//   },
//   {
//     id: 2,
//     title: "Program Ekstrakurikuler Berjenjang",
//     category: "Ekstrakurikuler",
//     partners: ["SDN 01 Jakarta", "SMP Global Tech", "Mutiara Bangsa", "SMA Bintang"],
//     image: "https://picsum.photos/seed/tbotics-ws/1000/700",
//     description: "Program pembelajaran robotika berjenjang untuk SD & SMP dengan pendekatan praktis dan menyenangkan.",
//   },
//   {
//     id: 3,
//     title: "Bootcamp Intensif: Dari Koding ke Robotika",
//     category: "Bootcamp",
//     image: "https://picsum.photos/seed/tbotics-bc/1000/700",
//     description: "Pengalaman belajar mendalam selama beberapa hari untuk membangun perangkat IoT berbasis ESP32.",
//   },
//   {
//     id: 4,
//     title: "Kompetisi Robotika: Uji Coba Mental Juara",
//     category: "Kompetisi",
//     image: "https://picsum.photos/seed/tbotics-comp/1000/700",
//     description: "Bimbingan teknis dan mental untuk menghadapi tantangan di berbagai kompetisi robotika nasional.",
//     quote: "Bukan sekadar menang, tapi tentang bagaimana kita menyelesaikan masalah.",
//   },
// ];

// const categories = ["Semua", "Workshop", "Ekstrakurikuler", "Bootcamp", "Kompetisi"];

// // --- SUB-COMPONENTS ---

// const WorkshopSpecial = ({ data }) => (
//   <div className="grid md:grid-cols-2 gap-12 items-center text-left">
//     <motion.img initial={{ x: -50 }} animate={{ x: 0 }} src={data.image} className="rounded-3xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/10" />
//     <div>
//       <span className="text-cyan-400 font-bold uppercase tracking-widest text-sm">Program Intensif</span>
//       <h3 className="text-4xl font-bold my-4 text-white">{data.title}</h3>
//       <p className="text-gray-400 mb-6 text-lg">{data.description}</p>
//       <div className="space-y-3">
//         {data.details.map((item, i) => (
//           <div key={i} className="flex items-center gap-3 text-cyan-100">
//             <span className="flex items-center justify-center w-5 h-5 bg-cyan-500/20 rounded-full text-[10px]">✔</span> {item}
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// const EkskulSpecial = ({ data }) => {
//   const roadmapData = [
//     {
//       fase: "Fase 1: SD (Pemula)",
//       desc: "Pengenalan logika dasar, merakit balok robotik, dan pengenalan komponen elektronik sederhana.",
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <circle cx="12" cy="12" r="10" strokeWidth="2" />
//           <circle cx="12" cy="12" r="4" strokeWidth="2" />
//         </svg>
//       ),
//     },
//     {
//       fase: "Fase 2: SD (Lanjutan)",
//       desc: "Mulai memprogram robot dengan block-programming (Scratch/Mblock) untuk menggerakkan motor.",
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
//         </svg>
//       ),
//     },
//     {
//       fase: "Fase 3: SMP",
//       desc: "Pemrograman teks (C++/Python), penggunaan sensor kompleks (Ultrasonic, Line Follower), dan mikrokontroler Arduino.",
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" />
//           <path strokeWidth="2" d="M9 9h6v6H9z" />
//         </svg>
//       ),
//     }
//   ];

//   return (
//     <div className="space-y-24">
//       <div className="grid md:grid-cols-2 gap-12 items-start text-left">
//         <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
//           <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">{data.title}</h3>
//           <p className="text-gray-400 text-lg leading-relaxed mb-8">
//             Pendekatan pembelajaran berbasis Elektronika Dasar dan Mikrokontroler (ESP32 & Arduino) yang dirancang untuk mengasah kreativitas sesuai usia siswa.
//           </p>
//           <div className="flex gap-4">
//             <div className="bg-[#0B0D21] border border-cyan-500/30 p-5 rounded-2xl flex-1 shadow-[0_0_15px_rgba(34,211,238,0.05)] text-center">
//               <span className="text-3xl mb-3 block">🏫</span>
//               <p className="text-white font-bold text-base">SD</p>
//               <p className="text-cyan-400/60 text-[10px] uppercase tracking-[0.2em] font-bold">KELAS 1 - 6</p>
//             </div>
//             <div className="bg-[#0B0D21] border border-cyan-500/30 p-5 rounded-2xl flex-1 shadow-[0_0_15px_rgba(34,211,238,0.05)] text-center">
//               <span className="text-3xl mb-3 block">🎓</span>
//               <p className="text-white font-bold text-base">SMP</p>
//               <p className="text-cyan-400/60 text-[10px] uppercase tracking-[0.2em] font-bold">KELAS 7 - 9</p>
//             </div>
//           </div>
//         </motion.div>

//         <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-[#0B0D21]/50 p-8 rounded-3xl border border-white/5 space-y-6 backdrop-blur-sm">
//           <h4 className="text-cyan-400 font-bold uppercase tracking-[0.3em] text-xs text-left">Pendekatan Teknologi</h4>
//           <div className="grid grid-cols-2 gap-y-5 gap-x-6">
//             {["Elektronika Dasar", "Arduino IDE", "ESP32 IoT", "Sensorik"].map((tech, i) => (
//               <div key={i} className="flex items-center gap-3 text-gray-300 text-sm font-medium group">
//                 <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] group-hover:scale-125 transition-transform"></div>
//                 {tech}
//               </div>
//             ))}
//           </div>
//         </motion.div>
//       </div>

//       <div className="space-y-16">
//         <div className="text-center">
//           <h3 className="text-3xl md:text-5xl font-bold text-white">Roadmap <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">Pembelajaran</span></h3>
//         </div>
//         <div className="grid md:grid-cols-3 gap-8">
//           {roadmapData.map((step, i) => (
//             <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className="bg-[#0B0D21] p-10 rounded-3xl border border-white/5 relative group hover:border-cyan-500/50 transition-all duration-500 shadow-xl text-left">
//               <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-8 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-[#070816] transition-all duration-500 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
//                 {step.icon}
//               </div>
//               <h4 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">{step.fase}</h4>
//               <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const CompetitionSpecial = ({ data }) => (
//   <div className="relative p-12 rounded-[3rem] overflow-hidden bg-[#0B0D21] border border-cyan-900/50 text-center">
//     <div className="absolute top-0 right-0 p-10 opacity-10 text-9xl italic font-serif text-cyan-400">"</div>
//     <h3 className="text-4xl font-bold mb-6 text-white relative z-10">{data.title}</h3>
//     <p className="text-2xl italic text-cyan-300 mb-10 max-w-3xl mx-auto relative z-10 leading-relaxed italic">"{data.quote}"</p>
//     <img src={data.image} className="w-full max-h-[450px] object-cover rounded-3xl shadow-2xl relative z-10" alt="Competition" />
//   </div>
// );

// // --- MAIN COMPONENT ---

// export default function Activities() {
//   const [activeTab, setActiveTab] = useState("Semua");
//   const filteredStories = activeTab === "Semua" ? stories : stories.filter(story => story.category === activeTab);

//   const renderContent = () => {
//     if (activeTab === "Workshop") return <WorkshopSpecial data={stories[0]} />;
//     if (activeTab === "Ekstrakurikuler") return <EkskulSpecial data={stories[1]} />;
//     if (activeTab === "Kompetisi") return <CompetitionSpecial data={stories[3]} />;

//     return (
//       <div className="space-y-32">
//         {filteredStories.map((story, index) => (
//           <motion.div key={story.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className={`grid md:grid-cols-2 gap-16 items-center ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
//             <div className={`relative group ${index % 2 !== 0 ? "md:order-2" : ""}`}>
//               <div className="absolute -inset-1 bg-cyan-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
//               <img src={story.image} alt={story.title} className="relative rounded-3xl shadow-2xl border border-white/5" />
//             </div>
//             <div className={`text-left ${index % 2 !== 0 ? "md:order-1" : ""}`}>
//               <span className="text-cyan-400 text-sm font-bold uppercase tracking-widest bg-cyan-400/10 px-3 py-1 rounded-md">{story.category}</span>
//               <h3 className="text-3xl md:text-5xl font-bold mt-6 mb-6 leading-tight text-white">{story.title}</h3>
//               <p className="text-gray-400 text-lg leading-relaxed">{story.description}</p>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <section id="kegiatan" className="bg-[#070816] text-white py-32 px-6 overflow-hidden min-h-screen">
//       <div className="max-w-7xl mx-auto text-center">
//         <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
//           Perjalanan <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">Tbotics</span>
//         </motion.h2>
//         <p className="text-gray-400 max-w-2xl mx-auto text-xl font-light mb-16">Eksplorasi dedikasi kami dalam membangun generasi masa depan yang melek teknologi.</p>

//         <div className="flex flex-wrap justify-center gap-3 mb-24">
//           {categories.map((cat) => (
//             <button key={cat} onClick={() => setActiveTab(cat)} className={`px-7 py-3 rounded-full border-2 transition-all duration-500 font-bold text-sm tracking-widest uppercase ${activeTab === cat ? "border-cyan-400 bg-cyan-400 text-[#070816] shadow-[0_0_25px_rgba(34,211,238,0.6)]" : "border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300"}`}>
//               {cat}
//             </button>
//           ))}
//         </div>

//         <AnimatePresence mode="wait">
//           <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
//             {renderContent()}
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </section>
//   );
// }