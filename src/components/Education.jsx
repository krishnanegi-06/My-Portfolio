import { memo } from "react";
import { FiAward, FiBookOpen, FiCalendar, FiMapPin } from "react-icons/fi";
import { EDUCATION } from "../data/portfolio";

const Education = memo(function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-label">
            <span className="section-label-bar" />
            <span>Academic Background</span>
          </div>
          <h2 className="section-title">Education & Coursework</h2>
          <p className="section-description">
            Academic foundation in computer science and engineering fundamentals.
          </p>
        </div>

        <div className="education-timeline">
          {EDUCATION.map((edu, idx) => (
            <div
              key={idx}
              className={`education-card ${edu.highlight ? "featured-edu" : ""}`}
            >
              <div className="education-header">
                <div>
                  <h3 className="education-degree">{edu.degree}</h3>
                  <div className="education-institution">{edu.institution}</div>
                </div>

                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <span className="tag tag-status-completed" style={{ fontWeight: 600 }}>
                    {edu.score}
                  </span>
                </div>
              </div>

              <div className="education-meta">
                <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <FiCalendar size={13} /> {edu.period}
                </span>
                <span>•</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <FiMapPin size={13} /> {edu.location}
                </span>
              </div>

              {edu.coursework && (
                <div>
                  <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Relevant Coursework:
                  </span>
                  <div className="coursework-wrap">
                    {edu.coursework.map((course, i) => (
                      <span key={i} className="coursework-tag">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Education;
