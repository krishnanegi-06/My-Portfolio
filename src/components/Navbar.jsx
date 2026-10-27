import { useState, useEffect, memo } from "react";
import { FiSun, FiMoon, FiMenu, FiX, FiFileText } from "react-icons/fi";
import { useTheme } from "../hooks/useTheme";
import { NAV_LINKS, PERSONAL_INFO } from "../data/portfolio";

const Navbar = memo(function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -45% 0px" }
    );

    NAV_LINKS.forEach((link) => {
      const id = link.href.replace("#", "");
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scrollTo = (href) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="container navbar-container">
        {/* Brand / Monogram */}
        <a href="#hero" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="navbar-brand">
          <div className="monogram">KN</div>
          <span>{PERSONAL_INFO.name}</span>
        </a>

        {/* Desktop Links */}
        <div className="nav-links-desktop">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className={`nav-item ${isActive ? "active" : ""}`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Actions */}
        <div className="nav-actions">
          <a
            href={PERSONAL_INFO.resumePdf}
            target="_blank"
            rel="noreferrer noopener"
            className="btn btn-outline btn-sm"
            style={{ display: "inline-flex" }}
          >
            <FiFileText size={14} />
            <span>Resume</span>
          </a>

          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle visual theme"
            title={theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"}
          >
            {theme === "dark" ? <FiSun size={17} /> : <FiMoon size={17} />}
          </button>

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="mobile-toggle-btn"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-nav-overlay">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className={`mobile-nav-link ${isActive ? "active" : ""}`}
              >
                <span>{link.label}</span>
                {isActive && <span style={{ color: "var(--accent)" }}>●</span>}
              </a>
            );
          })}
          <div style={{ marginTop: "auto", display: "flex", gap: "12px", paddingTop: "20px" }}>
            <a
              href={PERSONAL_INFO.resumePdf}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              <FiFileText size={16} /> View Resume (PDF)
            </a>
          </div>
        </div>
      )}
    </nav>
  );
});

export default Navbar;
