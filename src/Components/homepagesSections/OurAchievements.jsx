import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, useInView, animate, useMotionValue } from "framer-motion";
import { fetchAchievements } from "../store/HomepageSlices/OurAchievementsSlice";

/* ── Local fallback data (shown if backend returns empty) ─────────── */
const LOCAL_DATA = [
  {
    _id: "local-1",
    title: "Projects Completed",
    value: "500+",
    description: "Successfully delivered across software, hardware & digital marketing domains.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    _id: "local-2",
    title: "Happy Clients",
    value: "320+",
    description: "Businesses and individuals who trust us for their IT and digital needs.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    _id: "local-3",
    title: "Years Experience",
    value: "12+",
    description: "Over a decade of expertise in IT solutions, software & digital services.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    _id: "local-4",
    title: "Client Satisfaction",
    value: "98%",
    description: "Our clients consistently rate us excellent for quality, speed and support.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
];

/* ── Icon map — matches title keywords from backend ──────────────── */
const ICON_MAP = [
  {
    keywords: ["project", "complet", "deliver", "work", "build"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    keywords: ["client", "customer", "user", "happy", "people", "member"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    keywords: ["year", "experience", "since", "founded", "history"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    keywords: ["satisf", "rating", "review", "star", "award", "quality"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    keywords: ["team", "staff", "employ", "expert"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    keywords: ["support", "service", "help", "24"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

const DEFAULT_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const getIcon = (title = "", index = 0) => {
  const lower = title.toLowerCase();
  const matched = ICON_MAP.find(m => m.keywords.some(k => lower.includes(k)));
  if (matched) return matched.icon;
  return ICON_MAP[index % ICON_MAP.length]?.icon || DEFAULT_ICON;
};

/* ── Animated Counter ─────────────────────────────────────────────── */
const AnimatedCounter = ({ target, shouldStart }) => {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!shouldStart) return;
    const numeric = parseFloat(String(target).replace(/[^0-9.]/g, ""));
    const suffix  = String(target).replace(/[0-9.]/g, "").trim();
    if (isNaN(numeric)) { setDisplay(String(target)); return; }

    let start = null;
    const duration = 2000;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(
        (numeric % 1 === 0
          ? Math.floor(eased * numeric).toLocaleString()
          : (eased * numeric).toFixed(1)) + suffix
      );
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [shouldStart, target]);

  return <span>{display}</span>;
};

/* ── Color palette ────────────────────────────────────────────────── */
const COLORS = [
  { gradient: "linear-gradient(135deg,#1F6E8C,#2AA8D0)", light: "rgba(31,110,140,0.09)",  text: "#1F6E8C", border: "rgba(31,110,140,0.15)" },
  { gradient: "linear-gradient(135deg,#6BA368,#8FC98B)", light: "rgba(107,163,104,0.09)", text: "#4a8c47", border: "rgba(107,163,104,0.18)" },
  { gradient: "linear-gradient(135deg,#E07B39,#F0A46A)", light: "rgba(224,123,57,0.09)",  text: "#c0601f", border: "rgba(224,123,57,0.18)" },
  { gradient: "linear-gradient(135deg,#7C5CBF,#A987DE)", light: "rgba(124,92,191,0.09)",  text: "#6040a8", border: "rgba(124,92,191,0.18)" },
];

/* ── Single Card ──────────────────────────────────────────────────── */
const AchievementCard = ({ item, index }) => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const color  = COLORS[index % COLORS.length];
  const icon   = getIcon(item.title, index);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white rounded-2xl overflow-hidden flex flex-col"
      style={{
        border: `1.5px solid ${color.border}`,
        boxShadow: `0 4px 24px ${color.border}`,
        transition: "box-shadow 0.3s, transform 0.3s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 12px 40px ${color.border}`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = `0 4px 24px ${color.border}`;
      }}
    >
      {/* Top gradient bar */}
      <div className="h-1 w-full" style={{ background: color.gradient }} />

      <div className="p-6 flex flex-col flex-1">

        {/* Icon + title row */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
            style={{ background: color.light, color: color.text }}
          >
            {icon}
          </div>
          <h3 className="text-sm font-semibold text-gray-700 leading-snug">
            {item.title}
          </h3>
        </div>

        {/* Animated counter */}
        <div
          className="text-4xl font-black mb-2 leading-none tabular-nums"
          style={{ color: color.text, fontFamily: "'Poppins', sans-serif" }}
        >
          <AnimatedCounter target={item.value} shouldStart={inView} />
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed flex-1 mb-5">
          {item.description}
        </p>

        {/* Progress bar */}
        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: `${color.border}` }}>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: "78%" } : {}}
            transition={{ duration: 1.4, delay: index * 0.1 + 0.4, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: color.gradient }}
          />
        </div>
      </div>
    </motion.div>
  );
};

/* ── Main Section ─────────────────────────────────────────────────── */
const OurAchievements = () => {
  const dispatch = useDispatch();
  const { achievementsList, loading } = useSelector((state) => state.ourAchievementsSection);

  useEffect(() => { dispatch(fetchAchievements()); }, [dispatch]);

  const data = (achievementsList && achievementsList.length > 0) ? achievementsList : LOCAL_DATA;

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse border border-gray-100">
              <div className="h-1 bg-gray-200" />
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-gray-100" />
                  <div className="h-4 bg-gray-200 rounded w-28" />
                </div>
                <div className="h-8 bg-gray-200 rounded w-20" />
                <div className="space-y-2">
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-4/5" />
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
        .ach-root { font-family: 'Poppins', sans-serif; }
      `}</style>

      <section className="ach-root relative py-16 overflow-hidden bg-white">

        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle,rgba(31,110,140,0.06) 1.5px,transparent 1.5px)",
            backgroundSize: "38px 38px",
          }} />
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(31,110,140,0.07),transparent 70%)" }} />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(107,163,104,0.07),transparent 70%)" }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border mb-4"
              style={{ color:"#1F6E8C", background:"rgba(31,110,140,0.08)", borderColor:"rgba(31,110,140,0.2)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:"#1F6E8C" }} />
              Our Impact
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight"
              style={{ fontFamily:"'Poppins',sans-serif" }}>
              Achievements That{" "}
              <span style={{ color:"#1F6E8C" }}>Define Us</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
              Numbers speak louder than words — here's a glimpse of what we've accomplished together.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.map((item, index) => (
              <AchievementCard key={item._id} item={item} index={index} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default OurAchievements;