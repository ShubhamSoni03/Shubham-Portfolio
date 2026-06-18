/* ── Imports ── */
import resumeFile from "../assets/Shubham-Soni-CV.pdf";

/* ── Palette ── */
export const THEMES = {
  dark: {
    bg:      "#050810",
    bg2:     "#0a0e1a",
    bg3:     "#111728",
    bdr:     "rgba(120,170,255,0.10)",
    teal:    "#3ECFB2",
    indigo:  "#7C8FF6",
    rose:    "#F28DAE",
    amber:   "#FBBA72",
    mint:    "#A0F2E2",
    white:   "#EEF4FF",
    muted:   "rgba(175,210,250,0.55)",
    faint:   "rgba(175,210,250,0.08)",
    surface: "rgba(13,17,32,0.85)",
    shadow:  "0 8px 48px rgba(0,0,0,0.65)",
    glass:   "rgba(255,255,255,0.03)",
    glassBorder: "rgba(255,255,255,0.07)",
    glassStrong: "rgba(255,255,255,0.06)",
  },
  light: {
    bg:      "#F4F6FF",
    bg2:     "#EAEDFA",
    bg3:     "#DDE2F5",
    bdr:     "rgba(80,100,210,0.14)",
    teal:    "#0DA88C",
    indigo:  "#4F5FD8",
    rose:    "#CC3A72",
    amber:   "#B87020",
    mint:    "#0A8C74",
    white:   "#111827",
    muted:   "rgba(50,60,120,0.62)",
    faint:   "rgba(50,60,120,0.09)",
    surface: "rgba(240,243,255,0.92)",
    shadow:  "0 8px 40px rgba(80,100,200,0.13)",
    glass:   "rgba(255,255,255,0.55)",
    glassBorder: "rgba(80,100,210,0.12)",
    glassStrong: "rgba(255,255,255,0.7)",
  },
};

/* Default palette (dark) exported as P for backward compat */
export const P = THEMES.dark;

/* ── Typography Scale ── */
export const T = {
  hero: "clamp(60px, 11vw, 118px)",
  h2:   "clamp(36px, 6vw, 64px)",
  h3:   "clamp(22px, 3vw, 32px)",
  body: "17px",
  sub:  "15px",
  tiny: "13px",
};

/* ── CV data ── */
export const CV = {
  name:      "Shubham Soni",
  initials:  "SS.",
  email:     "itsyourshubh2005@gmail.com",
  mobile:    "+91-6283247753",
  location: "Punjab, India",
  linkedin: "https://www.linkedin.com/in/shubham-soni03",
  github:   "https://github.com/ShubhamSoni03",
  resumeUrl: resumeFile, 

  roles: [
    "Full-Stack Developer",
    "MERN Stack Specialist",
    "Software Engineering Student",
    "Problem Solver",
  ],

  bio: "B.Tech CSE student at Lovely Professional University. I specialise in building high-performance web applications using the MERN stack, focusing on clean architecture, real-time systems, and exceptional user experiences.",

  skills: {
    languages:  ["C++", "JavaScript", "PHP", "Java", "SQL"],
    frameworks: ["React", "Node.js", "Express.js", "Socket.io", "Tailwind CSS", "Bootstrap"],
    tools:      ["MongoDB", "MySQL", "XAMPP", "Git", "GitHub", "Vercel", "Figma", "APIs"],
  },

  skillBars: [
    { label: "Frontend  (React / Tailwind)",  pct: 92 },
    { label: "Backend   (Node / Express)",     pct: 85 },
    { label: "DSA & Problem Solving",          pct: 88 },
    { label: "Database  (Mongo / MySQL)",      pct: 80 },
  ],

  /* Project stats for the counter strip */
  projectStats: {
    total: 4,
    live: 2,
    technologies: 12,
  },

  projects: [
    {
      num: "01", icon: "🏗️",
      title: "SCA-IT",
      sub:   "Infrastructure & Networking Platform",
      desc:  "Full-stack MERN dashboard to visualise industrial IT services with real-time performance tracking, live metrics, and Socket.io-powered data flow. Dark-themed responsive UI with dynamic service navigation.",
      tags:  ["React", "Node.js", "Express.js", "MongoDB", "Socket.io", "Vercel"],
      accentKey: "teal",
      live:   "https://scait-it.vercel.app/",
      github: "https://github.com/ShubhamSoni03/Scait-IT",
      date:   "Jan 2026",
      featured: true,
    },
    {
      num: "02", icon: "🔨",
      title: "BidMaster",
      sub:   "Auction & Bidding Web App",
      desc:  "Role-based auction system (User / Admin / Seller) with JWT authentication, 10+ REST API endpoints, real-time bid updates via Socket.io, and structured MongoDB collections.",
      tags:  ["React", "Node.js", "Express.js", "MongoDB", "Socket.io", "JWT"],
      accentKey: "indigo",
      live:   "https://project1-steel-ten.vercel.app/",
      github: "https://github.com/ShubhamSoni03/Bid-Master",
      date:   "Dec 2025",
      featured: true,
    },
    {
      num: "03", icon: "🔬",
      title: "Viz Lab",
      sub:   "Virtual Science Lab Platform",
      desc:  "Web-based simulation platform enabling students to perform realistic virtual science experiments. Built with React frontend, PHP/MySQL backend, and RESTful API integration.",
      tags:  ["React", "PHP", "MySQL", "HTML", "CSS", "JavaScript"],
      accentKey: "rose",
      live:   "https://shubhamsoni03.github.io/Virtual-Science-Lab",
      github: "https://github.com/ShubhamSoni03",
      date:   "Apr 2025",
      featured: false,
    },
    {
      num: "04", icon: "📅",
      title: "Event Ease",
      sub:   "Event Management Dashboard",
      desc:  "Comprehensive event planning tool with real-time scheduling, dynamic admin controls, and a clean UI designed for seamless event co-ordination.",
      tags:  ["React", "Express", "MySQL", "Tailwind CSS"],
      accentKey: "amber",
      live:   "https://shubhamsoni03.github.io/Event-ease",
      github: "https://github.com/ShubhamSoni03",
      date:   "2024",
      featured: false,
    },
  ],

  certificates: [
    { title: "Full-Stack Web Development",  org: "Dev Town",      date: "2024"     },
    { title: "C++ with OOPs & DSA",         org: "CSE PathShala",  date: "Aug 2025" },
    { title: "Cloud Computing",             org: "NPTEL / Swayam", date: "Apr 2025" },
    { title: "Security in Social Media",    org: "NPTEL",          date: "2025"     },
    { title: "Responsive Web Design V8",    org: "freeCodeCamp",   date: "Oct 2023" },
  ],

  achievements: [
    { icon: "🏆", title: "Top 10 — LPU Web Hackathon", sub: "Recognised for UI/UX Excellence",      accentKey: "amber"  },
    { icon: "⚡", title: "TCS Code-Vita Qualifier",      sub: "Top-tier competitive programming",      accentKey: "teal"   },
    { icon: "📜", title: "MERN Stack Certified",       sub: "Professional Certification — Dev Town", accentKey: "indigo" },
  ],

  education: [
    {
      degree:   "B.Tech — Computer Science & Engineering",
      school:   "Lovely Professional University",
      location: "Punjab, India",
      grade:    "6.62",
      period:   "Aug 2023 – Present",
      icon:     "🎓",
    },
    {
      degree:   "Intermediate (Class XII)",
      school:   "O.P. Jindal School",
      location: "Chhattisgarh, India",
      grade:    "72%",
      period:   "2022 – 2023",
      icon:     "📚",
    },
    {
      degree:   "Matriculation (Class X)",
      school:   "O.P. Jindal School",
      location: "Chhattisgarh, India",
      grade:    "84%",
      period:   "2020 – 2021",
      icon:     "✏️",
    },
  ],

  stats: [
    { n: 4,   s: "+", l: "Projects" },
    { n: 15,  s: "+", l: "Skills"   },
    { n: 6.62,s: "",  l: "CGPA"     },
    { n: 500, s: "+", l: "LeetCode" },
  ],
};

export const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};