import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { fetchTeam } from "../store/AboutUsPageSlices/TeamAdminSlice";

const BASE_URL = "https://htechsolution-main.onrender.com";

const LinkedinIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const MailIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const ACCENTS = [
  "linear-gradient(135deg,#1F6E8C,#2AA8D0)",
  "linear-gradient(135deg,#6BA368,#8FC98B)",
  "linear-gradient(135deg,#E07B39,#F0A46A)",
  "linear-gradient(135deg,#7C5CBF,#A987DE)",
];

const OurTeam = () => {
  const dispatch = useDispatch();
  const { members, loading } = useSelector((state) => state.ourTeam);

  useEffect(() => { dispatch(fetchTeam()); }, [dispatch]);

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-10 w-48 bg-gray-100 rounded-xl animate-pulse mx-auto mb-14" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden animate-pulse border border-gray-100">
                <div className="h-48 bg-gray-100" />
                <div className="p-5 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                  <div className="h-3 bg-gray-100 rounded w-full mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!members || members.length === 0) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
        .team-root { font-family: 'Poppins', sans-serif; }
        .team-img { transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94); }
        .team-card:hover .team-img { transform: scale(1.03); }
      `}</style>

      <section className="team-root relative py-12 bg-white overflow-hidden">

        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle,rgba(31,110,140,0.06) 1.5px,transparent 1.5px)",
            backgroundSize: "38px 38px",
          }} />

        {/* Blobs */}
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(31,110,140,0.07),transparent 70%)" }} />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(107,163,104,0.07),transparent 70%)" }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border mb-5"
              style={{ color:"#1F6E8C", background:"rgba(31,110,140,0.08)", borderColor:"rgba(31,110,140,0.2)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:"#1F6E8C" }} />
              The People Behind Us
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight"
              style={{ fontFamily:"'Poppins',sans-serif" }}>
              Meet Our <span style={{ color:"#1F6E8C" }}>Team</span>
            </h2>
            <p className="text-gray-400 text-base mt-4 max-w-md mx-auto leading-relaxed">
              Talented individuals who bring ideas to life with skill, dedication, and passion.
            </p>
          </motion.div>

          {/* ── Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {members.map((member, index) => {
              const gradient = ACCENTS[index % ACCENTS.length];
              const imgSrc = member.profileImage
                ? member.profileImage.startsWith("http")
                  ? member.profileImage
                  : `${BASE_URL}${member.profileImage}`
                : null;

              return (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="team-card group relative bg-white rounded-3xl overflow-hidden flex flex-col"
                  style={{
                    border: "1.5px solid rgba(31,110,140,0.1)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
                    transition: "box-shadow 0.3s, transform 0.3s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = "0 12px 48px rgba(31,110,140,0.14)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.05)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Image area — full width, tall enough to show face clearly */}
                  <div className="relative w-full overflow-hidden flex-shrink-0" style={{ height: 280 }}>
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt={member.name}
                        className="team-img w-full h-full object-cover"
                        style={{ objectPosition: "center top" }}
                        onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                      />
                    ) : null}

                    {/* Fallback block */}
                    <div
                      className="absolute inset-0 items-center justify-center"
                      style={{
                        display: imgSrc ? "none" : "flex",
                        background: gradient,
                      }}
                    >
                      <span className="text-white font-black text-7xl"
                        style={{ fontFamily:"'Poppins',sans-serif", opacity: 0.5 }}>
                        {member.name?.charAt(0)}
                      </span>
                    </div>

                    {/* Very subtle bottom vignette — only 8px, doesn't darken image */}
                    <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
                      style={{ background: "linear-gradient(to bottom,transparent,rgba(255,255,255,0.3))" }} />

                    {/* Index badge */}
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black"
                      style={{
                        background: "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(6px)",
                        color: "#1F6E8C",
                        fontFamily:"'Poppins',sans-serif",
                      }}>
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 px-6 pt-3 pb-6">

                    {/* Accent bar */}
                    <div className="w-10 h-1 rounded-full mb-3" style={{ background: gradient }} />

                    <h3 className="text-lg font-black text-gray-900 leading-tight mb-0.5"
                      style={{ fontFamily:"'Poppins',sans-serif" }}>
                      {member.name}
                    </h3>

                    <p className="text-xs font-bold tracking-wide mb-3" style={{ color:"#1F6E8C" }}>
                      {member.designation}
                    </p>

                    {member.description && (
                      <p className="text-sm text-gray-400 leading-relaxed flex-1 line-clamp-3">
                        {member.description}
                      </p>
                    )}

                    {/* Social links */}
                    {(member.linkedin || member.email) && (
                      <div className="flex gap-2 mt-5 pt-4 border-t border-gray-100">
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                            style={{ background:"rgba(31,110,140,0.08)", color:"#1F6E8C" }}
                            onMouseEnter={e => { e.currentTarget.style.background="#1F6E8C"; e.currentTarget.style.color="#fff"; }}
                            onMouseLeave={e => { e.currentTarget.style.background="rgba(31,110,140,0.08)"; e.currentTarget.style.color="#1F6E8C"; }}
                          >
                            <LinkedinIcon />
                          </a>
                        )}
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                            style={{ background:"rgba(107,163,104,0.08)", color:"#6BA368" }}
                            onMouseEnter={e => { e.currentTarget.style.background="#6BA368"; e.currentTarget.style.color="#fff"; }}
                            onMouseLeave={e => { e.currentTarget.style.background="rgba(107,163,104,0.08)"; e.currentTarget.style.color="#6BA368"; }}
                          >
                            <MailIcon />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
};

export default OurTeam;
