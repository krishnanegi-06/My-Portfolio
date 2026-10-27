// ═══════════════════════════════════════════════════════════════════════════════
// Portfolio Data — Krishna Negi
// Source of Truth: Resume & Verified GitHub (@krishnanegi-06)
// ═══════════════════════════════════════════════════════════════════════════════

export const PERSONAL_INFO = {
  name: "Krishna Negi",
  title: "Computer Science Undergraduate & Software Engineer",
  tagline: "Building thoughtful software, one problem at a time.",
  subTagline: "Computer Science undergraduate interested in reliable applications, clean architecture, and systems programming.",
  bio: "I'm a Computer Science undergraduate at Graphic Era Hill University, interested in building reliable, maintainable software. I enjoy working across React and TypeScript applications, backend integrations, object-oriented design, and C++ concurrency projects.",
  location: "Dehradun, Uttarakhand, India",
  email: "knegi4394@gmail.com",
  phone: "+91 98978 35437",
  status: "Available for Software Engineering Internships",
  github: "https://github.com/krishnanegi-06",
  linkedin: "https://www.linkedin.com/in/krishna-negi-378801356/",
  resumePdf: "/resume.pdf",
};

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export const PROJECTS = [
  {
    id: "1fi-marketplace",
    title: "1Fi Marketplace",
    category: "Fintech & Web Engineering",
    role: "Frontend Engineer (SDE Intern Assignment)",
    period: "2026",
    status: "Completed",
    featured: true,
    tagline: "Modular fintech marketplace with live search, dynamic variant selection, and multi-step EMI plan workflows.",
    overview:
      "Engineered an interactive 1Fi Marketplace section within the Shop experience as an SDE Intern take-home assignment. Designed for high performance, typed safety, and clean separation between UI components and asynchronous service logic.",
    repoUrl: "https://github.com/krishnanegi-06/1fi-sde-intern-assignment",
    liveUrl: null, // Prioritize source code over unverified external links
    tags: ["React", "TypeScript", "Vite", "React Router", "Tailwind CSS"],
    highlights: [
      "Engineered product listings with instantaneous client-side search across product names and categories.",
      "Built interactive product variant selection with live specification and pricing recalculations.",
      "Designed a multi-step EMI plan workflow detailing monthly installment schedules, interest breakdowns, and checkout flow.",
      "Separated presentation components from custom business hooks (useProducts, useProductDetails) and mock service-layer adapters.",
      "Handled asynchronous API loading, error boundaries, retry triggers, and clean empty states with strong TypeScript interfaces.",
    ],
    architecture: {
      pattern: "Custom Hook + Service Layer Separation",
      keyComponents: ["MarketplaceShop", "ProductCard", "VariantSelector", "EmiPlanModal", "useProducts"],
      stateManagement: "Custom React hooks with typed asynchronous state machines (idle, loading, success, error)",
    },
  },
  {
    id: "distributed-lock-manager",
    title: "Distributed Lock Manager",
    category: "Systems & Concurrency",
    role: "Systems Programmer",
    period: "2026",
    status: "In Progress",
    featured: true,
    tagline: "C++ concurrency control library supporting Strict 2-Phase Locking (SS2PL) and multi-node coordination.",
    overview:
      "Developing a high-performance Distributed Lock Manager (DLM) in modern C++17 to explore row-level concurrency control, transaction synchronization, and resource arbitration across database clusters. Structured as a modular CMake library with comprehensive test verification.",
    repoUrl: "https://github.com/krishnanegi-06/distributed-lock-manager",
    liveUrl: null,
    tags: ["C++17", "CMake", "Concurrency", "Mutexes", "Condition Variables", "SS2PL"],
    highlights: [
      "Implemented thread-safe lock acquisition and release using std::mutex and std::condition_variable.",
      "Engineered Strict Two-Phase Locking (SS2PL) compatibility matrix supporting concurrent SHARED (read) and EXCLUSIVE (write) locks with FIFO queues.",
      "Structured codebase into modular CMake static and shared libraries (dlm_core) with clean interface separation.",
      "Validated thread safety and absence of race conditions with 17 unit and integration test suites.",
      "Planned extensions in active development: TCP network layer, Two-Phase Commit (2PC) consensus, and Wait-For Graph (WFG) cycle detection for distributed deadlocks.",
    ],
    architecture: {
      pattern: "Modular C++ Engine with Synchronization Primitives",
      keyComponents: ["LockManager", "LockRequest", "ResourceLockTable", "Logger", "TestRunner"],
      stateManagement: "Internal thread-safe hash tables protected by RAII unique_lock and condition variable notification",
    },
  },
  {
    id: "agrofy",
    title: "Agrofy",
    category: "Full-Stack Web Application",
    role: "Full-Stack Developer",
    period: "2026",
    status: "Completed",
    featured: true,
    tagline: "Agricultural analysis and decision-support platform backed by Java Spring Boot REST APIs.",
    overview:
      "A web application connecting farmers and agricultural analysts with data-driven crop analysis, soil suitability insights, and cultivation recommendations. Built with a responsive frontend interfacing with a Java Spring Boot backend.",
    repoUrl: "https://github.com/krishnanegi-06/Agrofy_frontend1",
    backendRepoUrl: "https://github.com/krishnanegi-06/Agrofy_backend",
    liveUrl: "https://agrofy-frontend1.vercel.app",
    tags: ["Java", "Spring Boot", "JavaScript", "REST APIs", "HTML5", "CSS3"],
    highlights: [
      "Engineered frontend client with intuitive multi-step forms for submitting complex crop parameters and soil metrics.",
      "Integrated asynchronous RESTful API calls to a Spring Boot service for analytical computation and recommendations.",
      "Implemented robust multipart form submission, loading state spinners, and contextual error handling.",
      "Built backend health check diagnostics to monitor API availability and prevent silent network failures.",
      "Organized structured crop-related configuration data to present actionable recommendations and irrigation schedules.",
    ],
    architecture: {
      pattern: "Client-Server REST Architecture",
      keyComponents: ["CropAnalysisForm", "RecommendationCard", "ApiStatusMonitor", "Spring Boot Controllers"],
      stateManagement: "Asynchronous client fetch handlers with defensive error status fallbacks",
    },
  },
  {
    id: "movie-ticket-booking-system",
    title: "Movie Ticket Booking System",
    category: "Object-Oriented Design & C++",
    role: "Software Designer",
    period: "2026",
    status: "Completed",
    featured: true,
    tagline: "Cinema reservation engine organized across 13 decoupled classes demonstrating SOLID principles.",
    overview:
      "A comprehensive C++ console reservation platform modeling real-world cinema operations, show scheduling, dynamic seat matrices, multi-channel payment processing, and verifiable ticket printing.",
    repoUrl: "https://github.com/krishnanegi-06/movie-ticket-booking-system",
    liveUrl: null,
    tags: ["C++", "OOP", "SOLID Principles", "Polymorphism", "UML Design"],
    highlights: [
      "Modeled cinema domain requirements using UML and organized implementation cleanly across 13 decoupled classes.",
      "Applied SOLID principles with strict Single Responsibility and Open/Closed polymorphism for payment channels (Payment base with Cash, UPI, and Card implementations).",
      "Built dynamic seat matrix management with real-time status tracking (Available, Reserved, Booked).",
      "Implemented tiered pricing calculation based on seat category, showtime, and booking fees.",
      "Engineered formatted ticket generation with unique booking reference IDs and cancellation workflows.",
    ],
    architecture: {
      pattern: "13-Class Decoupled OOP Architecture",
      keyComponents: ["BookingService", "Cinema", "Screen", "Show", "Movie", "Seat", "PaymentTypes", "TicketPrinter"],
      stateManagement: "Object composition and aggregation maintaining seat matrix and booking states in memory",
    },
  },
  {
    id: "travel-app",
    title: "Travel Booking Platform",
    category: "Full-Stack Web Application",
    role: "Full-Stack Developer",
    period: "2026",
    status: "Completed",
    featured: false,
    tagline: "Full-stack travel booking application featuring destination search and tour reservations.",
    overview:
      "A full-stack travel booking application built with React on the client and Node.js/Express on the server with MongoDB persistence, enabling users to explore tour destinations and manage bookings.",
    repoUrl: "https://github.com/krishnanegi-06/travel_frontend",
    backendRepoUrl: "https://github.com/krishnanegi-06/travel_backend",
    liveUrl: "https://travel-frontend-nine-ecru.vercel.app",
    tags: ["React", "JavaScript", "Node.js", "Express", "MongoDB", "REST APIs"],
    highlights: [
      "Built responsive client interface for browsing tour packages with destination filtering.",
      "Engineered backend REST endpoints for user authentication, tour retrieval, and booking records.",
      "Implemented database persistence using MongoDB and Mongoose schemas.",
      "Deployed frontend to Vercel with continuous deployment from GitHub.",
    ],
    architecture: {
      pattern: "MERN Stack Architecture",
      keyComponents: ["TourCatalog", "BookingForm", "AuthHandler", "Express Routes"],
      stateManagement: "React state with REST API data fetching",
    },
  },
];

export const SKILL_CATEGORIES = [
  {
    name: "Languages",
    description: "Core programming languages used for systems, applications, and scripting.",
    skills: ["C++", "Java", "Python", "JavaScript", "TypeScript", "C"],
  },
  {
    name: "Frontend Development",
    description: "Building responsive, accessible, and typed user interfaces.",
    skills: [
      "React.js",
      "React Router",
      "Vite",
      "Responsive Design",
      "Reusable Component Architecture",
      "HTML5",
      "CSS3",
    ],
  },
  {
    name: "Backend & APIs",
    description: "Server-side services, RESTful API design, and client-server integration.",
    skills: [
      "Node.js",
      "Java (Spring Boot)",
      "RESTful API Design & Integration",
      "Asynchronous Request Handling",
    ],
  },
  {
    name: "Databases",
    description: "Data modeling, schema design, and persistence.",
    skills: ["MongoDB", "Mongoose"],
  },
  {
    name: "Core Computer Science",
    description: "Algorithmic thinking, foundational system theory, and architectural design.",
    skills: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (OOP)",
      "SOLID Principles",
      "Concurrency Control",
      "System Design",
      "UML Modeling",
    ],
  },
  {
    name: "Tools & Practices",
    description: "Version control, build automation, debugging, and engineering workflows.",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "CMake",
      "Debugging",
      "Cross-Browser Compatibility",
    ],
  },
];

export const EDUCATION = [
  {
    institution: "Graphic Era Hill University",
    degree: "B.Tech in Computer Science",
    location: "Dehradun, Uttarakhand",
    period: "August 2024 – July 2028",
    score: "CGPA: 8.25 / 10",
    status: "Current Undergraduate",
    highlight: true,
    coursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "System Design",
      "Web Development",
      "Operating Systems",
      "Database Management Systems",
    ],
  },
  {
    institution: "Rashtriya Military School",
    degree: "Senior Secondary (Class XII)",
    location: "Belgaum, Karnataka",
    period: "2023 – 2024",
    score: "87%",
    status: "Completed",
    highlight: false,
    coursework: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
  },
  {
    institution: "Rashtriya Military School",
    degree: "Secondary School (Class X)",
    location: "Belgaum, Karnataka",
    period: "2021 – 2022",
    score: "95%",
    status: "Completed",
    highlight: false,
    coursework: ["Science", "Mathematics", "Social Sciences", "English"],
  },
];

export const ACHIEVEMENTS = [
  {
    title: "250+ Problems Solved",
    platform: "LeetCode & GeeksforGeeks",
    description:
      "Consistent problem-solving across data structures and algorithms, focusing on arrays, two-pointers, trees, graphs, and dynamic programming.",
    badge: "Algorithms & DSA",
  },
  {
    title: "Hackathon Finalist",
    platform: "Inter-College Innovation Challenge",
    description:
      "Collaborated in a time-constrained engineering sprint to design, build, and present a functional prototype under intense competition.",
    badge: "Teamwork & Prototyping",
  },
];

export const CODE_SNIPPETS = {
  cpp: {
    filename: "LockManager.cpp",
    language: "cpp",
    code: `// Strict 2-Phase Locking (SS2PL) - Thread-Safe Acquisition
bool LockManager::acquireLock(TxnId txn_id, const std::string& res_id, LockMode mode) {
    std::unique_lock<std::mutex> lock(m_mutex);
    
    ResourceLock& res = m_table[res_id];
    
    // Check compatibility against active lock holders
    while (!isCompatible(res, mode, txn_id)) {
        res.wait_queue.push_back({txn_id, mode});
        m_cv.wait(lock, [&]() { 
            return isCompatible(res, mode, txn_id); 
        });
    }
    
    res.owners.insert(txn_id);
    res.current_mode = mode;
    return true; // Lock acquired safely without race conditions
}`,
  },
  typescript: {
    filename: "useProductDetails.ts",
    language: "typescript",
    code: `// Typed Custom Hook with Asynchronous State Machine
export function useProductDetails(productId: string) {
  const [state, setState] = useState<AsyncState<ProductDetail>>({ status: 'loading' });

  const fetchDetails = useCallback(async () => {
    setState({ status: 'loading' });
    try {
      const data = await productService.getById(productId);
      setState({ status: 'success', data });
    } catch (err) {
      setState({ status: 'error', error: (err as Error).message });
    }
  }, [productId]);

  useEffect(() => { fetchDetails(); }, [fetchDetails]);

  return { ...state, retry: fetchDetails };
}`,
  },
  oop: {
    filename: "PaymentGateway.cpp",
    language: "cpp",
    code: `// SOLID: Open/Closed Principle via Polymorphic Payment Hierarchy
class Payment {
public:
    virtual ~Payment() = default;
    virtual bool processPayment(double amount) = 0;
    virtual std::string getMethodName() const = 0;
};

class UPIPayment : public Payment {
    std::string vpaId;
public:
    explicit UPIPayment(std::string vpa) : vpaId(std::move(vpa)) {}
    bool processPayment(double amount) override {
        // Authenticate virtual payment address & record transaction
        return verifyUPI(vpaId, amount);
    }
    std::string getMethodName() const override { return "UPI (" + vpaId + ")"; }
};`,
  },
};
