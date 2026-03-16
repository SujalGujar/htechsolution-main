import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchSections } from "../store/AboutUsPageSlices/VisionMisionSlice";

const BASE_URL = "http://localhost:5000";

// ✅ Icon based on title keyword
const getSectionIcon = (title = "") => {
  const t = title.toLowerCase();
  if (t.includes("mission"))  return "🎯";
  if (t.includes("vision"))   return "🔭";
  if (t.includes("value"))    return "💎";
  if (t.includes("goal"))     return "🚀";
  if (t.includes("strategy")) return "📋";
  return "⭐";
};

// ✅ Color based on index
const getCardColors = (index) => {
  const colors = [
    { bg: "from-[#1F6E8C] to-[#16556e]", light: "bg-blue-50",  border: "border-blue-200" },
    { bg: "from-[#6BA368] to-[#4d7a4b]", light: "bg-green-50", border: "border-green-200" },
    { bg: "from-[#D4A017] to-[#a67c10]", light: "bg-yellow-50",border: "border-yellow-200" },
    { bg: "from-[#8B5CF6] to-[#6d44d6]", light: "bg-purple-50",border: "border-purple-200" },
  ];
  return colors[index % colors.length];
};

const OurMission = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.sections);

  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400">
          Loading...
        </div>
      </section>
    );
  }

  if (error || !list || list.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4">

        {/* ✅ Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-[#1F6E8C]/10 text-[#1F6E8C] rounded-full text-sm font-semibold mb-4">
            Who We Are
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Our{" "}
            <span className="text-[#1F6E8C]">
              Core Values
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#1F6E8C] to-[#6BA368] mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* ✅ Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {list.map((section, index) => {
            const colors = getCardColors(index);
            return (
              <motion.div
                key={section._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-2xl border ${colors.border} ${colors.light} overflow-hidden group hover:shadow-xl transition-all duration-300`}
              >
                {/* Top gradient bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${colors.bg}`} />

                <div className="p-8">
                  {/* Icon + Title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${colors.bg} flex items-center justify-center text-2xl shadow-lg`}>
                      {getSectionIcon(section.title)}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {section.title}
                    </h3>
                  </div>

                  {/* Content */}
                  <p className="text-gray-600 leading-relaxed text-base">
                    {section.content}
                  </p>

                  {/* Image */}
                  {section.image && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="mt-6 rounded-xl overflow-hidden"
                    >
                      <img
                        // ✅ New - correct
src={
  section.image.startsWith("http")
    ? section.image
    : `${BASE_URL}${section.image}`
}
                        alt={section.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </motion.div>
                  )}

                  {/* Bottom decorative line */}
                  <div className={`mt-6 h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${colors.bg} transition-all duration-500 rounded-full`} />
                </div>

                {/* Corner decoration */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-r ${colors.bg} opacity-5 rounded-bl-full`} />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default OurMission;