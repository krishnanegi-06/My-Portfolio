import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Spinning ring */}
      <motion.div
        className="loading-ring"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      />

      {/* Logo */}
      <motion.div
        className="loading-logo"
        initial={{ scale: 0.5, opacity: 0, filter: 'blur(10px)' }}
        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <span
          style={{
            background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          KN
        </span>
        <span style={{ color: 'var(--text-heading)' }}>.</span>
      </motion.div>

      {/* Loading text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        style={{
          marginTop: 60,
          fontSize: 13,
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
          letterSpacing: 2,
        }}
      >
        Loading portfolio...
      </motion.p>
    </motion.div>
  );
}
