// ═══════════════════════════════════════════
//  Portfolio Data — All content constants
// ═══════════════════════════════════════════

export const ROLES = [
  "Full Stack Developer",
  "Problem Solver",
  "CS Student @ GEHU",
  "React Developer",
];

export const NAV = ["Home", "About", "Projects", "Skills", "Experience", "Contact"];

export const PROJECTS = [
  {
    title: "Agrofy",
    sub: "Blockchain Agriculture Supply Chain",
    stack: ["React.js", "Node.js", "MongoDB", "Solidity", "IPFS"],
    year: "2026",
    emoji: "🌾",
    grad: ["#0f6e56", "#1d9e75"],
    desc: "Full-stack agriculture supply chain platform using blockchain for end-to-end transparency & traceability.",
    github: "https://github.com/krishnanegi-06",
    live: "#",
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
    live: "#",
    points: [
      "Spring Boot backend with weather & irrigation intelligence",
      "Image processing module for real-time crop diagnosis",
      "Automated decision-making recommendations",
      "Responsive dashboard with live analysis results",
    ],
  },
];

export const SKILLS_DATA = [
  {
    cat: "Languages",
    iconName: "code",
    items: ["C", "C++", "Python", "Java", "JavaScript", "HTML", "CSS"],
    proficiency: 85,
    col: "#7f77dd",
  },
  {
    cat: "Frontend",
    iconName: "layout",
    items: ["React.js", "DOM Manipulation", "Responsive Design"],
    proficiency: 80,
    col: "#378add",
  },
  {
    cat: "Backend",
    iconName: "server",
    items: ["Node.js", "Spring Boot", "MongoDB"],
    proficiency: 75,
    col: "#1d9e75",
  },
  {
    cat: "Blockchain",
    iconName: "link",
    items: ["Solidity", "IPFS", "Smart Contracts"],
    proficiency: 70,
    col: "#ef9f27",
  },
  {
    cat: "Tools",
    iconName: "tool",
    items: ["Git", "GitHub", "VS Code"],
    proficiency: 85,
    col: "#888780",
  },
  {
    cat: "Core CS",
    iconName: "cpu",
    items: ["DSA", "OOP", "Problem Solving", "Algorithms"],
    proficiency: 80,
    col: "#d4537e",
  },
];

export const EXPERIENCE = [
  {
    role: "Frontend Web Developer",
    org: "Self-Driven Projects",
    period: "2024 – Present",
    col: "#378add",
    icon: "🖥",
    pts: [
      "Built multiple projects with HTML, CSS, JavaScript",
      "DOM manipulation & API integration with Fetch",
      "Debugged CORS issues, API failures, and UI bugs",
    ],
  },
  {
    role: "DSA Practitioner",
    org: "LeetCode / GeeksforGeeks",
    period: "2025 – Present",
    col: "#ef9f27",
    icon: "🧩",
    pts: [
      "Active problem-solving on LeetCode & GFG",
      "Focus: arrays, strings, recursion, DP",
      "Building foundations for SDE-level interviews",
    ],
  },
];

export const EDUCATION = [
  {
    school: "Graphic Era Hill University",
    deg: "B.Tech Computer Science",
    period: "2024 – 2028",
    loc: "Dehradun, Uttarakhand",
    score: "Ongoing",
    main: true,
  },
  {
    school: "Rashtriya Military School",
    deg: "Intermediate (Class XII)",
    period: "2023 – 2024",
    loc: "Belgaum, Karnataka",
    score: "87%",
  },
  {
    school: "Rashtriya Military School",
    deg: "Matriculation (Class X)",
    period: "2021 – 2022",
    loc: "Belgaum, Karnataka",
    score: "95%",
  },
];

export const SOCIAL_LINKS = [
  { icon: "📧", label: "knegi4394@gmail.com", href: "mailto:knegi4394@gmail.com" },
  { icon: "🐙", label: "github.com/krishnanegi-06", href: "https://github.com/krishnanegi-06" },
  { icon: "💼", label: "LinkedIn", href: "https://www.linkedin.com/in/krishna-negi-378801356/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BywpN8eHUSQCGvvgtSyVPLw%3D%3D" },
];

export const ABOUT_INFO = [
  { icon: "🎓", label: "University", value: "Graphic Era Hill University" },
  { icon: "📅", label: "Batch", value: "B.Tech CS · 2024–2028" },
  { icon: "📍", label: "Location", value: "Dehradun, Uttarakhand" },
  { icon: "💼", label: "Open to", value: "Internships & Freelance" },
  { icon: "📧", label: "Email", value: "knegi4394@gmail.com" },
  { icon: "📞", label: "Phone", value: "+91 98978 35437" },
];
