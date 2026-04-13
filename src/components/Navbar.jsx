import { useState, useEffect, memo } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { NAV } from '../data/portfolio';
import ThemeToggle from './ThemeToggle';

const Navbar = memo(function Navbar() {
  const [activeNav, setActiveNav] = useState('Home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Detect scroll position
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -60% 0px' }
    );

    NAV.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Scroll progress indicator */}
      <motion.div className="scroll-progress" style={{ scaleX }} />

      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <motion.div
          className="navbar-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollTo('Home')}
        >
          <span className="navbar-logo-text">KN</span>
          <span style={{ color: 'var(--text-heading)' }}>.</span>
        </motion.div>

        <div className="navbar-right">
          {/* Desktop nav links */}
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

          <ThemeToggle />

          {/* Mobile menu button */}
          <motion.button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
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
                transition={{ delay: i * 0.05 }}
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
