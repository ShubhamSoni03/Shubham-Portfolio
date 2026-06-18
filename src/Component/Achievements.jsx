import { memo } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./shared";

// PURE TAILWIND + FRAMER MOTION: GlassCard
const GlassCard = ({ children, className = "", delay = 0 }) => (
  <Reveal delay={delay} className={`min-w-0 w-full h-full ${className}`}>
    <motion.div
      className="h-full rounded-2xl p-6 md:p-8 relative overflow-hidden border backdrop-blur-md transition-all duration-300"
      style={{
        backgroundColor: "var(--theme-glass, rgba(10, 15, 30, 0.45))",
        borderColor:     "var(--theme-glass-border, rgba(255, 255, 255, 0.08))",
        boxShadow:       "0 8px 32px rgba(0,0,0,0.25)",
      }}
      whileHover={{
        y:           -4,
        borderColor: "var(--theme-teal, #2dd4bf)",
        boxShadow:   "0 20px 48px rgba(0,0,0,0.35)",
      }}
    >
      {children}
    </motion.div>
  </Reveal>
);

const AchievementsSection = memo(() => {
  const leftCertificates = [
    { title: "Mastering in C: Basic to Beyond", org: "Self-Paced Learning", link: "https://drive.google.com/file/d/1s9dE3QBQF8TAhQVnsI1T2rw44sdAj0Or/view?usp=drivesdk", date: "Aug 2025", accentVar: "var(--theme-rose, #f43f5e)", glowBg: "rgba(244, 63, 94, 0.04)" },
    { title: "Privacy and Security in Online Media", org: "NPTEL", link: "https://drive.google.com/file/d/1o1k_jWz1hrWO4amHuZhCUAcac4knyc_U/view?usp=drivesdk", date: "Apr 2025", accentVar: "var(--theme-indigo, #6366f1)", glowBg: "rgba(99, 102, 241, 0.04)" },
    { title: "C++ Programming: OOPs And DSA", org: "CSE Pathshala", link: "https://drive.google.com/uc?id=1JYFWS99mHaTFZsMixbkco1wSG-8j7Uvj", date: "Jan 2023", accentVar: "var(--theme-teal, #2dd4bf)", glowBg: "rgba(45, 212, 191, 0.04)" }
  ];

  const rightCertificates = [
    { title: "AI Essentials", org: "Google / Certification", link: "https://drive.google.com/file/d/1Dynamic_Link/view", date: "2025", accentVar: "var(--theme-teal, #2dd4bf)", glowBg: "rgba(45, 212, 191, 0.04)" },
    { title: "Build AI", org: "Technical Certification", link: "https://drive.google.com/file/d/1Build_AI_Link/view", date: "2025", accentVar: "var(--theme-amber, #f59e0b)", glowBg: "rgba(245, 158, 11, 0.04)" },
    { title: "Master AI", org: "Advanced AI Specialization", link: "https://drive.google.com/file/d/1Master_AI_Link/view", date: "2025", accentVar: "var(--theme-rose, #f43f5e)", glowBg: "rgba(244, 63, 94, 0.04)" }
  ];

  const tools = ["XAMPP", "APIs", "Vercel", "Git/GitHub", "Socket.io", "MongoDB Atlas"];

  return (
    <section
      id="certificates"
      className="relative overflow-hidden w-full flex flex-col items-center"
      style={{ backgroundColor: "var(--theme-bg2, rgba(15, 23, 42, 0.4))" }}
    >
      {/* Ambient orbs */}
      <div
        className="absolute w-72 h-72 lg:w-[420px] lg:h-[420px] rounded-full top-[6%] -right-24 filter blur-[100px] pointer-events-none select-none"
        style={{ backgroundColor: "var(--theme-indigo, #6366f1)", opacity: 0.06 }}
      />
      <div
        className="absolute w-60 h-60 lg:w-[340px] lg:h-[340px] rounded-full bottom-[6%] -left-20 filter blur-[100px] pointer-events-none select-none"
        style={{ backgroundColor: "var(--theme-teal, #2dd4bf)", opacity: 0.06 }}
      />

      {/* Synchronized structural container using tailwind patterns from AboutSection */}
      <div className="section-shell">
        
        {/* Section Header with updated typography */}
        <Reveal>
          <div>
            <p
              className="text-xs font-bold tracking-[4px] uppercase mb-3"
              style={{ color: "var(--theme-rose, #f43f5e)" }}
            >
              // Recognition
            </p>
            <h2
              className="font-sans font-black tracking-tighter leading-none text-white break-words"
              style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.25rem)" }}
            >
              Verified{" "}
              <span className="bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">
                Certificates.
              </span>
            </h2>
          </div>
        </Reveal>

        {/* Certificate Grid — Unified grid system */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12 w-full items-stretch min-w-0">
          
          {/* Left Column — Now wrapped in Tailwind grid units */}
          <div className="flex flex-col gap-4 min-w-0">
            {leftCertificates.map((c, i) => (
              <Reveal key={i} delay={i * 0.1} className="min-w-0 w-full">
                <a href={c.link} target="_blank" rel="noopener noreferrer" className="block group min-w-0">
                  <motion.div
                    className="p-5 md:p-6 rounded-2xl border transition-all duration-300 bg-transparent min-w-0"
                    style={{ borderColor: "var(--theme-bdr, rgba(255, 255, 255, 0.08))" }}
                    whileHover={{ x: 6, borderColor: c.accentVar, backgroundColor: c.glowBg, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)" }}
                    transition={{ duration: 0.3, ease: "easeOut"}}
                  >
                    <div className="flex justify-between items-start gap-4 min-w-0">
                      <div className="min-w-0">
                        <p className="text-sm md:text-base font-bold mb-1 text-white break-words">{c.title}</p>
                        <p className="text-[10px] font-black uppercase tracking-wider truncate" style={{ color: c.accentVar }}>{c.org}</p>
                      </div>
                      <span className="text-[10px] font-bold flex-shrink-0" style={{ color: "var(--theme-muted, #9ca3af)" }}>{c.date}</span>
                    </div>
                  </motion.div>
                </a>
              </Reveal>
            ))}
          </div>

          {/* Right Column — Unified tailwind gap/layout */}
          <div className="flex flex-col gap-4 min-w-0">
            {rightCertificates.map((c, i) => (
              <Reveal key={i} delay={0.2 + i * 0.1} className="min-w-0 w-full">
                <a href={c.link} target="_blank" rel="noopener noreferrer" className="block group min-w-0">
                  <motion.div
                    className="p-5 md:p-6 rounded-2xl border transition-all duration-300 bg-transparent min-w-0"
                    style={{ borderColor: "var(--theme-bdr, rgba(255, 255, 255, 0.08))" }}
                    whileHover={{ x: -6, borderColor: c.accentVar, backgroundColor: c.glowBg, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)" }}
                    transition={{ duration: 0.3, ease: "easeOut"}}
                  >
                    <div className="flex justify-between items-start gap-4 min-w-0">
                      <div className="min-w-0">
                        <p className="text-sm md:text-base font-bold mb-1 text-white break-words">{c.title}</p>
                        <p className="text-[10px] font-black uppercase tracking-wider truncate" style={{ color: c.accentVar }}>{c.org}</p>
                      </div>
                      <span className="text-[10px] font-bold flex-shrink-0" style={{ color: "var(--theme-muted, #9ca3af)" }}>{c.date}</span>
                    </div>
                  </motion.div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Technical Tools footer updated with GlassCard styles */}
        <Reveal delay={0.4}>
          <div className="mt-6">
             <GlassCard className="text-center backdrop-blur-md">
                <p className="text-[10px] font-extrabold tracking-widest uppercase mb-5" style={{ color: "var(--theme-muted, #9ca3af)" }}>
                  Technical Tools &amp; Infrastructure
                </p>
                <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
                  {tools.map((t) => (
                    <span key={t} className="text-xs font-bold px-4 py-2 rounded-full border cursor-default transition-transform hover:scale-105"
                          style={{ color: "var(--theme-amber, #f59e0b)", backgroundColor: "rgba(245, 158, 11, 0.06)", borderColor: "rgba(245, 158, 11, 0.2)" }}>
                      {t}
                    </span>
                  ))}
                </div>
             </GlassCard>
          </div>
        </Reveal>

      </div>
    </section>
  );
});

AchievementsSection.displayName = "AchievementsSection";
export default AchievementsSection;