import { useState, useEffect, useRef, memo } from 'react';
import { THEME } from '../../data/HomeData';

const Counter = memo(function Counter({ to, label, color = 'cyan', icon }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasRun.current) return;
      hasRun.current = true;
      const startTime = performance.now();
      const duration = 1200;
      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        setCount(Math.floor(progress * to));
        if (progress < 1) requestAnimationFrame(tick);
        else setCount(to);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-5 lg:p-7">
      <span className="text-3xl mb-2">{icon}</span>
      <div className={`text-3xl md:text-4xl lg:text-5xl font-black ${THEME[color].text} font-mono tracking-tighter mb-1`}>
        {count}<span className="text-white text-2xl">+</span>
      </div>
      <p className="text-[0.6rem] sm:text-xs text-gray-300 uppercase tracking-widest font-bold text-center">{label}</p>
    </div>
  );
});

export default Counter;