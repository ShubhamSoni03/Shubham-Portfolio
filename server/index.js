/* ─────────────────────────────────────────────────────────────
   Portfolio Contact API — Express + Nodemailer
   POST /api/contact  →  sends email via Gmail SMTP
   ───────────────────────────────────────────────────────────── */

import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";

const app = express();
const PORT = process.env.PORT || 5000;

/* ── Middleware ────────────────────────────────── */

// CORS — only allow our frontend
/* ── Middleware ────────────────────────────────── */

// Updated CORS configuration to handle preflight handshake checks smoothly
const allowedOrigins = [
  "http://localhost:5173",          // Vite Local Development
  "https://shubhamsoni03.github.io" // Production Domain (No trailing slashes or paths)
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow server-to-server or postman requests with no origin header
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Blocked by CORS policy"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"], // 🌟 FIX: Must include OPTIONS for browser verification checks
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Parse JSON bodies (limit to 10kb to prevent abuse)
app.use(express.json({ limit: "10kb" }));

app.set("trust proxy", 1); // 🌟 FIX: Tell Express it is behind a secure proxy (Render)

// Rate limiting — max 5 submissions per IP per 15 minutes
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many submissions. Please try again after 15 minutes.",
  },
});

/* ── Nodemailer transporter ───────────────────── */

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,             // 🌟 CHANGE: Switch to port 587
  secure: false,         // 🌟 CHANGE: Must be false for port 587 (uses STARTTLS)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false // 🌟 FIX: Prevents cloud firewalls from dropping the handshake packet
  },
  connectionTimeout: 15000, // Extend wait limit to 15 seconds
});

/* ── Validation helpers ───────────────────────── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContactPayload(body) {
  const errors = [];

  if (!body.name || typeof body.name !== "string" || body.name.trim().length < 2) {
    errors.push("Name is required (min 2 characters).");
  }
  if (!body.email || !EMAIL_RE.test(body.email)) {
    errors.push("A valid email address is required.");
  }
  if (!body.subject || typeof body.subject !== "string" || body.subject.trim().length < 3) {
    errors.push("Subject is required (min 3 characters).");
  }
  if (!body.message || typeof body.message !== "string" || body.message.trim().length < 10) {
    errors.push("Message is required (min 10 characters).");
  }
  if (body.message && body.message.length > 5000) {
    errors.push("Message is too long (max 5000 characters).");
  }

  // Honeypot check — if this hidden field is filled, it's a bot
  if (body._honey) {
    errors.push("Spam detected.");
  }

  return errors;
}

/* ── Email template ───────────────────────────── */

function buildEmailHTML({ name, email, subject, message }) {
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
  </head>
  <body style="margin:0;padding:0;background:#0a0a0f;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:40px 20px;">
      <tr>
        <td align="center">
          <table width="580" cellpadding="0" cellspacing="0" style="background:#111827;border-radius:16px;border:1px solid rgba(62,207,178,0.2);overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#3ECFB2,#7C8FF6);padding:28px 32px;">
                <h1 style="margin:0;font-size:22px;color:#030508;font-weight:800;letter-spacing:-0.5px;">
                  📬 New Portfolio Message
                </h1>
                <p style="margin:6px 0 0;font-size:13px;color:rgba(3,5,8,0.7);">
                  ${timestamp}
                </p>
              </td>
            </tr>

            <!-- Sender Info -->
            <tr>
              <td style="padding:28px 32px 0;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1f35;border-radius:12px;border:1px solid rgba(124,143,246,0.15);">
                  <tr>
                    <td style="padding:18px 20px;">
                      <p style="margin:0 0 8px;font-size:11px;color:#7C8FF6;text-transform:uppercase;letter-spacing:2px;font-weight:700;">
                        From
                      </p>
                      <p style="margin:0 0 4px;font-size:18px;color:#EEF4FF;font-weight:700;">
                        ${name}
                      </p>
                      <a href="mailto:${email}" style="font-size:14px;color:#3ECFB2;text-decoration:none;">
                        ${email}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Subject -->
            <tr>
              <td style="padding:20px 32px 0;">
                <p style="margin:0 0 6px;font-size:11px;color:rgba(175,210,250,0.58);text-transform:uppercase;letter-spacing:2px;font-weight:700;">
                  Subject
                </p>
                <p style="margin:0;font-size:16px;color:#EEF4FF;font-weight:600;">
                  ${subject}
                </p>
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td style="padding:20px 32px 28px;">
                <p style="margin:0 0 10px;font-size:11px;color:rgba(175,210,250,0.58);text-transform:uppercase;letter-spacing:2px;font-weight:700;">
                  Message
                </p>
                <div style="background:#0d1120;border-radius:12px;border:1px solid rgba(120,170,255,0.11);padding:20px;">
                  <p style="margin:0;font-size:15px;color:#d1d5db;line-height:1.7;white-space:pre-wrap;">
${message}
                  </p>
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:18px 32px;border-top:1px solid rgba(120,170,255,0.11);text-align:center;">
                <p style="margin:0;font-size:11px;color:rgba(175,210,250,0.4);">
                  This message was sent via your portfolio contact form
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

/* ── Routes ────────────────────────────────────── */

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Contact form submission
app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    // Validate
    const errors = validateContactPayload(req.body);
    if (errors.length) {
      return res.status(400).json({ success: false, errors });
    }

    const { name, email, subject, message } = req.body;

    // Send email
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `[Portfolio] ${subject}`,
      html: buildEmailHTML({ name, email, subject, message }),
      text: `New message from ${name} (${email})\n\nSubject: ${subject}\n\n${message}`,
    });

    return res.json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    });
  } catch (err) {
    console.error("❌ Send error:", err.message);
    return res.status(500).json({
      success: false,
      error: "Failed to send message. Please try again later.",
    });
  }
});

/* ── Start ─────────────────────────────────────── */

app.listen(PORT, () => {
  console.log(`🚀 Contact API running on http://localhost:${PORT}`);
});
