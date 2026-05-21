// src/pages/ProgramDetail.jsx
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { programsData } from '../data/ProgramData'; 

// Import dari folder baru yang sudah kita buat
import ProgramHero from '../components/Programs/Sections/Detail/ProgramHero';
import ProgramSyllabus from '../components/Programs/Sections/Detail/ProgramSyllabus';
import ProgramCTA from '../components/Programs/Sections/Detail/ProgramCTA';

export default function ProgramDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const program = programsData.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [id]);

  if (!program) return <div>404 Program tidak ditemukan</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#020b2d] pt-24 pb-12 px-5 md:px-6 relative">
      <div className="max-w-5xl mx-auto relative z-10">
        <button onClick={() => navigate('/program')} className="text-cyan-400 mb-8 flex items-center gap-2 hover:text-white transition">
           ← Kembali ke Akademi
        </button>

        {/* Menggunakan komponen rakitan dari folder baru */}
        <ProgramHero program={program} />
        <ProgramSyllabus program={program} />
        <ProgramCTA program={program} />
      </div>
    </motion.div>
  );
}