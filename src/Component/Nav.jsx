import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CV, scrollTo } from "./CVData";

// 🌟 FIX 1: Ensured sections perfectly match the DOM element IDs used across the page
const SECTIONS = ["home", "about", "projects", "certificates", "contact"];

const Nav = memo(({ scrolled, P, theme, onToggleTheme }) => {
  const [active, setActive] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          // 🌟 FIX 2: Increased intersection precision so sections trigger exactly when they appear on screen
          if (e.isIntersecting && e.intersectionRatio >= 0.2) {
            setActive(e.target.id);
          }
        });
      },
      { 
        threshold: [0.2, 0.5],
        rootMargin: "-80px 0px -20% 0px" // Subtracts navbar height from intersection boundaries
      }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  const links = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "certificates", label: "Certificates" },
    { id: "contact", label: "Contact" },
  ];

  const toggleMobileMenu = () => setIsOpen((prev) => !prev);
  
  const handleNavClick = (id) => {
    scrollTo(id);
    setActive(id); // Instant visual feedback update on link select
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-6 md:px-12 transition-all duration-500"
        style={{
          background: scrolled
            ? theme === "dark"
              ? "rgba(5,8,16,0.85)"
              : "rgba(244,246,255,0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? `1px solid ${P.bdr}`
            : "1px solid transparent",
          boxShadow: scrolled
            ? theme === "dark"
              ? "0 10px 30px -10px rgba(0,0,0,0.3)"
              : "0 10px 30px -10px rgba(80,100,200,0.08)"
            : "none",
        }}
      >
        {/* Logo Icon Link */}
        <button
          onClick={() => handleNavClick("home")}
          className="bg-none border-none cursor-pointer font-bold text-2xl tracking-tighter transition-transform active:scale-95 z-50"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 900,
            backgroundImage: `linear-gradient(135deg, ${P.teal}, ${P.indigo})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {CV.initials}
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-950/20 backdrop-blur-md rounded-full px-2 py-1.5 border border-white/5">
          {links.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className="relative px-4 py-1.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-full cursor-pointer mix-blend-screen"
                style={{
                  color: isActive ? P.white : P.muted,
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full z-[-1]"
                    style={{
                      background: `linear-gradient(135deg, ${P.teal}20, ${P.indigo}20)`,
                      border: `1px solid ${P.teal}40`,
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {label}
              </button>
            );
          })}

          {/* Resume Shortcut link */}
          <a
            href={CV.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full cursor-pointer transition-all duration-300 hover:text-white"
            style={{ color: P.muted }}
          >
            <span>📄</span>
            Resume
          </a>
        </div>

        {/* Action Group: Theme Toggle + Mobile Hamburger Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleTheme}
            className="theme-toggle w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border bg-slate-950/40 border-slate-900 text-sm hover:border-amber-500/30"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* Mobile hamburger icon trigger */}
          <button
            onClick={toggleMobileMenu}
            className="flex md:hidden flex-col justify-center items-center w-9 h-9 rounded-full cursor-pointer transition-all border bg-slate-950/40 border-slate-900 relative z-50"
            aria-label="Toggle Menu"
          >
            <span
              className={`w-4 h-0.5 transition-all duration-300 rounded ${
                isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
              }`}
              style={{ backgroundColor: P.white }}
            />
            <span
              className={`w-4 h-0.5 transition-all duration-300 rounded my-0.5 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
              style={{ backgroundColor: P.white }}
            />
            <span
              className={`w-4 h-0.5 transition-all duration-300 rounded ${
                isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
              }`}
              style={{ backgroundColor: P.white }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark blur drop shadow shield */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Menu Drawer Panels */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.55 }}
              className="fixed top-0 right-0 bottom-0 w-72 z-40 p-8 flex flex-col justify-between shadow-2xl md:hidden border-l border-slate-900"
              style={{ background: P.bg }}
            >
              <div className="flex flex-col gap-5 mt-16">
                <div className="text-[10px] font-mono font-bold tracking-[0.2em] text-slate-500 uppercase mb-2">
                  &gt; SYSTEM_MENU //
                </div>
                {links.map(({ id, label }, idx) => {
                  const isActive = active === id;
                  return (
                    <motion.button
                      key={id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => handleNavClick(id)}
                      className="text-left py-2 text-lg font-black tracking-tight transition-colors cursor-pointer uppercase"
                      style={{ 
                        color: isActive ? P.teal : P.white,
                        fontFamily: "'Syne', sans-serif"
                      }}
                    >
                      <span className="font-mono text-xs text-amber-500/60 mr-3 font-normal">
                        0{idx + 1}.
                      </span>
                      {label}
                    </motion.button>
                  );
                })}

                <motion.a
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: links.length * 0.05 }}
                  href={CV.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 py-2 text-lg font-black tracking-tight text-white uppercase cursor-pointer"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  <span className="font-mono text-xs text-amber-500/60 mr-3 font-normal">
                    0{links.length + 1}.
                  </span>
                  Resume 📄
                </motion.a>
              </div>

              {/* Social Navigation Footer inside Mobile Drawer */}
              <div className="flex flex-col gap-4">
                <div className="h-[1px] bg-slate-900 w-full" />
                <div className="flex justify-center gap-6">
                  {[
                    { label: "LinkedIn", href: CV.linkedin, icon: "💼" },
                    { label: "GitHub", href: CV.github, icon: "🐙" },
                    { label: "Email", href: `mailto:${CV.email}`, icon: "📧" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xl transition-transform hover:scale-110 active:scale-95"
                      title={s.label}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

Nav.displayName = "Nav";

export default Nav;