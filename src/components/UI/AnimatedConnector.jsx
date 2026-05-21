import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AnimatedConnector({ color = '#22d3ee' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const scaleY  = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.05, 0.15, 0.85, 0.95], [0, 1, 1, 0]);
  const dotY    = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);
  const dotOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="flex flex-col items-center my-16 lg:my-20" style={{ height: '120px', position: 'relative' }}>
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
      <motion.div
        style={{
          scaleY, opacity, transformOrigin: 'top',
          position: 'absolute', top: 0, left: '50%', translateX: '-50%',
          width: '2px', height: '100%',
          background: `linear-gradient(to bottom,${color},${color}80)`,
          boxShadow: `0 0 8px ${color}60`, borderRadius: '999px',
        }}
      />
      <motion.div
        style={{
          top: dotY, opacity: dotOpacity,
          position: 'absolute', left: '50%', translateX: '-50%', translateY: '-50%',
          width: '10px', height: '10px', borderRadius: '50%',
          background: color, boxShadow: `0 0 16px ${color}, 0 0 6px ${color}`,
        }}
      />
      <motion.div style={{ opacity }} className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
        {[0, 1, 2].map(n => (
          <motion.div
            key={n}
            animate={{ opacity: [0.2, 1, 0.2], y: [0, 4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: n * 0.18 }}
            style={{
              width: 0, height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: `6px solid ${color}`,
              marginBottom: '2px',
              filter: `drop-shadow(0 0 4px ${color})`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}