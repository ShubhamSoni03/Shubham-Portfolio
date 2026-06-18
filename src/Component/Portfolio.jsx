import { useState, useEffect, memo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Zap,
  Globe,
  GitBranch,
  Layers,
  Sparkles,
  ArrowUpRight,
  Terminal,
  Award
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// STARFIELD GENERATOR (Calmed & Slowed down for tranquility)
// ─────────────────────────────────────────────────────────────
const generateStars = () => {
  return Array.from({ length: 65 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.8 + 0.4,
    opacity: Math.random() * 0.6 + 0.2,
    duration: Math.random() * 4 + 4,
    delay: Math.random() * 3,
  }));
};

// ─────────────────────────────────────────────────────────────
// TECH SKILL BUBBLES (Orbital Nodes with Enhanced Glassmorphism)
// ─────────────────────────────────────────────────────────────
const TechBubble = memo(({ tech, index, totalTechs }) => {
  const angle = (index / totalTechs) * 360;
  const bobDuration = 4 + Math.random() * 2;
  const bobDelay = Math.random() * 1.5;

  const radius = typeof window !== "undefined" && window.innerWidth < 640 ? 115 : 170; 
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;

  return (
    <motion.div
      className="absolute flex flex-col items-center justify-center z-20"
      style={{
        left: "50%",
        top: "50%",
        x: `calc(-50% + ${x}px)`, 
        y: `calc(-50% + ${y}px)`,
      }}
      animate={{
        translateY: [0, -8, 0],
      }}
      transition={{
        duration: bobDuration,
        delay: bobDelay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.div
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl backdrop-blur-xl bg-slate-950/40 border border-slate-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.4)] flex items-center justify-center cursor-pointer transition-all duration-300"
        style={{
          boxShadow: `inset 0 1px 1px rgba(255,255,255,0.1)`,
        }}
        whileHover={{ 
          scale: 1.15, 
          borderColor: tech.glowColor,
          boxShadow: `0 0 25px ${tech.glowColor}40, inset 0 1px 1px rgba(255,255,255,0.2)` 
        }}
        animate={{
          rotate: -360, 
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {tech.icon}
      </motion.div>

      <div className="mt-2.5 pointer-events-none">
        <p className="text-[9px] sm:text-[10px] font-bold text-white/40 tracking-[0.15em] uppercase font-mono">
          {tech.name}
        </p>
      </div>
    </motion.div>
  );
});

TechBubble.displayName = "TechBubble";

// ─────────────────────────────────────────────────────────────
// DYNAMIC TEXT CAROUSEL (Rotating Focus Roles)
// ─────────────────────────────────────────────────────────────
const RoleCarousel = () => {
  const roles = ["MERN Stack Developer", "Vibe Coding Practitioner", "UI/UX Innovator"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-8 overflow-hidden relative w-full flex items-center justify-start">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="absolute text-xl sm:text-2xl font-bold tracking-tight bg-linear-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent font-sans"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// MAIN PORTFOLIO HERO COMPONENT
// ─────────────────────────────────────────────────────────────
const Portfolio = memo(({ P, theme }) => {
  const [stars, setStars] = useState([]);
  const [animationKey, setAnimationKey] = useState(0);
  const sectionRef = useRef(null);

  // 🌟 FEATURE 1: Mouse tracking states for interactive parallax gravity fields
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setStars(generateStars());

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      // Calculate normalized position between -0.5 and 0.5
      setMousePos({
        x: (clientX / innerWidth) - 0.5,
        y: (clientY / innerHeight) - 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey((prev) => prev + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const techStack = [
    { name: "React", icon: <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />, glowColor: "#22d3ee" },
    { name: "Node.js", icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />, glowColor: "#facc15" },
    { name: "Express", icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300" />, glowColor: "#cbd5e1" },
    { name: "MongoDB", icon: <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />, glowColor: "#34d399" },
    { name: "Tailwind", icon: <GitBranch className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />, glowColor: "#60a5fa" },
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // 🌟 FIX: Absolute transparent cascading variant trees mapped cleanly to parent boundaries
  const headingContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)", 
      transition: { type: "spring", stiffness: 140, damping: 12 } 
    }
  };

  return (
   <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-6 py-24 ..."
      style={{
        // Dynamic switch: use theme gradient when dark, use simple fallback canvas block when light
        background: theme === "dark" 
          ? "radial-gradient(circle at 50% 50%, #0a071e 0%, #03010c 100%)" 
          : P.bg, 
        transition: "background 0.45s ease"
      }}
    >
      {/* STARFIELD INTERACTIVE PARALLAX LAYER */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        style={{
          x: mousePos.x * 25, // Subtle structural layer tracking shifts
          y: mousePos.y * 25,
        }}
      >
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
            }}
            animate={{
              opacity: [star.opacity, star.opacity * 0.2, star.opacity],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* AMBIENT GLOW ORBS */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] bg-cyan-500/5 pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] bg-purple-500/5 pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }} />

      {/* MAIN CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center min-h-[75vh]">
          
          {/* LEFT COLUMN: Text Content Layout */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            
            {/* Context Active Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-xl border border-white/5 bg-slate-950/40 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '3s' }} />
                <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-white/60 font-mono">
                  Open to Internships & Full-Time
                </span>
              </div>
            </motion.div>

            {/* Unified Typewriter Heading Fix */}
            <div className="w-full space-y-1">
              <span className="text-cyan-400/50 font-mono text-xs tracking-widest block">
                &gt; SYSTEM_READY // IDENTITY_CONNECTED
              </span>
              
              <AnimatePresence mode="wait">
                <motion.h1
                  key={animationKey}
                  variants={headingContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-[1.1] text-white select-none"
                  style={{ fontFamily: "'Syne', system-ui, sans-serif" }}
                >
                  {"HEY, I AM ".split("").map((char, index) => (
                    <motion.span key={`greet-${index}`} variants={letterVariants} className="inline-block whitespace-pre">
                      {char}
                    </motion.span>
                  ))}
                  
                  <br className="hidden sm:block" />
                  
                  {/* 🌟 FIX: Stripped container gradient bounds and pushed pure colors directly inside text array blocks */}
                  {"SHUBHAM".split("").map((char, index) => (
                    <motion.span 
                      key={`name-${index}`} 
                      variants={letterVariants} 
                      className="inline-block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent"
                    >
                      {char}
                    </motion.span>
                  ))}

                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block text-cyan-400 ml-1.5 font-light"
                  >
                    _
                  </motion.span>
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* 🌟 CHANGE: Added mt-8 for a dynamic vertical layout gap */}
            <div className="mt-8 space-y-4 w-full border-l-2 border-slate-800 pl-4 sm:pl-6">
              <RoleCarousel />
              <p className="text-sm sm:text-base text-slate-400 font-medium leading-relaxed max-w-xl">
                📍 Raigarh, Chhattisgarh <br />
                • Classy aesthetics backed by strict technical logic. <br />
                • Developing high-end digital solutions utilizing the MERN framework.
              </p>
            </div>

            {/* Enhanced Action Buttons Stack */}
            <motion.div
              className="flex flex-wrap sm:flex-row gap-4 w-full justify-start mt-8 pt-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <button
                onClick={() => scrollToSection("projects")}
                className="group relative px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-300 transform active:scale-95 cursor-pointer flex items-center gap-2 overflow-hidden bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-md border border-cyan-500/30 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:from-cyan-500/20 hover:to-purple-500/20 hover:border-cyan-400/60 hover:text-white"
              >
                View Projects 
                <ArrowUpRight className="w-4 h-4 text-cyan-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              </button>
              
              <button
                onClick={() => scrollToSection("contact")}
                className="px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs border border-white/10 backdrop-blur-sm text-slate-300 font-mono transition-all duration-300 transform active:scale-95 hover:bg-white/5 hover:border-white/20 hover:text-white cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
              >
                get_in_touch()
              </button>
            </motion.div>

          </div>
          {/* RIGHT COLUMN: Orbital Micro-Universe */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <motion.div
              className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] grid place-items-center"
              style={{
                x: mousePos.x * -15, // Inverse tilt execution for balanced tracking depth
                y: mousePos.y * -15,
              }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
              transition={{
                opacity: { duration: 0.8 },
                scale: { duration: 0.8 },
                y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              {/* Outer Orbit Ring */}
              <div className="absolute w-[290px] h-[290px] sm:w-[340px] sm:h-[340px] rounded-full border border-white/[0.03] z-0 pointer-events-none" />

              {/* Planetary Rotation Container */}
              <motion.div
                className="absolute inset-0 z-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                {techStack.map((tech, index) => (
                  <TechBubble
                    key={tech.name}
                    tech={tech}
                    index={index}
                    totalTechs={techStack.length}
                  />
                ))}
              </motion.div>

              {/* Central Premium Glassmorphic Core Node */}
              <div 
                className="absolute z-10 w-48 h-48 sm:w-56 sm:h-56 rounded-full backdrop-blur-2xl bg-slate-950/40 border border-white/10 flex flex-col items-center justify-center p-6 text-center"
                style={{
                  boxShadow: "0 20px 50px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.1)",
                }}
              >
                <div className="absolute inset-0 opacity-25 blur-2xl rounded-full bg-gradient-to-tr from-cyan-500 via-purple-500 to-pink-500 pointer-events-none animate-pulse" />
                
                <div className="relative z-10 space-y-2">
                  <span className="text-[9px] font-bold tracking-[0.3em] text-cyan-400 uppercase font-mono block">
                    DEVELOPMENT_CORE
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight">
                    Full Stack
                  </h4>
                  <p className="text-[11px] text-white/50 leading-relaxed font-medium font-mono">
                    Designing responsive systems integrated with Node.js backends.
                  </p>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
});

Portfolio.displayName = "Portfolio";

export default Portfolio;