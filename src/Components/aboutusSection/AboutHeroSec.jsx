import aboutIllustration from "../../images/aboutus2.jpg";
import React from "react";
import { motion } from "framer-motion";

/* ── Animation variants ─────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Stat pill ──────────────────────────────────────────────────── */
const StatPill = ({ value, label, delay }) => (
  <motion.div
    variants={fadeUp}
    transition={{ delay }}
    className="flex flex-col items-center px-6 py-3 rounded-2xl bg-white border border-[#1F6E8C]/15 shadow-sm"
  >
    <span className="text-2xl font-extrabold text-[#1F6E8C]" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {value}
    </span>
    <span className="text-xs font-medium text-gray-400 mt-0.5 whitespace-nowrap">{label}</span>
  </motion.div>
);

const AboutHero = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
        .about-root { font-family: 'Poppins', sans-serif; }
      `}</style>

      <section className="about-root relative w-full bg-[#f8fafc] overflow-hidden py-12 md:py-12 px-4 md:px-10">

        {/* ── Background decorations ── */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(31,110,140,0.065) 1.5px, transparent 1.5px)",
            backgroundSize: "34px 34px",
          }}
        />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(31,110,140,0.08), transparent 70%)" }} />
        <div className="absolute -bottom-32 -left-32 w-[380px] h-[380px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(42,168,208,0.07), transparent 70%)" }} />

        {/* ── Floating accent shapes ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="absolute top-12 right-[12%] w-14 h-14 rounded-2xl border-2 border-[#1F6E8C]/20 rotate-12 pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="absolute bottom-20 left-[8%] w-8 h-8 rounded-full bg-[#1F6E8C]/10 pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="absolute top-1/2 left-[5%] w-1 h-24 rounded-full pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #1F6E8C40, transparent)" }}
        />

        {/* ── Main grid ── */}
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >

          {/* ── Left: Text content ── */}
          <motion.div variants={fadeLeft} className="flex flex-col">

            {/* Badge */}
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 self-start text-[#1F6E8C] text-xs font-semibold tracking-widest uppercase bg-[#1F6E8C]/10 px-4 py-1.5 rounded-full border border-[#1F6E8C]/20 mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1F6E8C] animate-pulse" />
              Who We Are
            </motion.span>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold text-gray-900 leading-[1.07] mb-6"
            >
              About{" "}
              <span
                className="relative inline-block"
                style={{ color: "#1F6E8C" }}
              >
                HTechSolution
                {/* underline accent */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                  className="absolute left-0 -bottom-1 h-1 w-full rounded-full origin-left"
                  style={{ background: "linear-gradient(90deg,#1F6E8C,#2AA8D0)" }}
                />
              </span>
              <br />
              <span className="text-gray-500 text-3xl md:text-4xl font-bold">Pvt. Ltd.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="text-gray-500 text-[0.94rem] leading-relaxed max-w-lg mb-4"
            >
              A technology-driven company specializing in both software development and hardware infrastructure solutions. We help organizations enhance productivity and achieve digital growth through innovative and reliable technology services.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-gray-400 text-[0.88rem] leading-relaxed max-w-lg mb-8"
            >
              Our expertise includes web & mobile development, ERP systems, IT consulting, networking infrastructure, security systems, and hardware maintenance — delivering scalable, secure, high-performance solutions.
            </motion.p>

            {/* Stats row */}
            
            {/* CTA buttons */}
            
          </motion.div>

          {/* ── Right: Image ── */}
          <motion.div
            variants={fadeRight}
            className="relative flex justify-center items-center"
          >
            {/* Decorative ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="absolute w-[105%] h-[105%] rounded-3xl border-2 border-dashed border-[#1F6E8C]/20 pointer-events-none"
              style={{ top: "-2.5%", left: "-2.5%" }}
            />

            {/* Glow blob behind image */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 60% 40%, rgba(31,110,140,0.12), transparent 70%)",
                filter: "blur(20px)",
              }}
            />

            {/* Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl w-full max-w-md"
              style={{ boxShadow: "0 24px 64px rgba(31,110,140,0.18)" }}
            >
              <img
                src={aboutIllustration}
                alt="About HTechSolution"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient at bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(31,110,140,0.25), transparent)" }}
              />
            </motion.div>

            {/* Floating badge on image */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3 border border-[#1F6E8C]/15"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(31,110,140,0.1)" }}>
                <svg className="w-5 h-5 text-[#1F6E8C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">ISO Certified</p>
                <p className="text-[10px] text-gray-400">Trusted Technology Partner</p>
              </div>
            </motion.div> */}

            {/* Top-right floating tag */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute -top-4 -right-4 bg-[#1F6E8C] text-white rounded-2xl shadow-lg px-4 py-2.5 text-xs font-bold"
            >
              Since 2010 ✦
            </motion.div>
          </motion.div>

        </motion.div>
      </section>
    </>
  );
};

export default AboutHero;