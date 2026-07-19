import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COURSES, SITE_CONFIG, ABOUT_CONTENT } from "../config/site";
import { BLUE, CYAN, SILVER, BG, fadeUp, stagger, SectionLabel, GlassCard, CTAButton, OutlineButton, CheckItem } from "../components/UI";
import TypeformModal from "../components/Typeform/TypeformModal";

const GOLD = "#FFB800";

// ── Course selector tab bar ──────────────────────────────
function CourseSelector({ courses, activeId, onSelect }) {
  return (
    <section className="px-4 sm:px-6 md:px-16 pt-24 pb-2" style={{ background: BG }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)}>
          <SectionLabel color={BLUE}>Choose Your Course</SectionLabel>
        </motion.div>
        <motion.div
          {...fadeUp(0.05)}
          className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap"
          style={{ scrollbarWidth: "none" }}
        >
          {courses.map((c) => {
            const active = c.id === activeId;
            return (
              <button
                key={c.id}
                onClick={() => onSelect(c.id)}
                className="relative shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border"
                style={{
                  background: active ? `${c.color}12` : "rgba(255,255,255,0.025)",
                  borderColor: active ? `${c.color}35` : "rgba(255,255,255,0.07)",
                  color: active ? c.color : "rgba(192,200,216,0.4)",
                }}
              >
                {c.name}
                {/* ใช้ CSS opacity transition แทน layoutId เพื่อหลีกเลี่ยง bug ตอน unmount */}
                <span
                  className="absolute -bottom-px left-3 right-3 h-[2px] rounded-full transition-opacity duration-200"
                  style={{
                    background: c.color,
                    opacity: active ? 1 : 0,
                  }}
                />
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ── Course Hero ──────────────────────────────────────────
function CourseHero({ course, openForm }) {
  return (
    <section className="relative px-4 sm:px-6 md:px-16 pt-8 pb-16 overflow-hidden" style={{ background: BG }}>
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(30,111,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,111,255,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none blur-3xl"
        style={{ background: `${course.color}06`, transform: "translate(30%, -30%)" }} />

      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_320px] gap-10 items-start">
        <div>
          {course.badge && (
            <motion.div {...fadeUp(0)}
              className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5 mb-5"
              style={{ borderColor: `${course.color}25`, background: `${course.color}08` }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: course.color }} />
              <span className="text-xs font-semibold tracking-widest" style={{ color: course.color }}>{course.badge}</span>
            </motion.div>
          )}
          <motion.h1 {...fadeUp(0.05)}
            className="font-black tracking-tight leading-[1.1] mb-4"
            style={{ fontSize: "clamp(26px,4.5vw,52px)", color: "#fff" }}
          >
            {course.title}
          </motion.h1>
          <motion.p {...fadeUp(0.1)}
            className="text-sm sm:text-base leading-relaxed mb-8 max-w-lg"
            style={{ color: "rgba(192,200,216,0.55)" }}
          >
            {course.tagline}
          </motion.p>

          <motion.div {...fadeUp(0.15)}>
            <SectionLabel color={course.color}>What You'll Get</SectionLabel>
            <div className="flex flex-col gap-2.5">
              {course.outcomes.map((o, i) => <CheckItem key={i} color={course.color}>{o}</CheckItem>)}
            </div>
          </motion.div>
        </div>

        {/* Sticky price card */}
        <motion.div {...fadeUp(0.2)} className="md:sticky md:top-24">
          <GlassCard className="p-6" accent={course.color}>
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-3xl sm:text-4xl font-black text-white">{course.price}</span>
              {course.originalPrice && <span className="text-sm line-through" style={{ color: "rgba(192,200,216,0.25)" }}>{course.originalPrice}</span>}
            </div>
            <p className="text-xs mb-5" style={{ color: "rgba(192,200,216,0.3)" }}>One-time · Lifetime access</p>
            <CTAButton label={SITE_CONFIG.cta.primary} onClick={openForm} className="w-full mb-3" />
            <OutlineButton label="Message us first" href={SITE_CONFIG.links.instagram} className="w-full" />
            <div className="mt-5 pt-5 border-t flex flex-col gap-2.5" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              {course.includes.map((item, i) => <CheckItem key={i} color={GOLD}>{item}</CheckItem>)}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

// ── For Whom ─────────────────────────────────────────────
function ForWhom({ course }) {
  return (
    <section className="px-4 sm:px-6 md:px-16 py-14" style={{ background: BG }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)}>
          <SectionLabel color={GOLD}>Who This Is For</SectionLabel>
          <h2 className="font-black tracking-tight mb-8 text-white" style={{ fontSize: "clamp(22px,3.5vw,34px)" }}>
            Is this course right for you?
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
          {course.forWhom.map((item, i) => (
            <motion.div key={i} {...stagger(i, 0.05)} whileHover={{ x: 4 }}>
              <GlassCard className="p-4 flex items-start gap-3" accent={GOLD}>
                <span className="text-base mt-0.5 shrink-0" style={{ color: GOLD }}>◆</span>
                <span className="text-sm leading-relaxed" style={{ color: SILVER }}>{item}</span>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Curriculum ───────────────────────────────────────────
function Curriculum({ course }) {
  const [open, setOpen] = useState(null);
  return (
    <section className="px-4 sm:px-6 md:px-16 py-14" style={{ background: BG, borderTop: `1px solid rgba(30,111,255,0.06)` }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)}>
          <SectionLabel color={course.color}>Curriculum</SectionLabel>
          <h2 className="font-black tracking-tight mb-8 text-white" style={{ fontSize: "clamp(22px,3.5vw,34px)" }}>
            What you'll learn
          </h2>
        </motion.div>
        <div className="flex flex-col gap-3 max-w-2xl">
          {course.modules.map((mod, i) => (
            <motion.div key={i} {...stagger(i, 0.05)}>
              <GlassCard accent={open === i ? course.color : undefined}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold font-mono w-7 shrink-0" style={{ color: course.color }}>{mod.number}</span>
                    <span className="text-sm font-bold text-white">{mod.title}</span>
                  </div>
                  <motion.span
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-lg shrink-0 ml-4"
                    style={{ color: "rgba(192,200,216,0.3)" }}
                  >⌄</motion.span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 flex flex-col gap-2 border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                        {mod.lessons.map((lesson, j) => (
                          <div key={j} className="flex items-start gap-3 py-1">
                            <span className="text-xs mt-0.5 shrink-0" style={{ color: course.color }}>▸</span>
                            <span className="text-sm" style={{ color: "rgba(192,200,216,0.6)" }}>{lesson}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ──────────────────────────────────────────────────
function FAQ({ course }) {
  const [open, setOpen] = useState(null);
  return (
    <section className="px-4 sm:px-6 md:px-16 py-14" style={{ background: BG, borderTop: `1px solid rgba(30,111,255,0.06)` }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)}>
          <SectionLabel color={GOLD}>FAQ</SectionLabel>
          <h2 className="font-black tracking-tight mb-8 text-white" style={{ fontSize: "clamp(22px,3.5vw,34px)" }}>Common questions</h2>
        </motion.div>
        <div className="flex flex-col gap-3 max-w-2xl">
          {course.faq.map((item, i) => (
            <motion.div key={i} {...stagger(i, 0.05)}>
              <GlassCard>
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left gap-4">
                  <span className="text-sm font-semibold text-white">{item.q}</span>
                  <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.25 }}
                    className="text-lg shrink-0" style={{ color: "rgba(192,200,216,0.3)" }}>⌄</motion.span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 pt-1 text-sm leading-relaxed border-t" style={{ color: "rgba(192,200,216,0.5)", borderColor: "rgba(255,255,255,0.04)" }}>
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Bottom CTA ───────────────────────────────────────────
function BottomCTA({ course, openForm }) {
  return (
    <section className="px-4 sm:px-6 md:px-16 py-20" style={{ background: BG }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          {...fadeUp(0)}
          className="relative overflow-hidden rounded-3xl border p-8 sm:p-12 flex flex-col items-center text-center gap-6"
          style={{ background: `linear-gradient(135deg, rgba(30,111,255,0.05), rgba(0,194,255,0.03))`, borderColor: `${course.color}18` }}
        >
          <div className="absolute -top-24 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ background: `${course.color}07` }} />
          <h2 className="font-black tracking-tight text-white relative z-10" style={{ fontSize: "clamp(22px,4vw,36px)" }}>
            Your edge starts here.
          </h2>
          <p className="text-sm max-w-md leading-relaxed relative z-10" style={{ color: "rgba(192,200,216,0.4)" }}>
            Join {ABOUT_CONTENT.stats[1].value} students trading with quantitative systems — not gut feel.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 relative z-10 w-full sm:w-auto">
            <CTAButton label={`${SITE_CONFIG.cta.primary} — ${course.price}`} onClick={openForm} />
            <OutlineButton label="Message on Instagram" href={SITE_CONFIG.links.instagram} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Page export ──────────────────────────────────────────
export default function CourseDetailPage() {
  const [activeId, setActiveId] = useState(COURSES[0].id);
  const [formOpen, setFormOpen] = useState(false);
  const course = COURSES.find((c) => c.id === activeId) ?? COURSES[0];

  return (
    <main>
      <CourseSelector courses={COURSES} activeId={activeId} onSelect={setActiveId} />
      <AnimatePresence mode="wait">
        <motion.div key={course.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
          <CourseHero course={course} openForm={() => setFormOpen(true)} />
          <ForWhom course={course} />
          <Curriculum course={course} />
          <FAQ course={course} />
          <BottomCTA course={course} openForm={() => setFormOpen(true)} />
        </motion.div>
      </AnimatePresence>
      <TypeformModal open={formOpen} onClose={() => setFormOpen(false)} course={course} />
    </main>
  );
}
