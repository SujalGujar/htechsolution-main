import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchSolutions } from "../store/HomepageSlices/HardwareSlice";

const BASE_URL = "http://localhost:5000";

const SoftwareSolutions = () => {
  const dispatch = useDispatch();
  const { solutions, loading } = useSelector((state) => state.hardwareSolutions);

  useEffect(() => { dispatch(fetchSolutions()); }, [dispatch]);

  if (loading) {
    return (
      <section className="py-20 bg-[#f4fafd]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-7">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
              <div className="h-52 bg-gray-200" />
              <div className="p-6 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!solutions || solutions.length === 0) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
        .hw-root { font-family: 'Poppins', sans-serif; }
        .hw-root h2 { font-family: 'Poppins', sans-serif; }
        .hw-card-img { transition: transform 0.5s ease; }
        .hw-card:hover .hw-card-img { transform: scale(1.06); }
      `}</style>

      <section className="hw-root py-12  bg-[#f4fafd] relative overflow-hidden">

        {/* Decorative blobs */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#1F6E8C]/6 pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-[#2AA8D0]/8 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
          >
            <div>
              <span className="inline-flex items-center gap-2 text-[#1F6E8C] text-xs font-semibold tracking-widest uppercase bg-[#1F6E8C]/10 px-4 py-1.5 rounded-full border border-[#1F6E8C]/20 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1F6E8C] animate-pulse" />
                What We Offer
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                Hardware <span className="text-[#1F6E8C]">Solutions</span>
              </h2>
            </div>
            {/* <p className="text-gray-500 text-base max-w-sm leading-relaxed">
              Our hardware projects include computer setup, network installation, CCTV setup, and hardware repair. We help businesses and individuals install and maintain their hardware systems. Our team works carefully to provide reliable and efficient solutions. 
            </p> */}
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {solutions.map((solution, i) => (
              <motion.div
                key={solution._id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                className="hw-card group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-400 border border-gray-100 hover:border-[#1F6E8C]/20 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  {solution.image ? (
                    <img
                      src={
                        solution.image.startsWith("http")
                          ? solution.image
                          : `${BASE_URL}${solution.image}`
                      }
                      alt={solution.title}
                      className="hw-card-img w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1F6E8C]/10 to-[#2AA8D0]/10">
                      <span className="text-5xl opacity-30">🖥️</span>
                    </div>
                  )}

                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F6E8C]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  {/* Index badge */}
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-xs font-bold text-[#1F6E8C] shadow-sm">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#1F6E8C] transition-colors duration-300">
                    {solution.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">
                    {solution.description}
                  </p>

                  {/* Bottom CTA line */}
                  {/* <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-[#1F6E8C] font-semibold tracking-wide uppercase">
                      Learn More
                    </span>
                    <div className="w-7 h-7 rounded-full bg-[#1F6E8C]/10 flex items-center justify-center group-hover:bg-[#1F6E8C] transition-colors duration-300">
                      <svg className="w-3.5 h-3.5 text-[#1F6E8C] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div> */}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default SoftwareSolutions;