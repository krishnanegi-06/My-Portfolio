import { useState, useEffect, useRef, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiGithub, FiArrowRight, FiMail } from 'react-icons/fi';
import { useTypewriter } from '../hooks/useTypewriter';
import { ROLES } from '../data/portfolio';
import Particles from './Particles';

/* ── Stagger animation variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ── Stat Counter ── */
const StatCounter = memo(function StatCounter({ end, label, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let s = 0;
    const step = end / 40;
    const t = setInterval(() => {
      s = Math.min(s + step, end);
      setVal(Math.round(s));
      if (s >= end) clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, [end, isInView]);

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div className="stat-value">
        {val}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
});

/* ── Floating tech badges ── */
const BADGES = [
  { t: 'React.js', x: -60, y: 20, c: '#61dafb' },
  { t: 'Solidity', x: 220, y: 40, c: '#a8b0d6' },
  { t: 'Node.js', x: 210, y: 190, c: '#5fa04e' },
  { t: 'DSA', x: -55, y: 200, c: '#ef9f27' },
];

export default function Hero() {
  const typed = useTypewriter(ROLES);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="Home" className="hero">
      {/* Gradient mesh background */}
      <div className="hero-gradient-mesh">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>

      <Particles />

      <div className="container" ref={ref}>
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Left content */}
          <div style={{ flex: 1 }}>
            <motion.div variants={itemVariants} className="hero-badge">
              <span className="hero-badge-dot" />
              AVAILABLE FOR OPPORTUNITIES
            </motion.div>

            <motion.h1 variants={itemVariants} className="hero-name">
              Krishna
              <span className="hero-name-gradient"> Negi</span>
            </motion.h1>

            <motion.div variants={itemVariants} className="hero-role">
              <span className="hero-role-text">{typed}</span>
              <span className="hero-cursor">|</span>
            </motion.div>

            <motion.p variants={itemVariants} className="hero-desc">
              B.Tech CS student at{' '}
              <span className="hero-desc-highlight">Graphic Era Hill University</span>,
              Dehradun. I craft full-stack applications and blockchain solutions that bring
              transparency to real-world supply chains — starting with Indian agriculture.
            </motion.p>

            <motion.div variants={itemVariants} className="hero-buttons">
              <motion.button
                className="btn btn-primary animate-glow"
                onClick={() => scrollTo('Projects')}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                View Projects <FiArrowRight size={16} />
              </motion.button>

              <motion.a
                href="mailto:knegi4394@gmail.com"
                className="btn btn-outline"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiMail size={16} /> Hire Me
              </motion.a>

              <motion.a
                href="https://github.com/krishnanegi-06"
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiGithub size={16} /> GitHub
              </motion.a>
            </motion.div>

            <motion.div variants={itemVariants} className="hero-stats">
              <StatCounter end={2} label="Projects" suffix="+" />
              <StatCounter end={95} label="Top Score %" />
              <StatCounter end={2} label="Years Coding" suffix="+" />
            </motion.div>
          </div>

          {/* Avatar */}
          <motion.div
            variants={itemVariants}
            className="hero-avatar-wrapper animate-float"
          >
            <div className="hero-avatar">
              <div className="hero-avatar-ring" />
              👨‍💻
            </div>

            {/* Floating tech badges */}
            {BADGES.map((b, i) => (
              <motion.div
                key={b.t}
                className="hero-float-badge"
                style={{
                  left: b.x,
                  top: b.y,
                  color: b.c,
                  borderColor: `${b.c}44`,
                  boxShadow: `0 0 16px ${b.c}22`,
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.5 }
                }
                transition={{ delay: 0.8 + i * 0.1, duration: 0.4, ease: 'easeOut' }}
              >
                {b.t}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
