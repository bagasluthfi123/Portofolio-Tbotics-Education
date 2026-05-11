import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import logoWhite from '../../assets/Logo Tbotics White.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const navLinks = [
    { name: 'Beranda', path: '#beranda' },
    { name: 'Tentang', path: '#tentang' },
    { name: 'Program', path: '#program' },
    { name: 'Kontak', path: '#kontak' }
  ];

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

  const handleNavClick = (e, path) => {
    e.preventDefault(); 
    setIsOpen(false); 
    
    if (location.pathname === '/') {
      scrollToSection(path);
    } else {
      navigate('/');
      setTimeout(() => {
        scrollToSection(path);
      }, 300);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-space-bg/80 backdrop-blur-md border-b border-white/10">
      
      {/* 1. Header Utama (Logo & Tombol) diberi z-50 agar selalu di atas overlay */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative z-50">
        
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

        <button className="md:hidden text-white cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* 👇 2. TAMBAHAN: OVERLAY TRANSPARAN (Area Hitam) 👇 */}
      {/* Jika overlay ini diklik, menu otomatis tertutup (setIsOpen(false)) */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 h-screen w-screen bg-black/50 backdrop-blur-sm z-40 cursor-pointer"
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* 3. Menu Mobile Dropdown (Diberi z-50 agar muncul di atas overlay) */}
      {isOpen && (
        <div className="md:hidden bg-[#0B0D21] border-b border-white/10 p-4 flex flex-col gap-4 absolute w-full left-0 top-full shadow-xl z-50">
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