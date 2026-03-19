import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { fetchExpertise } from "../store/AboutUsPageSlices/OurExpertiseSlice";

const BASE_URL = "https://htechsolution-main.onrender.com";

/* ── Local fallback expertise data ───────────────────────────────── */
const LOCAL_EXPERTISE = [
  {
    _id: "exp-1",
    title: "Custom Software Development",
    content: "We build tailor-made web and desktop applications using modern frameworks like React, Node.js, and Python — designed to fit your exact business workflow.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    _id: "exp-2",
    title: "IT Hardware Supply",
    content: "We supply and install desktops, laptops, CCTVs, networking equipment, printers, and accessories from trusted brands with warranty and after-sales support.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
  },
  {
    _id: "exp-3",
    title: "Network & CCTV Setup",
    content: "End-to-end structured cabling, LAN deployment, router configuration, IP camera installation, DVR/NVR setup, and remote monitoring for homes and businesses.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82V15.18a1 1 0 01-1.447.89L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
      </svg>
    ),
  },
  {
    _id: "exp-4",
    title: "Digital Marketing",
    content: "Result-driven SEO, social media marketing, and PPC campaigns that grow your brand online, increase visibility, and convert traffic into real business leads.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    _id: "exp-5",
    title: "UI/UX & Web Design",
    content: "We design pixel-perfect, accessible, and conversion-focused interfaces using Figma. From wireframes to final handoff — every design is built with user experience at its core.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    _id: "exp-6",
    title: "Cloud & Infrastructure",
    content: "We set up and manage cloud environments on AWS, Azure, and Google Cloud — including VMs, storage buckets, CI/CD pipelines, and managed database instances.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    _id: "exp-7",
    title: "Hardware Repair & Maintenance",
    content: "Laptop screen replacement, motherboard repair, printer servicing, projector maintenance, and preventive AMC contracts for offices, schools, and institutions.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    _id: "exp-8",
    title: "Enterprise Web Solutions",
    content: "Scalable ERP modules, inventory systems, HR portals, and workflow automation platforms built for enterprise requirements with role-based access and audit trails.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

/* ── Color palette ────────────────────────────────────────────────── */
const COLORS = [
  { gradient: "linear-gradient(135deg,#1F6E8C,#2AA8D0)", light: "rgba(31,110,140,0.09)",  text: "#1F6E8C", border: "rgba(31,110,140,0.15)" },
  { gradient: "linear-gradient(135deg,#6BA368,#8FC98B)", light: "rgba(107,163,104,0.09)", text: "#4a8c47", border: "rgba(107,163,104,0.18)" },
  { gradient: "linear-gradient(135deg,#E07B39,#F0A46A)", light: "rgba(224,123,57,0.09)",  text: "#c0601f", border: "rgba(224,123,57,0.18)" },
  { gradient: "linear-gradient(135deg,#7C5CBF,#A987DE)", light: "rgba(124,92,191,0.09)",  text: "#6040a8", border: "rgba(124,92,191,0.18)" },
];

const pad = (n) => String(n + 1).padStart(2, "0");

/* ── Single Card ──────────────────────────────────────────────────── */
const ExpertiseCard = ({ item, index }) => {
  const color = COLORS[index % COLORS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white rounded-2xl overflow-hidden flex flex-col h-full"
      style={{
        border: `1.5px solid ${color.border}`,
        boxShadow: `0 4px 20px ${color.border}`,
        transition: "box-shadow 0.3s, transform 0.3s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 14px 40px ${color.border}`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = `0 4px 20px ${color.border}`;
      }}
    >
      {/* Top gradient bar */}
      <div className="h-1 w-full flex-shrink-0" style={{ background: color.gradient }} />

      <div className="p-6 flex flex-col flex-1">

        {/* Icon + number row */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
            style={{ background: color.light, color: color.text }}
          >
            {item.icon || (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            )}
          </div>
          <span
            className="text-xs font-black opacity-20 select-none"
            style={{ fontFamily:"'Poppins',sans-serif", fontSize: "2rem", lineHeight: 1, color: color.text }}
          >
            {pad(index)}
          </span>
        </div>

        {/* Accent line */}
        <div className="w-8 h-1 rounded-full mb-3" style={{ background: color.gradient }} />

        {/* Title */}
        <h3
          className="text-base font-bold text-gray-900 mb-2 leading-snug group-hover:transition-colors duration-300"
          style={{ fontFamily:"'Poppins',sans-serif" }}
          onMouseEnter={e => e.currentTarget.style.color = color.text}
          onMouseLeave={e => e.currentTarget.style.color = ""}
        >
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed flex-1">
          {item.content}
        </p>

        {/* Learn more */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t"
          style={{ borderColor: color.border }}>
          <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: color.text }}>
            Learn More
          </span>
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: color.light, color: color.text }}
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Main Section ─────────────────────────────────────────────────── */
const OurExpertise = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.expertise);

  const [current, setCurrent]   = useState(0);
  const [paused,  setPaused]    = useState(false);
  const [perPage, setPerPage]   = useState(3);

  useEffect(() => { dispatch(fetchExpertise()); }, [dispatch]);

  /* Merge backend + local: backend items first, then fill remaining with local */
  const backendItems = list && list.length > 0
    ? list.map((item, i) => ({ ...item, icon: LOCAL_EXPERTISE[i % LOCAL_EXPERTISE.length]?.icon }))
    : LOCAL_EXPERTISE;

  /* Responsive perPage */
  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024)     setPerPage(3);
      else if (window.innerWidth >= 640) setPerPage(2);
      else                               setPerPage(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const totalPages = Math.ceil(backendItems.length / perPage);

  /* Autoplay */
  useEffect(() => {
    if (paused || !totalPages) return;
    const id = setInterval(() => setCurrent(p => (p + 1) % totalPages), 4000);
    return () => clearInterval(id);
  }, [paused, totalPages]);

  /* ── Skeleton ── */
  if (loading) {
    return (
      <section className="py-8 md:py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse border border-gray-100">
              <div className="h-1 bg-gray-200" />
              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <div className="w-14 h-14 rounded-xl bg-gray-100" />
                  <div className="w-8 h-8 bg-gray-100 rounded" />
                </div>
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="space-y-2">
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-5/6" />
                  <div className="h-3 bg-gray-100 rounded w-4/6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const visible = backendItems.slice(current * perPage, current * perPage + perPage);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
        .exp-root { font-family: 'Poppins', sans-serif; }
      `}</style>

      <section
        className="exp-root relative py-16 overflow-hidden bg-white"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle,rgba(31,110,140,0.06) 1.5px,transparent 1.5px)",
            backgroundSize: "38px 38px",
          }} />
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(31,110,140,0.06),transparent 70%)" }} />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(107,163,104,0.06),transparent 70%)" }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-5"
          >
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border mb-4"
                style={{ color:"#1F6E8C", background:"rgba(31,110,140,0.08)", borderColor:"rgba(31,110,140,0.2)" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:"#1F6E8C" }} />
                What We Do Best
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
                style={{ fontFamily:"'Poppins',sans-serif" }}>
                Our <span style={{ color:"#1F6E8C" }}>Expertise</span>
              </h2>
            </div>

            {/* Counter + arrows */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black tabular-nums" style={{ color:"#1F6E8C", fontFamily:"'Poppins',sans-serif" }}>
                {pad(current * perPage)}
              </span>
              <span className="text-gray-300">/</span>
              <span className="text-lg font-bold text-gray-300 tabular-nums" style={{ fontFamily:"'Poppins',sans-serif" }}>
                {pad(backendItems.length - 1)}
              </span>

              <div className="flex gap-2 ml-1">
                <button
                  onClick={() => setCurrent(p => Math.max(0, p - 1))}
                  disabled={current === 0}
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-all disabled:opacity-25"
                  style={{ borderColor:"rgba(31,110,140,0.3)", color:"#1F6E8C" }}
                  onMouseEnter={e => { e.currentTarget.style.background="#1F6E8C"; e.currentTarget.style.color="#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background=""; e.currentTarget.style.color="#1F6E8C"; }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrent(p => Math.min(totalPages - 1, p + 1))}
                  disabled={current === totalPages - 1}
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-all disabled:opacity-25"
                  style={{ borderColor:"rgba(31,110,140,0.3)", color:"#1F6E8C" }}
                  onMouseEnter={e => { e.currentTarget.style.background="#1F6E8C"; e.currentTarget.style.color="#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background=""; e.currentTarget.style.color="#1F6E8C"; }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>

          {/* ── Cards ── */}
          <div className="relative min-h-[360px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {visible.map((item, i) => (
                  <ExpertiseCard key={item._id} item={item} index={current * perPage + i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Dots + Progress ── */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center gap-3 mt-10">
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? 24 : 8,
                      height: 8,
                      background: i === current ? "#1F6E8C" : "rgba(31,110,140,0.2)",
                    }}
                  />
                ))}
              </div>
              <div className="w-36 h-0.5 rounded-full overflow-hidden bg-gray-200">
                <motion.div
                  key={`pr-${current}`}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4, ease: "linear" }}
                  className="h-full rounded-full"
                  style={{ background: "#1F6E8C" }}
                />
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default OurExpertise;
