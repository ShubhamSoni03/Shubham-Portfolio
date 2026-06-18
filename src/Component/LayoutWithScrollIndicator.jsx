import { useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const LayoutWithScrollIndicator = ({ children }) => {
  const { scrollYProgress } = useScroll();

  const sections = useMemo(
    () => [
      { id: "home", label: "Hero", start: 0.0, end: 0.2 },
      { id: "about", label: "About", start: 0.2, end: 0.4 },
      { id: "projects", label: "Projects", start: 0.4, end: 0.6 },
      { id: "certificates", label: "Certificates", start: 0.6, end: 0.8 },
      { id: "contact", label: "Contact", start: 0.8, end: 1.0 },
    ],
    []
  );

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Map scroll progress (0 → 1) to vertical position of the active circle (top → bottom).
  const circleY = useTransform(
    scrollYProgress,
    sections.map((s) => (s.start + s.end) / 2),
    sections.map((_, idx) => `${(idx / (sections.length - 1 || 1)) * 100}%`)
  );

  // Precompute marker positions (top → bottom)
  const markerPositions = useMemo(
    () =>
      sections.map((_, idx) => ({
        top: `${(idx / (sections.length - 1 || 1)) * 100}%`,
      })),
    [sections]
  );

  return (
    <div className="relative">
      {/* Vertical scroll indicator — Hidden on mobile, shown on md+ screens */}
      <div className="hidden md:block fixed right-8 top-1/2 -translate-y-1/2 h-[60vh] w-8 pointer-events-none z-50">
        
        {/* Track */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full rounded-full bg-white/10" />

        {/* Progress bar (fills top -> bottom) */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full origin-top rounded-full"
          style={{
            background: "linear-gradient(to bottom, #3ECFB2, #7C8FF6)",
            scaleY: scrollYProgress,
          }}
        />

        {/* Active circle traveler */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border border-white bg-slate-950 shadow-md"
          style={{
            y: circleY,
            borderColor: "#3ECFB2",
            boxShadow: "0 0 10px rgba(62, 207, 178, 0.4)",
          }}
        />

        {/* Section markers (dots + labels) */}
        <div className="absolute inset-0 py-2.5">
          {sections.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollToId(s.id)}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 cursor-pointer pointer-events-auto bg-transparent border-none p-0 group"
              style={{
                top: markerPositions[idx].top,
              }}
            >
              <div className="w-2.5 h-2.5 rounded-full border border-white/40 bg-slate-950 transition-all duration-300 group-hover:scale-125 group-hover:border-[#3ECFB2]" />
              <span className="text-[8px] font-bold font-mono uppercase tracking-wider text-white/40 transition-colors duration-300 group-hover:text-[#3ECFB2] mt-1">
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {children}
    </div>
  );
};

export default LayoutWithScrollIndicator;
