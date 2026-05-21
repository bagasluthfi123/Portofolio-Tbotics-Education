import { useRef } from 'react';
import { THEME } from '../../data/HomeData';

export default function TiltPhoto({ img, tag, hex, color }) {
  const frameRef = useRef(null);
  const innerRef = useRef(null);
  const t = THEME[color];

  const handleMouseMove = (e) => {
    if (!frameRef.current || !innerRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    innerRef.current.style.transform =
      `perspective(700px) rotateY(${dx * 14}deg) rotateX(${-dy * 10}deg) scale(1.04)`;
  };

  const handleMouseLeave = () => {
    if (innerRef.current)
      innerRef.current.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) scale(1)';
  };

  return (
    <div
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full cursor-grab active:cursor-grabbing select-none"
      style={{ perspective: '700px' }}
    >
      <div
        className="absolute inset-0 rounded-xl sm:rounded-2xl lg:rounded-3xl pointer-events-none z-10"
        style={{ border: `2px solid ${hex}80`, boxShadow: `0 0 32px ${hex}30, inset 0 0 20px ${hex}10` }}
      />

      <div
        ref={innerRef}
        className="relative rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden"
        style={{ transition: 'transform 0.12s ease', transformStyle: 'preserve-3d' }}
      >
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: '3/4', maxHeight: '400px', backgroundColor: '#02050f' }}
        >
          <img src={img} alt={tag} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: `repeating-linear-gradient(0deg,transparent,transparent 3px,${hex}06 3px,${hex}06 4px)` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#02050f] via-transparent to-transparent pointer-events-none" />
        
        <div className={`absolute top-3 left-3 z-20 flex items-center gap-1.5 ${t.bg} border ${t.border} px-2.5 py-1 rounded-full`} style={{ backdropFilter: 'blur(8px)' }}>
          <span className={`${t.text} font-mono text-[0.55rem] font-black tracking-widest uppercase`}>{tag}</span>
        </div>

        <div className="absolute top-3 right-3 w-4 h-4 pointer-events-none" style={{ borderTop: `2px solid ${hex}`, borderRight: `2px solid ${hex}` }} />
        <div className="absolute bottom-3 left-3 w-4 h-4 pointer-events-none" style={{ borderBottom: `2px solid ${hex}`, borderLeft: `2px solid ${hex}` }} />
      </div>
    </div>
  );
}