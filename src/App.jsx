import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG, COURSES } from "./config/site";
import { BLUE, CYAN, SILVER, BG } from "./components/UI";
import LandingPage     from "./pages/Landing";
import CourseDetailPage from "./pages/CourseDetail";
import AboutPage       from "./pages/About";

// ─────────────────────────────────────────────────────────
// PAGES — เพิ่ม route ใหม่ได้โดย: เพิ่ม entry ตรงนี้ + import page
// ─────────────────────────────────────────────────────────
const PAGES = {
  home:   { label: "Home",    component: LandingPage      },
  course: { label: "Courses", component: CourseDetailPage },
  about:  { label: "About",   component: AboutPage        },
};

// ── Page transition variants ─────────────────────────────
const pageVariants = {
  initial: { opacity: 0, y: 20, filter: "blur(5px)"  },
  enter:   { opacity: 1, y: 0,  filter: "blur(0px)",
             transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -12, filter: "blur(3px)",
             transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
};

// ── Scroll progress bar ──────────────────────────────────
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el  = document.documentElement;
      const pct = el.scrollTop / (el.scrollHeight - el.clientHeight);
      setProgress(isNaN(pct) ? 0 : pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px]" style={{ background: "rgba(30,111,255,0.1)" }}>
      <motion.div
        className="h-full origin-left"
        style={{ scaleX: progress, background: `linear-gradient(90deg, ${BLUE}, ${CYAN})` }}
      />
    </div>
  );
}

// ── Global Nav ───────────────────────────────────────────
function Nav({ currentPage, navigate }) {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close mobile menu on page change
  useEffect(() => setMenuOpen(false), [currentPage]);

  const handleNav = (key) => { navigate(key); setMenuOpen(false); };

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1,  y: 0   }}
      transition={{ duration: 0.5 }}
      className="fixed top-[2px] left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(5,10,18,0.95)" : "rgba(5,10,18,0.6)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${scrolled ? "rgba(30,111,255,0.12)" : "transparent"}`,
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-10 py-3.5">

        {/* Logo */}
        <button
          onClick={() => handleNav("home")}
          className="flex items-center gap-2.5 shrink-0 group"
          aria-label="Vertex Analyst — Home"
        >
          <motion.img
            src={SITE_CONFIG.brand.logo}
            alt="Vertex Analyst"
            whileHover={{ scale: 1.05 }}
            className="w-8 h-8 object-contain"
          />
          <div className="hidden sm:block leading-none">
            <span className="font-black text-sm tracking-widest text-white uppercase">Vertex</span>
            <span className="font-black text-sm tracking-widest uppercase" style={{ color: BLUE }}> Analyst</span>
          </div>
        </button>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-7">
          {Object.entries(PAGES).map(([key, { label }]) => {
            const active = currentPage === key;
            return (
              <button
                key={key}
                onClick={() => handleNav(key)}
                className="relative text-[11px] uppercase tracking-[0.12em] font-semibold transition-colors"
                style={{ color: active ? CYAN : "rgba(192,200,216,0.4)" }}
              >
                {label}
                {/* CSS transition แทน layoutId — หลีกเลี่ยง animation conflict กับ page transition */}
                <span
                  className="absolute -bottom-1 left-0 right-0 h-px transition-opacity duration-200"
                  style={{
                    background: `linear-gradient(90deg, ${BLUE}, ${CYAN})`,
                    opacity: active ? 1 : 0,
                  }}
                />
              </button>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Quick-link to first course */}
          <motion.button
            onClick={() => handleNav("course")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="text-[11px] font-bold px-4 py-2 rounded-xl border transition-all"
            style={{
              background: `${BLUE}10`,
              borderColor: `${BLUE}30`,
              color: CYAN,
            }}
          >
            View Courses
          </motion.button>

          {/* Primary enroll CTA — ไปยัง Whop โดยตรง */}
          <motion.a
            href="https://whop.com/vertex-analyst-course"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="text-[11px] font-bold px-4 py-2 rounded-xl text-white"
            style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN})` }}
          >
            Enroll Now
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-[5px] p-2 -mr-1"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={
                menuOpen
                  ? i === 0 ? { rotate: 45,  y: 7,  opacity: 1 }
                  : i === 1 ? { opacity: 0 }
                  :           { rotate: -45, y: -7, opacity: 1 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.25 }}
              className="block w-5 h-[1.5px] rounded-full"
              style={{ background: "rgba(192,200,216,0.7)", transformOrigin: "center" }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t"
            style={{ borderColor: "rgba(30,111,255,0.1)", background: "rgba(5,10,18,0.98)" }}
          >
            <div className="flex flex-col px-5 py-4 gap-1">
              {Object.entries(PAGES).map(([key, { label }]) => (
                <button
                  key={key}
                  onClick={() => handleNav(key)}
                  className="text-left py-3 text-sm font-semibold transition-colors border-b"
                  style={{
                    color: currentPage === key ? CYAN : "rgba(192,200,216,0.5)",
                    borderColor: "rgba(30,111,255,0.06)",
                  }}
                >
                  {label}
                </button>
              ))}

              {/* Course quick-links on mobile */}
              <div className="pt-3 pb-1">
                <p className="text-[10px] uppercase tracking-widest mb-2.5" style={{ color: "rgba(192,200,216,0.25)" }}>
                  Courses
                </p>
                {COURSES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleNav("course")}
                    className="flex items-center justify-between w-full py-2.5 text-sm transition-colors"
                    style={{ color: "rgba(192,200,216,0.45)" }}
                  >
                    <span>{c.name}</span>
                    <span className="text-xs font-bold" style={{ color: c.color }}>{c.price}</span>
                  </button>
                ))}
              </div>

              <motion.a
                href="https://whop.com/vertex-analyst-course"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.97 }}
                className="mt-3 w-full py-3.5 rounded-xl text-sm font-bold text-white text-center block"
                style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN})` }}
              >
                Enroll Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ── Footer ───────────────────────────────────────────────
function Footer({ navigate }) {
  return (
    <footer
      className="border-t px-6 md:px-16 py-10"
      style={{ background: BG, borderColor: "rgba(30,111,255,0.08)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand */}
        <div>
          <button onClick={() => navigate("home")} className="flex items-center gap-2.5 mb-3">
            <img src={SITE_CONFIG.brand.logo} alt="Vertex Analyst" className="w-7 h-7 object-contain" />
            <div className="leading-none">
              <span className="font-black text-sm tracking-widest text-white uppercase">Vertex</span>
              <span className="font-black text-sm tracking-widest uppercase" style={{ color: BLUE }}> Analyst</span>
            </div>
          </button>
          <p className="text-xs max-w-xs leading-relaxed" style={{ color: "rgba(192,200,216,0.25)" }}>
            {SITE_CONFIG.brand.tagline}
          </p>
        </div>

        {/* Nav links */}
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {Object.entries(PAGES).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => navigate(key)}
              className="text-xs font-semibold transition-colors hover:opacity-80"
              style={{ color: "rgba(192,200,216,0.3)" }}
            >
              {label}
            </button>
          ))}
          <a
            href={SITE_CONFIG.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold transition-colors hover:opacity-80"
            style={{ color: CYAN }}
          >
            Instagram
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-6xl mx-auto mt-8 pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
        style={{ borderColor: "rgba(30,111,255,0.06)" }}
      >
        <p className="text-[11px]" style={{ color: "rgba(192,200,216,0.15)" }}>
          © {new Date().getFullYear()} Vertex Analyst. All rights reserved.
        </p>
        <p className="text-[10px] font-mono" style={{ color: "rgba(192,200,216,0.1)" }}>
          Past performance does not guarantee future results · Not financial advice
        </p>
      </div>
    </footer>
  );
}

// ── Root App ─────────────────────────────────────────────
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [displayPage, setDisplayPage] = useState("home");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigate = (page) => {
    if (page === currentPage || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "instant" });
    // ให้ exit animation (0.25s) จบก่อน mount หน้าใหม่
    setTimeout(() => {
      setDisplayPage(page);
      setIsTransitioning(false);
    }, 280);
  };

  const PageComponent = PAGES[displayPage]?.component ?? LandingPage;

  return (
    <div className="min-h-screen antialiased" style={{ background: BG, fontFamily: "'Space Grotesk', sans-serif" }}>
      <ScrollProgress />
      <Nav currentPage={currentPage} navigate={navigate} />

      <AnimatePresence mode="wait">
        <motion.div
          key={displayPage}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <PageComponent />
          <Footer navigate={navigate} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
