import { memo } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import { ABOUT_INFO } from '../data/portfolio';
import ScrollReveal from './ScrollReveal';

const About = memo(function About() {
  return (
    <section id="About" className="section section-alt">
      <div className="container">
        <ScrollReveal>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">About Me</span>
          </div>
          <h2 className="section-title">Who I Am</h2>
        </ScrollReveal>

        <div className="about-grid">
          {/* Left — Bio text */}
          <ScrollReveal delay={0.1}>
            <div>
              <p className="about-text">
                I'm a passionate developer and a proud product of{' '}
                <span className="about-highlight">Rashtriya Military School, Belgaum</span>{' '}
                — where I scored 95% in Matriculation and 87% in Intermediate. The discipline
                from military school shaped my consistency in coding.
              </p>
              <p className="about-text">
                Currently pursuing B.Tech CS at{' '}
                <span className="about-accent">Graphic Era Hill University, Dehradun</span>{' '}
                (2024–2028). My focus is on building impactful blockchain + full-stack systems,
                especially in India's agriculture sector which is ripe for technological
                disruption.
              </p>

              <div className="about-links">
                <motion.a
                  href="#"
                  className="about-link"
                  style={{
                    background: 'var(--accent-bg)',
                    color: 'var(--accent)',
                    borderColor: 'var(--accent-border)',
                  }}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Resume <FiExternalLink size={14} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/krishna-negi-378801356/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BywpN8eHUSQCGvvgtSyVPLw%3D%3D"
                  target="_blank"
                  rel="noreferrer"
                  className="about-link"
                  style={{
                    background: 'rgba(0, 119, 181, 0.1)',
                    color: '#0077b5',
                    borderColor: 'rgba(0, 119, 181, 0.25)',
                  }}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  LinkedIn <FiExternalLink size={14} />
                </motion.a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — Info cards */}
          <ScrollReveal delay={0.2} direction="right">
            <div className="about-info-list">
              {ABOUT_INFO.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="about-info-item"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  whileHover={{ x: 4, borderColor: 'var(--accent-border)' }}
                >
                  <span className="about-info-icon">{item.icon}</span>
                  <div>
                    <div className="about-info-label">{item.label}</div>
                    <div className="about-info-value">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
});

export default About;
