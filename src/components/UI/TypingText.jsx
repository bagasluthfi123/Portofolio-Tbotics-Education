import { memo } from 'react';
import { motion } from 'framer-motion';

const TypingText = memo(({ text, className = '' }) => (
  <motion.span
    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.035 } } }}
    initial="hidden"
    animate="visible"
    className={className}
  >
    {Array.from(text).map((char, i) => (
      <motion.span key={i} variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}>
        {char}
      </motion.span>
    ))}
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
      className="inline-block w-0.5 h-[1em] bg-cyan-400 ml-0.5 align-middle"
    />
  </motion.span>
));

export default TypingText;