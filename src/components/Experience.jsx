import { memo } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { EXPERIENCE, EDUCATION } from '../data/portfolio';

const Experience = memo(function Experience() {
  return (
    <section id="Experience" className="section">
      <div className="container">
        <ScrollReveal>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Journey</span>
          </div>
          <h2 className="section-title">Experience & Education</h2>
        </ScrollReveal>

        {/* Experience cards */}
        <div className="exp-grid" style={{ marginTop: 40 }}>
          {EXPERIENCE.map((exp, i) => (
            <ScrollReveal key={exp.role} delay={i * 0.15} direction={i % 2 === 0 ? 'left' : 'right'}>
              <motion.div
                className="exp-card"
                style={{ borderTop: `3px solid ${exp.col}` }}
                whileHover={{
                  y: -4,
                  borderColor: exp.col,
                  boxShadow: `0 12px 40px rgba(0,0,0,0.15), 0 0 20px ${exp.col}18`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <span
                    className="exp-icon"
                    style={{ background: exp.col + '22' }}
                  >
                    {exp.icon}
                  </span>
                  <div>
                    <div className="exp-role">{exp.role}</div>
                    <div className="exp-org">{exp.org}</div>
                  </div>
                </div>

                <span
                  className="exp-period-badge"
                  style={{
                    background: exp.col + '22',
                    color: exp.col,
                  }}
                >
                  {exp.period}
                </span>

                <ul className="exp-points">
                  {exp.pts.map((pt, j) => (
                    <motion.li
                      key={j}
                      className="exp-point"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + j * 0.07 }}
                    >
                      <span style={{ color: exp.col, flexShrink: 0 }}>▸</span>
                      {pt}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Education Timeline */}
        <ScrollReveal delay={0.2}>
          <div className="timeline-wrapper">
            <h3 className="timeline-title">Education Timeline</h3>
            <div className="timeline">
              <div className="timeline-line" />
              {EDUCATION.map((e, i) => (
                <motion.div
                  key={i}
                  className="timeline-item"
                  style={{ marginBottom: i < EDUCATION.length - 1 ? 28 : 0 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.12, duration: 0.5 }}
                >
                  <div
                    className={`timeline-dot ${
                      e.main ? 'timeline-dot-active' : 'timeline-dot-inactive'
                    }`}
                  />
                  <div>
                    <div className="timeline-school">{e.school}</div>
                    <div className="timeline-degree">{e.deg}</div>
                    <div className="timeline-meta">
                      {e.period} &nbsp;·&nbsp; {e.loc} &nbsp;·&nbsp;
                      <span className="timeline-score">{e.score}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});

export default Experience;
