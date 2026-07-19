import { motion } from "framer-motion";
import { SITE_CONFIG } from "../../config/site";

// ── Vertex Design Tokens ─────────────────────────────────
export const BLUE    = "#1E6FFF";   // primary electric blue
export const CYAN    = "#00C2FF";   // secondary cyan
export const SILVER  = "#C0C8D8";   // metallic silver text
export const BG      = "#050A12";   // near-black navy
export const SURFACE = "#0A1220";   // card surface
export const BORDER  = "rgba(30,111,255,0.15)";

// ── Animation presets ────────────────────────────────────
export const fadeUp = (delay = 0, duration = 0.65) => ({
  initial:     { opacity: 0, y: 24, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0,  filter: "blur(0px)" },
  viewport:    { once: true, margin: "-60px" },
  transition:  { duration, delay, ease: [0.16, 1, 0.3, 1] },
});

export const stagger = (i, base = 0) => ({
  initial:     { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-40px" },
  transition:  { duration: 0.5, delay: base + i * 0.08, ease: [0.16, 1, 0.3, 1] },
});

// ── Logo component ───────────────────────────────────────
export function Logo({ size = 32, showText = true }) {
  return (
    <div className="flex items-center gap-2.5">
      <img
        src={SITE_CONFIG.brand.logo}
        alt="Vertex Analyst"
        style={{ width: size, height: size, objectFit: "contain" }}
      />
      {showText && (
        <div className="leading-none">
          <span className="font-black text-sm tracking-widest text-white uppercase">Vertex</span>
          <span className="font-black text-sm tracking-widest uppercase" style={{ color: BLUE }}> Analyst</span>
        </div>
      )}
    </div>
  );
}

// ── Section label ────────────────────────────────────────
export function SectionLabel({ color = BLUE, children }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="w-6 h-px" style={{ background: color }} />
      <span className="text-[10px] uppercase tracking-[0.18em] font-semibold" style={{ color: `${color}90` }}>
        {children}
      </span>
    </div>
  );
}

// ── Glass card ───────────────────────────────────────────
export function GlassCard({ children, className = "", style = {}, accent }) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden backdrop-blur-xl border ${className}`}
      style={{
        background: `linear-gradient(135deg, rgba(10,18,32,0.9), rgba(5,10,18,0.95))`,
        borderColor: accent ? `${accent}30` : BORDER,
        boxShadow: accent ? `0 0 0 1px ${accent}10 inset` : undefined,
        ...style,
      }}
    >
      {accent && (
        <div
          className="absolute top-0 left-6 right-6 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }}
        />
      )}
      {children}
    </div>
  );
}

// ── Primary CTA button ───────────────────────────────────
// supports onClick (open modal) or href (direct link)
export function CTAButton({ label, href, onClick, className = "" }) {
  const Tag = onClick ? motion.button : motion.a;
  const tagProps = onClick
    ? { onClick }
    : { href: href ?? SITE_CONFIG.links.instagram, target: "_blank", rel: "noopener noreferrer" };

  return (
    <Tag
      {...tagProps}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white overflow-hidden transition-all ${className}`}
      style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN})` }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)" }}
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
      />
      <span className="relative z-10">{label}</span>
      <span className="relative z-10 text-base">→</span>
    </Tag>
  );
}

// ── Outline button ───────────────────────────────────────
export function OutlineButton({ label, href, onClick, className = "" }) {
  const Tag = onClick ? motion.button : motion.a;
  const tagProps = onClick
    ? { onClick }
    : { href, target: "_blank", rel: "noopener noreferrer" };

  return (
    <Tag
      {...tagProps}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-semibold text-sm border transition-all ${className}`}
      style={{
        background: "rgba(30,111,255,0.06)",
        borderColor: "rgba(30,111,255,0.25)",
        color: SILVER,
      }}
    >
      {label}
    </Tag>
  );
}

// ── Check list item ──────────────────────────────────────
export function CheckItem({ children, color = BLUE }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-sm mt-0.5 shrink-0 font-bold" style={{ color }}>✓</span>
      <span className="text-sm leading-relaxed" style={{ color: SILVER }}>{children}</span>
    </div>
  );
}
