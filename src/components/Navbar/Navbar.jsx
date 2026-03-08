import { useState } from 'react';
import { Menu, X } from 'lucide-react';
// TAMBAHAN: Import hooks dari React Router
import { useNavigate, useLocation } from 'react-router-dom'; 
import logoWhite from '../../assets/Logo Tbotics White.png';

// HAPUS { setCurrentPage } karena kita sudah tidak memakainya
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Inisialisasi React Router
  const navigate = useNavigate();
  const location = useLocation();
  
  const navLinks = [
    { name: 'Beranda', path: '#beranda' },
    { name: 'Tentang', path: '#tentang' },
    { name: 'Program', path: '#program' },
    // { name: 'Roadmap', path: '#roadmap' },
    { name: 'Kontak', path: '#kontak' }
  ];

  // Fungsi helper khusus untuk melakukan scroll
  const scrollToSection = (path) => {
    if (path === '#beranda') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Fungsi sakti untuk klik menu yang sudah mendukung React Router
  const handleNavClick = (e, path) => {
    e.preventDefault(); // Cegah URL bertumpuk (misal: /program/id#tentang)
    setIsOpen(false); // Tutup menu di versi mobile
    
    if (location.pathname === '/') {
      // Skenario 1: Jika pengguna SUDAH di halaman utama, langsung scroll
      scrollToSection(path);
    } else {
      // Skenario 2: Jika pengguna sedang di halaman Detail Program,
      // lemparkan kembali ke beranda ('/') terlebih dahulu.
      navigate('/');
      
      // Beri jeda 300 milidetik agar halaman utama selesai dirender oleh browser,
      // baru kemudian jalankan perintah scroll.
      setTimeout(() => {
        scrollToSection(path);
      }, 300);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-space-bg/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Tombol Logo */}
        <a 
          href="#beranda" 
          className="flex items-center cursor-pointer" 
          onClick={(e) => handleNavClick(e, '#beranda')}
        >
          <img 
            src={logoWhite} 
            alt="Logo Tbotics Education" 
            className="h-10 md:h-12 w-auto object-contain" 
          />
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((item) => (
            <a 
              key={item.name} 
              href={item.path} 
              onClick={(e) => handleNavClick(e, item.path)} 
              className="text-sm text-gray-300 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(0,209,255,0.8)] transition-all duration-300 cursor-pointer"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-white cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0B0D21] border-b border-white/10 p-4 flex flex-col gap-4 absolute w-full left-0 top-full shadow-xl">
          {navLinks.map((item) => (
            <a 
              key={item.name} 
              href={item.path} 
              onClick={(e) => handleNavClick(e, item.path)} 
              className="block py-2 px-4 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-white/5 transition-all duration-300 cursor-pointer"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}