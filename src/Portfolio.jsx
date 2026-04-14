import { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useInView } from "framer-motion";
import { FiGithub, FiExternalLink, FiMail, FiArrowRight, FiChevronDown, FiChevronUp, FiSend, FiCode } from "react-icons/fi";
import { useTypewriter } from "./hooks/useTypewriter";
import Navbar from "./components/Navbar";
import LoadingScreen from "./components/LoadingScreen";
import ScrollReveal from "./components/ScrollReveal";

/* ═══════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════ */
const ROLES = [
  "Full Stack Developer",
  "Blockchain Engineer",
  "Problem Solver",
  "CS Student @ GEHU",
  "React Developer",
];

const PROJECTS = [
  {
    title: "Agrofy",
    sub: "Blockchain Agriculture Supply Chain",
    stack: ["React.js", "Node.js", "MongoDB", "Solidity", "IPFS"],
    year: "2026",
    emoji: "🌾",
    grad: ["#0f6e56", "#1d9e75"],
    desc: "Full-stack agriculture supply chain platform using blockchain for end-to-end transparency & traceability.",
    // FIX: Use real URLs. '#' causes "Visit" button to do nothing visible on mobile
    github: "https://github.com/krishnanegi-06",
    live: "https://github.com/krishnanegi-06", // replace with actual live URL when deployed
    points: [
      "Smart contracts (Solidity) for tamper-proof product tracking",
      "IPFS decentralized storage for immutable data",
      "Role-based dashboards: farmers → distributors → retailers → consumers",
      "QR code + trust score system for product authenticity",
    ],
  },
  {
    title: "Agripulse",
    sub: "Smart Agriculture Analysis System",
    stack: ["Java", "Spring Boot", "HTML", "CSS", "JavaScript"],
    year: "2026",
    emoji: "🌱",
    grad: ["#185fa5", "#378add"],
    desc: "AI-assisted smart agriculture system providing data-driven crop analysis and irrigation insights for farmers.",
    github: "https://github.com/krishnanegi-06",
    live: "https://github.com/krishnanegi-06", // replace with actual live URL
    points: [
      "Spring Boot backend with weather & irrigation intelligence",
      "Image processing module for real-time crop diagnosis",
      "Automated decision-making recommendations",
      "Responsive dashboard with live analysis results",
    ],
  },
];

const SKILLS_DATA = [
  { cat: "Languages", icon: "⌨", items: ["C", "C++", "Python", "Java", "JavaScript", "HTML", "CSS"], col: "#7f77dd" },
  { cat: "Frontend", icon: "🖼", items: ["React.js", "DOM Manipulation", "Responsive Design"], col: "#378add" },
  { cat: "Backend", icon: "⚙", items: ["Node.js", "Spring Boot", "MongoDB"], col: "#1d9e75" },
  { cat: "Blockchain", icon: "⛓", items: ["Solidity", "IPFS", "Smart Contracts"], col: "#ef9f27" },
  { cat: "Tools", icon: "🔧", items: ["Git", "GitHub", "VS Code"], col: "#888780" },
  { cat: "Core CS", icon: "🧠", items: ["DSA", "OOP", "Problem Solving", "Algorithms"], col: "#d4537e" },
];

const EXPERIENCE = [
  {
    role: "Frontend Web Developer", org: "Self-Driven Projects", period: "2024 – Present", col: "#378add", icon: "🖥",
    pts: ["Built multiple projects with HTML, CSS, JavaScript", "DOM manipulation & API integration with Fetch", "Debugged CORS issues, API failures, and UI bugs"],
  },
  {
    role: "Full Stack Developer", org: "Agrofy & Agripulse", period: "2025 – Present", col: "#1d9e75", icon: "🚀",
    pts: ["Led full-stack dev with React + Node.js + MongoDB", "Integrated Solidity smart contracts via ethers.js", "Built Spring Boot backend with RESTful APIs"],
  },
  {
    role: "Blockchain Developer", org: "Personal Research", period: "2025 – Present", col: "#ef9f27", icon: "⛓",
    pts: ["Wrote & deployed Solidity contracts on local testnets", "Integrated IPFS for decentralized immutable storage", "Studied Web3.js / ethers.js for DApp connectivity"],
  },
  {
    role: "DSA Practitioner", org: "LeetCode / GeeksforGeeks", period: "2025 – Present", col: "#d4537e", icon: "🧩",
    pts: ["Active problem-solving on LeetCode & GFG", "Focus: arrays, strings, recursion, DP", "Building foundations for SDE-level interviews"],
  },
];

const EDUCATION = [
  { school: "Graphic Era Hill University", deg: "B.Tech Computer Science", period: "2024 – 2028", loc: "Dehradun, Uttarakhand", score: "Ongoing", main: true },
  { school: "Rashtriya Military School", deg: "Intermediate (Class XII)", period: "2023 – 2024", loc: "Belgaum, Karnataka", score: "87%" },
  { school: "Rashtriya Military School", deg: "Matriculation (Class X)", period: "2021 – 2022", loc: "Belgaum, Karnataka", score: "95%" },
];

const ABOUT_INFO = [
  { icon: "🎓", label: "University", value: "Graphic Era Hill University" },
  { icon: "📅", label: "Batch", value: "B.Tech CS · 2024–2028" },
  { icon: "📍", label: "Location", value: "Dehradun, Uttarakhand" },
  { icon: "💼", label: "Open to", value: "Internships & Freelance" },
  { icon: "📧", label: "Email", value: "knegi4394@gmail.com" },
  { icon: "📞", label: "Phone", value: "+91 98978 35437" },
];

/* ═══════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════ */

/* ── Particles canvas ── */
const Particles = memo(function Particles() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: undefined, y: undefined });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    // FIX: fewer particles on mobile for performance
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 25 : 55;
    const W = () => canvas.width;
    const H = () => canvas.height;

    const pts = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.8,
    }));

    let raf;
    function draw() {
      ctx.clearRect(0, 0, W(), H());
      const mouse = mouseRef.current;

      pts.forEach((p) => {
        if (mouse.x !== undefined && !isMobile) {
          const rect = canvas.getBoundingClientRect();
          const mx = mouse.x - rect.left;
          const my = mouse.y - rect.top;
          const dx = p.x - mx, dy = p.y - my;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            p.x += (dx / dist) * force * 1.5;
            p.y += (dy / dist) * force * 1.5;
          }
        }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W()) p.vx *= -1;
        if (p.y < 0 || p.y > H()) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(29,158,117,0.4)";
        ctx.fill();
      });

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(29,158,117,${0.12 * (1 - d / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }
    draw();

    const onResize = () => resize();
    const onMouseMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onMouseLeave = () => { mouseRef.current = { x: undefined, y: undefined }; };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
});

/* ── Stat counter ── */
const StatCounter = memo(function StatCounter({ end, label, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let s = 0;
    const step = end / 40;
    const t = setInterval(() => {
      s = Math.min(s + step, end);
      setVal(Math.round(s));
      if (s >= end) clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, [end, isInView]);

  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div className="stat-value">{val}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
});

/* ── Avatar ── */
function Avatar() {
  const [flipped, setFlipped] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="hero-avatar-col">
      <div className="hero-avatar-inner" onClick={() => setFlipped(f => !f)} title="Click to flip!">
        <div className="avatar-ring" />
        <div className="avatar-gap" />
        <div className={`avatar-flip ${flipped ? "flipped" : ""}`}>
          {/* Front */}
          <div className="avatar-face">
            {imgError ? (
              <div className="avatar-emoji-fallback">👨‍💻</div>
            ) : (
              <img
                src="/profile.jpg"
                alt="Krishna Negi"
                className="avatar-img"
                onError={() => setImgError(true)}
              />
            )}
          </div>
          {/* Back */}
          <div className="avatar-face avatar-face-back">
            <span style={{ fontSize: 32 }}>👨‍💻</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)", letterSpacing: 0.5 }}>Krishna Negi</span>
            <span style={{ fontSize: 10, color: "var(--text-muted)", lineHeight: 1.5, textAlign: "center" }}>
              Full Stack Dev<br />Blockchain · GEHU
            </span>
          </div>
        </div>
        {/* Hint text */}
        <div style={{ position: "absolute", bottom: -28, left: "50%", transform: "translateX(-50%)", fontSize: 10, color: "var(--text-dim)", whiteSpace: "nowrap", fontWeight: 500 }}>
          {flipped ? "Click to flip back ↩" : "Click to flip 🔄"}
        </div>
      </div>

      {/* Floating tech badges — hidden on mobile via CSS */}
      {[
        { t: "React.js", x: -70, y: 20, c: "#61dafb", delay: "0s" },
        { t: "Solidity", x: 230, y: 40, c: "#a8b0d6", delay: "0.5s" },
        { t: "Node.js", x: 220, y: 170, c: "#5fa04e", delay: "1s" },
        { t: "DSA", x: -62, y: 180, c: "#ef9f27", delay: "1.5s" },
      ].map((b) => (
        <div
          key={b.t}
          className="float-badge"
          style={{ left: b.x, top: b.y, color: b.c, borderColor: `${b.c}44`, boxShadow: `0 0 14px ${b.c}22`, border: "1px solid", animationDelay: b.delay }}
        >
          {b.t}
        </div>
      ))}
    </div>
  );
}

/* ── Project card ── */
const ProjectCard = memo(function ProjectCard({ p, index }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = ref.current;
    if (!card || window.innerWidth < 768) return; // FIX: no tilt on mobile
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    card.style.transform = `perspective(1000px) rotateX(${dy * -5}deg) rotateY(${dx * 5}deg) translateY(-6px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = '';
  }, []);

  return (
    <motion.div
      ref={ref}
      className="project-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => {
        if (ref.current) {
          ref.current.style.borderColor = p.grad[1] + "66";
          ref.current.style.boxShadow = `0 20px 60px rgba(0,0,0,0.25), 0 0 30px ${p.grad[1]}18`;
        }
      }}
    >
      <div className="project-card-accent" style={{ background: `linear-gradient(90deg, ${p.grad[0]}, ${p.grad[1]})` }} />
      <div className="project-card-glow" style={{ background: `radial-gradient(circle, ${p.grad[1]}22 0%, transparent 70%)` }} />

      <div className="project-header">
        <div className="project-icon" style={{ background: `linear-gradient(135deg, ${p.grad[0]}33, ${p.grad[1]}22)`, border: `1px solid ${p.grad[0]}44` }}>
          {p.emoji}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <h3 className="project-title">{p.title}</h3>
            <span className="project-year" style={{ background: `${p.grad[0]}33`, color: p.grad[1] }}>{p.year}</span>
          </div>
          <p className="project-sub">{p.sub}</p>
        </div>
      </div>

      <p className="project-desc">{p.desc}</p>

      <div className="project-stack">
        {p.stack.map((s) => <span key={s} className="project-tech-tag">{s}</span>)}
      </div>

      <div className="project-actions">
        {/* FIX: use <a> tags with target="_blank" + rel="noreferrer" for external links to work on all devices */}
        <a
          href={p.github}
          target="_blank"
          rel="noreferrer noopener"
          className="project-btn"
        >
          <FiGithub size={13} /> GitHub
        </a>
        <a
          href={p.live}
          target="_blank"
          rel="noreferrer noopener"
          className="project-btn"
        >
          <FiExternalLink size={13} /> Live Demo
        </a>
        <motion.button
          onClick={() => setOpen(!open)}
          className={`project-btn ${open ? "project-btn-active" : ""}`}
          style={{ marginLeft: "auto" }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {open ? <FiChevronUp size={13} /> : <FiChevronDown size={13} />}
          {open ? "Hide" : "Details"}
        </motion.button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ overflow: "hidden" }}
      >
        <ul className="project-highlights">
          {p.points.map((pt, i) => (
            <motion.li
              key={i}
              className="project-highlight-item"
              initial={{ opacity: 0, x: -10 }}
              animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ delay: open ? i * 0.06 : 0 }}
            >
              <span className="project-highlight-bullet" style={{ color: p.grad[1] }}>▸</span>
              {pt}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
});

/* ── Skill card ── */
const SkillCard = memo(function SkillCard({ s, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="skill-card"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4, borderColor: s.col + "88", boxShadow: `0 12px 40px rgba(0,0,0,0.15), 0 0 20px ${s.col}18` }}
    >
      <div className="skill-card-header">
        <div className="skill-card-icon" style={{ background: s.col + "22" }}>
          <span style={{ fontSize: 18 }}>{s.icon}</span>
        </div>
        <span className="skill-card-name" style={{ color: s.col }}>{s.cat}</span>
      </div>
      <div className="skill-tags">
        {s.items.map((item) => (
          <span key={item} className="skill-tag" style={{ background: s.col + "14", color: s.col + "cc", borderColor: s.col + "33" }}>
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
});

/* ── Contact form ── */
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const sendMsg = () => {
    if (!form.name || !form.email || !form.msg) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: "", email: "", msg: "" });
      setTimeout(() => setSent(false), 4000);
    }, 1000);
  };

  return (
    <div className="contact-form">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            className="success-animation"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="success-icon">🚀</div>
            <div className="success-title">Message Sent!</div>
            <div className="success-text">I'll get back to you very soon.</div>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="contact-grid">
              <div>
                <label className="form-label">Name</label>
                <input className="input" value={form.name} onChange={handleChange("name")} placeholder="Your full name" />
              </div>
              <div>
                <label className="form-label">Email</label>
                <input className="input" type="email" value={form.email} onChange={handleChange("email")} placeholder="your@email.com" />
              </div>
            </div>
            <div>
              <label className="form-label">Message</label>
              <textarea className="input textarea" rows={5} value={form.msg} onChange={handleChange("msg")} placeholder="Tell me about the opportunity or project..." />
            </div>
            <motion.button
              className="btn btn-primary"
              onClick={sendMsg}
              disabled={loading}
              whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "wait" : "pointer" }}
            >
              {loading ? <span className="spin-loader" /> : <FiSend size={16} />}
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Resume section ── */
function ResumeSection() {
  const [loadState, setLoadState] = useState("loading"); // "loading" | "ok" | "error"

  return (
    <section id="Resume" className="section">
      <div className="section-inner">
        <ScrollReveal>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Resume</span>
          </div>
          <h2 className="section-title">My Resume</h2>
          <p className="section-desc" style={{ marginBottom: 40 }}>
            Browse my full résumé below — or grab a copy to keep.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="resume-card">
            {/* macOS-style titlebar */}
            <div className="resume-titlebar">
              <div className="traffic-dot" style={{ background: "#ff5f57" }} />
              <div className="traffic-dot" style={{ background: "#febc2e" }} />
              <div className="traffic-dot" style={{ background: "#28c840" }} />
              <span style={{ marginLeft: 10, fontSize: 12, color: "var(--text-dim)", fontFamily: "var(--font-mono)", letterSpacing: 0.3 }}>
                Krishna_Negi_Resume.pdf
              </span>
            </div>

            <div className="resume-embed-area">
              {/* Loading spinner */}
              {loadState === "loading" && (
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, zIndex: 5, background: "var(--bg)" }}>
                  <div style={{ width: 52, height: 52, position: "relative" }}>
                    <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "3px solid var(--border)", borderTopColor: "var(--accent)", animation: "spin 0.9s linear infinite" }} />
                    <div style={{ position: "absolute", inset: 8, borderRadius: "50%", border: "2px solid var(--bg-3)", borderTopColor: "var(--accent-light)", animation: "spin 1.4s linear infinite reverse" }} />
                  </div>
                  <p style={{ color: "var(--text-muted)", fontSize: 14 }}>Loading resume…</p>
                </div>
              )}

              {/* Error fallback */}
              {loadState === "error" && (
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, background: "var(--bg)", textAlign: "center", padding: 24 }}>
                  <div style={{ fontSize: 32, width: 72, height: 72, background: "rgba(239,159,39,0.15)", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>📄</div>
                  <div>
                    <p style={{ color: "var(--text)", fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Preview unavailable</p>
                    <p style={{ color: "var(--text-muted)", fontSize: 13 }}>Place your resume at <code style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>public/resume.pdf</code> to enable preview.</p>
                  </div>
                </div>
              )}

              {/* FIX: Don't render iframe if errored — avoids blank white flash */}
              {loadState !== "error" && (
                <iframe
                  src="/resume.pdf#toolbar=0&view=FitH&navpanes=0"
                  title="Krishna Negi Resume"
                  onLoad={() => setLoadState("ok")}
                  onError={() => setLoadState("error")}
                  style={{ width: "100%", height: "100%", border: "none", display: "block", opacity: loadState === "ok" ? 1 : 0, transition: "opacity 0.5s ease" }}
                />
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Action buttons */}
        <ScrollReveal delay={0.2}>
          <div style={{ marginTop: 24, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <a href="/resume.pdf" download="Krishna_Negi_Resume.pdf" className="btn btn-primary">
              ⬇ Download Resume
            </a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn btn-ghost">
              ↗ Open in new tab
            </a>
            <span style={{ fontSize: 12, color: "var(--text-dim)", marginLeft: "auto" }}>PDF · Updated 2026</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PORTFOLIO
═══════════════════════════════════════════════ */
export default function Portfolio() {
  const typed = useTypewriter(ROLES);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>

      {/* ── Navbar ── */}
      <Navbar />

      {/* ════════════ HERO ════════════ */}
      <section id="Home" className="hero">
        {/* Ambient orbs */}
        <div style={{ position: "absolute", top: "20%", left: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(29,158,117,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(55,138,221,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <Particles />

        <div className="section-inner" style={{ zIndex: 1, position: "relative" }}>
          <motion.div
            className="hero-inner"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
          >
            {/* Left: text */}
            <div className="hero-text">
              <motion.div className="hero-badge" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <span className="hero-badge-dot" /> AVAILABLE FOR OPPORTUNITIES
              </motion.div>

              <motion.h1 className="hero-name" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
                Krishna
                <span className="hero-name-gradient"> Negi</span>
              </motion.h1>

              <motion.div className="hero-role" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                <span className="hero-role-accent">{typed}</span>
                <span className="hero-cursor">|</span>
              </motion.div>

              <motion.p className="hero-desc" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
                B.Tech CS student at <strong>Graphic Era Hill University</strong>, Dehradun.
                I craft full-stack applications and blockchain solutions that bring transparency
                to real-world supply chains — starting with Indian agriculture.
              </motion.p>

              <motion.div className="hero-buttons" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                <motion.button className="btn btn-primary" onClick={() => scrollTo("Projects")} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
                  View Projects <FiArrowRight size={15} />
                </motion.button>
                {/* FIX: mailto: link — use <a> not <button> */}
                <motion.a href="mailto:knegi4394@gmail.com" className="btn btn-secondary" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <FiMail size={15} /> Hire Me
                </motion.a>
                <motion.a href="https://github.com/krishnanegi-06" target="_blank" rel="noreferrer noopener" className="btn btn-ghost" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <FiGithub size={15} /> GitHub
                </motion.a>
              </motion.div>

              <motion.div className="hero-stats" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.5 } } }}>
                <StatCounter end={2} label="Projects" suffix="+" />
                <StatCounter end={95} label="Top Score %" />
                <StatCounter end={2} label="Years Coding" suffix="+" />
              </motion.div>
            </div>

            {/* Right: avatar */}
            <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } } }}>
              <Avatar />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════ ABOUT ════════════ */}
      <section id="About" className="section section-alt">
        <div className="section-inner">
          <ScrollReveal>
            <div className="section-label">
              <div className="section-label-line" />
              <span className="section-label-text">About Me</span>
            </div>
            <h2 className="section-title">Who I Am</h2>
          </ScrollReveal>

          <div className="about-grid">
            <ScrollReveal delay={0.1}>
              <div>
                <p className="about-text">
                  I'm a passionate developer and a proud product of{" "}
                  <span className="about-highlight">Rashtriya Military School, Belgaum</span> — where I scored
                  95% in Matriculation and 87% in Intermediate. The discipline from military school shaped my consistency in coding.
                </p>
                <p className="about-text">
                  Currently pursuing B.Tech CS at{" "}
                  <span className="about-accent">Graphic Era Hill University, Dehradun</span> (2024–2028).
                  My focus is on building impactful blockchain + full-stack systems, especially in India's
                  agriculture sector which is ripe for technological disruption.
                </p>
                <div className="about-links">
                  <motion.button
                    className="about-link"
                    style={{ background: "rgba(29,158,117,0.1)", color: "var(--accent)", borderColor: "rgba(29,158,117,0.3)" }}
                    onClick={() => scrollTo("Resume")}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Resume ↗
                  </motion.button>
                  {/* FIX: LinkedIn link must have target="_blank" + rel="noreferrer" */}
                  <motion.a
                    href="https://www.linkedin.com/in/krishna-negi-378801356/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="about-link"
                    style={{ background: "rgba(0,119,181,0.1)", color: "#0077b5", borderColor: "rgba(0,119,181,0.25)" }}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    LinkedIn ↗
                  </motion.a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} direction="right">
              <div className="about-info-list">
                {ABOUT_INFO.map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="about-info-item"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    whileHover={{ x: 4 }}
                  >
                    <span className="about-info-icon">{item.icon}</span>
                    <div>
                      <div className="about-info-label">{item.label}</div>
                      <div className="about-info-value">{item.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════ PROJECTS ════════════ */}
      <section id="Projects" className="section">
        <div className="section-inner">
          <ScrollReveal>
            <div className="section-label">
              <div className="section-label-line" />
              <span className="section-label-text">Projects</span>
            </div>
            <h2 className="section-title">Things I've Built</h2>
            <p className="section-desc" style={{ marginBottom: 40 }}>
              Real-world systems that blend full-stack engineering with blockchain technology.
            </p>
          </ScrollReveal>

          <div className="projects-grid">
            {PROJECTS.map((p, i) => <ProjectCard key={p.title} p={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ════════════ SKILLS ════════════ */}
      <section id="Skills" className="section section-alt">
        <div className="section-inner">
          <ScrollReveal>
            <div className="section-label">
              <div className="section-label-line" />
              <span className="section-label-text">Skills</span>
            </div>
            <h2 className="section-title">My Toolkit</h2>
            <p className="section-desc" style={{ marginBottom: 40 }}>
              Technologies and tools I use to bring ideas to life.
            </p>
          </ScrollReveal>

          <div className="skills-grid">
            {SKILLS_DATA.map((s, i) => <SkillCard key={s.cat} s={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ════════════ EXPERIENCE ════════════ */}
      <section id="Experience" className="section">
        <div className="section-inner">
          <ScrollReveal>
            <div className="section-label">
              <div className="section-label-line" />
              <span className="section-label-text">Journey</span>
            </div>
            <h2 className="section-title">Experience & Education</h2>
          </ScrollReveal>

          <div className="exp-grid" style={{ marginTop: 40 }}>
            {EXPERIENCE.map((exp, i) => (
              <ScrollReveal key={exp.role} delay={i * 0.12}>
                <div
                  className="exp-card"
                  style={{ borderTop: `3px solid ${exp.col}` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.15), 0 0 20px ${exp.col}18`;
                    e.currentTarget.style.borderColor = exp.col + "66";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "";
                    e.currentTarget.style.borderColor = "";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <span className="exp-icon" style={{ background: exp.col + "22" }}>{exp.icon}</span>
                    <div>
                      <div className="exp-role">{exp.role}</div>
                      <div className="exp-org">{exp.org}</div>
                    </div>
                  </div>
                  <span className="exp-period-badge" style={{ background: exp.col + "22", color: exp.col }}>
                    {exp.period}
                  </span>
                  <ul className="exp-points" style={{ marginTop: 14 }}>
                    {exp.pts.map((pt, j) => (
                      <li key={j} className="exp-point">
                        <span style={{ color: exp.col, flexShrink: 0 }}>▸</span>{pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div className="timeline-wrapper" style={{ marginTop: 0 }}>
              <h3 className="timeline-title">Education Timeline</h3>
              <div className="timeline">
                <div className="timeline-line" />
                {EDUCATION.map((e, i) => (
                  <motion.div
                    key={i}
                    className="timeline-item"
                    style={{ marginBottom: i < EDUCATION.length - 1 ? 28 : 0 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.12 }}
                  >
                    <div className={`timeline-dot ${e.main ? "timeline-dot-active" : "timeline-dot-inactive"}`} />
                    <div>
                      <div className="timeline-school">{e.school}</div>
                      <div className="timeline-degree">{e.deg}</div>
                      <div className="timeline-meta">
                        {e.period} &nbsp;·&nbsp; {e.loc} &nbsp;·&nbsp;
                        <span className="timeline-score">{e.score}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════ RESUME ════════════ */}
      <ResumeSection />

      {/* ════════════ CONTACT ════════════ */}
      <section id="Contact" className="section section-alt">
        <div className="section-inner" style={{ maxWidth: 700, margin: "0 auto" }}>
          <ScrollReveal>
            <div className="section-label" style={{ justifyContent: "center" }}>
              <div className="section-label-line" />
              <span className="section-label-text">Contact</span>
              <div className="section-label-line" />
            </div>
            <h2 className="section-title" style={{ textAlign: "center" }}>Let's Build Together</h2>
            <p className="section-desc" style={{ textAlign: "center", margin: "0 auto 48px", maxWidth: 500 }}>
              I'm actively seeking internships and collaborations. Whether you have a project idea,
              a job opportunity, or just want to say hi — my inbox is always open.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <ContactForm />
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <div className="social-links-row">
              {[
                { icon: "📧", label: "knegi4394@gmail.com", href: "mailto:knegi4394@gmail.com" },
                { icon: "🐙", label: "GitHub", href: "https://github.com/krishnanegi-06" },
                { icon: "💼", label: "LinkedIn", href: "https://www.linkedin.com/in/krishna-negi-378801356/" },
              ].map((l) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={l.href.startsWith("mailto") ? undefined : "noreferrer noopener"}
                  className="social-link"
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="social-link-icon">{l.icon}</span>
                  {l.label}
                </motion.a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════ FOOTER ════════════ */}
      <footer className="footer">
        <span className="footer-text">
          Designed & Built by <span className="footer-highlight">Krishna Negi</span> · 2026
        </span>
        <span className="footer-text">
          Made with <FiCode size={14} style={{ color: "var(--accent)" }} /> React
        </span>
      </footer>
    </div>
  );
}
