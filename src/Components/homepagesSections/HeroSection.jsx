import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchHeroSections } from "../../Components/store/HomepageSlices/HeroSectionSlice";

const BASE_URL = "http://localhost:5000";

/* ── Diagonal clip shapes ───────────────────────────────────────────── */
const CLIP_MAIN  = "polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)";
const CLIP_ACCENT = "polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%)";

const HeroSection = () => {
  const dispatch = useDispatch();
  const { heroList, loading } = useSelector((state) => state.heroSection);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => { dispatch(fetchHeroSections()); }, [dispatch]);

  const cards =
    heroList.length > 0
      ? heroList.map((item, index) => ({
          id: index,
          title: item.heading || item.title,
          description: item.description,
          image: item.image?.startsWith("http")
            ? item.image
            : `${BASE_URL}${item.image}`,
        }))
      : [];

  useEffect(() => {
    if (!cards.length) return;
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cards.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [cards.length]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#f0f6f9]">
        <div style={{
          width: 40, height: 40,
          border: "3px solid rgba(31,110,140,0.25)",
          borderTopColor: "#1F6E8C",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!cards.length) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#f0f6f9] text-gray-400 text-lg">
        Hero content not added yet
      </div>
    );
  }

  return (
    <>
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');

        .hero-root { font-family: 'Poppins', sans-serif; }
        .hero-root h1 { font-family: 'Poppins', sans-serif; }

        /* animated gradient mesh background */
        .hero-bg {
          background: linear-gradient(135deg, #e8f4f8 0%, #f7fbfd 40%, #dff0f7 70%, #c8e6f0 100%);
        }

        /* decorative grid lines */
        .hero-grid-lines {
          background-image:
            linear-gradient(rgba(31,110,140,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(31,110,140,0.06) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        /* floating accent dot */
        @keyframes floatDot {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-18px); }
        }
        .float-dot { animation: floatDot 4s ease-in-out infinite; }

        /* progress bar */
        @keyframes progressFill {
          from { width: 0% }
          to   { width: 100% }
        }
        .progress-bar {
          animation: progressFill 5s linear forwards;
        }
      `}</style>

      <section className="hero-root relative min-h-[90vh] flex items-center overflow-hidden hero-bg">

        {/* Grid texture */}
        <div className="absolute inset-0 hero-grid-lines pointer-events-none" />

        {/* Large decorative circle top-right */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#1F6E8C]/8 pointer-events-none" />
        <div className="absolute -top-16 -right-16 w-[300px] h-[300px] rounded-full bg-[#1F6E8C]/10 pointer-events-none" />

        {/* Floating accent dots */}
        <div className="float-dot absolute top-24 left-12 w-4 h-4 rounded-full bg-[#1F6E8C]/30 pointer-events-none" style={{ animationDelay: "0s" }} />
        <div className="float-dot absolute bottom-32 left-1/3 w-3 h-3 rounded-full bg-[#2AA8D0]/40 pointer-events-none" style={{ animationDelay: "1.5s" }} />
        <div className="float-dot absolute top-1/3 right-8 w-5 h-5 rounded-full bg-[#1F6E8C]/20 pointer-events-none" style={{ animationDelay: "0.8s" }} />

        {/* ── Main content ─────────────────────────────────────────── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 py-8">

          <AnimatePresence mode="wait">
            {cards.map((card) =>
              activeCard === card.id && (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0"
                >

                  {/* ── LEFT: Text ─────────────────────────────────── */}
                  <div className="lg:w-[52%] lg:pr-10 z-10">

                    {/* Badge */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                      className="inline-flex items-center gap-2 bg-[#1F6E8C]/10 text-[#1F6E8C] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 border border-[#1F6E8C]/20"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1F6E8C] animate-pulse" />
                      IT Solutions &amp; Services
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                      initial={{ opacity: 0, y: 28 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.18, duration: 0.6 }}
                      className="text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.12] font-extrabold text-gray-900 mb-5"
                    >
                      {card.title
                        .split(" ")
                        .reduce((acc, word, i, arr) => {
                          // highlight last two words in brand color
                          if (i >= arr.length - 2) {
                            return [...acc, <span key={i} className="text-[#1F6E8C]">{(i > 0 ? " " : "") + word}</span>];
                          }
                          return [...acc, (i > 0 ? " " : "") + word];
                        }, [])}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.28, duration: 0.6 }}
                      className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-lg"
                    >
                      {card.description}
                    </motion.p>

                    {/* CTAs */}
                    {/* <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.38, duration: 0.5 }}
                      className="flex flex-wrap gap-4 mb-10"
                    >
                      <motion.button
                        whileHover={{ scale: 1.04, boxShadow: "0 12px 32px rgba(31,110,140,0.35)" }}
                        whileTap={{ scale: 0.97 }}
                        className="bg-[#1F6E8C] text-white px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide shadow-lg shadow-[#1F6E8C]/25 transition-all"
                      >
                        Get Started
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="border-2 border-[#1F6E8C]/30 text-[#1F6E8C] px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide hover:bg-[#1F6E8C]/5 transition-all"
                      >
                        Our Services →
                      </motion.button> */}
                    {/* </motion.div> */}

                    {/* Stats row */}
                    {/* <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.52, duration: 0.5 }}
                      className="flex gap-8"
                    >
                      {[
                        { value: "500+", label: "Projects Done" },
                        { value: "12+", label: "Years Experience" },
                        { value: "98%", label: "Client Satisfaction" },
                      ].map((stat, i) => (
                        <div key={i}>
                          <p className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>{stat.value}</p>
                          <p className="text-xs text-gray-400 font-medium mt-0.5">{stat.label}</p>
                        </div>
                      ))}
                    </motion.div> */}
                  </div>

                  {/* ── RIGHT: Diagonal / cross-angle image stack ──── */}
                  <div className="lg:w-[48%] relative flex items-center justify-center h-[420px] lg:h-[520px]">

                    {/* Back accent slab — tilted +6deg */}
                    <motion.div
                      initial={{ opacity: 0, rotate: 10, x: 40 }}
                      animate={{ opacity: 1, rotate: 6, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
                      className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#1F6E8C]/15 to-[#2AA8D0]/10"
                      style={{ transform: "rotate(6deg) translateX(16px)", borderRadius: "1.5rem" }}
                    />

                    {/* Mid accent slab — tilted -3deg */}
                    <motion.div
                      initial={{ opacity: 0, rotate: -8, x: -30 }}
                      animate={{ opacity: 1, rotate: -3, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
                      className="absolute inset-2 rounded-3xl bg-[#1F6E8C]/8"
                      style={{ transform: "rotate(-3deg)", borderRadius: "1.4rem" }}
                    />

                    {/* Main image — slightly rotated */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.88, rotate: -5 }}
                      animate={{ opacity: 1, scale: 1, rotate: -1.5 }}
                      transition={{ delay: 0.25, duration: 0.75, ease: "easeOut" }}
                      className="relative w-full h-full overflow-hidden shadow-2xl"
                      style={{
                        clipPath: CLIP_MAIN,
                        borderRadius: "1.5rem",
                        transform: "rotate(-1.5deg)",
                      }}
                    >
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80";
                        }}
                      />
                      {/* Teal gradient overlay on image */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#1F6E8C]/30 via-transparent to-transparent" />
                    </motion.div>

                    {/* Floating badge — bottom-left of image */}
                    {/* <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="absolute bottom-6 -left-4 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3 z-20"
                      style={{ minWidth: 180 }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#1F6E8C]/10 flex items-center justify-center text-xl">⚡</div>
                      <div>
                        <p className="text-xs text-gray-400 font-medium">Response Time</p>
                        <p className="text-sm font-bold text-gray-800">Under 2 Hours</p>
                      </div>
                    </motion.div> */}

                    {/* Floating badge — top-right */}
                    {/* <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.65, duration: 0.5 }}
                      className="absolute top-4 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2 z-20"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-base">✅</div>
                      <div>
                        <p className="text-xs text-gray-400">Certified</p>
                        <p className="text-xs font-bold text-gray-800">ISO Compliant</p>
                      </div>
                    </motion.div> */}
                  </div>

                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>

        {/* ── Bottom: Slide nav ──────────────────────────────────────── */}
        <div className="absolute bottom-6 left-0 right-0 z-20 flex flex-col items-center gap-3">

          {/* Dot nav */}
          <div className="flex gap-2.5">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveCard(index)}
                className={`rounded-full transition-all duration-300 ${
                  activeCard === index
                    ? "w-8 h-2.5 bg-[#1F6E8C]"
                    : "w-2.5 h-2.5 bg-[#1F6E8C]/25 hover:bg-[#1F6E8C]/50"
                }`}
              />
            ))}
          </div>

          {/* Active slide progress bar */}
          <div className="w-40 h-0.5 bg-[#1F6E8C]/15 rounded-full overflow-hidden">
            <div
              key={activeCard}
              className="progress-bar h-full bg-[#1F6E8C] rounded-full"
            />
          </div>
        </div>

      </section>
    </>
  );
};

export default HeroSection;