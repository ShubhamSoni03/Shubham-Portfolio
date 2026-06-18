export const injectGlobalStyles = (P) => {
  let el = document.getElementById("gs");
  if (!el) {
    el = document.createElement("style");
    el.id = "gs";
    document.head.appendChild(el);
  }
  el.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

    /* ── Design tokens ── */
    :root {
      --theme-bg:           ${P.bg};
      --theme-bg2:          ${P.bg2};
      --theme-bg3:          ${P.bg3};
      --theme-bdr:          ${P.bdr};
      --theme-teal:         ${P.teal};
      --theme-indigo:       ${P.indigo};
      --theme-rose:         ${P.rose};
      --theme-amber:        ${P.amber};
      --theme-mint:         ${P.mint};
      --theme-white:        ${P.white};
      --theme-muted:        ${P.muted};
      --theme-faint:        ${P.faint};
      --theme-surface:      ${P.surface};
      --theme-shadow:       ${P.shadow};
      --theme-glass:        ${P.glass};
      --theme-glass-border: ${P.glassBorder};
      --theme-glass-strong: ${P.glassStrong};

      /*
        Section spacing tokens — single source of truth.
        Every section reads from these so spacing is consistent
        and you only need to change one value to reflow the whole page.
        py  = top + bottom padding
        px  = side padding (responsive via clamp)
        gap = vertical gap between major blocks inside a section
      */
      --section-py:   clamp(5rem, 10vw, 7.5rem);   /* 80px → 120px */
      --section-px:   clamp(1.25rem, 5vw, 4rem);   /* 20px → 64px  */
      --section-gap:  clamp(2.5rem, 5vw, 3.25rem); /* 40px → 52px  */
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html { scroll-behavior: smooth; }

    body {
      background:    ${P.bg};
      font-family:   'Inter', 'DM Sans', sans-serif;
      color:         ${P.white};
      overflow-x:    hidden;
      transition:    background 0.45s ease, color 0.45s ease;
      font-size:     16px;        /* was 17px — 16px is the web standard baseline */
      line-height:   1.7;
    }

    /* Hide default cursor only on true pointer devices (not touch) */
    @media (hover: hover) and (pointer: fine) {
      body { cursor: none; }
    }

    input, textarea, button {
      font-family: 'Inter', 'DM Sans', sans-serif;
      color: ${P.white};
    }

    a { text-decoration: none; }

    ::-webkit-scrollbar            { width: 5px; }
    ::-webkit-scrollbar-track      { background: ${P.bg}; }
    ::-webkit-scrollbar-thumb      { background: ${P.teal}66; border-radius: 10px; }
    ::selection                    { background: ${P.teal}33; color: ${P.teal}; }

    /* ─────────────────────────────────────────────
       Section layout utility
       Apply .section-shell to every section's inner
       max-width container instead of repeating the
       same max-width / margin / padding in every file.
    ───────────────────────────────────────────── */
    .section-shell {
      width: 100%;
      max-width: 1260px;
      margin-inline: auto;
      padding-inline: var(--section-px);
      padding-block:  var(--section-py);
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: var(--section-gap);
    }

    /* ── Reveal animations ── */
    .reveal {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.7s cubic-bezier(.22,1,.36,1),
                  transform 0.7s cubic-bezier(.22,1,.36,1);
    }
    .reveal.vis { opacity: 1; transform: translateY(0); }

    .reveal-left {
      opacity: 0;
      transform: translateX(-28px);
      transition: opacity 0.7s cubic-bezier(.22,1,.36,1),
                  transform 0.7s cubic-bezier(.22,1,.36,1);
    }
    .reveal-left.vis { opacity: 1; transform: translateX(0); }

    .reveal-right {
      opacity: 0;
      transform: translateX(28px);
      transition: opacity 0.7s cubic-bezier(.22,1,.36,1),
                  transform 0.7s cubic-bezier(.22,1,.36,1);
    }
    .reveal-right.vis { opacity: 1; transform: translateX(0); }

    /* ── Keyframes ── */
    @keyframes pulseGlow {
      0%, 100% { opacity: 1;    box-shadow: 0 0 6px  currentColor; }
      50%       { opacity: 0.45; box-shadow: 0 0 14px currentColor; }
    }
    @keyframes gradShift {
      0%   { background-position: 0%   50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0%   50%; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px);   }
      50%       { transform: translateY(-14px); }
    }
    @keyframes spinSlow {
      from { transform: rotate(0deg);   }
      to   { transform: rotate(360deg); }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.96); }
      to   { opacity: 1; transform: scale(1);    }
    }
    @keyframes shimmer {
      100% { transform: translateX(100%); }
    }

    /*
      floatCard — used for the GitHub CTA button.
      Infinite gentle bob so it looks "floating" without framer-motion overhead.
      The button still supports whileHover via framer — this just layers on top.
    */
    @keyframes floatCard {
      0%, 100% { transform: translateY(0px);  }
      50%       { transform: translateY(-6px); }
    }
    .float-cta {
      animation: floatCard 3s ease-in-out infinite;
    }
    .float-cta:hover {
      animation-play-state: paused; /* pause float on hover so framer whileHover takes over cleanly */
    }

    /* ── Nav ── */
    .nav-btn {
      transition: color 0.22s, border-color 0.22s, background 0.22s;
    }
    .nav-btn:hover {
      color:        ${P.teal}   !important;
      border-color: ${P.teal}40 !important;
      background:   ${P.teal}10 !important;
    }

    /* ── Cards ── */
    .proj-card {
      transition: border-color 0.25s, background 0.25s,
                  transform 0.28s cubic-bezier(.22,1,.36,1), box-shadow 0.28s;
    }
    .proj-card:hover { transform: translateY(-5px) !important; }

    .ach-card, .cert-card {
      transition: border-color 0.22s, background 0.22s, transform 0.22s;
    }
    .ach-card:hover, .cert-card:hover { transform: translateX(4px); }

    /* ── Theme toggle ── */
    .theme-toggle { transition: transform 0.3s, box-shadow 0.3s; }
    .theme-toggle:hover { transform: scale(1.12) rotate(15deg); }

    /* ── Social buttons ── */
    .social-btn { transition: border-color 0.22s, background 0.22s, transform 0.22s; }
    .social-btn:hover { transform: translateY(-2px); }

    /* ── Skill bars ── */
    .skill-bar-fill { transition: width 1.2s cubic-bezier(.22,1,.36,1); }
  `;
};