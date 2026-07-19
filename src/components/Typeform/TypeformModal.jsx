import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "../../config/site";
import { BLUE, CYAN, SILVER } from "../UI";

// ─────────────────────────────────────────────────────────
// Lead → Checkout Modal
// Flow: Typeform (qualify) → Checkout (summary + info) → Whop payment
// แก้ URL Whop ที่ course.whopUrl ใน config/site.js
// ─────────────────────────────────────────────────────────

export default function TypeformModal({ open, onClose, course }) {
  const [step, setStep]         = useState("form");
  const [customer, setCustomer] = useState({ name: "", email: "" });

  const { formId, headline, subtext } = SITE_CONFIG.typeform;
  const whopUrl = course?.whopUrl ?? SITE_CONFIG.payment.defaultWhopUrl;

  // ── Typeform submit event listener ──────────────────────
  useEffect(() => {
    const handleMessage = (event) => {
      if (!event.origin.includes("typeform.com")) return;
      if (event.data?.type === "form-submit") setStep("checkout");
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Reset state on close
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setStep("form");
        setCustomer({ name: "", email: "" });
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Esc to close
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, onClose]);

  // Build Whop URL with query params
  // แก้ parameter names ให้ตรงกับ Whop requirements ของคุณ
  const buildWhopUrl = () => {
    try {
      const url = new URL(whopUrl);
      if (course?.id)     url.searchParams.set("ref",   course.id);
      if (customer.email) url.searchParams.set("email", customer.email);
      if (customer.name)  url.searchParams.set("name",  customer.name);
      return url.toString();
    } catch { return whopUrl; }
  };

  const canPay = customer.name.trim().length > 0 && customer.email.includes("@");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(5,10,18,0.92)", backdropFilter: "blur(10px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1   }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-3xl overflow-hidden border flex flex-col"
            style={{
              background: "linear-gradient(160deg, #0A1220, #050A12)",
              borderColor: "rgba(30,111,255,0.2)",
              maxHeight: "90vh",
              boxShadow: `0 0 60px rgba(30,111,255,0.1)`,
            }}
          >
            {/* Top gradient accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent 10%, ${BLUE}, ${CYAN}, transparent 90%)` }}
            />

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}
            >
              ✕
            </button>

            {/* Step indicator */}
            <div className="flex items-center gap-2 px-6 sm:px-7 pt-5 pb-0 shrink-0">
              {[
                { key: "form",     label: "Qualify"  },
                { key: "checkout", label: "Checkout" },
              ].map((s, i) => {
                const done   = i === 0 && step === "checkout";
                const active = s.key === step;
                return (
                  <div key={s.key} className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all"
                      style={{
                        background: active ? `linear-gradient(135deg, ${BLUE}, ${CYAN})` : done ? "rgba(30,111,255,0.3)" : "rgba(255,255,255,0.06)",
                        color: active ? "#fff" : done ? CYAN : "rgba(255,255,255,0.25)",
                      }}
                    >
                      {done ? "✓" : i + 1}
                    </div>
                    <span className="text-[10px] uppercase tracking-widest" style={{ color: active ? SILVER : "rgba(255,255,255,0.2)" }}>
                      {s.label}
                    </span>
                    {i === 0 && (
                      <div className="w-6 h-px mx-1" style={{ background: step === "checkout" ? `${BLUE}60` : "rgba(255,255,255,0.08)" }} />
                    )}
                  </div>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {/* ── STEP 1: Typeform ── */}
              {step === "form" && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col flex-1"
                >
                  <div className="px-6 sm:px-7 pt-4 pb-3 shrink-0">
                    <h2 className="text-lg sm:text-xl font-black text-white tracking-tight mb-1">
                      {headline}
                    </h2>
                    <p className="text-sm" style={{ color: "rgba(192,200,216,0.5)" }}>{subtext}</p>
                  </div>
                  <div className="flex-1 min-h-[420px] sm:min-h-[460px]">
                    <iframe
                      src={`https://form.typeform.com/to/fv98GquN?typeform-medium=embed-snippet`}
                      title="Qualification Form"
                      className="w-full h-full border-0"
                      style={{ minHeight: 420 }}
                      allow="camera; microphone; autoplay; encrypted-media;"
                    />
                  </div>
                </motion.div>
              )}

              {/* ── STEP 2: Checkout → Whop ── */}
              {step === "checkout" && (
                <motion.div
                  key="checkout"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="px-6 sm:px-7 pt-5 pb-7 overflow-y-auto"
                >
                  {/* Qualified badge */}
                  <div className="flex items-center gap-2 mb-5">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1,   opacity: 1  }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
                      style={{ background: "rgba(30,111,255,0.15)", color: CYAN }}
                    >
                      ✓
                    </motion.div>
                    <span className="text-sm font-semibold text-white">Application approved — complete your enrollment below</span>
                  </div>

                  {/* Course summary card */}
                  <div
                    className="rounded-2xl border p-4 mb-5"
                    style={{
                      background: "rgba(30,111,255,0.05)",
                      borderColor: "rgba(30,111,255,0.2)",
                    }}
                  >
                    <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: "rgba(192,200,216,0.35)" }}>
                      Selected Course
                    </p>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold text-white">{course?.title ?? course?.name ?? "Course"}</p>
                        <p className="text-xs mt-0.5" style={{ color: SILVER + "80" }}>{course?.badge}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xl font-black" style={{ color: CYAN }}>{course?.price}</p>
                        {course?.originalPrice && (
                          <p className="text-xs line-through" style={{ color: "rgba(255,255,255,0.2)" }}>
                            {course.originalPrice}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Customer info form */}
                  <div className="flex flex-col gap-3 mb-5">
                    {[
                      { key: "name",  label: "Full Name",     type: "text",  placeholder: "e.g. John Smith"       },
                      { key: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
                    ].map((f) => (
                      <div key={f.key}>
                        <label className="text-xs mb-1.5 block" style={{ color: "rgba(192,200,216,0.4)" }}>{f.label}</label>
                        <input
                          type={f.type}
                          value={customer[f.key]}
                          onChange={(e) => setCustomer((c) => ({ ...c, [f.key]: e.target.value }))}
                          placeholder={f.placeholder}
                          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 border outline-none transition-all"
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            borderColor: "rgba(30,111,255,0.12)",
                          }}
                          onFocus={(e) => e.target.style.borderColor = `${BLUE}60`}
                          onBlur={(e)  => e.target.style.borderColor = "rgba(30,111,255,0.12)"}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Whop checkout button */}
                  {/* URL ที่ course.whopUrl ใน config/site.js */}
                  <motion.a
                    href={canPay ? buildWhopUrl() : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => { if (!canPay) e.preventDefault(); }}
                    whileHover={canPay ? { scale: 1.02 } : {}}
                    whileTap={canPay  ? { scale: 0.98 } : {}}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-bold text-sm text-white relative overflow-hidden transition-opacity"
                    style={{
                      background: canPay
                        ? `linear-gradient(135deg, ${BLUE}, ${CYAN})`
                        : "rgba(30,111,255,0.25)",
                      opacity: canPay ? 1 : 0.5,
                      cursor:  canPay ? "pointer" : "not-allowed",
                    }}
                  >
                    {canPay && (
                      <motion.div
                        className="absolute inset-0"
                        style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)" }}
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.5 }}
                      />
                    )}
                    <span className="relative z-10">Proceed to Checkout</span>
                    <span className="relative z-10 font-black" style={{ color: "rgba(255,255,255,0.7)" }}>
                      — {course?.price}
                    </span>
                    <span className="relative z-10">→</span>
                  </motion.a>

                  <p className="text-[11px] text-center mt-2.5 leading-relaxed" style={{ color: "rgba(192,200,216,0.25)" }}>
                    {SITE_CONFIG.payment.note}
                  </p>

                  {/* IG fallback */}
                  <div className="mt-5 pt-4 border-t text-center" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                    <p className="text-xs mb-2" style={{ color: "rgba(192,200,216,0.25)" }}>Prefer to ask questions first?</p>
                    <a
                      href={SITE_CONFIG.links.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold transition-colors hover:opacity-80"
                      style={{ color: CYAN }}
                    >
                      Message us on Instagram →
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
