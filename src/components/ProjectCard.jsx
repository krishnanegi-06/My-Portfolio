import { useState, useRef, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const ProjectCard = memo(function ProjectCard({ p, index }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `perspective(1000px) rotateX(${dy * -6}deg) rotateY(${dx * 6}deg) translateY(-6px)`;
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (ref.current) {
      ref.current.style.borderColor = p.grad[1] + '66';
      ref.current.style.boxShadow = `0 20px 60px rgba(0,0,0,0.3), 0 0 30px ${p.grad[1]}18`;
    }
  }, [p.grad]);

  const handleMouseLeave = useCallback(() => {
    const card = ref.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    card.style.borderColor = '';
    card.style.boxShadow = '';
  }, []);

  return (
    <motion.div
      ref={ref}
      className="project-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.15s ease, border-color 0.3s ease, box-shadow 0.3s ease' }}
    >
      {/* Gradient top bar */}
      <div
        className="project-card-accent"
        style={{ background: `linear-gradient(90deg, ${p.grad[0]}, ${p.grad[1]})` }}
      />

      {/* Glow orb */}
      <div
        className="project-card-glow"
        style={{
          background: `radial-gradient(circle, ${p.grad[1]}22 0%, transparent 70%)`,
        }}
      />

      {/* Header */}
      <div className="project-header">
        <div
          className="project-icon"
          style={{
            background: `linear-gradient(135deg, ${p.grad[0]}33, ${p.grad[1]}22)`,
            border: `1px solid ${p.grad[0]}44`,
          }}
        >
          {p.emoji}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 className="project-title">{p.title}</h3>
            <span
              className="project-year"
              style={{
                background: `${p.grad[0]}33`,
                color: p.grad[1],
              }}
            >
              {p.year}
            </span>
          </div>
          <p className="project-sub">{p.sub}</p>
        </div>
      </div>

      <p className="project-desc">{p.desc}</p>

      {/* Tech stack */}
      <div className="project-stack">
        {p.stack.map((s) => (
          <span key={s} className="project-tech-tag">
            {s}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="project-actions">
        <motion.a
          href={p.github}
          target="_blank"
          rel="noreferrer"
          className="project-btn"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{ textDecoration: 'none' }}
        >
          <FiGithub size={13} /> GitHub
        </motion.a>
        <motion.a
          href={p.live}
          target="_blank"
          rel="noreferrer"
          className="project-btn"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{ textDecoration: 'none' }}
        >
          <FiExternalLink size={13} /> Live Demo
        </motion.a>
        <motion.button
          onClick={() => setOpen(!open)}
          className={`project-btn ${open ? 'project-btn-active' : ''}`}
          style={{ marginLeft: 'auto' }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {open ? <FiChevronUp size={13} /> : <FiChevronDown size={13} />}
          {open ? 'Hide' : 'Highlights'}
        </motion.button>
      </div>

      {/* Expandable highlights */}
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ overflow: 'hidden' }}
      >
        <ul className="project-highlights">
          {p.points.map((pt, i) => (
            <motion.li
              key={i}
              className="project-highlight-item"
              initial={{ opacity: 0, x: -10 }}
              animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ delay: open ? i * 0.06 : 0 }}
            >
              <span className="project-highlight-bullet" style={{ color: p.grad[1] }}>
                ▸
              </span>
              {pt}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
});

export default ProjectCard;
