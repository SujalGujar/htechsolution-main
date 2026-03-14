import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
// ✅ Import fetchProjects from your slice
import { fetchProjects } from "../store/HomepageSlices/SoftwareProjectSlice";

const BASE_URL = "http://localhost:5000";

const ProjectSection = () => {
  const dispatch = useDispatch();

  // ✅ Read from Redux state
  const { list: projects, loading } = useSelector(
    (state) => state.projects
  );

  // ✅ THIS IS THE KEY FIX
  // Fetch projects from backend when component loads
  // Without this, list stays empty forever
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400">
        Loading projects...
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className="py-24 overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ color: "#1F6E8C" }}
        className="text-3xl md:text-4xl font-bold mb-16 text-center"
      >
        Our Software Projects
      </motion.h1>

      {/* Horizontal scroll */}
      <div
        className="flex gap-10 px-8 overflow-x-auto pb-6"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -5 }}
            className="min-w-[320px] md:min-w-[420px] bg-white border border-gray-200 rounded-lg p-6 shadow-lg flex-shrink-0"
          >
            <div
              className="h-1 rounded-t-lg mb-4"
              style={{ background: project.gradient || "#1F6E8C" }}
            />

            {/* ✅ Full image URL */}
            {project.image && (
              <img
                src={
                  project.image.startsWith("http")
                    ? project.image
                    : `${BASE_URL}${project.image}`
                }
                alt={project.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
            )}

            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-700 mb-4">{project.description}</p>

            <ul className="space-y-2">
              {project.features?.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: project.gradient || "#1F6E8C" }}
                  />
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-sm text-gray-400 mt-4"
      >
        ← Scroll to see more projects →
      </motion.p>
    </section>
  );
};

export default ProjectSection;
