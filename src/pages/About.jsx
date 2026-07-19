import { motion } from "framer-motion";
import { ABOUT_CONTENT, SITE_CONFIG } from "../config/site";
import { BLUE, CYAN, SILVER, BG, fadeUp, stagger, SectionLabel, GlassCard, CTAButton, CheckItem } from "../components/UI";

const GOLD = "#FFB800";

function InstructorHero() {
  const { instructor, bio, stats } = ABOUT_CONTENT;
  return (
    <section className="relative px-4 sm:px-6 md:px-16 py-24 overflow-hidden" style={{ background: BG }}>
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: `linear-gradient(rgba(30,111,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(30,111,255,1) 1px,transparent 1px)`, backgroundSize: "60px 60px" }} />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: `${BLUE}06`, transform: "translate(30%,-30%)" }} />

      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <motion.div {...fadeUp(0)} className="flex flex-col items-center md:items-start gap-6 text-center md:text-left">
          <div className="relative">
            <img
              src={instructor.avatar}
              alt={instructor.name}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-contain"
              style={{ background: "#0A0F1A", border: `1px solid ${BLUE}20` }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-3 rounded-2xl border border-dashed pointer-events-none"
              style={{ borderColor: `${BLUE}15` }}
            />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{instructor.name}</h1>
            <p className="text-sm mt-1" style={{ color: CYAN }}>{instructor.title}</p>
          </div>
          <CTAButton label="Follow on Instagram" href={SITE_CONFIG.links.instagram} />
        </motion.div>

        <motion.div {...fadeUp(0.15)} className="flex flex-col gap-5">
          <SectionLabel color={BLUE}>About</SectionLabel>
          {bio.map((para, i) => (
            <p key={i} className="text-sm leading-relaxed" style={{ color: "rgba(192,200,216,0.55)" }}>{para}</p>
          ))}
        </motion.div>
      </div>

      <motion.div
        {...fadeUp(0.25)}
        className="relative z-10 max-w-5xl mx-auto mt-14 grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {stats.map((s, i) => (
          <GlassCard key={i} className="p-4 sm:p-5 text-center" accent={s.color}>
            <p className="text-2xl sm:text-3xl font-black" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[11px] mt-1 uppercase tracking-widest" style={{ color: "rgba(192,200,216,0.35)" }}>{s.label}</p>
          </GlassCard>
        ))}
      </motion.div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="px-4 sm:px-6 md:px-16 py-16" style={{ background: BG, borderTop: `1px solid rgba(30,111,255,0.06)` }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)}>
          <SectionLabel color={GOLD}>Student Results</SectionLabel>
          <h2 className="font-black tracking-tight mb-10 text-white" style={{ fontSize: "clamp(22px,4vw,38px)" }}>
            Results that speak.
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ABOUT_CONTENT.testimonials.map((t, i) => (
            <motion.div key={i} {...stagger(i, 0.05)} whileHover={{ y: -4 }}>
              <GlassCard className="p-6 h-full flex flex-col justify-between gap-4" accent={GOLD}>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(192,200,216,0.55)" }}>"{t.text}"</p>
                <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  <span className="text-sm font-semibold text-white">{t.name}</span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg" style={{ background: `${GOLD}15`, color: GOLD }}>
                    {t.result}
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main>
      <InstructorHero />
      <Testimonials />
    </main>
  );
}
