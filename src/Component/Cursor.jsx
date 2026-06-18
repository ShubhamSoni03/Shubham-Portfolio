import { useEffect, useRef, useState, memo } from "react";

const Cursor = memo(({ P }) => {
  const ringRef = useRef(null);
  const dotRef  = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Check if device supports hover interactions (mouse pointer)
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mediaQuery.matches);

    const handleChange = (e) => setEnabled(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const ring = ringRef.current;
    const dot  = dotRef.current;
    if (!ring || !dot) return;

    // Track cursor with smooth requestAnimationFrame interpolation
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const animateRing = () => {
      // Linear interpolation for smooth trailing effect
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      requestAnimationFrame(animateRing);
    };

    const onDown = () => {
      ring.style.width       = "22px";
      ring.style.height      = "22px";
      ring.style.borderColor = P.indigo;
      ring.style.opacity     = "0.7";
    };

    const onUp = () => {
      ring.style.width       = "14px";
      ring.style.height      = "14px";
      ring.style.borderColor = P.teal;
      ring.style.opacity     = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    
    const animationFrameId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled, P.teal, P.indigo]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        style={{
          position:     "fixed",
          top:          -7,
          left:         -7,
          width:        14,
          height:       14,
          borderRadius: "50%",
          border:       `1.5px solid ${P.teal}`,
          pointerEvents:"none",
          zIndex:       9999,
          transition:   "width 0.2s, height 0.2s, border-color 0.2s, opacity 0.2s",
          mixBlendMode: "screen",
          willChange:   "transform",
        }}
      />
      <div
        ref={dotRef}
        style={{
          position:     "fixed",
          top:          -3,
          left:         -3,
          width:        6,
          height:       6,
          borderRadius: "50%",
          background:   P.teal,
          pointerEvents:"none",
          zIndex:       10000,
          willChange:   "transform",
        }}
      />
    </>
  );
});

Cursor.displayName = "Cursor";

export default Cursor;
