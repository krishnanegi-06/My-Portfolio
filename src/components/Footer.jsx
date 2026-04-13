import { memo } from 'react';
import { FiCode } from 'react-icons/fi';

const Footer = memo(function Footer() {
  return (
    <footer className="footer">
      <span className="footer-text">
        Designed & Built by{' '}
        <span className="footer-highlight">Krishna Negi</span>
        {' '}· 2026
      </span>
      <span className="footer-text" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        Made with <FiCode size={14} style={{ color: 'var(--accent)' }} /> React
      </span>
    </footer>
  );
});

export default Footer;
