import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { SITE_CONFIG, COURSES, ABOUT_CONTENT } from "../config/site";
import { BLUE, CYAN, SILVER, BG, fadeUp, stagger, SectionLabel, GlassCard, CTAButton, OutlineButton, CheckItem } from "../components/UI";
import TypeformModal from "../components/Typeform/TypeformModal";

// ── Ticker data ──────────────────────────────────────────
const TICKERS = [
  { s:"SPX",  p:"5,278.71", c:"+0.65%", up:true  },
  { s:"NDX",  p:"18,573.13",c:"+0.72%", up:true  },
  { s:"DXY",  p:"104.32",   c:"-0.18%", up:false },
  { s:"VIX",  p:"13.21",    c:"-3.14%", up:false },
  { s:"BTC",  p:"67,842",   c:"+1.35%", up:true  },
  { s:"ETH",  p:"3,456",    c:"+1.20%", up:true  },
  { s:"GLD",  p:"2,341.50", c:"+0.42%", up:true  },
  { s:"AAPL", p:"189.42",   c:"+1.24%", up:true  },
];

// ── Ticker tape ──────────────────────────────────────────
function TickerTape() {
  const doubled = [...TICKERS, ...TICKERS, ...TICKERS];
  return (
    <div
      className="relative overflow-hidden py-2 border-y"
      style={{ background: "rgba(5,10,18,0.9)", borderColor: "rgba(30,111,255,0.1)" }}
    >
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ width: "max-content" }}
      >
        {doubled.map((t, i) => (
          <div key={i} className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-bold tracking-widest" style={{ color: "rgba(192,200,216,0.4)" }}>{t.s}</span>
            <span className="text-[11px] font-mono" style={{ color: SILVER }}>{t.p}</span>
            <span className="text-[11px] font-mono font-semibold" style={{ color: t.up ? CYAN : "#FF4D6A" }}>{t.c}</span>
            <span className="text-white/10 text-xs">·</span>
          </div>
        ))}
      </motion.div>
      <div className="absolute inset-y-0 left-0 w-16 pointer-events-none" style={{ background: `linear-gradient(90deg, ${BG}, transparent)` }} />
      <div className="absolute inset-y-0 right-0 w-16 pointer-events-none" style={{ background: `linear-gradient(-90deg, ${BG}, transparent)` }} />
    </div>
  );
}

// ── Course selector pills ────────────────────────────────
function CoursePills({ courses, activeId, onSelect }) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap"
      style={{ scrollbarWidth: "none" }}
    >
      {courses.map((c) => {
        const active = c.id === activeId;
        return (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className="relative shrink-0 px-4 py-2 rounded-full text-xs sm:text-[13px] font-semibold whitespace-nowrap transition-all border"
            style={{
              background: active ? `${c.color}18` : "rgba(255,255,255,0.03)",
              borderColor: active ? `${c.color}40` : "rgba(255,255,255,0.07)",
              color: active ? c.color : "rgba(192,200,216,0.4)",
            }}
          >
            {c.name}
            {/* CSS opacity แทน layoutId เพื่อหลีกเลี่ยง Framer Motion bug ตอน unmount */}
            <span
              className="absolute inset-0 rounded-full transition-opacity duration-200"
              style={{
                background: `${c.color}08`,
                opacity: active ? 1 : 0,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

// ── Magnetic CTA button ──────────────────────────────────
function MagneticCTA({ label, onClick, color = BLUE }) {
  const ref = useRef(null);
  const springX = useSpring(0, { stiffness: 200, damping: 20 });
  const springY = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    springX.set((e.clientX - (r.left + r.width  / 2)) * 0.3);
    springY.set((e.clientY - (r.top  + r.height / 2)) * 0.3);
  };
  const handleLeave = () => { springX.set(0); springY.set(0); };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      style={{ x: springX, y: springY, background: `linear-gradient(135deg, ${color}, ${CYAN})` }}
      className="relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-white overflow-hidden group"
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)" }}
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 1.5 }}
      />
      <span className="relative z-10">{label}</span>
      <motion.span
        className="relative z-10 text-xl"
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        →
      </motion.span>
    </motion.button>
  );
}

// ── Hero Section ─────────────────────────────────────────
function HeroSection({ course, activeId, onSelectCourse, openForm }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bannerY = useTransform(scrollYProgress, [0, 1], [0, 120]); // parallax on banner

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: BG, minHeight: "100vh" }}>
      {/* ── Banner image (parallax) ── */}
      <motion.div
        style={{ y: bannerY }}
        className="absolute inset-0 z-0"
      >
        <img
          src={SITE_CONFIG.brand.banner}
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.35 }}
        />
        {/* Dark gradient overlay — ensures text is readable */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom,
              rgba(5,10,18,0.4) 0%,
              rgba(5,10,18,0.55) 40%,
              rgba(5,10,18,0.85) 75%,
              ${BG} 100%
            )`,
          }}
        />
        {/* Left side darkening for text contrast */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(5,10,18,0.7) 0%, transparent 60%)" }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col" style={{ minHeight: "100vh" }}>
        {/* Ticker */}
        <div className="pt-[68px]">
          <TickerTape />
        </div>

        {/* Main hero content */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-16 py-16 max-w-5xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5 mb-6 self-start"
            style={{ borderColor: `${BLUE}30`, background: `${BLUE}0A` }}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full inline-block"
              style={{ background: CYAN }}
            />
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: CYAN }}>
              {course.badge}
            </span>
          </motion.div>

          {/* Tagline above headline — matches banner */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xs uppercase tracking-[0.22em] font-semibold mb-3"
            style={{ color: `${BLUE}90` }}
          >
            Quantitative Intelligence. Systematic Execution.
          </motion.p>

          {/* Headline */}
          <motion.h1
            key={`hero-${course.id}`}
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-black leading-[1.05] tracking-tight mb-4"
            style={{ fontSize: "clamp(32px,5.5vw,68px)", color: "#fff" }}
          >
            {course.title.split(":")[0]}
            {course.title.includes(":") && (
              <>
                :<br />
                <span style={{ background: `linear-gradient(90deg, ${BLUE}, ${CYAN})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {course.title.split(":")[1]}
                </span>
              </>
            )}
          </motion.h1>

          <motion.p
            key={`tagline-${course.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="text-base leading-relaxed mb-8 max-w-lg"
            style={{ color: "rgba(192,200,216,0.6)" }}
          >
            {course.tagline}
          </motion.p>

          {/* Course selector pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="mb-8"
          >
            <p className="text-[10px] uppercase tracking-widest mb-3" style={{ color: "rgba(192,200,216,0.3)" }}>Select Course</p>
            <CoursePills courses={COURSES} activeId={activeId} onSelect={onSelectCourse} />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
          >
            <MagneticCTA label={SITE_CONFIG.cta.primary} onClick={openForm} color={course.color} />
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">{course.price}</span>
              {course.originalPrice && (
                <span className="text-sm line-through" style={{ color: "rgba(192,200,216,0.3)" }}>{course.originalPrice}</span>
              )}
            </div>
          </motion.div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-xs mt-4"
            style={{ color: "rgba(192,200,216,0.25)" }}
          >
            🔒 Secure via Whop · Lifetime access
          </motion.p>
        </div>
      </div>
    </section>
  );
}

// ── Stats bar ────────────────────────────────────────────
function StatsBar() {
  return (
    <section style={{ background: BG, borderTop: `1px solid rgba(30,111,255,0.08)` }}>
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px"
        style={{ borderBottom: "1px solid rgba(30,111,255,0.08)" }}>
        {ABOUT_CONTENT.stats.map((s, i) => (
          <motion.div key={i} {...fadeUp(i * 0.07)}
            className="flex flex-col items-center justify-center py-8 px-4 text-center"
            style={{ background: "rgba(10,18,32,0.6)" }}
          >
            <span className="text-3xl font-black" style={{ color: s.color }}>{s.value}</span>
            <span className="text-xs mt-1 uppercase tracking-widest" style={{ color: "rgba(192,200,216,0.35)" }}>{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── Outcomes section ─────────────────────────────────────
function OutcomesSection({ course }) {
  return (
    <section className="px-6 md:px-16 py-20" style={{ background: BG }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)}>
          <SectionLabel color={course.color}>What You'll Master</SectionLabel>
          <h2 className="font-black tracking-tight mb-12" style={{ fontSize: "clamp(24px,4vw,40px)", color: "#fff" }}>
            After this course you will<br />
            <span style={{ color: course.color }}>trade differently.</span>
          </h2>
        </motion.div>
        <div key={course.id} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {course.outcomes.map((outcome, i) => (
            <motion.div key={i} {...stagger(i, 0)} whileHover={{ y: -4 }}>
              <GlassCard className="p-6 h-full" accent={course.color}>
                <p className="text-3xl font-black mb-3" style={{ color: course.color }}>0{i + 1}</p>
                <p className="text-sm leading-relaxed" style={{ color: SILVER }}>{outcome}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonial ticker ───────────────────────────────────
function TestimonialTicker() {
  const items = [...ABOUT_CONTENT.testimonials, ...ABOUT_CONTENT.testimonials, ...ABOUT_CONTENT.testimonials];
  return (
    <section className="py-14 overflow-hidden" style={{ background: BG, borderTop: `1px solid rgba(30,111,255,0.06)` }}>
      <p className="text-center text-[10px] uppercase tracking-[0.2em] mb-8" style={{ color: "rgba(192,200,216,0.2)" }}>
        Student Results
      </p>
      <div className="relative">
        <motion.div
          className="flex gap-4"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ width: "max-content" }}
        >
          {items.map((t, i) => (
            <GlassCard key={i} className="shrink-0 w-72 p-5" accent={BLUE}>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(192,200,216,0.55)" }}>"{t.text}"</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">{t.name}</span>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg" style={{ background: `${BLUE}15`, color: CYAN }}>
                  {t.result}
                </span>
              </div>
            </GlassCard>
          ))}
        </motion.div>
        <div className="absolute inset-y-0 left-0 w-24 pointer-events-none" style={{ background: `linear-gradient(90deg, ${BG}, transparent)` }} />
        <div className="absolute inset-y-0 right-0 w-24 pointer-events-none" style={{ background: `linear-gradient(-90deg, ${BG}, transparent)` }} />
      </div>
    </section>
  );
}

// ── Pricing CTA ──────────────────────────────────────────
function PricingCTA({ course, openForm }) {
  return (
    <section className="px-6 md:px-16 py-20" style={{ background: BG }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          {...fadeUp(0)}
          className="relative overflow-hidden rounded-3xl border p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left"
          style={{ background: `linear-gradient(135deg, rgba(30,111,255,0.06), rgba(0,194,255,0.04))`, borderColor: `${course.color}20` }}
        >
          {/* Glow blobs */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: `${course.color}08` }} />
          <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ background: `${CYAN}05` }} />

          <div key={course.id} className="relative z-10">
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: `${course.color}80` }}>
              {course.name} · Enroll Today
            </p>
            <h2 className="font-black tracking-tight mb-4 text-white" style={{ fontSize: "clamp(22px,4vw,38px)" }}>
              Ready to trade with<br />
              <span style={{ background: `linear-gradient(90deg, ${course.color}, ${CYAN})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                a systematic edge?
              </span>
            </h2>
            <div className="flex items-baseline gap-3 justify-center md:justify-start mb-2">
              <span className="text-4xl font-black text-white">{course.price}</span>
              {course.originalPrice && <span className="text-lg line-through" style={{ color: "rgba(192,200,216,0.25)" }}>{course.originalPrice}</span>}
            </div>
            <p className="text-sm" style={{ color: "rgba(192,200,216,0.35)" }}>One-time · Lifetime access · 7-day refund</p>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-3 shrink-0 w-full md:w-auto">
            <MagneticCTA label={SITE_CONFIG.cta.primary} onClick={openForm} color={course.color} />
            <a href={SITE_CONFIG.links.instagram} target="_blank" rel="noopener noreferrer"
              className="text-xs transition-colors hover:opacity-80" style={{ color: "rgba(192,200,216,0.3)" }}>
              Questions? Message us on Instagram →
            </a>
            <div className="flex gap-4 mt-1">
              {["🔒 Secure via Whop", "∞ Lifetime"].map((b) => (
                <span key={b} className="text-[10px]" style={{ color: "rgba(192,200,216,0.2)" }}>{b}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Page export ──────────────────────────────────────────
export default function LandingPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [activeId, setActiveId] = useState(COURSES[0].id);
  const course = COURSES.find((c) => c.id === activeId) ?? COURSES[0];

  return (
    <main>
      <HeroSection course={course} activeId={activeId} onSelectCourse={setActiveId} openForm={() => setFormOpen(true)} />
      <StatsBar />
      <OutcomesSection course={course} />
      <TestimonialTicker />
      <PricingCTA course={course} openForm={() => setFormOpen(true)} />
      <TypeformModal open={formOpen} onClose={() => setFormOpen(false)} course={course} />
    </main>
  );
}
