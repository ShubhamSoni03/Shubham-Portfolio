import { memo, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CV, T } from "./CVData";
import { Reveal } from "./shared";

/* ── API endpoint ── */
const API_URL = import.meta.env.PROD
  ? "/api/contact" // production — same origin or proxy
  : "http://localhost:5000/api/contact"; // dev

/* ── Toast notification ── */
const Toast = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -20, scale: 0.95 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    style={{
      position: "fixed",
      bottom: 32,
      right: 32,
      zIndex: 9999,
      padding: "16px 24px",
      borderRadius: 16,
      background:
        type === "success"
          ? "rgba(16,185,129,0.12)"
          : "rgba(239,68,68,0.12)",
      border: `1px solid ${type === "success"
          ? "rgba(16,185,129,0.35)"
          : "rgba(239,68,68,0.35)"
        }`,
      backdropFilter: "blur(20px)",
      display: "flex",
      alignItems: "center",
      gap: 12,
      maxWidth: 380,
      boxShadow:
        type === "success"
          ? "0 12px 40px rgba(16,185,129,0.15)"
          : "0 12px 40px rgba(239,68,68,0.15)",
    }}
  >
    <span style={{ fontSize: 22 }}>
      {type === "success" ? "✅" : "⚠️"}
    </span>
    <div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: type === "success" ? "#10b981" : "#ef4444",
          marginBottom: 2,
        }}
      >
        {type === "success" ? "Sent Successfully!" : "Sending Failed"}
      </div>
      <div
        style={{
          fontSize: 12,
          color: "rgba(255,255,255,0.65)",
          lineHeight: 1.4,
        }}
      >
        {message}
      </div>
    </div>
    <button
      onClick={onClose}
      style={{
        background: "none",
        border: "none",
        color: "rgba(255,255,255,0.4)",
        fontSize: 16,
        cursor: "pointer",
        padding: 4,
        marginLeft: 8,
      }}
    >
      ✕
    </button>
  </motion.div>
);

/* ── Loading spinner ── */
const Spinner = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    style={{
      width: 18,
      height: 18,
      border: "2px solid rgba(255,255,255,0.2)",
      borderTopColor: "#fff",
      borderRadius: "50%",
      display: "inline-block",
    }}
  />
);

/* ── Contact Section ── */
const ContactSection = memo(({ P }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    _honey: "", // honeypot
  });
  const [focused, setFocused] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const formRef = useRef(null);
  
  // 🌟 CHANGE: Added a reference to track the active toast timer safely to prevent component memory leaks
  const toastTimeoutRef = useRef(null);

  /* ── Client-side validation ── */
  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2)
      errs.name = "Name is required (min 2 chars)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "Valid email is required";
    if (!formData.subject.trim() || formData.subject.trim().length < 3)
      errs.subject = "Subject is required (min 3 chars)";
    if (!formData.message.trim() || formData.message.trim().length < 10)
      errs.message = "Message is required (min 10 chars)";
    if (formData.message.length > 5000)
      errs.message = "Message is too long (max 5000 chars)";
    return errs;
  };

  /* ── Handle input ── */
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    // Clear field error on type
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  /* ── Handle submit ── */
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // 🌟 CHANGE: Fast anti-bot rejection if honeypot hidden input gets filled
      if (formData._honey) {
        setToast({ type: "error", message: "Spam detected." });
        return;
      }

      // Validate
      const errs = validate();
      if (Object.keys(errs).length) {
        setFieldErrors(errs);
        return;
      }

      setLoading(true);
      setFieldErrors({});
      
      // 🌟 CHANGE: Clear any existing active toast timeout before making a new fetch call
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);

      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setToast({
            type: "success",
            message: data.message || "I'll get back to you within 24 hours.",
          });
          // Reset form
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
            _honey: "",
          });
        } else {
          // 🌟 CHANGE: Gracefully parse individual array errors or flat string message errors passed from Express backend
          let errorMsg = "Something went wrong.";
          if (data.errors && Array.isArray(data.errors)) {
            errorMsg = data.errors.join(" ");
          } else if (data.error) {
            errorMsg = data.error;
          }
          setToast({ type: "error", message: errorMsg });
        }
      } catch (err) {
        setToast({
          type: "error",
          message: "Network error. Please check your connection and try again.",
        });
      } finally {
        setLoading(false);
        // 🌟 CHANGE: Assign timeout to the ref container so it can be wiped if page unmounts or restarts
        toastTimeoutRef.current = setTimeout(() => setToast(null), 5000);
      }
    },
    [formData]
  );

  /* ── Styles ── */
  const inputStyle = (key) => ({
    width: "100%",
    background: fieldErrors[key]
      ? "rgba(239,68,68,0.06)"
      : focused === key
        ? `${P.teal}08`
        : P.faint,
    border: `1px solid ${fieldErrors[key]
        ? "rgba(239,68,68,0.5)"
        : focused === key
          ? P.teal + "55"
          : P.bdr
      }`,
    borderRadius: 14,
    padding: "14px 18px",
    fontSize: T.sub,
    outline: "none",
    transition: "border-color 0.22s, background 0.22s, box-shadow 0.22s",
    color: P.white,
    boxShadow:
      focused === key ? `0 0 0 3px ${P.teal}12` : "none",
  });

  const labelStyle = (key) => ({
    fontSize: 12,
    color: fieldErrors[key]
      ? "#ef4444"
      : focused === key
        ? P.teal
        : P.muted,
    display: "block",
    marginBottom: 7,
    fontWeight: 600,
    transition: "color 0.2s",
    letterSpacing: "0.3px",
  });

  return (
    <section
      id="contact"
      style={{
        padding: "120px 60px 100px",
        background: P.bg,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background orbs */}
      <div
        style={{
          position: "absolute",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: P.teal,
          opacity: 0.05,
          top: "8%",
          right: "3%",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: P.indigo,
          opacity: 0.05,
          bottom: "8%",
          left: "3%",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1260,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Reveal>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: `${P.teal}0E`,
              border: `1px solid ${P.teal}28`,
              color: P.teal,
              fontSize: 12,
              fontWeight: 600,
              padding: "5px 14px",
              borderRadius: 100,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: P.teal,
                animation: "pulseGlow 1.8s ease-in-out infinite",
              }}
            />
            Available for hire
          </div>
          <div
            style={{
              fontSize: T.tiny,
              fontWeight: 700,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: P.teal,
              marginBottom: 12,
            }}
          >
            Contact
          </div>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: T.h2,
              fontWeight: 900,
              color: P.white,
              letterSpacing: "-3px",
              lineHeight: 1,
              marginBottom: 18,
            }}
          >
            Let&apos;s work{" "}
            <span
              style={{
                backgroundImage: `linear-gradient(to right, ${P.teal}, ${P.indigo})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              together.
            </span>
          </h2>
          <p
            style={{
              fontSize: T.body,
              color: P.muted,
              marginBottom: 52,
              maxWidth: 420,
              lineHeight: 1.75,
            }}
          >
            Actively looking for internship and full-time opportunities. Drop a
            message and I&apos;ll get back within 24 hours.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 52,
          }}
        >
          {/* ─── Form ─── */}
          <Reveal delay={0.1}>
            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              {/* Honeypot (hidden from humans) */}
              <div
                style={{
                  position: "absolute",
                  left: "-9999px",
                  opacity: 0,
                  height: 0,
                  overflow: "hidden",
                }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData._honey}
                  onChange={(e) => handleChange("_honey", e.target.value)}
                />
              </div>

              {[
                {
                  label: "Your Name",
                  type: "text",
                  placeholder: "John Recruiter",
                  key: "name",
                },
                {
                  label: "Email Address",
                  type: "email",
                  placeholder: "hello@company.com",
                  key: "email",
                },
                {
                  label: "Subject",
                  type: "text",
                  placeholder: "Internship opportunity at ...",
                  key: "subject",
                },
              ].map((f) => (
                <div key={f.key} style={{ AppendedMarginBottom: 18, marginBottom: 18 }}>
                  <label style={labelStyle(f.key)}>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={formData[f.key]}
                    onChange={(e) => handleChange(f.key, e.target.value)}
                    disabled={loading}
                    style={{
                      ...inputStyle(f.key),
                      opacity: loading ? 0.6 : 1,
                    }}
                    onFocus={() => setFocused(f.key)}
                    onBlur={() => setFocused(null)}
                  />
                  {fieldErrors[f.key] && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        fontSize: 11,
                        color: "#ef4444",
                        marginTop: 5,
                        fontWeight: 500,
                      }}
                    >
                      {fieldErrors[f.key]}
                    </motion.div>
                  )}
                </div>
              ))}

              <div style={{ marginBottom: 22 }}>
                <label style={labelStyle("message")}>Message</label>
                <textarea
                  placeholder="Tell me about the opportunity..."
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  disabled={loading}
                  style={{
                    ...inputStyle("message"),
                    height: 116,
                    resize: "none",
                    opacity: loading ? 0.6 : 1,
                  }}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  {fieldErrors.message ? (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ fontSize: 11, color: "#ef4444", fontWeight: 500 }}
                    >
                      {fieldErrors.message}
                    </motion.div>
                  ) : (
                    <span />
                  )}
                  <span
                    style={{
                      fontSize: 10,
                      color:
                        formData.message.length > 4800
                          ? "#ef4444"
                          : P.muted,
                    }}
                  >
                    {formData.message.length}/5000
                  </span>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={loading ? {} : { scale: 1.02 }}
                whileTap={loading ? {} : { scale: 0.98 }}
                style={{
                  width: "100%",
                  background: loading
                    ? `${P.teal}40`
                    : `linear-gradient(135deg, ${P.teal}, ${P.indigo})`,
                  color: "#fff",
                  border: "none",
                  borderRadius: 14,
                  padding: "16px 0",
                  fontSize: T.sub,
                  fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  letterSpacing: "0.3px",
                  boxShadow: `0 4px 28px ${P.teal}26`,
                  transition: "background 0.3s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                {loading ? (
                  <>
                    <Spinner /> Sending...
                  </>
                ) : (
                  "Send Message →"
                )}
              </motion.button>
            </form>
          </Reveal>

          {/* ─── Contact Info ─── */}
          <Reveal delay={0.2} dir="right">
            <div>
              <div style={{ marginBottom: 36 }}>
                {[
                  {
                    label: "Email",
                    val: CV.email,
                    color: P.teal,
                    href: `mailto:${CV.email}`,
                  },
                  {
                    label: "Mobile",
                    val: CV.mobile,
                    color: P.indigo,
                    href: `tel:${CV.mobile}`,
                  },
                  {
                    label: "LinkedIn",
                    val: "linkedin.com/in/shubham-soni03",
                    color: P.rose,
                    href: CV.linkedin,
                  },
                  {
                    label: "GitHub",
                    val: "github.com/ShubhamSoni03",
                    color: P.amber,
                    href: CV.github,
                  },
                  {
                    label: "Location",
                    val: CV.location,
                    color: P.mint,
                    href: null,
                  },
                  {
                    label: "Availability",
                    val: "Open to Internships & Full-time",
                    color: P.rose,
                    href: null,
                  },
                ].map((info, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 14,
                      padding: "15px 0",
                      borderBottom: `1px solid ${P.bdr}`,
                    }}
                  >
                    <div
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: info.color,
                        marginTop: 6,
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontSize: 11,
                          color: P.muted,
                          letterSpacing: "0.5px",
                          marginBottom: 4,
                          fontWeight: 600,
                          textTransform: "uppercase",
                        }}
                      >
                        {info.label}
                      </div>
                      {info.href ? (
                        <a
                          href={info.href}
                          target={
                            info.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel="noreferrer"
                          style={{
                            fontSize: T.sub,
                            fontWeight: 600,
                            color: P.white,
                            transition: "color 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color = info.color)
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color = P.white)
                          }
                        >
                          {info.val}
                        </a>
                      ) : (
                        <div
                          style={{
                            fontSize: T.sub,
                            fontWeight: 600,
                            color: P.white,
                          }}
                        >
                          {info.val}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social + Resume buttons */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                {/* Resume button */}
                <a
                  href={CV.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn"
                  style={{
                    gridRow: "span 2",
                    padding: "20px",
                    background: `${P.teal}0C`,
                    border: `1px solid ${P.teal}40`,
                    borderRadius: 14,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: `0 0 20px ${P.teal}15`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = P.teal;
                    e.currentTarget.style.background = `${P.teal}15`;
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${P.teal}40`;
                    e.currentTarget.style.background = `${P.teal}0C`;
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <span style={{ fontSize: 32 }}>📄</span>
                  <div style={{ textAlign: "center" }}>
                    <span
                      style={{
                        fontSize: T.sub,
                        fontWeight: 800,
                        color: P.white,
                        display: "block",
                      }}
                    >
                      Resume
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        color: P.teal,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                      }}
                    >
                      View in Browser
                    </span>
                  </div>
                </a>

                {[
                  {
                    label: "LinkedIn",
                    icon: "💼",
                    color: P.indigo,
                    href: CV.linkedin,
                  },
                  {
                    label: "GitHub",
                    icon: "🐙",
                    color: P.teal,
                    href: CV.github,
                  },
                  {
                    label: "Email",
                    icon: "📧",
                    color: P.amber,
                    href: `mailto:${CV.email}`,
                  },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="social-btn"
                    style={{
                      padding: "15px 16px",
                      background: "transparent",
                      border: `1px solid ${P.bdr}`,
                      borderRadius: 14,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${s.color}50`;
                      e.currentTarget.style.background = `${s.color}0C`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = P.bdr;
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{s.icon}</span>
                    <span
                      style={{
                        fontSize: T.sub,
                        fontWeight: 600,
                        color: P.muted,
                      }}
                    >
                      {s.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
});

export default ContactSection;