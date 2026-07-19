// ============================================================
// VERTEX ANALYST — SITE CONFIG
// แก้ที่นี่ที่เดียวเพื่ออัปเดตทั้งเว็บ
// ============================================================

export const SITE_CONFIG = {

  // ── Brand ────────────────────────────────────────────────
  brand: {
    name:    "Vertex Analyst",
    tagline: "QUANTITATIVE EDGE. SYSTEMATIC ADVANTAGE.",
    logo:    "/assets/logo.png",
    banner:  "/assets/banner.png",
  },

  // ── Social / CTA Links ──────────────────────────────────
  links: {
    instagram: "https://www.instagram.com/miraivisi.onx/",
    line:      "https://line.me/ti/p/OH0dfpmMw_",
    facebook:  "https://facebook.com/YOUR_PAGE",
  },

  // ── CTA ─────────────────────────────────────────────────
  cta: {
    primary:   "Enroll Now",
    secondary: "View Course Details",
  },

  // ── Typeform ─────────────────────────────────────────────
  typeform: {
    formId:   "AbCd1234",   // ← แก้ Form ID
    headline: "Quick qualification — 3 questions",
    subtext:  "Takes under 60 seconds. Helps us match you to the right course.",
  },

  // ── Payment — Whop ───────────────────────────────────────
  // แก้ URL Whop ของแต่ละคอร์สใน COURSES.whopUrl ด้านล่าง
  // ตัวนี้เป็น fallback ถ้าคอร์สไม่มี whopUrl กำหนดเอง
  payment: {
    defaultWhopUrl: "https://whop.com/vertex-analyst-course",
    note: "Secure checkout via Whop · Credit card & crypto accepted",
  },
};

// ============================================================
// COURSES — เพิ่ม / แก้ / ลด คอร์สได้ที่นี่
// ============================================================

export const COURSES = [
  {
    id:       "price-action",
    name:     "Price Action",             // ← ชื่อบนแท็บเลือกคอร์ส
    badge:    "New Cohort Open",
    color:    "#1E6FFF",                  // ← สีประจำคอร์ส (ใช้กับ accent/highlight)

    // ── Whop Checkout URL ──────────────────────────────────
    // แก้ URL Whop ของแต่ละคอร์สตรงนี้
    whopUrl:  "https://whop.com/checkout/plan_j25GhcVW4ObT8",

    title:    "Price Action Mastery",
    tagline:  "Read markets the way institutions do — before the move happens.",
    price:    "€129.99",
    originalPrice: "€220.98",

    forWhom: [
      "Traders struggling with consistency and discipline",
      "Beginners who want a proven, rules-based system",
      "Anyone losing money following indicators blindly",
      "Traders who want to read price structure, not noise",
    ],

    outcomes: [
      "Read market structure",
      "Build and backtest your own PA entry system",
      "Manage risk with precision — position sizing & stops",
      "Control trading psychology and eliminate emotional errors",
      "Lifetime Community",
    ],

    modules: [
      {
        number: "01",
        title:  "Market Structure & Context",
        lessons: [
          "How smart money moves price",
          "Break of structure (BOS) & change of character (ChoCH)",
          "Premium & discount zones",
        ],
      },
      {
        number: "02",
        title:  "Entry Models",
        lessons: [
          "Order blocks & fair value gaps",
          "Liquidity sweeps & stop hunts",
          "Multi-timeframe confirmation",
        ],
      },
      {
        number: "03",
        title:  "Risk & Trade Management",
        lessons: [
          "Position sizing by risk % not lot size",
          "Drawdown management protocols",
          "Trade journaling & review system",
        ],
      },
      {
        number: "04",
        title:  "Mentorship",
        lessons: [
          "Real portfolio case studies",
          "Q&A and community support",
        ],
      },
    ],

    includes: [
      "5+ video lessons (HD)",
      "PDF playbooks per module",
      "Journal & checklist templates",
      "Private Discord community",
      "Lifetime access & updates",
    ],

    faq: [
      { q: "Do I need prior experience?", a: "No. The course starts from zero and builds systematically." },
      { q: "How long do I have access?", a: "Lifetime — including all future updates at no extra cost." },
      { q: "Is there a refund policy?", a: "No refund under any circumstances." },
      { q: "What markets does this cover?", a: "Forex, indices, crypto, and equities — the concepts are universal." },
    ],
  },

  {
    id:       "options",
    name:     "Orderflow",
    badge:    "Limited — 10 Seats for month",
    color:    "#00C2FF",

    whopUrl:  "https://whop.com/checkout/plan_gCRNLiabQlyiF",

    title:    "Orderflow: Trade",
    tagline:  "Generate consistent income through systematic orderflow strategies.",
    price:    "€259.99",
    originalPrice: "€441.98",

    forWhom: [
      "Equity or futures traders",
      "Anyone wanting to generate passive premium income",
      "Traders who want a hedging layer on existing positions",
      "Those interested in volatility-based strategies",
    ],

    outcomes: [
      "Master Footprint, Volume Profile, Delta, Level 2 Data, Market Orders, Absorption, Bigtrade",
      "Read Level 2 Data and Liquidity Pools surface for edge",
      "Manage and roll positions as markets shift",
    ],

    modules: [
      {
        number: "01",
        title:  "Orderflow Foundation",
        lessons: [
          "Orderflow mechanics",
          "Reading orderflow chains like a market maker",
        ],
      },
      {
        number: "02",
        title:  "Income Strategies",
        lessons: [
          "Footprint",
          "Volume Profile",
          "Delta",
          "Level 2 Data",
          "Market Order",
          "Absorption",
          "Bigtrade",
        ],
      },
    ],

    includes: [
      "10+ deep-dive video lessons",
      "Private Discord for orderflow traders",
      "Lifetime access & updates",
    ],

    faq: [
      { q: "Do I need options experience?", a: "You should have basic trading experience. This is not a beginner-from-zero course." },
      { q: "Which brokers work for this?", a: "We recommend brokers in class with full setup walkthroughs." },
      { q: "Is there a refund policy?", a: "No refund under any circumstances." },
      { q: "What markets?", a: "US equities options primarily — concepts apply to index options too." },
    ],
  },

  {
    id:       "algo",
    name:     "PRIVATE Trading",
    badge:    "Next Cohort — Starting Soon",
    color:    "#7B5EA7",

    whopUrl:  "https://whop.com/checkout/plan_trnRPAOuTx10G",

    title:    "PRIVATE Trading: Build Your Own Edge",
    tagline:  "Write, backtest and deploy your own automated trading systems with Python.",
    price:    "€1,599.99",
    originalPrice: "€1,999.99",

    forWhom: [
      "Anyone with basic programming curiosity (no expert needed)",
      "Traders wanting to remove emotion from execution entirely",
      "Those with a strategy who want to validate it statistically",
      "Serious quant traders building a systematic edge",
    ],

    outcomes: [
      "Write Python scripts to pull and analyse market data",
      "Build a reliable backtesting framework from scratch",
      "Deploy live automated systems on cloud servers",
      "Understand overfitting and prevent it correctly",
      "Graduate with a portfolio of validated strategies",
    ],

    modules: [
      {
        number: "01",
        title:  "Python for Quant Trading",
        lessons: [
          "Python, pandas & numpy for finance",
          "Pulling market data from APIs",
          "Data cleaning & visualisation",
        ],
      },
      {
        number: "02",
        title:  "Strategy Development",
        lessons: [
          "Translating trade ideas into code",
          "Indicator and signal generation",
          "Multi-asset strategy design",
        ],
      },
      {
        number: "03",
        title:  "Backtesting & Validation",
        lessons: [
          "Building a backtest engine from scratch",
          "Walk-forward analysis to prevent overfitting",
          "Key performance metrics that matter",
        ],
      },
      {
        number: "04",
        title:  "Live Deployment",
        lessons: [
          "Connecting to broker APIs",
          "24/7 cloud server deployment",
          "Monitoring systems & risk controls",
        ],
      },
    ],

    includes: [
      "50+ video lessons with full source code",
      "Backtesting framework template",
      "Strategy source code library",
      "Private Discord for algo traders",
      "Weekly code review sessions (3 months)",
      "Lifetime access & updates",
    ],

    faq: [
      { q: "How much coding experience do I need?", a: "Basic curiosity is enough — we teach all the Python you need from the ground up." },
      { q: "Do I need my own server?", a: "We cover affordable cloud options with full setup guides in the course." },
      { q: "Is there a refund policy?", a: "No refund under any circumstances." },
      { q: "What brokers are supported?", a: "Interactive Brokers and Alpaca covered in depth — others via generic API patterns." },
    ],
  },
];

// Backward-compatible alias
export const COURSE_CONTENT = COURSES[0];

// ============================================================
// ABOUT PAGE
// ============================================================

export const ABOUT_CONTENT = {

  instructor: {
    name:   "Vertex Analyst",
    title:  "Quantitative Trader & Systems Developer & Orderflow Trader",
    avatar: "/assets/logo.png",
  },

  bio: [
    "Vertex Analyst คือสถาบันการศึกษาด้านการเทรดเชิงปริมาณ (Quantitative Trading) ที่ก่อตั้งขึ้นบนหลักการเดียวคือ ทุกข้อได้เปรียบในตลาด (Edge) ต้องได้รับการพิสูจน์ด้วยข้อมูล ก่อนที่จะนำไปเทรดจริงด้วยเงินทุน",
    "หลักสูตรของเราสร้างขึ้นจากประสบการณ์การเทรดจริงในตลาดหุ้น อนุพันธ์ และสินทรัพย์ดิจิทัลยาวนานกว่า 2 ปี โดยเน้นการนำไปใช้จริง ไม่ใช่เพียงแค่ทฤษฎี",
    "เราไม่ได้สอนการใช้เครื่องมือชี้วัด (Indicators) ทั่วไป แต่เราสอนให้เข้าใจกลไกการทำงานของตลาดที่แท้จริง ทั้งโครงสร้างราคา สภาพคล่อง และพฤติกรรมของสถาบันการเงิน จากนั้นจึงสร้างระบบเทรดตามกฎเกณฑ์ที่ชัดเจนครอบคลุมกลไกเหล่านั้น",
    "*ถูกก่อตั้งขึ้นโดย @miraivisi.onx แต่เพียงผู้เดียว*",
  ],

  stats: [
    { value: "2+",   label: "Years Trading",    color: "#1E6FFF" },
    { value: "100+", label: "Students Trained", color: "#00C2FF" },
    { value: "80%",  label: "Avg Win Rate",     color: "#1E6FFF" },
    { value: "4.9",  label: "Course Rating",    color: "#00C2FF" },
  ],

  testimonials: [
    {
      name:   "Alex T.",
      text:   "Finally a course that doesn't just show indicators. The structure approach changed how I read charts completely.",
      result: "+38% Month 1",
    },
    {
      name:   "Priya M.",
      text:   "I was consistently losing before. Having a backtested system with clear rules made all the difference.",
      result: "From -20% to +25%",
    },
    {
      name:   "James W.",
      text:   "The live sessions are worth the price alone. Real trades, real analysis — nothing held back.",
      result: "Win Rate 71%",
    },
  ],
};
