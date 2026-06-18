import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { CV } from "./CVData";
import { Reveal } from "./shared";

/*
  GlassCard
  ─────────
  Reveal now correctly forwards className (fixed in shared.jsx) so
  min-w-0 + w-full + h-full actually reach the DOM node.
*/
const GlassCard = ({ children, className = "", delay = 0 }) => (
  <Reveal delay={delay} className={`min-w-0 w-full h-full ${className}`}>
    <motion.div
      className="h-full rounded-2xl p-6 relative overflow-hidden border backdrop-blur-md transition-all duration-300"
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

const AboutSection = memo(() => {
  const heatmapWeeks = 8;
  const heatmapDays  = 7;

  const heatmap = useMemo(() => {
    return Array.from({ length: heatmapWeeks }, () =>
      Array.from({ length: heatmapDays }, () => Math.floor(Math.random() * 4))
    );
  }, []);

  const shippingItems = [
    "SCA-IT performance tracking",
    "Realtime bidding sockets",
    "API-first exam platform",
    "Interactive UI/UX portfolios",
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--theme-bg, #030712)" }}
    >
      {/* Ambient orbs — negative offset keeps them clipped by overflow-hidden */}
      <div
        className="absolute w-72 h-72 lg:w-105 lg:h-105 rounded-full top-[6%] -right-24 filter blur-[100px] pointer-events-none select-none"
        style={{ backgroundColor: "var(--theme-indigo, #6366f1)", opacity: 0.06 }}
      />
      <div
        className="absolute w-60 h-60 lg:w-85 lg:h-85 rounded-full bottom-[6%] -left-20 filter blur-[100px] pointer-events-none select-none"
        style={{ backgroundColor: "var(--theme-teal, #2dd4bf)", opacity: 0.06 }}
      />

      {/*
        .section-shell (globalStyles.js):
          max-width 1260px · margin-inline auto
          padding-inline + padding-block via clamp() CSS vars
          flex-col with gap: var(--section-gap)
        One class replaces every hardcoded "padding: 120px 60px" pattern.
      */}
      <div className="section-shell">

        {/* Section header */}
        <Reveal>
          <div>
            <p
              className="text-xs font-bold tracking-[4px] uppercase mb-3"
              style={{ color: "var(--theme-teal, #2dd4bf)" }}
            >
              // Digital Identity
            </p>
            <h2
              className="font-sans font-black tracking-tighter leading-none text-white"
              style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.25rem)" }}
            >
              Building Software with{" "}
              <span className="bg-linear-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent">
                Precision &amp; Style.
              </span>
            </h2>
          </div>
        </Reveal>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch w-full min-w-0">

          {/* LEFT — Developer console */}
          <div className="lg:col-span-5 flex min-w-0">
            <GlassCard delay={0.1}>

              <div
                className="font-mono text-[11px] mb-5 space-y-1.5"
                style={{ color: "var(--theme-muted, #9ca3af)" }}
              >
                <p style={{ color: "var(--theme-teal, #2dd4bf)" }}>~/about.sh</p>
                <p className="opacity-70">{"> init profile()"}</p>
                <p className="opacity-70">{"> loading skills, education, activity..."}</p>
              </div>

              <div
                className="flex items-start gap-3 p-4 rounded-xl mb-6 border font-mono text-xs bg-black/20"
                style={{ borderColor: "var(--theme-bdr, rgba(255,255,255,0.1))" }}
              >
                <div className="w-1.5 h-7 rounded-full bg-emerald-500 shrink-0 mt-0.5" />
                <p className="text-emerald-400/90 leading-relaxed m-0 font-medium">
                  + Migrated manual exam workflows to automated, API‑driven systems with real‑time analytics.
                </p>
              </div>

              <p className="text-sm leading-relaxed mb-6 text-white/90">
                I am a driven{" "}
                <span className="font-bold text-white">Full‑Stack Developer</span>{" "}
                specialising in the{" "}
                <span className="font-bold text-white">MERN</span> stack, focused on
                industrial‑grade platforms and interactive experiences. I bridge complex
                backend orchestration with responsive UIs, using tools like{" "}
                <span className="font-bold text-white">Socket.io</span> and{" "}
                <span className="font-bold text-white">MongoDB</span> to turn data into
                reliable, real‑time products.
              </p>

              <div className="flex flex-wrap gap-2">
                {CV.skills.languages.map((l) => (
                  <span
                    key={l}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border bg-white/5 text-white"
                    style={{ borderColor: "var(--theme-bdr, rgba(255,255,255,0.1))" }}
                  >
                    {l}
                  </span>
                ))}
              </div>

            </GlassCard>
          </div>

          {/* RIGHT — Metric cards */}
          <div className="lg:col-span-7 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 w-full min-w-0 h-full">

              {/* Education */}
              <div className="sm:col-span-7 min-w-0">
                <GlassCard delay={0.15}>
                  <div className="text-2xl mb-3">🎓</div>
                  <p
                    className="text-[10px] font-extrabold tracking-widest uppercase mb-2"
                    style={{ color: "var(--theme-indigo, #6366f1)" }}
                  >
                    Academic Foundation
                  </p>
                  <h3 className="text-base font-bold leading-snug mb-3 text-white">
                    B.Tech in Computer Science &amp; Engineering
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--theme-muted, #9ca3af)" }}
                  >
                    Currently at{" "}
                    <strong className="text-white font-semibold">
                      Lovely Professional University
                    </strong>
                    , sharpening software engineering, full‑cycle web development, and
                    algorithmic structures.
                  </p>
                </GlassCard>
              </div>

              {/* CGPA + Heatmap */}
              <div className="sm:col-span-5 min-w-0">
                <GlassCard delay={0.2}>
                  <div className="flex flex-col justify-between h-full gap-5">

                    <div className="text-center">
                      <p
                        className="text-[9px] font-bold tracking-widest uppercase mb-2"
                        style={{ color: "var(--theme-muted, #9ca3af)" }}
                      >
                        Current CGPA
                      </p>
                      <p
                        className="text-5xl font-black leading-none"
                        style={{ color: "var(--theme-teal, #2dd4bf)" }}
                      >
                        {CV.education[0].grade}
                      </p>
                    </div>

                    <div>
                      <p
                        className="text-[10px] font-medium mb-2"
                        style={{ color: "var(--theme-muted, #9ca3af)" }}
                      >
                        Coding activity · last 56 days
                      </p>
                      <div className="overflow-hidden">
                        <div className="flex gap-1">
                          {heatmap.map((week, wIdx) => (
                            <div key={wIdx} className="flex flex-col gap-1 shrink-0">
                              {week.map((lvl, dIdx) => {
                                const opacity = ["opacity-15","opacity-40","opacity-70","opacity-100"];
                                return (
                                  <div
                                    key={dIdx}
                                    className={`w-[9px] h-[9px] rounded-xs ${opacity[lvl]}`}
                                    style={{ backgroundColor: "var(--theme-teal, #2dd4bf)" }}
                                  />
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </GlassCard>
              </div>

              {/* Location + Roadmap */}
              <div className="sm:col-span-12 min-w-0">
                <GlassCard delay={0.25}>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">

                    <div
                      className="rounded-xl p-4 flex flex-col items-center justify-center gap-1.5 border bg-white/2"
                      style={{ borderColor: "var(--theme-bdr, rgba(255,255,255,0.1))" }}
                    >
                      <span className="text-2xl">📍</span>
                      <span className="text-xs font-bold text-white">Punjab, India</span>
                      <span
                        className="text-[10px] text-center"
                        style={{ color: "var(--theme-muted, #9ca3af)" }}
                      >
                        Remote / Relocation
                      </span>
                    </div>

                    <div className="sm:col-span-2 grid grid-cols-3 gap-3">
                      {[
                        { label: "NOW",   desc: "React, Node.js, MongoDB",   color: "var(--theme-teal,   #2dd4bf)" },
                        { label: "NEXT",  desc: "Next.js, Tailwind, Docker", color: "var(--theme-indigo, #6366f1)" },
                        { label: "LATER", desc: "Rust / Go systems",         color: "var(--theme-rose,   #f43f5e)" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-xl p-3 border bg-black/10 min-w-0"
                          style={{ borderColor: `${item.color}20` }}
                        >
                          <p
                            className="text-[9px] font-black tracking-widest uppercase mb-1.5"
                            style={{ color: item.color }}
                          >
                            {item.label}
                          </p>
                          <p className="text-[11px] leading-snug text-white/80 wrap-break-words">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                  </div>
                </GlassCard>
              </div>

              {/* Skill bars */}
              <div className="sm:col-span-12 min-w-0">
                <GlassCard delay={0.3}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                    {CV.skillBars.map((s, i) => {
                      const colors = [
                        "var(--theme-teal,   #2dd4bf)",
                        "var(--theme-indigo, #6366f1)",
                        "var(--theme-rose,   #f43f5e)",
                        "var(--theme-amber,  #f59e0b)",
                      ];
                      const c = colors[i % colors.length];
                      return (
                        <div key={i} className="flex flex-col justify-center min-w-0">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-white/90 truncate pr-2">
                              {s.label}
                            </span>
                            <span className="text-xs font-black shrink-0 " style={{ color: c }}>
                              {s.pct}%
                            </span>
                          </div>
                          <div className="h-1.5 rounded-full overflow-hidden bg-white/10 w-full">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: c }}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${s.pct}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.1, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </GlassCard>
              </div>

            </div>
          </div>
        </div>

        {/* Shipping ticker */}
        <Reveal delay={0.4}>
          <div
            className="rounded-full py-3 px-5 flex items-center gap-4 border bg-black/20 overflow-hidden"
            style={{ borderColor: "var(--theme-bdr, rgba(255,255,255,0.1))" }}
          >
            <span
              className="font-mono text-[10px] font-bold shrink-0 whitespace-nowrap"
              style={{ color: "var(--theme-teal, #2dd4bf)" }}
            >
              {"> SHIPPING NOW"}
            </span>
            <div className="overflow-hidden min-w-0 flex-1">
              <motion.div
                className="flex gap-10 text-xs select-none whitespace-nowrap"
                style={{ color: "var(--theme-muted, #9ca3af)" }}
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              >
                {[...shippingItems, ...shippingItems].map((item, idx) => (
                  <span key={idx} className="font-medium tracking-wide">{item} •</span>
                ))}
              </motion.div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";
export default AboutSection;