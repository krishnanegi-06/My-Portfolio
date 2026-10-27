import { useState, useMemo, memo } from "react";
import { FiGithub, FiCheckCircle } from "react-icons/fi";
import ProjectCard from "./ProjectCard";
import { useGitHubSync } from "../hooks/useGitHubSync";

const FILTER_TABS = [
  { id: "all", label: "All Projects" },
  { id: "systems", label: "Systems & Concurrency" },
  { id: "web", label: "Web & Full-Stack" },
  { id: "oop", label: "OOP & Design" },
];

const Projects = memo(function Projects() {
  const { projects, syncStatus } = useGitHubSync();
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    if (activeFilter === "systems") {
      return projects.filter((p) => p.category.includes("Systems") || p.category.includes("Concurrency"));
    }
    if (activeFilter === "web") {
      return projects.filter((p) => p.category.includes("Web") || p.category.includes("Fintech"));
    }
    if (activeFilter === "oop") {
      return projects.filter((p) => p.category.includes("Object-Oriented") || p.tags.includes("OOP"));
    }
    return projects;
  }, [projects, activeFilter]);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="projects-header-row">
          <div className="section-header" style={{ marginBottom: 0 }}>
            <div className="section-label">
              <span className="section-label-bar" />
              <span>Selected Works</span>
            </div>
            <h2 className="section-title">Engineered Projects</h2>
            <p className="section-description">
              Curated software projects backed by verified GitHub source code and clear architectural rationale.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div className="github-sync-indicator">
              <span className="sync-dot" />
              <span>
                {syncStatus === "synced"
                  ? "GitHub Synced"
                  : syncStatus === "syncing"
                  ? "Syncing Repos…"
                  : "Curated & Verified"}
              </span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px" }}>
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`btn btn-sm ${activeFilter === tab.id ? "btn-primary" : "btn-outline"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default Projects;
