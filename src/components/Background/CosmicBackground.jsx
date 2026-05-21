import { useState, memo } from 'react';
import useIsMobile from '../../hooks/useIsMobile'; 

const CosmicBackground = memo(() => {
  const isMobile = useIsMobile();

  const [stars] = useState(() =>
    Array.from({ length: isMobile ? 0 : 60 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 0.5,
      duration: (Math.random() * 4 + 2).toFixed(1),
      delay: (Math.random() * 3).toFixed(1),
      color: ['255,255,255', '103,232,249', '216,180,254', '253,224,71'][Math.floor(Math.random() * 4)],
    }))
  );

  const [dust] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return [];
    return Array.from({ length: 18 }, (_, i) => {
      const layer = i % 3;
      return {
        id: i,
        top: `${Math.random() * 100}%`,
        size: [1.5, 2, 3][layer],
        dur: [32, 22, 14][layer],
        delay: -(Math.random() * [32, 22, 14][layer]).toFixed(1),
        opacity: [0.25, 0.4, 0.7][layer],
        color: ['rgba(168,85,247,0.9)', 'rgba(234,179,8,0.9)', 'rgba(244,114,182,0.9)', 'rgba(34,211,238,0.9)'][i % 4],
      };
    });
  });

  return (
    <>
      <style>{`
        @keyframes twinkle  { 0%,100%{opacity:0.1;transform:scale(0.8)} 50%{opacity:1;transform:scale(1.3)} }
        @keyframes floatDust{ from{transform:translateX(110vw)} to{transform:translateX(-20vw)} }
        @keyframes wiggle   { 0%,100%{transform:rotate(-3deg)} 50%{transform:rotate(3deg)} }
        @keyframes floatUp  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
        @keyframes orbSpin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>

      {stars.length > 0 && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {stars.map(s => (
            <div
              key={s.id}
              className="absolute rounded-full"
              style={{
                top: s.top, left: s.left,
                width: s.size, height: s.size,
                background: `rgba(${s.color},1)`,
                boxShadow: `0 0 6px rgba(${s.color},0.7)`,
                animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
                willChange: 'opacity, transform',
              }}
            />
          ))}
        </div>
      )}

      {dust.length > 0 && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {dust.map(p => (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                top: p.top, width: p.size, height: p.size, opacity: p.opacity,
                backgroundColor: p.color,
                boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
                animation: `floatDust ${p.dur}s ${p.delay}s linear infinite`,
                willChange: 'transform',
              }}
            />
          ))}
        </div>
      )}
    </>
  );
});

export default CosmicBackground;