import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CV } from "./CVData";
import { Reveal } from "./shared";

/* ─────────────────────────────────────────────
   FeaturedProjectCard
   h-full works because the Reveal wrapper that
   wraps this card passes className="h-full w-full min-w-0"
───────────────────────────────────────────── */
const FeaturedProjectCard = memo(({ title, sub, desc, tags, live, github, date }) => (
  <motion.div
    whileHover={{
      y:           -6,
      borderColor: "var(--theme-indigo, #6366f1)",
      boxShadow:   "0 25px 50px -12px rgba(99,102,241,0.25)",
    }}
    transition={{ duration: 0.3 }}
    className="group relative rounded-3xl border overflow-hidden flex flex-col justify-between h-full w-full min-w-0"
    style={{
      backgroundColor: "var(--theme-bg3, rgba(15, 23, 42, 0.6))",
      borderColor:     "var(--theme-bdr, rgba(255, 255, 255, 0.08))",
      backdropFilter:  "blur(16px)",
    }}
  >
    {/* Top accent line */}
    <div
      className="h-[2px] w-full opacity-40 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        backgroundImage:
          "linear-gradient(to right, transparent, var(--theme-indigo, #6366f1), transparent)",
      }}
    />

    <div className="p-7 sm:p-8 flex flex-col justify-between flex-grow gap-7">
      <div className="space-y-5">

        {/* Title row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl border transition-transform duration-300 group-hover:scale-105 flex-shrink-0"
              style={{
                backgroundColor: "rgba(99, 102, 241, 0.08)",
                borderColor:     "rgba(99, 102, 241, 0.2)",
              }}
            >
              🚀
            </div>
            <div className="min-w-0">
              <h4 className="text-xl font-black tracking-tight text-white truncate font-sans">
                {title}
              </h4>
              <p
                className="text-[10px] font-black tracking-widest uppercase mt-1"
                style={{ color: "var(--theme-indigo, #6366f1)" }}
              >
                {date} · Featured Work
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {live && (
              <motion.a
                href={live}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold px-4 py-2 rounded-full border text-white"
                style={{
                  backgroundColor: "rgba(99, 102, 241, 0.15)",
                  borderColor:     "rgba(99, 102, 241, 0.35)",
                }}
                whileHover={{
                  backgroundColor: "var(--theme-indigo, #6366f1)",
                  color:       "#ffffff",
                  borderColor: "var(--theme-indigo, #6366f1)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Live ↗
              </motion.a>
            )}
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold px-4 py-2 rounded-full border transition-all hover:bg-white/10"
              style={{
                color:       "var(--theme-muted, #9ca3af)",
                borderColor: "var(--theme-bdr, rgba(255,255,255,0.1))",
              }}
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Subtitle divider */}
        <p
          className="text-xs font-bold tracking-wide text-white/95 uppercase border-b pb-3"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          {sub}
        </p>

        {/* Description */}
        <p className="text-sm leading-relaxed" style={{ color: "var(--theme-muted, #9ca3af)" }}>
          {desc}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((t, i) => (
          <span
            key={i}
            className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border"
            style={{
              color:           "var(--theme-indigo, #6366f1)",
              backgroundColor: "rgba(99, 102, 241, 0.04)",
              borderColor:     "rgba(99, 102, 241, 0.18)",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
));

FeaturedProjectCard.displayName = "FeaturedProjectCard";

/* ─────────────────────────────────────────────
   LabProjectCard
───────────────────────────────────────────── */
const LabProjectCard = memo(({ title, desc, tags, live, github, date }) => (
  <motion.div
    whileHover={{
      backgroundColor: "rgba(255, 255, 255, 0.02)",
      borderColor:     "var(--theme-teal, #2dd4bf)",
    }}
    transition={{ duration: 0.3 }}
    className="p-6 rounded-2xl border flex flex-col justify-between h-full bg-transparent min-w-0 w-full"
    style={{ borderColor: "var(--theme-bdr, rgba(255, 255, 255, 0.08))" }}
  >
    <div className="space-y-4">
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xl flex-shrink-0">🔬</span>
          <h4 className="text-base font-black font-sans text-white truncate">{title}</h4>
        </div>
        <span
          className="text-[10px] font-bold uppercase flex-shrink-0 mt-1"
          style={{ color: "var(--theme-muted, #9ca3af)" }}
        >
          {date}
        </span>
      </div>

      <p className="text-xs leading-relaxed" style={{ color: "var(--theme-muted, #9ca3af)" }}>
        {desc}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {tags.map((t, i) => (
          <span
            key={i}
            className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border"
            style={{
              color:           "var(--theme-teal, #2dd4bf)",
              backgroundColor: "rgba(45, 212, 191, 0.03)",
              borderColor:     "rgba(45, 212, 191, 0.12)",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>

    <div
      className="flex gap-4 mt-6 pt-4 border-t border-dashed justify-end"
      style={{ borderColor: "rgba(255,255,255,0.07)" }}
    >
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-extrabold tracking-wider uppercase"
          style={{ color: "var(--theme-teal, #2dd4bf)" }}
        >
          Live Demo ↗
        </a>
      )}
      <a
        href={github}
        target="_blank"
        rel="noreferrer"
        className="text-xs font-bold tracking-wider uppercase"
        style={{ color: "var(--theme-muted, #9ca3af)" }}
      >
        Source Code
      </a>
    </div>
  </motion.div>
));

LabProjectCard.displayName = "LabProjectCard";

/* ─────────────────────────────────────────────
   ProjectsSection
───────────────────────────────────────────── */
const ProjectsSection = memo(() => {
  const [showLabs, setShowLabs] = useState(false);

  const featuredProjects = CV.projects.filter((p) => p.featured);
  const labProjects      = CV.projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--theme-bg, #030712)" }}
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

      {/* .section-shell from globalStyles.js handles all padding + max-width */}
      <div className="section-shell">

        {/* ── Section header ── */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
            <div className="space-y-2">
              <p
                className="text-xs font-bold tracking-[4px] uppercase"
                style={{ color: "var(--theme-indigo, #6366f1)" }}
              >
                // Portfolio Showcase
              </p>
              <h2
                className="font-sans font-black tracking-tighter leading-none text-white break-words"
                style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.25rem)" }}
              >
                Project{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, var(--theme-indigo, #6366f1), var(--theme-rose, #f43f5e))",
                  }}
                >
                  Catalog.
                </span>
              </h2>
            </div>

            {/* Stats pill */}
            <div
              className="flex items-center gap-5 px-6 py-3.5 rounded-2xl border backdrop-blur-md text-xs self-start md:self-end flex-shrink-0"
              style={{
                backgroundColor: "var(--theme-bg2, rgba(15, 23, 42, 0.4))",
                borderColor:     "var(--theme-bdr, rgba(255,255,255,0.08))",
              }}
            >
              <div>
                <span className="font-extrabold text-white">{CV.projectStats.total}</span>{" "}
                <span style={{ color: "var(--theme-muted, #9ca3af)" }}>Total</span>
              </div>
              <div className="w-[1px] h-4 bg-white/10" />
              <div>
                <span className="font-extrabold" style={{ color: "var(--theme-teal, #2dd4bf)" }}>
                  {CV.projectStats.live}
                </span>{" "}
                <span style={{ color: "var(--theme-muted, #9ca3af)" }}>Live</span>
              </div>
              <div className="w-[1px] h-4 bg-white/10" />
              <div>
                <span className="font-extrabold" style={{ color: "var(--theme-indigo, #6366f1)" }}>
                  {CV.projectStats.technologies}
                </span>{" "}
                <span style={{ color: "var(--theme-muted, #9ca3af)" }}>Techs</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Featured grid ──
            Reveal gets className="h-full w-full min-w-0" so the card's
            own h-full has a real parent height to fill → equal card heights.
        ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8 w-full items-stretch">
          {featuredProjects.map((proj, i) => (
            <Reveal key={proj.title} delay={i * 0.1} className="h-full w-full min-w-0">
              <FeaturedProjectCard {...proj} />
            </Reveal>
          ))}
        </div>

        {/* ── Lab accordion ── */}
        <div className="w-full space-y-5">
          <button
            onClick={() => setShowLabs((prev) => !prev)}
            className="w-full flex items-center justify-between py-5 px-6 rounded-2xl border transition-all hover:bg-white/[0.02] active:scale-[0.995] cursor-pointer outline-none"
            style={{
              backgroundColor: "var(--theme-bg3, rgba(15, 23, 42, 0.3))",
              borderColor:     "var(--theme-bdr, rgba(255,255,255,0.08))",
              backdropFilter:  "blur(8px)",
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🔬</span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white font-sans">
                Lab Experiments &amp; Practice Projects ({labProjects.length})
              </span>
            </div>
            <motion.span
              animate={{ rotate: showLabs ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-xs font-bold flex-shrink-0"
              style={{ color: "var(--theme-muted, #9ca3af)" }}
            >
              ▼
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {showLabs && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden w-full"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 pb-6 w-full items-stretch">
                  {labProjects.map((proj) => (
                    <LabProjectCard key={proj.title} {...proj} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── GitHub CTA — floating style ──────────────────────────────────────
            .float-cta (in globalStyles.js) applies a gentle infinite bob
            animation via @keyframes floatCard. On hover, animation-play-state
            is paused so framer's whileHover y:-4 takes over cleanly.
            The outer div is the centering wrapper; the <a> is the button itself.
        ─────────────────────────────────────────────────────────────────────── */}
        <Reveal delay={0.2}>
          <div className="flex justify-center pt-4">
            <motion.a
              href={CV.github}
              target="_blank"
              rel="noreferrer"
              className="float-cta inline-flex items-center gap-3 px-8 py-4 rounded-full border text-xs font-bold uppercase tracking-widest text-white"
              style={{
                backgroundColor: "var(--theme-bg3, rgba(30, 41, 59, 0.25))",
                borderColor:     "var(--theme-bdr, rgba(255,255,255,0.12))",
                backdropFilter:  "blur(12px)",
                boxShadow:       "0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04)",
              }}
              whileHover={{
                y:               -4,
                borderColor:     "var(--theme-indigo, #6366f1)",
                backgroundColor: "rgba(99, 102, 241, 0.1)",
                boxShadow:       "0 20px 48px rgba(99, 102, 241, 0.2), 0 0 0 1px rgba(99,102,241,0.2)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              <svg
                width="16" height="16" viewBox="0 0 24 24"
                fill="currentColor" aria-hidden="true"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>View full repository archive</span>
            </motion.a>
          </div>
        </Reveal>

      </div>
    </section>
  );
});

ProjectsSection.displayName = "ProjectsSection";
export default ProjectsSection;