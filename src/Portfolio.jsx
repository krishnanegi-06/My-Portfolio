import { useState, useEffect, useRef } from "react";

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

const NAV = ["Home", "About", "Projects", "Skills", "Experience", "Resume", "Contact"];

/* ═══════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════ */
function useTypewriter(words) {
  const [text, setText] = useState("");
  const [wIdx, setWIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[wIdx];
    const t = setTimeout(() => {
      if (!del && cIdx < w.length) { setText(w.slice(0, cIdx + 1)); setCIdx(c => c + 1); }
      else if (!del && cIdx === w.length) { setTimeout(() => setDel(true), 1600); }
      else if (del && cIdx > 0) { setText(w.slice(0, cIdx - 1)); setCIdx(c => c - 1); }
      else { setDel(false); setWIdx(i => (i + 1) % words.length); }
    }, del ? 35 : 75);
    return () => clearTimeout(t);
  }, [cIdx, del, wIdx, words]);
  return text;
}

/* ═══════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════ */
function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
    }));
    let raf;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(29,158,117,0.35)";
        ctx.fill();
      });
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(29,158,117,${0.12 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

function StatCounter({ end, label, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let s = 0;
        const step = end / 40;
        const t = setInterval(() => {
          s = Math.min(s + step, end);
          setVal(Math.round(s));
          if (s >= end) clearInterval(t);
        }, 30);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{ fontSize: 40, fontWeight: 800, color: "#1d9e75", fontFamily: "monospace", lineHeight: 1 }}>{val}{suffix}</div>
      <div style={{ fontSize: 13, color: "#aaa", marginTop: 4, letterSpacing: 1, textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}

function ProjectCard({ p }) {
  const [open, setOpen] = useState(false);
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#161b22" : "#0d1117",
        border: `1px solid ${hov ? "#1d9e75" : "#21262d"}`,
        borderRadius: 20,
        padding: "28px 28px 22px",
        transition: "all 0.3s ease",
        transform: hov ? "translateY(-6px)" : "none",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${p.grad[0]}, ${p.grad[1]})`,
        borderRadius: "20px 20px 0 0",
        opacity: hov ? 1 : 0.5, transition: "opacity 0.3s",
      }} />
      <div style={{
        position: "absolute", top: -60, right: -40, width: 150, height: 150,
        background: `radial-gradient(circle, ${p.grad[1]}18 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16, position: "relative" }}>
        <div style={{
          width: 54, height: 54, borderRadius: 14,
          background: `linear-gradient(135deg, ${p.grad[0]}33, ${p.grad[1]}22)`,
          border: `1px solid ${p.grad[0]}44`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0,
        }}>{p.emoji}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#e6edf3" }}>{p.title}</h3>
            <span style={{
              fontSize: 11, background: `${p.grad[0]}33`, color: p.grad[1],
              padding: "3px 10px", borderRadius: 20, fontWeight: 600, letterSpacing: 0.5,
            }}>{p.year}</span>
          </div>
          <p style={{ margin: "3px 0 0", fontSize: 13, color: "#8b949e" }}>{p.sub}</p>
        </div>
      </div>
      <p style={{ fontSize: 14, color: "#8b949e", lineHeight: 1.7, margin: "0 0 16px", position: "relative" }}>{p.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {p.stack.map(s => (
          <span key={s} style={{
            background: "#21262d", color: "#8b949e", fontSize: 11,
            padding: "4px 10px", borderRadius: 20, fontFamily: "monospace", fontWeight: 500,
          }}>{s}</span>
        ))}
      </div>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "none", border: `1px solid ${open ? p.grad[1] : "#30363d"}`,
          color: open ? p.grad[1] : "#8b949e",
          borderRadius: 8, padding: "7px 16px", fontSize: 12, cursor: "pointer",
          fontWeight: 600, transition: "all 0.2s", letterSpacing: 0.5,
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = p.grad[1]; e.currentTarget.style.color = p.grad[1]; }}
        onMouseLeave={e => { if (!open) { e.currentTarget.style.borderColor = "#30363d"; e.currentTarget.style.color = "#8b949e"; } }}
      >{open ? "▲ Hide" : "▼ View highlights"}</button>
      {open && (
        <ul style={{ margin: "16px 0 0", paddingLeft: 0, listStyle: "none" }}>
          {p.points.map((pt, i) => (
            <li key={i} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 13, color: "#c9d1d9", lineHeight: 1.6 }}>
              <span style={{ color: p.grad[1], marginTop: 2, flexShrink: 0 }}>▸</span>{pt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SkillCard({ s }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#161b22" : "#0d1117",
        border: `1px solid ${hov ? s.col + "88" : "#21262d"}`,
        borderRadius: 16, padding: "20px",
        transition: "all 0.25s ease",
        transform: hov ? "translateY(-3px)" : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: s.col + "22", display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 18,
        }}>{s.icon}</div>
        <span style={{ fontSize: 14, fontWeight: 700, color: s.col, letterSpacing: 0.3 }}>{s.cat}</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {s.items.map(item => (
          <span key={item} style={{
            background: s.col + "18", color: s.col + "cc",
            fontSize: 12, fontWeight: 500, padding: "4px 12px",
            borderRadius: 20, border: `1px solid ${s.col}33`,
          }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

/* ── NEW: Profile Picture Component ── */
function ProfilePicture({ src = "/profile.jpg", size = 220 }) {
  const [hov, setHov] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [flipped, setFlipped] = useState(false);

  // Toggle flip on click
  const handleClick = () => setFlipped(f => !f);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
        perspective: "800px",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={handleClick}
      title="Click to flip!"
    >
      {/* Outer glow ring */}
      <div style={{
        position: "relative",
        width: size,
        height: size,
      }}>
        {/* Spinning conic ring */}
        <div style={{
          position: "absolute",
          inset: -4,
          borderRadius: "50%",
          background: "conic-gradient(from 0deg, #1d9e75, #5dcaa5, #378add, #1d9e75)",
          opacity: hov ? 1 : 0.5,
          transition: "opacity 0.4s ease",
          animation: "spin 4s linear infinite",
        }} />
        {/* Gap ring */}
        <div style={{
          position: "absolute",
          inset: 3,
          borderRadius: "50%",
          background: "#010409",
          zIndex: 1,
        }} />

        {/* Flip card container */}
        <div style={{
          position: "absolute",
          inset: 6,
          borderRadius: "50%",
          zIndex: 2,
          transformStyle: "preserve-3d",
          transition: "transform 0.7s cubic-bezier(0.34,1.2,0.64,1)",
          transform: flipped
            ? "rotateY(180deg)"
            : hov
            ? "scale(1.07) rotate(3deg)"
            : "scale(1) rotate(0deg)",
        }}>
          {/* FRONT: photo */}
          <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            overflow: "hidden",
            boxShadow: hov
              ? "0 12px 40px rgba(29,158,117,0.5)"
              : "0 6px 24px rgba(0,0,0,0.6)",
            transition: "box-shadow 0.35s",
          }}>
            {/* Skeleton shimmer while loading */}
            {!imgLoaded && (
              <div style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                background: "linear-gradient(90deg,#161b22 25%,#21262d 50%,#161b22 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.4s infinite",
              }} />
            )}
            <img
              src={src}
              alt="Krishna Negi"
              onLoad={() => setImgLoaded(true)}
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center top",
                borderRadius: "50%",
                opacity: imgLoaded ? 1 : 0,
                transition: "opacity 0.4s",
                display: "block",
              }}
            />
            {/* Subtle highlight overlay */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              background: hov
                ? "radial-gradient(circle at 30% 25%, rgba(93,202,165,0.15), transparent 65%)"
                : "transparent",
              transition: "background 0.4s",
            }} />
          </div>

          {/* BACK: info card */}
          <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, #0d1117, #161b22)",
            border: "1px solid #1d9e7533",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: 20,
            textAlign: "center",
          }}>
            <span style={{ fontSize: 32 }}>👨‍💻</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#1d9e75", letterSpacing: 0.5 }}>Krishna Negi</span>
            <span style={{ fontSize: 10, color: "#8b949e", lineHeight: 1.5 }}>Full Stack Dev{"\n"}Blockchain · GEHU</span>
          </div>
        </div>

        {/* Hover hint */}
        <div style={{
          position: "absolute",
          bottom: -28,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 10,
          color: "#484f58",
          whiteSpace: "nowrap",
          opacity: hov ? 1 : 0,
          transition: "opacity 0.3s",
          zIndex: 10,
          fontWeight: 500,
          letterSpacing: 0.5,
        }}>
          {flipped ? "Click to flip back ↩" : "Click to flip 🔄"}
        </div>
      </div>

      {/* Floating tech badges */}
      {[
        { t: "React.js", x: -64, y: 20, c: "#61dafb" },
        { t: "Solidity", x: size - 8, y: 40, c: "#a8b0d6" },
        { t: "Node.js", x: size - 12, y: size - 52, c: "#5fa04e" },
        { t: "DSA", x: -58, y: size - 48, c: "#ef9f27" },
      ].map(b => (
        <div key={b.t} style={{
          position: "absolute",
          left: b.x + (size / 2 - size / 2),
          top: b.y,
          background: "#161b22",
          border: `1px solid ${b.c}44`,
          borderRadius: 8, padding: "5px 10px",
          fontSize: 11, color: b.c,
          fontWeight: 700, whiteSpace: "nowrap",
          boxShadow: `0 0 12px ${b.c}22`,
          opacity: hov ? 1 : 0.7,
          transition: "opacity 0.3s",
          animation: "float 4s ease-in-out infinite",
          animationDelay: `${b.x * 0.01}s`,
        }}>{b.t}</div>
      ))}
    </div>
  );
}

/* ── NEW: Resume Section ── */
function ResumeSection({ pdfPath = "/resume.pdf", downloadName = "Krishna_Negi_Resume.pdf" }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <section id="Resume" style={{ background: "#010409", padding: "100px 0" }}>
      <div className="section-inner">

        {/* Section header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{ width: 32, height: 2, background: "#1d9e75", borderRadius: 2 }} />
          <span style={{ fontSize: 12, color: "#1d9e75", fontWeight: 700, letterSpacing: 2 }}>RESUME</span>
        </div>
        <h2 style={{ fontSize: 36, fontWeight: 800, color: "#e6edf3", marginBottom: 12, letterSpacing: -1 }}>My Resume</h2>
        <p style={{ fontSize: 15, color: "#8b949e", marginBottom: 40, maxWidth: 500 }}>
          Browse my full résumé below — or grab a copy to keep.
        </p>

        {/* PDF viewer card */}
        <div style={{
          background: "#0d1117",
          border: "1px solid #21262d",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.55)",
          maxWidth: 860,
        }}>
          {/* macOS-style title bar */}
          <div style={{
            background: "#161b22",
            borderBottom: "1px solid #21262d",
            padding: "13px 20px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}>
            {["#ff5f57", "#febc2e", "#28c840"].map(c => (
              <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
            ))}
            <span style={{
              marginLeft: 10, fontSize: 12,
              color: "#484f58", fontFamily: "monospace", letterSpacing: 0.3,
            }}>{downloadName}</span>
            <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
              {["📄", "🔍"].map(icon => (
                <span key={icon} style={{ fontSize: 14, cursor: "default", opacity: 0.5 }}>{icon}</span>
              ))}
            </div>
          </div>

          {/* PDF embed area */}
          <div style={{
            position: "relative",
            width: "100%",
            height: "clamp(440px, 72vh, 860px)",
            background: "#010409",
          }}>

            {/* Loading spinner */}
            {loading && !error && (
              <div style={{
                position: "absolute", inset: 0, zIndex: 5,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 18,
              }}>
                <div style={{
                  position: "relative", width: 52, height: 52,
                }}>
                  <div style={{
                    position: "absolute", inset: 0,
                    borderRadius: "50%",
                    border: "3px solid #21262d",
                    borderTopColor: "#1d9e75",
                    animation: "spin 0.9s linear infinite",
                  }} />
                  <div style={{
                    position: "absolute", inset: 8,
                    borderRadius: "50%",
                    border: "2px solid #161b22",
                    borderTopColor: "#5dcaa5",
                    animation: "spin 1.4s linear infinite reverse",
                  }} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 14, color: "#8b949e", fontWeight: 500 }}>Loading resume…</div>
                  <div style={{ fontSize: 12, color: "#484f58", marginTop: 4 }}>This may take a moment</div>
                </div>
              </div>
            )}

            {/* Error fallback */}
            {error && (
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 16,
                background: "#010409",
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius: 20,
                  background: "#ef9f2722",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 32,
                }}>📄</div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ color: "#c9d1d9", fontSize: 15, fontWeight: 600, margin: "0 0 6px" }}>
                    Preview unavailable
                  </p>
                  <p style={{ color: "#8b949e", fontSize: 13, margin: 0 }}>
                    Your browser blocked the PDF preview.
                    <br />Use the download button below instead.
                  </p>
                </div>
              </div>
            )}

            {/* iframe embed */}
            {!error && (
              <iframe
                src={`${pdfPath}#toolbar=0&view=FitH&navpanes=0`}
                title="Krishna Negi Resume"
                onLoad={() => setLoading(false)}
                onError={() => { setLoading(false); setError(true); }}
                style={{
                  width: "100%", height: "100%",
                  border: "none", display: "block",
                  opacity: loading ? 0 : 1,
                  transition: "opacity 0.5s ease",
                }}
              />
            )}
          </div>
        </div>

        {/* Action row */}
        <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          {/* Download button */}
          <a
            href={pdfPath}
            download={downloadName}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "linear-gradient(135deg, #1d9e75, #0f6e56)",
              color: "#fff", textDecoration: "none",
              borderRadius: 14, padding: "13px 28px",
              fontSize: 15, fontWeight: 700, letterSpacing: 0.3,
              boxShadow: "0 4px 20px rgba(29,158,117,0.35)",
              transition: "transform 0.18s, box-shadow 0.18s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(29,158,117,0.5)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(29,158,117,0.35)";
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Resume
          </a>

          {/* Open in new tab */}
          <a
            href={pdfPath}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "none", color: "#8b949e",
              border: "1px solid #30363d", borderRadius: 14,
              padding: "13px 22px", fontSize: 14,
              fontWeight: 600, textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#1d9e7555"; e.currentTarget.style.color = "#1d9e75"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#30363d"; e.currentTarget.style.color = "#8b949e"; }}
          >
            ↗ Open in new tab
          </a>

          <span style={{ fontSize: 12, color: "#484f58", marginLeft: "auto" }}>
            PDF · Updated 2026
          </span>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PORTFOLIO COMPONENT
═══════════════════════════════════════════════ */
export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const typed = useTypewriter(ROLES);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body {
        font-family: 'Sora', 'Segoe UI', system-ui, sans-serif;
        background: #010409;
        color: #c9d1d9;
        overflow-x: hidden;
      }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: #0d1117; }
      ::-webkit-scrollbar-thumb { background: #1d9e75; border-radius: 4px; }

      @keyframes fadeUp   { from { opacity:0; transform:translateY(32px) } to { opacity:1; transform:translateY(0) } }
      @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
      @keyframes spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
      @keyframes glow     { 0%,100%{box-shadow:0 0 20px #1d9e7544} 50%{box-shadow:0 0 40px #1d9e7588} }
      @keyframes shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
      @keyframes pulse-ring {
        0%   { transform: scale(1); opacity: 0.6; }
        100% { transform: scale(1.5); opacity: 0; }
      }

      .fade-in  { animation: fadeUp 0.7s ease both; }
      .float    { animation: float 4s ease-in-out infinite; }
      .glow     { animation: glow 3s ease-in-out infinite; }

      section { padding: 100px 0; }
      .section-inner { max-width: 960px; margin: 0 auto; padding: 0 5vw; }

      input, textarea {
        background: #0d1117;
        border: 1px solid #30363d;
        color: #c9d1d9;
        border-radius: 10px;
        padding: 11px 14px;
        font-size: 14px;
        font-family: inherit;
        width: 100%;
        outline: none;
        transition: border 0.2s;
      }
      input:focus, textarea:focus { border-color: #1d9e75; }

      @media (max-width: 720px) {
        .hero-grid      { flex-direction: column !important; }
        .about-grid     { grid-template-columns: 1fr !important; }
        .exp-grid       { grid-template-columns: 1fr !important; }
        .contact-name-email { grid-template-columns: 1fr !important; }
        .nav-links      { display: none !important; }
        .nav-links.open { display: flex !important; flex-direction: column; position: fixed;
                          top: 64px; left: 0; right: 0; background: rgba(1,4,9,0.97);
                          border-bottom: 1px solid #21262d; padding: 16px 5vw; gap: 4px; z-index: 199; }
        .mobile-menu-btn { display: block !important; }
        .float-badges   { display: none !important; }
        .stat-row       { gap: 20px !important; }
      }
    `;
    document.head.appendChild(style);

    // Import Sora font
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap";
    document.head.appendChild(link);

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => {
      document.head.removeChild(style);
      document.head.removeChild(link);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollTo = (id) => {
    setActiveNav(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const sendMsg = () => {
    if (form.name && form.email && form.msg) {
      setSent(true);
      setTimeout(() => setSent(false), 3500);
      setForm({ name: "", email: "", msg: "" });
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#010409" }}>

      {/* ══════════════ NAV ══════════════ */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? "rgba(1,4,9,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid #21262d" : "none",
        padding: "0 5vw",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 64, transition: "all 0.3s",
      }}>
        {/* Logo */}
        <button
          onClick={() => scrollTo("Home")}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <span style={{ fontWeight: 800, fontSize: 22, letterSpacing: -1 }}>
            <span style={{
              background: "linear-gradient(90deg, #1d9e75, #5dcaa5)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>KN</span>
            <span style={{ color: "#1d9e75" }}>.</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="nav-links" style={{ display: "flex", gap: 4 }}>
          {NAV.map(n => (
            <button key={n} onClick={() => scrollTo(n)} style={{
              background: activeNav === n ? "#1d9e7522" : "none",
              color: activeNav === n ? "#1d9e75" : "#8b949e",
              border: activeNav === n ? "1px solid #1d9e7544" : "1px solid transparent",
              borderRadius: 8, padding: "7px 15px", fontSize: 13,
              fontWeight: activeNav === n ? 600 : 400,
              cursor: "pointer", transition: "all 0.2s", letterSpacing: 0.2,
            }}
              onMouseEnter={e => { if (activeNav !== n) e.currentTarget.style.color = "#c9d1d9"; }}
              onMouseLeave={e => { if (activeNav !== n) e.currentTarget.style.color = "#8b949e"; }}
            >{n}</button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(m => !m)}
          style={{
            display: "none", background: "none", border: "none",
            color: "#e6edf3", fontSize: 22, cursor: "pointer", padding: 4,
          }}
        >{menuOpen ? "✕" : "☰"}</button>
      </div>

      {/* Mobile menu dropdown */}
      <div className={`nav-links${menuOpen ? " open" : ""}`}>
        {NAV.map(n => (
          <button key={n} onClick={() => scrollTo(n)} style={{
            background: "none", border: "none",
            color: activeNav === n ? "#1d9e75" : "#8b949e",
            fontSize: 15, fontWeight: activeNav === n ? 700 : 400,
            cursor: "pointer", padding: "10px 0", textAlign: "left",
          }}>{n}</button>
        ))}
      </div>

      {/* ══════════════ HERO ══════════════ */}
      <section id="Home" style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden", paddingTop: 64,
      }}>
        <Particles />
        {/* Ambient glow orbs */}
        <div style={{ position: "absolute", top: "20%", left: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, #1d9e7514 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, #378add10 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="section-inner hero-grid" style={{ display: "flex", alignItems: "center", gap: 60, position: "relative", zIndex: 1 }}>

          {/* Left: text */}
          <div className="fade-in" style={{ flex: 1 }}>
            {/* Status badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#1d9e7514", border: "1px solid #1d9e7533",
              borderRadius: 24, padding: "6px 16px", marginBottom: 28,
              fontSize: 12, color: "#5dcaa5", fontWeight: 600, letterSpacing: 1,
            }}>
              <span style={{ width: 7, height: 7, background: "#1d9e75", borderRadius: "50%", animation: "blink 2s infinite" }} />
              AVAILABLE FOR OPPORTUNITIES
            </div>

            <h1 style={{ fontSize: "clamp(38px, 5.5vw, 68px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 8, color: "#e6edf3", letterSpacing: -2 }}>
              Krishna
              <span style={{
                display: "block",
                background: "linear-gradient(90deg, #1d9e75, #5dcaa5, #378add)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundSize: "200% auto",
                animation: "shimmer 3s linear infinite",
              }}> Negi</span>
            </h1>

            <div style={{ fontSize: "clamp(16px, 2.2vw, 24px)", color: "#8b949e", minHeight: 36, marginBottom: 24, fontWeight: 300 }}>
              <span style={{ color: "#1d9e75", fontWeight: 600 }}>{typed}</span>
              <span style={{ animation: "blink 1s step-end infinite", color: "#1d9e75" }}>|</span>
            </div>

            <p style={{ fontSize: 15, color: "#8b949e", lineHeight: 1.85, maxWidth: 540, marginBottom: 36 }}>
              B.Tech CS student at <span style={{ color: "#c9d1d9" }}>Graphic Era Hill University</span>, Dehradun.
              I craft full-stack applications and blockchain solutions that bring transparency
              to real-world supply chains — starting with Indian agriculture.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
              <button onClick={() => scrollTo("Projects")} className="glow" style={{
                background: "linear-gradient(135deg, #1d9e75, #0f6e56)",
                color: "#fff", border: "none", borderRadius: 12,
                padding: "13px 30px", fontSize: 14, fontWeight: 700,
                cursor: "pointer", letterSpacing: 0.4, transition: "transform 0.15s",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >View Projects →</button>

              <button onClick={() => scrollTo("Resume")} style={{
                background: "#1d9e7514", color: "#1d9e75",
                border: "1.5px solid #1d9e7555", borderRadius: 12,
                padding: "13px 30px", fontSize: 14, fontWeight: 700,
                cursor: "pointer", letterSpacing: 0.4, transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#1d9e7522"; e.currentTarget.style.borderColor = "#1d9e75"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#1d9e7514"; e.currentTarget.style.borderColor = "#1d9e7555"; }}
              >📄 View Resume</button>

              <a href="mailto:knegi4394@gmail.com" style={{
                background: "none", color: "#8b949e",
                border: "1px solid #30363d", borderRadius: 12,
                padding: "13px 20px", fontSize: 14, fontWeight: 600,
                cursor: "pointer", textDecoration: "none", display: "inline-block",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#8b949e"; e.currentTarget.style.color = "#c9d1d9"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#30363d"; e.currentTarget.style.color = "#8b949e"; }}
              >📬 Hire Me</a>
            </div>

            <div className="stat-row" style={{ display: "flex", gap: 40 }}>
              <StatCounter end={2} label="Projects" suffix="+" />
              <StatCounter end={95} label="Top Score %" />
              <StatCounter end={2} label="Years Coding" suffix="+" />
            </div>
          </div>

          {/* Right: NEW profile picture */}
          <div style={{ flexShrink: 0, position: "relative", width: 260, height: 300 }}>
            <ProfilePicture src="/profile.jpg" size={240} />

            {/* Floating tech badges */}
            <div className="float-badges">
              {[
                { t: "React.js", x: -64, y: 20, c: "#61dafb", delay: "0s" },
                { t: "Solidity", x: 222, y: 40, c: "#a8b0d6", delay: "0.5s" },
                { t: "Node.js", x: 215, y: 168, c: "#5fa04e", delay: "1s" },
                { t: "DSA", x: -58, y: 178, c: "#ef9f27", delay: "1.5s" },
              ].map(b => (
                <div key={b.t} style={{
                  position: "absolute", left: b.x, top: b.y,
                  background: "#161b22", border: `1px solid ${b.c}44`,
                  borderRadius: 8, padding: "5px 10px", fontSize: 11,
                  color: b.c, fontWeight: 700, whiteSpace: "nowrap",
                  boxShadow: `0 0 12px ${b.c}22`,
                  animation: `float 4s ease-in-out infinite`,
                  animationDelay: b.delay,
                }}>{b.t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ ABOUT ══════════════ */}
      <section id="About" style={{ background: "#0d1117", padding: "100px 0" }}>
        <div className="section-inner">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 32, height: 2, background: "#1d9e75", borderRadius: 2 }} />
            <span style={{ fontSize: 12, color: "#1d9e75", fontWeight: 700, letterSpacing: 2 }}>ABOUT ME</span>
          </div>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "#e6edf3", marginBottom: 40, letterSpacing: -1 }}>Who I Am</h2>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <div>
              <p style={{ fontSize: 15, color: "#8b949e", lineHeight: 2, marginBottom: 18 }}>
                I'm a passionate developer and a proud product of{" "}
                <span style={{ color: "#c9d1d9", fontWeight: 600 }}>Rashtriya Military School, Belgaum</span> — where I scored
                95% in Matriculation and 87% in Intermediate. The discipline from military school
                shaped my consistency in coding.
              </p>
              <p style={{ fontSize: 15, color: "#8b949e", lineHeight: 2 }}>
                Currently pursuing B.Tech CS at{" "}
                <span style={{ color: "#1d9e75", fontWeight: 600 }}>Graphic Era Hill University, Dehradun</span> (2024–2028).
                My focus is on building impactful blockchain + full-stack systems, especially in India's
                agriculture sector which is ripe for technological disruption.
              </p>
              <div style={{ display: "flex", gap: 16, marginTop: 28, flexWrap: "wrap" }}>
                {[
                  { l: "View Resume", action: "resume", col: "#1d9e75" },
                  { l: "LinkedIn ↗", href: "https://linkedin.com/in/krishna-negi-378801356", col: "#0077b5" },
                ].map(b => (
                  b.href ? (
                    <a key={b.l} href={b.href} target="_blank" rel="noreferrer" style={{
                      background: b.col + "22", color: b.col, border: `1px solid ${b.col}44`,
                      borderRadius: 10, padding: "9px 20px", fontSize: 13,
                      fontWeight: 600, textDecoration: "none", display: "inline-block", transition: "all 0.2s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = b.col + "33"}
                      onMouseLeave={e => e.currentTarget.style.background = b.col + "22"}
                    >{b.l}</a>
                  ) : (
                    <button key={b.l} onClick={() => scrollTo("Resume")} style={{
                      background: b.col + "22", color: b.col, border: `1px solid ${b.col}44`,
                      borderRadius: 10, padding: "9px 20px", fontSize: 13,
                      fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = b.col + "33"}
                      onMouseLeave={e => e.currentTarget.style.background = b.col + "22"}
                    >{b.l} ↗</button>
                  )
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: "🎓", k: "University", v: "Graphic Era Hill University" },
                { icon: "📅", k: "Batch", v: "B.Tech CS · 2024–2028" },
                { icon: "📍", k: "Location", v: "Dehradun, Uttarakhand" },
                { icon: "💼", k: "Open to", v: "Internships & Freelance" },
                { icon: "📧", k: "Email", v: "knegi4394@gmail.com" },
                { icon: "📞", k: "Phone", v: "+91 98978 35437" },
              ].map(item => (
                <div key={item.k} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  background: "#010409", border: "1px solid #21262d",
                  borderRadius: 12, padding: "12px 16px", transition: "border-color 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#1d9e7544"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#21262d"}
                >
                  <span style={{ fontSize: 18, width: 36, height: 36, background: "#21262d", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, color: "#484f58", fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase" }}>{item.k}</div>
                    <div style={{ fontSize: 14, color: "#c9d1d9", fontWeight: 500, marginTop: 1 }}>{item.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ PROJECTS ══════════════ */}
      <section id="Projects" style={{ background: "#010409", padding: "100px 0" }}>
        <div className="section-inner">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 32, height: 2, background: "#1d9e75", borderRadius: 2 }} />
            <span style={{ fontSize: 12, color: "#1d9e75", fontWeight: 700, letterSpacing: 2 }}>PROJECTS</span>
          </div>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "#e6edf3", marginBottom: 12, letterSpacing: -1 }}>Things I've Built</h2>
          <p style={{ fontSize: 15, color: "#8b949e", marginBottom: 40, maxWidth: 520 }}>
            Real-world systems that blend full-stack engineering with blockchain technology.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 24 }}>
            {PROJECTS.map(p => <ProjectCard key={p.title} p={p} />)}
          </div>
        </div>
      </section>

      {/* ══════════════ SKILLS ══════════════ */}
      <section id="Skills" style={{ background: "#0d1117", padding: "100px 0" }}>
        <div className="section-inner">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 32, height: 2, background: "#1d9e75", borderRadius: 2 }} />
            <span style={{ fontSize: 12, color: "#1d9e75", fontWeight: 700, letterSpacing: 2 }}>SKILLS</span>
          </div>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "#e6edf3", marginBottom: 40, letterSpacing: -1 }}>My Toolkit</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 16 }}>
            {SKILLS_DATA.map(s => <SkillCard key={s.cat} s={s} />)}
          </div>
        </div>
      </section>

      {/* ══════════════ EXPERIENCE ══════════════ */}
      <section id="Experience" style={{ background: "#010409", padding: "100px 0" }}>
        <div className="section-inner">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 32, height: 2, background: "#1d9e75", borderRadius: 2 }} />
            <span style={{ fontSize: 12, color: "#1d9e75", fontWeight: 700, letterSpacing: 2 }}>JOURNEY</span>
          </div>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "#e6edf3", marginBottom: 44, letterSpacing: -1 }}>Experience & Education</h2>

          <div className="exp-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 48 }}>
            {[
              {
                role: "Frontend Web Developer",
                org: "Self-Driven Projects",
                period: "2024 – Present",
                col: "#378add",
                icon: "🖥",
                pts: ["Built multiple projects with HTML, CSS, JavaScript", "DOM manipulation & API integration with Fetch", "Debugged CORS issues, API failures, and UI bugs"],
              },
              {
                role: "Full Stack Developer",
                org: "Agrofy & Agripulse",
                period: "2025 – Present",
                col: "#1d9e75",
                icon: "🚀",
                pts: ["Led full-stack dev with React + Node.js + MongoDB", "Integrated Solidity smart contracts via ethers.js", "Built Spring Boot backend with RESTful APIs"],
              },
              {
                role: "Blockchain Developer",
                org: "Personal Research",
                period: "2025 – Present",
                col: "#ef9f27",
                icon: "⛓",
                pts: ["Wrote & deployed Solidity contracts on local testnets", "Integrated IPFS for decentralized immutable storage", "Studied Web3.js / ethers.js for DApp connectivity"],
              },
              {
                role: "DSA Practitioner",
                org: "LeetCode / GeeksforGeeks",
                period: "2025 – Present",
                col: "#d4537e",
                icon: "🧩",
                pts: ["Active problem-solving on LeetCode & GFG", "Focus: arrays, strings, recursion, DP", "Building foundations for SDE-level interviews"],
              },
            ].map(exp => (
              <div key={exp.role} style={{
                background: "#0d1117", border: "1px solid #21262d",
                borderRadius: 16, padding: "24px",
                borderTop: `3px solid ${exp.col}`,
                transition: "all 0.25s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = exp.col + "66"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "#21262d"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <span style={{ fontSize: 24, width: 48, height: 48, background: exp.col + "22", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>{exp.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: "#e6edf3" }}>{exp.role}</div>
                    <div style={{ fontSize: 13, color: "#484f58" }}>{exp.org}</div>
                  </div>
                </div>
                <span style={{ background: exp.col + "22", color: exp.col, fontSize: 11, padding: "3px 10px", borderRadius: 20, fontWeight: 600, letterSpacing: 0.5 }}>{exp.period}</span>
                <ul style={{ paddingLeft: 0, listStyle: "none", marginTop: 14 }}>
                  {exp.pts.map((p, i) => (
                    <li key={i} style={{ display: "flex", gap: 8, fontSize: 13, color: "#8b949e", marginBottom: 7, lineHeight: 1.6 }}>
                      <span style={{ color: exp.col, flexShrink: 0 }}>▸</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education Timeline */}
          <div style={{ background: "#0d1117", border: "1px solid #21262d", borderRadius: 20, padding: "32px 36px" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#8b949e", marginBottom: 28, letterSpacing: 2, textTransform: "uppercase" }}>Education Timeline</h3>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 7, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, #1d9e75, #1d9e7522)" }} />
              {[
                { school: "Graphic Era Hill University", deg: "B.Tech Computer Science", period: "2024 – 2028", loc: "Dehradun, Uttarakhand", score: "Ongoing", main: true },
                { school: "Rashtriya Military School", deg: "Intermediate (Class XII)", period: "2023 – 2024", loc: "Belgaum, Karnataka", score: "87%" },
                { school: "Rashtriya Military School", deg: "Matriculation (Class X)", period: "2021 – 2022", loc: "Belgaum, Karnataka", score: "95%" },
              ].map((e, i) => (
                <div key={i} style={{ display: "flex", gap: 24, marginBottom: i < 2 ? 28 : 0, position: "relative" }}>
                  <div style={{
                    width: 15, height: 15, borderRadius: "50%",
                    background: e.main ? "#1d9e75" : "#21262d",
                    border: `2px solid ${e.main ? "#5dcaa5" : "#1d9e7566"}`,
                    flexShrink: 0, marginTop: 4, position: "relative", zIndex: 1,
                    boxShadow: e.main ? "0 0 12px #1d9e7555" : "none",
                  }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#e6edf3" }}>{e.school}</div>
                    <div style={{ fontSize: 13, color: "#1d9e75", fontWeight: 600, marginTop: 2 }}>{e.deg}</div>
                    <div style={{ fontSize: 12, color: "#484f58", marginTop: 4 }}>
                      {e.period} &nbsp;·&nbsp; {e.loc} &nbsp;·&nbsp;
                      <span style={{ color: "#ef9f27", fontWeight: 700 }}>{e.score}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ RESUME (NEW) ══════════════ */}
      <ResumeSection pdfPath="/resume.pdf" downloadName="Krishna_Negi_Resume.pdf" />

      {/* ══════════════ CONTACT ══════════════ */}
      <section id="Contact" style={{ background: "#0d1117", padding: "100px 0" }}>
        <div className="section-inner" style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 32, height: 2, background: "#1d9e75", borderRadius: 2 }} />
              <span style={{ fontSize: 12, color: "#1d9e75", fontWeight: 700, letterSpacing: 2 }}>CONTACT</span>
              <div style={{ width: 32, height: 2, background: "#1d9e75", borderRadius: 2 }} />
            </div>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: "#e6edf3", marginBottom: 12, letterSpacing: -1 }}>Let's Build Together</h2>
            <p style={{ fontSize: 15, color: "#8b949e", lineHeight: 1.8 }}>
              I'm actively seeking internships and collaborations. Whether you have a project idea,
              a job opportunity, or just want to say hi — my inbox is always open.
            </p>
          </div>

          <div style={{ background: "#010409", border: "1px solid #21262d", borderRadius: 20, padding: "36px" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>🚀</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#1d9e75" }}>Message Sent!</div>
                <div style={{ fontSize: 14, color: "#8b949e", marginTop: 6 }}>I'll get back to you very soon.</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="contact-name-email" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#484f58", display: "block", marginBottom: 7, letterSpacing: 0.8, textTransform: "uppercase" }}>Name</label>
                    <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your full name" />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#484f58", display: "block", marginBottom: 7, letterSpacing: 0.8, textTransform: "uppercase" }}>Email</label>
                    <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" type="email" />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#484f58", display: "block", marginBottom: 7, letterSpacing: 0.8, textTransform: "uppercase" }}>Message</label>
                  <textarea value={form.msg} onChange={e => setForm(f => ({ ...f, msg: e.target.value }))} rows={5} placeholder="Tell me about the opportunity or project…" style={{ resize: "none" }} />
                </div>
                <button onClick={sendMsg} style={{
                  background: "linear-gradient(135deg, #1d9e75, #0f6e56)",
                  color: "#fff", border: "none", borderRadius: 12,
                  padding: "14px", fontSize: 15, fontWeight: 700,
                  cursor: "pointer", transition: "transform 0.15s, opacity 0.15s",
                  letterSpacing: 0.4,
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >Send Message 🚀</button>
              </div>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            {[
              { icon: "📧", v: "knegi4394@gmail.com", href: "mailto:knegi4394@gmail.com" },
              { icon: "🐙", v: "github.com/krishnanegi-06", href: "https://github.com/krishnanegi-06" },
              { icon: "💼", v: "LinkedIn", href: "https://linkedin.com/in/krishna-negi-378801356" },
            ].map(l => (
              <a key={l.v} href={l.href} target="_blank" rel="noreferrer" style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "#161b22", border: "1px solid #21262d",
                borderRadius: 10, padding: "8px 16px", textDecoration: "none",
                color: "#8b949e", fontSize: 13, fontWeight: 500, transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#1d9e7544"; e.currentTarget.style.color = "#1d9e75"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#21262d"; e.currentTarget.style.color = "#8b949e"; }}
              ><span style={{ fontSize: 16 }}>{l.icon}</span> {l.v}</a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer style={{
        background: "#010409",
        borderTop: "1px solid #21262d",
        padding: "24px 5vw",
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap", gap: 12,
      }}>
        <span style={{ fontSize: 13, color: "#484f58" }}>
          Designed & Built by{" "}
          <span style={{ color: "#1d9e75", fontWeight: 600 }}>Krishna Negi</span>
          {" "}· 2026
        </span>
        <span style={{ fontSize: 13, color: "#484f58" }}>
          Made with React ⚛️
        </span>
      </footer>
    </div>
  );
}
