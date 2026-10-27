import { useState, memo } from "react";
import { FiGithub, FiLinkedin, FiArrowRight, FiFileText, FiCode, FiTerminal } from "react-icons/fi";
import { PERSONAL_INFO, CODE_SNIPPETS } from "../data/portfolio";

const Hero = memo(function Hero() {
  const [activeTab, setActiveTab] = useState("cpp");

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const currentSnippet = CODE_SNIPPETS[activeTab];

  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Personal Positioning */}
          <div className="hero-content">
            <div className="hero-status-pill">
              <span className="hero-status-dot" />
              <span>{PERSONAL_INFO.status}</span>
            </div>

            <h1 className="hero-name">{PERSONAL_INFO.name}</h1>

            <p className="hero-headline">
              {PERSONAL_INFO.tagline}
            </p>

            <p className="hero-intro">
              {PERSONAL_INFO.bio}
            </p>

            <div className="hero-ctas">
              <button onClick={scrollToProjects} className="btn btn-primary">
                <span>Explore My Work</span>
                <FiArrowRight size={16} />
              </button>

              <a
                href={PERSONAL_INFO.resumePdf}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-secondary"
              >
                <FiFileText size={16} />
                <span>View Resume</span>
              </a>
            </div>

            <div className="hero-socials">
              <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                VERIFIED PROFILES:
              </span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer noopener"
                className="hero-social-link"
                title="GitHub Profile"
              >
                <FiGithub size={16} />
                <span>github.com/krishnanegi-06</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="hero-social-link"
                title="LinkedIn Profile"
              >
                <FiLinkedin size={16} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column: Restrained Visual Workbench */}
          <div>
            <div className="code-workbench">
              <div className="code-workbench-header">
                <div className="window-dots">
                  <div className="window-dot window-dot-red" />
                  <div className="window-dot window-dot-yellow" />
                  <div className="window-dot window-dot-green" />
                </div>

                <div className="workbench-tabs">
                  <button
                    onClick={() => setActiveTab("cpp")}
                    className={`workbench-tab ${activeTab === "cpp" ? "active" : ""}`}
                  >
                    LockManager.cpp
                  </button>
                  <button
                    onClick={() => setActiveTab("typescript")}
                    className={`workbench-tab ${activeTab === "typescript" ? "active" : ""}`}
                  >
                    useProductDetails.ts
                  </button>
                  <button
                    onClick={() => setActiveTab("oop")}
                    className={`workbench-tab ${activeTab === "oop" ? "active" : ""}`}
                  >
                    PaymentGateway.cpp
                  </button>
                </div>
              </div>

              <div className="workbench-body">
                <pre>
                  <code>{currentSnippet.code}</code>
                </pre>
              </div>

              <div className="workbench-footer">
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <FiTerminal size={13} style={{ color: "var(--accent)" }} />
                  <span>{currentSnippet.filename}</span>
                </div>
                <span>Active Code Preview</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Hero;
