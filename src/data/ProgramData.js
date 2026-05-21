// src/data/ProgramData.js

export const WA_NUMBER_PROGRAM = '6285155232513';
import foto1 from '../assets/gambar-anak-penabur-01.jpeg';

export const programsData = [
  {
    id: 'ekstrakurikuler',
    tabLabel: 'Ekstrakurikuler',
    title: 'Ekstrakurikuler Robotika Sekolah',
    subtitle: 'PROGRAM REGULER',
    description: 'Bawa keseruan eksplorasi teknologi ke sekolah! Program rutin mingguan untuk membimbing inovator muda dari tahap perkenalan komponen hingga mahir memprogram robot secara mandiri.',
    features: [
      'Kurikulum terstruktur selama 1 semester',
      'Modul pembelajaran & project mingguan',
      'Alat dan komponen robotika disediakan',
      'Persiapan seleksi tim lomba sekolah'
    ],
    target: 'SD Kelas 1 - 6 & SMP',
    duration: '1 Semester',
    syllabuses: [
      {
        label: "Tingkat SD",
        items: [
          'Kelas 1: Pengenalan Apa Itu Robot & Komponen Dasar.',
          'Kelas 2: Merakit Robot Tbot Pertama Menggunakan Motor DC, Push Button, dan LED.',
          'Kelas 3: Mempelajari Sensor IR, Potensiometer, dan Motor Driver L9298N Menggunakan Robot Tbot.',
          'Kelas 4: Pengenalan Driver Motor & Sensor IR. Mendalami Mikrokontroler dengan Robot Tbot menggunakan Arduino Uno.',
          'Kelas 5: Mengenal Sensor Ultrasonik, IoT, dan Pemrograman Lanjutan dengan Robot Tbot menggunakan ESP32.',
          'Kelas 6: Membuat Proyek Menggunakan RFID, Bluetooth, dan Sensor Kompleks dengan Robot Tbot menggunakan ESP32.'
        ]
      },
      {
        label: "Tingkat SMP",
        items: [
          'Kelas 7: Dasar Pemrograman C++, Arduino IDE, dan Mikrokontroler Arduino',

          'Kelas 8: Sensor & Otomasi Robotika (IR, Ultrasonic, DHT, dan Proyek Robotik Lanjutan)'
        ]
      }
    ],
    image: foto1,
    themeColor: 'cyan'
  },
  // {
  //   id: 'workshop',
  //   tabLabel: 'Workshop',
  //   title: 'Workshop Singkat & Intensif',
  //   subtitle: 'PELATIHAN KILAT',
  //   description: 'Punya waktu luang di akhir pekan? Yuk ikuti sesi pelatihan kilat kami! Cocok untuk pemula yang ingin langsung merasakan keseruan merakit robot pertama mereka dalam hitungan jam.',
  //   features: [
  //     'Selesai dalam 1 kali pertemuan (3-4 jam)',
  //     'Fokus pada 1 project spesifik',
  //     'Hasil karya robot bisa dibawa pulang*',
  //     'Sertifikat keikutsertaan'
  //   ],
  //   target: 'Umum (Siswa SD - SMP)',
  //   duration: '1 Hari (3 - 4 Jam)',
  //   syllabuses: [
  //     {
  //       label: "Kurikulum Standar",
  //       items: [
  //         'Sesi 1: Pengenalan Komponen & Keamanan Alat',
  //         'Sesi 2: Merakit Mekanik Robot Dasar',
  //         'Sesi 3: Coding Sederhana (Block-based)',
  //         'Sesi 4: Uji Coba Lintasan & Mini Kompetisi'
  //       ]
  //     }
  //   ],
  //   image: 'https://picsum.photos/seed/tbotics-workshop/800/600',
  //   themeColor: 'blue'
  // },
  // {
  //   id: 'bootcamp',
  //   tabLabel: 'Bootcamp',
  //   title: 'Bootcamp Liburan Sekolah',
  //   subtitle: 'KAMP INOVATOR',
  //   description: 'Isi waktu liburan dengan kegiatan yang berdampak! Program intensif beberapa hari di mana peserta akan fokus belajar, bekerja sama dalam tim, dan menyelesaikan misi akhir yang menantang.',
  //   features: [
  //     'Program intensif 3 sampai 5 hari',
  //     'Mentoring penuh oleh tutor berpengalaman',
  //     'Pengembangan soft-skill (Kerjasama & Presentasi)',
  //     'Demo Day (Presentasi project di depan orang tua)'
  //   ],
  //   target: 'Siswa SMP / Pemula Lanjutan',
  //   duration: 'Liburan Sekolah (5 Hari)',
  //   syllabuses: [
  //     {
  //       label: "Kurikulum Standar",
  //       items: [
  //         'Hari 1-2: Logika Dasar & Pengenalan Python',
  //         'Hari 3: Pengenalan Mikrokontroler (ESP32) & IoT Dasar',
  //         'Hari 4: Merancang Sistem Smart Home Sederhana',
  //         'Hari 5: Presentasi Proyek Kelompok'
  //       ]
  //     }
  //   ],
  //   image: 'https://picsum.photos/seed/tbotics-bootcamp/800/600',
  //   themeColor: 'purple'
  // },
  // {
  //   id: 'privat',
  //   tabLabel: 'Privat',
  //   title: 'Bimbingan Privat 1-on-1',
  //   subtitle: 'FOKUS & EKSKLUSIF',
  //   description: 'Ingin belajar dengan kecepatan sendiri atau punya target project spesifik? Program privat memberikan perhatian 100% dari mentor untuk memaksimalkan potensi dan ide gila sang inovator.',
  //   features: [
  //     'Jadwal belajar yang fleksibel',
  //     'Materi bisa disesuaikan dengan minat siswa',
  //     'Fokus tinggi untuk persiapan kompetisi',
  //     'Laporan perkembangan belajar rutin'
  //   ],
  //   target: 'Personal / Sesuai Permintaan',
  //   duration: 'Fleksibel',
  //   syllabuses: [
  //     {
  //       label: "Kurikulum Kustom",
  //       items: [
  //         'Eksplorasi topik bebas (misal: AI Klasifikasi Sampah, Game Desktop, dll)',
  //         'Mentoring intensif 1-on-1 bersama pakar',
  //         'Fokus pada pembuatan purwarupa (prototype)',
  //         'Persiapan perlombaan atau portofolio pribadi'
  //       ]
  //     }
  //   ],
  //   image: 'https://picsum.photos/seed/tbotics-privat/800/600',
  //   themeColor: 'amber'
  // }
];