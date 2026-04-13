import { memo } from 'react';
import ScrollReveal from './ScrollReveal';
import ProjectCard from './ProjectCard';
import { PROJECTS } from '../data/portfolio';

const Projects = memo(function Projects() {
  return (
    <section id="Projects" className="section">
      <div className="container">
        <ScrollReveal>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Projects</span>
          </div>
          <h2 className="section-title">Things I've Built</h2>
          <p className="section-desc" style={{ marginBottom: 40 }}>
            Real-world systems that blend full-stack engineering with blockchain technology.
          </p>
        </ScrollReveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
            gap: 24,
          }}
        >
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default Projects;
