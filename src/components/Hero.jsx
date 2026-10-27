import { memo } from "react";
import { FiGithub, FiLinkedin, FiArrowRight, FiFileText } from "react-icons/fi";
import { PERSONAL_INFO } from "../data/portfolio";
import ProfileCard from "./ProfileCard";

const Hero = memo(function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

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

          {/* Right Column: Profile Picture Card with Hover Interaction */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ProfileCard />
          </div>
        </div>
      </div>
    </section>
  );
});

export default Hero;
