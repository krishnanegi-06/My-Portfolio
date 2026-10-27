import { useState, memo } from "react";
import { FiGithub, FiExternalLink, FiChevronDown, FiChevronUp, FiStar, FiGitBranch, FiCheck } from "react-icons/fi";

const ProjectCard = memo(function ProjectCard({ project }) {
  const [showArchitecture, setShowArchitecture] = useState(false);

  const isCompleted = project.status === "Completed";

  return (
    <article className="project-card">
      <div className="project-card-top">
        <div className="project-category">{project.category}</div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {project.stars !== undefined && project.stars > 0 && (
            <span className="tag" title={`${project.stars} GitHub stars`}>
              <FiStar size={12} style={{ color: "#f59e0b" }} />
              <span>{project.stars}</span>
            </span>
          )}
          <span
            className={`tag ${isCompleted ? "tag-status-completed" : "tag-status-progress"}`}
          >
            {project.status}
          </span>
        </div>
      </div>

      <div className="project-title-row">
        <h3 className="project-title">{project.title}</h3>
        <span style={{ fontSize: "13px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          {project.period}
        </span>
      </div>

      <p className="project-tagline">{project.tagline}</p>

      {/* Engineering Highlights */}
      <ul className="project-highlights-list">
        {project.highlights.map((point, i) => (
          <li key={i} className="project-highlight-item">
            <span className="project-bullet">▸</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>

      {/* Technology Tags */}
      <div className="project-tags-row">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      {/* Footer & Actions */}
      <div className="project-footer">
        <div className="project-links">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-outline btn-sm"
              title="View Source Code on GitHub"
            >
              <FiGithub size={14} />
              <span>Source Code</span>
            </a>
          )}

          {project.backendRepoUrl && (
            <a
              href={project.backendRepoUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-outline btn-sm"
              title="View Backend Repository"
            >
              <FiGithub size={14} />
              <span>Backend Repo</span>
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-primary btn-sm"
              title="Open Verified Live Demo"
            >
              <FiExternalLink size={14} />
              <span>Live Demo</span>
            </a>
          )}
        </div>

        {project.architecture && (
          <button
            onClick={() => setShowArchitecture((prev) => !prev)}
            className="details-toggle-btn"
            aria-expanded={showArchitecture}
          >
            <span>{showArchitecture ? "Hide Specs" : "Architecture Specs"}</span>
            {showArchitecture ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
          </button>
        )}
      </div>

      {/* Architecture Deep-Dive Drawer */}
      {showArchitecture && project.architecture && (
        <div className="project-architecture-panel">
          <div className="arch-row">
            <span className="arch-label">Design Pattern:</span>
            <span>{project.architecture.pattern}</span>
          </div>
          <div className="arch-row">
            <span className="arch-label">Key Modules:</span>
            <span>{project.architecture.keyComponents.join(", ")}</span>
          </div>
          <div className="arch-row">
            <span className="arch-label">State & Data:</span>
            <span>{project.architecture.stateManagement}</span>
          </div>
        </div>
      )}
    </article>
  );
});

export default ProjectCard;
