// src/components/Layout/Navbar/Navbar.jsx
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import logoWhite from '/src/assets/Logo Tbotics White.png'; // Sesuaikan path asset

const NAV_LINKS = [
  { name: 'Beranda', path: '#beranda' },
  { name: 'Akademi & Program', path: '/program' },
  { name: 'Event', path: '/event' },
  { name: 'Kontak', path: '#kontak' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (path) => {
    if (path === '#beranda') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(path);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (e, path) => {
    e.preventDefault();
    setIsOpen(false);

    if (path.startsWith('#')) {
      if (location.pathname === '/') {
        scrollToSection(path);
      } else {
        navigate('/');
        setTimeout(() => scrollToSection(path), 300);
      }
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-space-bg/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative z-50">
        <button onClick={(e) => handleNavClick(e, '#beranda')} className="cursor-pointer">
          <img src={logoWhite} alt="Tbotics Logo" className="h-10 md:h-12 w-auto object-contain" />
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {NAV_LINKS.map((item) => (
            <button
              key={item.name}
              onClick={(e) => handleNavClick(e, item.path)}
              className="text-sm text-gray-300 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(0,209,255,0.8)] transition-all duration-300"
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          <div className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setIsOpen(false)} />
          <div className="md:hidden bg-[#0B0D21] border-b border-white/10 p-4 flex flex-col gap-4 absolute w-full z-50">
            {NAV_LINKS.map((item) => (
              <button
                key={item.name}
                onClick={(e) => handleNavClick(e, item.path)}
                className="py-2 px-4 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-white/5 transition-all"
              >
                {item.name}
              </button>
            ))}
          </div>
        </>
      )}
    </nav>
  );
}