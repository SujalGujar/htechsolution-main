import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, useInView } from "framer-motion";
import { fetchAchievements } from "../store/HomepageSlices/OurAchievementsSlice";

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

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-700 leading-snug mb-4">
          {item.title}
        </h3>

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
        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: color.border }}>
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

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse border border-gray-100">
              <div className="h-1 bg-gray-200" />
              <div className="p-6 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-28" />
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

  if (!achievementsList || achievementsList.length === 0) return null;

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
              style={{ color: "#1F6E8C", background: "rgba(31,110,140,0.08)", borderColor: "rgba(31,110,140,0.2)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#1F6E8C" }} />
              Our Impact
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight"
              style={{ fontFamily: "'Poppins',sans-serif" }}>
              Achievements That{" "}
              <span style={{ color: "#1F6E8C" }}>Define Us</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
              Numbers speak louder than words — here's a glimpse of what we've accomplished together.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievementsList.map((item, index) => (
              <AchievementCard key={item._id} item={item} index={index} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default OurAchievements;