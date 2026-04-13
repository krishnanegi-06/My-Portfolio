import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const directionOffsets = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: -40 },
  right: { x: 40 },
  none: {},
};

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  className = '',
  style = {},
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const offset = directionOffsets[direction] || directionOffsets.up;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, ...offset }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
