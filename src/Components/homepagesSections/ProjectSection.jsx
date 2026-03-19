import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects } from "../store/HomepageSlices/SoftwareProjectSlice";

const BASE_URL = "https://htechsolution-main.onrender.com";

const ProjectSection = () => {
  const dispatch = useDispatch();
  const { list: projects, loading } = useSelector((state) => state.projects);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => { dispatch(fetchProjects()); }, [dispatch]);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-10 w-64 bg-gray-100 rounded-lg animate-pulse mx-auto mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-50 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!projects || projects.length === 0) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
        .proj-root { font-family: 'Poppins', sans-serif; }
        .proj-root .display-font { font-family: 'Poppins', sans-serif; }
        .proj-card-img { transition: transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94); }
        .proj-card:hover .proj-card-img { transform: scale(1.07); }

        /* Feature list item — full width, no truncation */
        .proj-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.78rem;
          font-weight: 500;
          color: #4b5563;
          line-height: 1.5;
          padding: 2px 0;
        }
        .proj-feature-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 5px;
        }
        .proj-feature-more {
          font-size: 0.72rem;
          font-weight: 500;
          color: #9ca3af;
          padding-left: 14px;
          margin-top: 2px;
        }

        /* Modal feature list */
        .modal-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 9px 0;
          border-bottom: 1px solid #f3f4f6;
        }
        .modal-feature-item:last-child { border-bottom: none; }
        .modal-feature-check {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }
      `}</style>

      <section className="proj-root py-8 bg-white relative overflow-hidden">

        <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-[#1F6E8C]/4 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#2AA8D0]/5 translate-y-1/2 -translate-x-1/3 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(31,110,140,0.07) 1px, transparent 1px)",
            backgroundSize: "36px 36px"
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-16 text-center"
          >
            <span className="inline-flex items-center gap-2 text-[#1F6E8C] text-xs font-semibold tracking-widest uppercase bg-[#1F6E8C]/10 px-4 py-1.5 rounded-full border border-[#1F6E8C]/20 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1F6E8C] animate-pulse" />
              What We've Built
            </span>
            <h2 className="display-font text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-[1.05] mb-5">
              Our Software <br />
              <span className="text-[#1F6E8C]">Projects</span>
            </h2>
            {/* <p className="text-gray-400 text-base max-w-md mx-auto leading-relaxed">
              Real-world solutions we've designed, built, and deployed — from CRMs to hospital management systems.
            </p> */}
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {projects.map((project, index) => {
              const accentColor = project.gradient || "#1F6E8C";
              return (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="proj-card group cursor-pointer flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-400"
                  onClick={() => setActiveProject(project)}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    {project.image ? (
                      <img
                        src={project.image.startsWith("http") ? project.image : `${BASE_URL}${project.image}`}
                        alt={project.title}
                        className="proj-card-img w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${accentColor}18, ${accentColor}30)` }}>
                        <span className="text-5xl opacity-30">💻</span>
                      </div>
                    )}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{ background: `linear-gradient(to top, ${accentColor}55, transparent)` }}
                    />
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-xs font-bold shadow-sm"
                      style={{ color: accentColor }}>
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="w-10 h-1 rounded-full mb-4" style={{ background: accentColor }} />
                    <h3 className="display-font text-xl font-bold text-gray-900 mb-2 group-hover:text-[#1F6E8C] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-3">
                      {project.description}
                    </p>

                    {/* ── Features: vertical list, full text, no overflow ── */}
                    {project.features?.length > 0 && (
                      <div className="mb-5 space-y-1">
                        {project.features.slice(0, 3).map((f, idx) => (
                          <div key={idx} className="proj-feature-item">
                            <span className="proj-feature-dot" style={{ background: accentColor }} />
                            <span>{f}</span>
                          </div>
                        ))}
                        {project.features.length > 3 && (
                          <p className="proj-feature-more">
                            +{project.features.length - 3} more features
                          </p>
                        )}
                      </div>
                    )}

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: accentColor }}>
                        View Details
                      </span>
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{ background: accentColor + "18" }}
                        onMouseEnter={e => e.currentTarget.style.background = accentColor}
                        onMouseLeave={e => e.currentTarget.style.background = accentColor + "18"}
                      >
                        <svg className="w-3.5 h-3.5" style={{ color: accentColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Detail Modal */}
        <AnimatePresence>
          {activeProject && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={() => setActiveProject(null)}
              />
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.97 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="fixed inset-x-4 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
                  w-auto md:w-full md:max-w-2xl bg-white rounded-t-3xl md:rounded-3xl z-50 overflow-hidden shadow-2xl"
              >
                {activeProject.image && (
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={activeProject.image.startsWith("http") ? activeProject.image : `${BASE_URL}${activeProject.image}`}
                      alt={activeProject.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0"
                      style={{ background: `linear-gradient(to top, rgba(0,0,0,0.55), transparent)` }} />
                    <div className="absolute bottom-4 left-6 text-white">
                      <p className="display-font text-2xl font-extrabold">{activeProject.title}</p>
                    </div>
                  </div>
                )}

                <div className="p-7">
                  {!activeProject.image && (
                    <h3 className="display-font text-2xl font-extrabold text-gray-900 mb-3">{activeProject.title}</h3>
                  )}

                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{activeProject.description}</p>

                  {/* Modal Features: clean list with outlined check circles */}
                  {activeProject.features?.length > 0 && (
                    <>
                      <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Features</p>
                      <div>
                        {activeProject.features.map((feature, idx) => (
                          <div key={idx} className="modal-feature-item">
                            <div
                              className="modal-feature-check"
                              style={{ border: `1.5px solid ${activeProject.gradient || "#1F6E8C"}` }}
                            >
                              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                                <path
                                  d="M2 5.5L4.2 7.5L8 3"
                                  stroke={activeProject.gradient || "#1F6E8C"}
                                  strokeWidth="1.6"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <span className="text-sm text-gray-700 leading-snug">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  <button
                    onClick={() => setActiveProject(null)}
                    className="mt-7 w-full py-3 rounded-xl text-white text-sm font-semibold tracking-wide transition-opacity hover:opacity-90"
                    style={{ background: activeProject.gradient || "#1F6E8C" }}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </section>
    </>
  );
};

export default ProjectSection;
