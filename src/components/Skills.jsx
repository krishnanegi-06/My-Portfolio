import { memo } from 'react';
import ScrollReveal from './ScrollReveal';
import SkillCard from './SkillCard';
import { SKILLS_DATA } from '../data/portfolio';

const Skills = memo(function Skills() {
  return (
    <section id="Skills" className="section section-alt">
      <div className="container">
        <ScrollReveal>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Skills</span>
          </div>
          <h2 className="section-title">My Toolkit</h2>
          <p className="section-desc" style={{ marginBottom: 40 }}>
            Technologies and tools I use to bring ideas to life.
          </p>
        </ScrollReveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {SKILLS_DATA.map((s, i) => (
            <SkillCard key={s.cat} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default Skills;
