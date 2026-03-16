import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { fetchExperiences } from "../store/HomepageSlices/ClientExperienceSlice";

/* ── Star Rating ──────────────────────────────────────────────────── */
const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg key={s} className="w-4 h-4" viewBox="0 0 20 20"
        fill={s <= rating ? "#F59E0B" : "#E5E7EB"}>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

/* ── Testimonial Card ─────────────────────────────────────────────── */
const TestimonialCard = ({ item }) => {
  const initial = item.heading?.charAt(0)?.toUpperCase() || "C";
  const hue = (initial.charCodeAt(0) * 37) % 360;

  return (
    <div
      className="relative bg-white rounded-2xl p-6 flex flex-col h-full overflow-hidden"
      style={{
        border: "1.5px solid rgba(31,110,140,0.13)",
        boxShadow: "0 2px 16px rgba(31,110,140,0.07)",
      }}
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 w-14 h-1 rounded-br-full"
        style={{ background: "linear-gradient(90deg,#1F6E8C,#2AA8D0)" }} />

      {/* Decorative quote */}
      <div className="absolute top-3 right-4 text-5xl leading-none font-black select-none pointer-events-none"
        style={{ color: "rgba(31,110,140,0.06)", fontFamily: "'Poppins',sans-serif" }}>
        "
      </div>

      {/* Stars */}
      <StarRating rating={item.rating || 5} />

      {/* Quote text */}
      <p className="text-gray-600 leading-relaxed flex-1 mt-3 mb-5 text-sm">
        "{item.description}"
      </p>

      {/* Divider */}
      <div className="w-full h-px mb-4" style={{ background: "rgba(31,110,140,0.08)" }} />

      {/* Footer */}
      <div className="flex items-center gap-3 flex-wrap">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-base flex-shrink-0"
          style={{ background: `hsl(${hue},52%,46%)`, fontFamily: "'Poppins',sans-serif" }}
        >
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm truncate">{item.heading}</p>
          {item.role && (
            <p className="text-xs mt-0.5 truncate" style={{ color: "#1F6E8C" }}>{item.role}</p>
          )}
        </div>
        {item.projectService && (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
            style={{ background: "rgba(31,110,140,0.08)", color: "#1F6E8C" }}>
            {item.projectService}
          </span>
        )}
      </div>
    </div>
  );
};

/* ── Main Component ───────────────────────────────────────────────── */
const ClientExperience = () => {
  const dispatch = useDispatch();
  const { experiences, loading } = useSelector((state) => state.clientExperience);

  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);
  const [perPage, setPerPage] = useState(3);

  useEffect(() => { dispatch(fetchExperiences()); }, [dispatch]);

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

  const totalPages = experiences ? Math.ceil(experiences.length / perPage) : 0;

  /* Autoplay */
  useEffect(() => {
    if (paused || !totalPages) return;
    const id = setInterval(() => setCurrent(p => (p + 1) % totalPages), 4000);
    return () => clearInterval(id);
  }, [paused, totalPages]);

  /* ── Skeleton ── */
  if (loading) {
    return (
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-8 w-52 bg-gray-200 rounded-lg animate-pulse mx-auto mb-10" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse border border-gray-100">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(s => <div key={s} className="w-4 h-4 bg-gray-200 rounded" />)}
                </div>
                <div className="space-y-2 mb-5">
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-5/6" />
                  <div className="h-3 bg-gray-100 rounded w-4/6" />
                </div>
                <div className="h-px bg-gray-100 mb-4" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-200" />
                  <div className="space-y-1.5">
                    <div className="h-3 bg-gray-200 rounded w-24" />
                    <div className="h-2 bg-gray-100 rounded w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!experiences || experiences.length === 0) return null;

  const visibleItems = experiences.slice(current * perPage, current * perPage + perPage);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
        .ce-root { font-family: 'Poppins', sans-serif; }
      `}</style>

      <section
        className="ce-root relative py-12 overflow-hidden"
        style={{ background: "linear-gradient(160deg,#f8fbfd 0%,#ffffff 50%,#f5faf8 100%)" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle,rgba(31,110,140,0.07) 1.5px,transparent 1.5px)",
            backgroundSize: "36px 36px",
          }} />

        {/* Blobs */}
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(31,110,140,0.07),transparent 70%)" }} />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(107,163,104,0.07),transparent 70%)" }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border mb-4"
              style={{ color:"#1F6E8C", background:"rgba(31,110,140,0.08)", borderColor:"rgba(31,110,140,0.2)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:"#1F6E8C" }} />
              Testimonials
            </span>

            <h2
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
              style={{ fontFamily:"'Poppins',sans-serif" }}
            >
              Client <span style={{ color:"#1F6E8C" }}>Experience</span>
            </h2>

            <p className="text-gray-400 text-sm mt-3 max-w-md mx-auto leading-relaxed">
              Hear directly from the people and businesses we've had the pleasure of working with.
            </p>
          </motion.div>

          {/* ── Slide area ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.38, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {visibleItems.map((item) => (
                <TestimonialCard key={item._id} item={item} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* ── Controls ── */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center gap-3 mt-8">
              <div className="flex items-center gap-2.5">
                {/* Prev */}
                <button
                  onClick={() => setCurrent(p => Math.max(0, p - 1))}
                  disabled={current === 0}
                  className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 disabled:opacity-25"
                  style={{ borderColor:"rgba(31,110,140,0.3)", color:"#1F6E8C" }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Dots */}
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? 24 : 8,
                      height: 8,
                      background: i === current ? "#1F6E8C" : "rgba(31,110,140,0.22)",
                    }}
                  />
                ))}

                {/* Next */}
                <button
                  onClick={() => setCurrent(p => Math.min(totalPages - 1, p + 1))}
                  disabled={current === totalPages - 1}
                  className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 disabled:opacity-25"
                  style={{ borderColor:"rgba(31,110,140,0.3)", color:"#1F6E8C" }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Progress bar */}
              <div className="w-36 h-0.5 rounded-full overflow-hidden bg-gray-200">
                <motion.div
                  key={`prog-${current}`}
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

export default ClientExperience;