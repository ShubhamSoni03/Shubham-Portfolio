import { useState, useEffect, useRef, memo } from "react";

/* ── Smooth scroll helper ── */
export const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* ── Reveal hook ── */
export function useReveal(delay = 0, dir = "up") {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = `${delay}s`;
    const cls =
      dir === "left"  ? "reveal-left"  :
      dir === "right" ? "reveal-right" : "reveal";
    el.classList.add(cls);
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add("vis"); ob.disconnect(); }
      },
      { threshold: 0.08 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [delay, dir]);
  return ref;
}

/* ── Reveal wrapper component ── */
// FIX: added className prop and applied it to the wrapper div
// Previously className was silently ignored — this caused min-w-0, w-full, h-full
// passed from GlassCard and AboutSection to never actually apply, causing grid blowout.
export const Reveal = memo(({ children, delay = 0, dir = "up", style = {}, className = "" }) => {
  const ref = useReveal(delay, dir);
  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
});

/* ── Animated counter ── */
export const Counter = ({ target, decimals = 0 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        ob.disconnect();
        const steps   = 60;
        const inc     = target / steps;
        let   current = 0;
        const t = setInterval(() => {
          current += inc;
          if (current >= target) { current = target; clearInterval(t); }
          setVal(parseFloat(current.toFixed(decimals)));
        }, 22);
      }
    }, { threshold: 0.3 });
    ob.observe(el);
    return () => ob.disconnect();
  }, [target, decimals]);
  return <span ref={ref}>{val}</span>;
};