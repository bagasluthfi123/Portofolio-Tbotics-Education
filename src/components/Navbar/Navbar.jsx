import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logoWhite from '../../assets/Logo Tbotics White.png';

// WAJIB ADA { setCurrentPage } di dalam kurung ini
export default function Navbar({ setCurrentPage }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const navLinks = [
    { name: 'Beranda', path: '#beranda' },
    { name: 'Tentang', path: '#tentang' },
    { name: 'Program', path: '#program' },
    { name: 'Roadmap', path: '#roadmap' },
    { name: 'Kontak', path: '#kontak' }
    // { name: 'Kegiatan Kami', path: '#activities' }, 
  ];

  // Fungsi sakti untuk klik menu
  const handleNavClick = (e, path) => {
    setIsOpen(false); // Tutup menu di HP
    
    if (setCurrentPage) {
      setCurrentPage('home'); // Ganti layar ke Landing Page
      
      // Beri jeda 150 milidetik agar React selesai merender halaman utama,
      // baru kemudian browser disuruh scroll ke bagian yang dituju.
      setTimeout(() => {
        const element = document.querySelector(path);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else if (path === '#beranda') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 150);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-space-bg/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Tombol Logo */}
        <a 
          href="#beranda" 
          className="flex items-center" 
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
              className="text-sm text-gray-300 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(0,209,255,0.8)] transition-all duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-space-card border-b border-white/10 p-4 flex flex-col gap-4">
          {navLinks.map((item) => (
            <a 
              key={item.name} 
              href={item.path} 
              onClick={(e) => handleNavClick(e, item.path)} 
              className="block py-2 px-4 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-white/5 transition-all duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}