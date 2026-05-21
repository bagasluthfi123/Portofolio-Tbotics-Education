import { memo } from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../../data/HomeData';

const SectionBadge = memo(({ icon, text, color = 'cyan' }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
    className={`inline-flex items-center gap-2 ${THEME[color].bg} ${THEME[color].border} border px-4 py-1.5 rounded-full mb-4`}
  >
    <span className="text-base animate-bounce">{icon}</span>
    <span className={`${THEME[color].text} font-mono tracking-[0.2em] uppercase text-[0.6rem] sm:text-xs font-bold`}>
      {text}
    </span>
  </motion.div>
));

export default SectionBadge;