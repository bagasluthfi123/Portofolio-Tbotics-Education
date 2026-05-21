// src/data/HomeData.js
import foto1 from '../assets/gambar-anak-penabur-04.jpeg';
import foto2 from '../assets/gambar-anak-penabur-11.jpeg';
import foto3 from '../assets/gambar-anak-sd-program-01.jpeg';

export const YOUTUBE_ID = 'sCJ82fQ_S7A';

export const WA_LINK = `https://wa.me/6285155232513?text=${encodeURIComponent(
  'Halo Stasiun Tbotics! Saya ingin mendaftarkan anak saya belajar robotika.'
)}`;

export const THEME = {
  cyan:   { text: 'text-cyan-400',   bg: 'bg-cyan-500/15',   border: 'border-cyan-400/40',   glow: 'shadow-[0_0_25px_rgba(34,211,238,0.4)]',   hex: '#22d3ee' },
  purple: { text: 'text-purple-400', bg: 'bg-purple-500/15', border: 'border-purple-400/40', glow: 'shadow-[0_0_25px_rgba(168,85,247,0.4)]',   hex: '#a855f7' },
  yellow: { text: 'text-yellow-400', bg: 'bg-yellow-500/15', border: 'border-yellow-400/40', glow: 'shadow-[0_0_25px_rgba(234,179,8,0.4)]',    hex: '#eab308' },
  green:  { text: 'text-green-400',  bg: 'bg-green-500/15',  border: 'border-green-400/40',  glow: 'shadow-[0_0_25px_rgba(74,222,128,0.4)]',   hex: '#4ade80' },
  pink:   { text: 'text-pink-400',   bg: 'bg-pink-500/15',   border: 'border-pink-400/40',   glow: 'shadow-[0_0_25px_rgba(244,114,182,0.4)]',  hex: '#f472b6' },
  orange: { text: 'text-orange-400', bg: 'bg-orange-500/15', border: 'border-orange-400/40', glow: 'shadow-[0_0_25px_rgba(251,146,60,0.4)]',   hex: '#fb923c' },
};

export const STATS = [
  { to: 1500, label: 'Peserta Didik',        color: 'cyan',   icon: '👨‍🚀' },
  { to: 13,   label: 'Tahun Berpengalaman',  color: 'yellow', icon: '🏆'  },
  { to: 100,  label: 'Tingkat TK–Lanjut',   color: 'purple', icon: '📚'  },
  { to: 20,   label: 'Sekolah Rekanan',      color: 'green',  icon: '🏫'  },
];

export const CARGO_COMPONENTS = [
  { name: 'Mikrokontroler', icon: '🎛️', color: 'green',  depth: 45,  top: '18%', left: '12%' },
  { name: 'Ultrasonic',     icon: '👀', color: 'cyan',   depth: -35, top: '22%', left: '68%' },
  { name: 'LED RGB',        icon: '💡', color: 'yellow', depth: 60,  top: '58%', left: '9%'  },
  { name: 'Servo Motor',    icon: '⚙️', color: 'orange', depth: -50, top: '52%', left: '64%' },
  { name: 'IoT Module',     icon: '🌐', color: 'purple', depth: 25,  top: '40%', left: '38%' },
  { name: 'Baterai 9V',     icon: '🔋', color: 'pink',   depth: -22, top: '72%', left: '42%' },
];

export const LEVEL_TABS = [
  // { id: 'sd',  label: '🚀 SD',  color: 'cyan'   },
  // { id: 'smp', label: '🤖 SMP', color: 'purple' },
];

export const SHOWCASE_STEPS = [
  {
    img: foto1,
    tag: '🔧 Step 01',
    title: 'Merakit Robot',
    titleAccent: 'Itu Mudah!',
    desc: 'Di Tbotics, anak-anak diajarkan merakit robot dari nol menggunakan komponen yang sederhana dan aman. Trainer kami memandu setiap langkah — dari pasang roda, sambung kabel, hingga robot pertama mereka bergerak sendiri!',
    chips: [
      { label: '🤖 Robotika', color: 'cyan'   },
      { label: '🔩 Mekanik',  color: 'purple' },
      { label: '✓ Ramah Anak', color: 'green' },
    ],
    levels: ['sd'],
    color: 'cyan',
    hex: '#22d3ee',
    imgLeft: true,
  },
  {
    img: foto2,
    tag: '💡 Step 02',
    title: 'Elektronika',
    titleAccent: 'Lewat LED!',
    desc: 'Menyalakan lampu LED pertama adalah momen paling berkesan! Siswa belajar arus, tegangan, dan resistor sambil langsung praktek.',
    chips: [
      { label: '💡 LED RGB',  color: 'yellow' },
      { label: '⚡ Resistor', color: 'orange' },
      { label: '🔌 Saklar',   color: 'cyan'   },
    ],
    levels: ['sd'],
    color: 'yellow',
    hex: '#eab308',
    imgLeft: false,
  },
  // {
  //   img: foto3,
  //   tag: '🎛️ Step 03',
  //   title: 'Coding dengan',
  //   titleAccent: 'Mikrokontroler!',
  //   desc: 'Saatnya robot "dihidupkan" dengan kode! Siswa belajar memprogram Arduino — robot yang tadinya diam kini bisa bergerak dan menghindar rintangan.',
  //   chips: [
  //     { label: '🎛️ Arduino',    color: 'purple' },
  //     { label: '🚗 Robot Mobil', color: 'cyan'   },
  //     { label: '🔘 Pushbutton', color: 'green'  },
  //   ],
  //   levels: ['sd'],
  //   color: 'purple',
  //   hex: '#a855f7',
  //   imgLeft: true,
  // },
];

export const LAYANAN = [
  { icon: '🏫', title: 'Ekstrakurikuler / Intrakurikuler', desc: 'Kerjasama dengan pihak penyelenggara sekolah untuk program robotika terintegrasi kurikulum.', color: 'cyan',   badge: 'Sekolah'   },
  { icon: '👥', title: 'Reguler Class',                    desc: 'Kelas robotik kelompok umum. Belajar bareng, lebih seru dan kolaboratif!',                      color: 'purple', badge: 'Kelompok'  },
  { icon: '🎯', title: 'Private Class',                    desc: 'Kelas robotik eksklusif 1-on-1. Materi disesuaikan penuh dengan kebutuhan siswa.',               color: 'yellow', badge: 'Eksklusif' },
  { icon: '🏆', title: 'Mentoring Kompetisi',              desc: 'Pendampingan siswa ke jalur kompetisi robotik dari tingkat Nasional hingga Internasional.',       color: 'green',  badge: 'Kompetisi' },
];

export const TECH_SPECS = [
  { icon: '👨‍🚀', title: 'Trainer Berpengalaman', desc: 'Instruktur profesional & ramah, siap membimbing dari level pemula hingga mahir.',               color: 'cyan'   },
  { icon: '🦿', title: 'Fasilitas Modern',        desc: 'Peralatan robotika terkini — mikrokontroler, sensor, komponen mekanikal yang selalu diperbarui.', color: 'green'  },
  { icon: '💎', title: 'Harga Terjangkau',         desc: 'Biaya eksplorasi yang jelas & terjangkau. Price start from 150K IDR. Tanpa biaya tersembunyi!',  color: 'purple' },
  { icon: '🛡️', title: 'Pelayanan Terjamin',       desc: 'Komitmen pelayanan maksimal dari pendaftaran hingga selesai program.',                            color: 'yellow' },
];

export const DOC_DATA = [
  { img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80', title: 'Juara I Madrasah Robotic Competition 2025',                          tag: '🥇 Juara 1',      color: 'yellow' },
  { img: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=600&q=80', title: 'World Innovation Tech Challenge 2024 — Chonnam National University, Korea', tag: '🌏 Internasional', color: 'cyan'   },
  { img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=600&q=80', title: 'Sindo Robotic Olympiad 2017 — Budaya Indonesia',                      tag: '🏆 Olimpiade',    color: 'purple' },
];

export const TESTIMONIALS = [
  { photo: '/images/students/siswa1.jpg', name: 'Arjuna, 12 thn', school: 'SDN 5 Bandung', text: 'Seru banget! Aku bisa bikin robot sendiri dan menang kompetisi pertamaku!',                    color: 'cyan'   },
  { photo: '/images/students/siswa2.jpg', name: 'Zahra, 11 thn',  school: 'SD Al-Azhar',   text: 'Awalnya takut sama kabel-kabel, sekarang udah bisa bikin lampu LED berkedip sendiri!',       color: 'purple' },
  { photo: '/images/students/siswa3.jpg', name: 'Budi, 13 thn',   school: 'SMP Negeri 2',  text: 'Trainernya sabar banget, materi coding jadi mudah dipahami!',                                color: 'yellow' },
];