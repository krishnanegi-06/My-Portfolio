import { memo } from "react";
import { FiGithub, FiLinkedin, FiFileText } from "react-icons/fi";
import { PERSONAL_INFO } from "../data/portfolio";

const Footer = memo(function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <span>© {currentYear} {PERSONAL_INFO.name}. Designed & engineered with React & TypeScript standards.</span>
        </div>

        <div className="footer-links">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer noopener"
            className="footer-link"
          >
            GitHub
          </a>
          <span>•</span>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="footer-link"
          >
            LinkedIn
          </a>
          <span>•</span>
          <a
            href={PERSONAL_INFO.resumePdf}
            target="_blank"
            rel="noreferrer noopener"
            className="footer-link"
          >
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
