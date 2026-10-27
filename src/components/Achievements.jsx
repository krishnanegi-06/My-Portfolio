import { memo } from "react";
import { FiAward, FiCheckCircle } from "react-icons/fi";
import { ACHIEVEMENTS } from "../data/portfolio";

const Achievements = memo(function Achievements() {
  return (
    <section id="achievements" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <div className="section-label">
            <span className="section-label-bar" />
            <span>Problem Solving & Milestones</span>
          </div>
          <h2 className="section-title">Verified Achievements</h2>
          <p className="section-description">
            Objective milestones in competitive programming, data structures, and collaborative software hackathons.
          </p>
        </div>

        <div className="achievements-grid">
          {ACHIEVEMENTS.map((item, idx) => (
            <div key={idx} className="achievement-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="achievement-badge">{item.badge}</span>
                <FiAward size={18} style={{ color: "var(--accent)" }} />
              </div>

              <div>
                <h3 className="achievement-title">{item.title}</h3>
                <div className="achievement-platform">{item.platform}</div>
              </div>

              <p className="achievement-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Achievements;
