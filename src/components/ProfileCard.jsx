import { useState, useRef, useCallback, memo } from "react";
import { FiMapPin, FiAward, FiCode, FiCheckCircle, FiUser } from "react-icons/fi";
import { PERSONAL_INFO } from "../data/portfolio";

const ProfileCard = memo(function ProfileCard() {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Smooth 3D tilt tracking on mouse move
  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    setIsHovered(false);
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <div className="profile-card-container">
      <div
        ref={cardRef}
        className={`profile-card ${isHovered ? "profile-card-hovered" : ""}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Floating Top Badge */}
        <div className="profile-badge-top">
          <span className="profile-badge-dot" />
          <span>GEHU · B.Tech CS</span>
        </div>

        {/* Profile Image & Fallback */}
        <div className="profile-image-wrap">
          {!imgError ? (
            <img
              src="/profile.jpg"
              alt={PERSONAL_INFO.name}
              className="profile-img"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="profile-avatar-fallback">
              <div className="profile-fallback-monogram">KN</div>
              <div className="profile-fallback-info">
                <span className="fallback-name">{PERSONAL_INFO.name}</span>
                <span className="fallback-role">Computer Science Undergraduate</span>
              </div>
            </div>
          )}

          {/* Interactive Slide-up Hover Overlay */}
          <div className={`profile-hover-overlay ${isHovered ? "visible" : ""}`}>
            <div className="overlay-header">
              <span className="overlay-name">{PERSONAL_INFO.name}</span>
              <span className="overlay-cgpa">CGPA 8.25/10</span>
            </div>

            <div className="overlay-meta">
              <span className="overlay-meta-item">
                <FiMapPin size={12} /> {PERSONAL_INFO.location}
              </span>
              <span className="overlay-meta-item">
                <FiAward size={12} /> 250+ DSA Solved
              </span>
            </div>

            <div className="overlay-tech-chips">
              <span className="tech-chip">C++17</span>
              <span className="tech-chip">React</span>
              <span className="tech-chip">TypeScript</span>
              <span className="tech-chip">Spring Boot</span>
            </div>

            <div className="overlay-footer">
              <span className="overlay-status-text">
                <FiCheckCircle size={13} style={{ color: "var(--accent)" }} />
                <span>Open for SWE Internships</span>
              </span>
            </div>
          </div>
        </div>

        {/* Card Bottom Info Bar */}
        <div className="profile-card-caption">
          <div className="caption-left">
            <span className="caption-title">{PERSONAL_INFO.name}</span>
            <span className="caption-sub">Graphic Era Hill University</span>
          </div>
          <div className="caption-badge">
            <span>CGPA: 8.25</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProfileCard;
