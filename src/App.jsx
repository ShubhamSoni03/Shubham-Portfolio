import { useState, useEffect } from "react";
import { THEMES } from "./Component/CVData";
import { injectGlobalStyles } from "./Component/styles";
import { motion, AnimatePresence } from "framer-motion";
import Cursor from "./Component/Cursor";
import Nav from "./Component/Nav";
import HeroSection from "./Component/Portfolio";
import AboutSection from "./Component/About";
import ProjectsSection from "./Component/Projects";
import AchievementsSection from "./Component/Achievements";
import ContactSection from "./Component/Contact";
import LayoutWithScrollIndicator from "./Component/LayoutWithScrollIndicator";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  const P = THEMES[theme];

  // Inject/update global styles when theme changes
  useEffect(() => {
    injectGlobalStyles(P);
  }, [P]);

  // Scroll listener for nav transparency
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Simulate loading state for a clean reveal animation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-99999 flex flex-col items-center justify-center bg-[#050810]"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl font-black tracking-tighter mb-4"
              style={{
                fontFamily: "'Syne', sans-serif",
                backgroundImage: `linear-gradient(135deg, ${P.teal}, ${P.indigo})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              SS.
            </motion.div>
            <div className="w-24 h-1 rounded-full bg-slate-900 overflow-hidden relative">
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-1/2 rounded-full"
                style={{ background: P.teal }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        style={{
          background: P.bg,
          color: P.white,
          transition: "background 0.45s ease, color 0.45s ease",
        }}
      >
        {/* Custom cursor */}
        <Cursor P={P} />

        {/* Fixed nav */}
        <Nav
          scrolled={scrolled}
          P={P}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Page sections wrapped with scroll indicator */}
        {/* 🌟 FIX 1: Explicit mapping wrappers injecting IDs onto separate components to connect Nav tracking metrics cleanly */}
        <LayoutWithScrollIndicator>
          <div id="home">
            <HeroSection P={P} theme={theme} /> {/* Passed active theme flag explicitly */}
          </div>
          
          <div id="about">
            <AboutSection P={P} />
          </div>
          
          <div id="projects">
            <ProjectsSection P={P} />
          </div>
          
          {/* 🌟 FIX 2: Mapped structural id="certificates" over achievements to bind navigation buttons smoothly */}
          <div id="certificates">
            <AchievementsSection P={P} />
          </div>
          
          <div id="contact">
            <ContactSection P={P} />
          </div>
        </LayoutWithScrollIndicator>

        {/* Responsive Footer */}
        <footer
          className="py-10 px-6 md:px-12 lg:px-20 flex flex-col sm:flex-row items-center justify-between gap-6 border-t"
          style={{
            background: P.bg2,
            borderColor: P.bdr,
          }}
        >
          <div
            className="text-xl font-black tracking-tight"
            style={{
              fontFamily: "'Syne', sans-serif",
              backgroundImage: `linear-gradient(135deg, ${P.teal}, ${P.indigo})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Shubham Soni
          </div>
          
          <div className="text-xs font-medium order-3 sm:order-2" style={{ color: P.muted }}>
            © {new Date().getFullYear()} · Built with React &amp; ❤️
          </div>
          
          <div className="flex gap-6 order-2 sm:order-3">
            {[
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/shubham-soni03",
              },
              { label: "GitHub", href: "https://github.com/ShubhamSoni03" },
              { label: "Email", href: "mailto:itsyourshubh2005@gmail.com" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="text-xs font-bold transition-all duration-300"
                style={{
                  color: P.muted,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = P.teal)}
                onMouseLeave={(e) => (e.currentTarget.style.color = P.muted)}
              >
                {l.label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
}