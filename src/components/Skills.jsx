import { memo } from "react";
import { SKILL_CATEGORIES } from "../data/portfolio";

const Skills = memo(function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <div className="section-label">
            <span className="section-label-bar" />
            <span>Technical Skills</span>
          </div>
          <h2 className="section-title">Core Competencies & Stack</h2>
          <p className="section-description">
            Organized strictly by verified coursework, active projects, and practical implementation experience.
          </p>
        </div>

        <div className="skills-grid">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.name} className="skill-category-card">
              <div>
                <h3 className="skill-category-title">{cat.name}</h3>
                <p className="skill-category-desc">{cat.description}</p>
              </div>

              <div className="skill-pills-wrap">
                {cat.skills.map((skill) => (
                  <span key={skill} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Skills;
