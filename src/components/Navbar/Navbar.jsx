import { useState } from 'react';
import { Menu, X } from 'lucide-react';
// 1. Import file gambar logonya dari folder assets
// Pastikan penulisan namanya sama persis dengan yang ada di folder Anda
import logoWhite from '../../assets/Logo Tbotics White.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = ['Beranda', 'Tentang', 'Roadmap', 'Program', 'Kontak'];

  return (
    <nav className="fixed w-full z-50 bg-space-bg/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* 2. Ganti teks dengan Logo Gambar */}
        <a href="#beranda" className="flex items-center">
          <img 
            src={logoWhite} 
            alt="Logo Tbotics Education" 
            className="h-10 md:h-12 w-auto object-contain" // h-10 mengatur tinggi logo agar pas
          />
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm text-gray-300 hover:text-space-primary transition">
              {link}
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
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-space-primary">
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}