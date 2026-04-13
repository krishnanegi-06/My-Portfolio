import { useRef, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FiCode, FiLayout, FiServer, FiLink, FiTool, FiCpu,
} from 'react-icons/fi';

const SKILL_ICONS = {
  code: FiCode,
  layout: FiLayout,
  server: FiServer,
  link: FiLink,
  tool: FiTool,
  cpu: FiCpu,
};

const SkillCard = memo(function SkillCard({ s, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = SKILL_ICONS[s.iconName] || FiCode;

  return (
    <motion.div
      ref={ref}
      className="skill-card"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{
        y: -4,
        borderColor: s.col + '88',
        boxShadow: `0 12px 40px rgba(0,0,0,0.15), 0 0 20px ${s.col}18`,
      }}
      style={{ transition: 'border-color 0.25s, box-shadow 0.25s' }}
    >
      {/* Header */}
      <div className="skill-card-header">
        <div
          className="skill-card-icon"
          style={{ background: s.col + '22' }}
        >
          <Icon size={18} style={{ color: s.col }} />
        </div>
        <span className="skill-card-name" style={{ color: s.col }}>
          {s.cat}
        </span>
        <span
          style={{
            marginLeft: 'auto',
            fontSize: 11,
            color: s.col,
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
          }}
        >
          {s.proficiency}%
        </span>
      </div>

      {/* Animated progress bar */}
      <div className="skill-bar">
        <motion.div
          className="skill-bar-fill"
          style={{
            background: `linear-gradient(90deg, ${s.col}cc, ${s.col})`,
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${s.proficiency}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.3 + index * 0.08, ease: 'easeOut' }}
        />
        <div className="skill-bar-shine" />
      </div>

      {/* Skill tags */}
      <div className="skill-tags">
        {s.items.map((item) => (
          <motion.span
            key={item}
            className="skill-tag"
            style={{
              background: s.col + '14',
              color: s.col + 'cc',
              borderColor: s.col + '33',
            }}
            whileHover={{
              background: s.col + '28',
              borderColor: s.col + '66',
              y: -2,
            }}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
});

export default SkillCard;
