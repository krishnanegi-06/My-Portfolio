import { useState, useEffect, memo } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../hooks/useTheme';

const NAV = ['Home', 'About', 'Projects', 'Skills', 'Experience', 'Resume', 'Contact'];

const Navbar = memo(function Navbar() {
  const [activeNav, setActiveNav] = useState('Home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveNav(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    NAV.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // FIX: close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // FIX: prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollTo = (id) => {
    setMobileOpen(false);
    // FIX: Small timeout lets mobile menu close animation finish before scrolling
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />

      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <motion.div
          className="navbar-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollTo('Home')}
        >
          <span className="navbar-logo-text">KN</span>
          <span style={{ color: 'var(--accent)' }}>.</span>
        </motion.div>

        <div className="navbar-right">
          {/* Desktop links */}
          <div className="nav-links">
            {NAV.map((n) => (
              <motion.button
                key={n}
                onClick={() => scrollTo(n)}
                className={`nav-link ${activeNav === n ? 'nav-link-active' : ''}`}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                {n}
              </motion.button>
            ))}
          </div>

          {/* Theme toggle */}
          <motion.button
            className="theme-toggle"
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
          >
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
            >
              {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
            </motion.div>
          </motion.button>

          {/* Mobile hamburger */}
          <motion.button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen((m) => !m)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </motion.button>
        </div>
      </nav>

      {/* FIX: Mobile menu - was commented out in original! Now restored + animated */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {NAV.map((n, i) => (
              <motion.button
                key={n}
                onClick={() => scrollTo(n)}
                className={`nav-link ${activeNav === n ? 'nav-link-active' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                {n}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default Navbar;
